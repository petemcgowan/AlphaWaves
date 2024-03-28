import React, {useState, useEffect, useRef} from 'react';
import Sound from 'react-native-sound';
import RNFS from 'react-native-fs';
import {Dimensions, StyleSheet, View, Animated, Platform, TouchableOpacity, NativeModules, Text, Image} from 'react-native';
import rainSounds from '../model/data';
import TimerControls from '../components/TimerControls';
import CountdownTimer from '../components/CountdownTimer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';
import {actionCreators} from '../redux/index';
import {useDispatch, useSelector} from 'react-redux';
import {State} from './redux/reducers';
// import RNFetchBlob from 'rn-fetch-blob';

import {bindActionCreators} from 'redux';

const {width, height} = Dimensions.get('window');

const RainSlider = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [songIndex, setSongIndex] = useState(0);
  const dispatch = useDispatch();
  const {updateHasSeenIntro} = bindActionCreators(actionCreators, dispatch);
  const videoRefs = useRef(rainSounds.map(() => React.createRef()));

  const fileCache = useSelector((state: State) => state.fileCache);
  const [videoExistence, setVideoExistence] = useState<boolean[]>([true, false, false, false, false]);
  // const [hlsValuesChanged, setHLSValuesChanged] = useState<boolean>(false);

  const [timerVisible, setTimerVisible] = useState(false);

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [soundsPlaying, setSoundsPlaying] = useState([{playing: false}, {playing: false}, {playing: false}, {playing: false}, {playing: false}]);
  const [videoSources, setVideoSources] = useState([
    {uri: 'https://d2ai2pzqw4qb5h.cloudfront.net/RainInACarAltHD/master.m3u8'},
    {uri: 'https://d2ai2pzqw4qb5h.cloudfront.net/RainInACar/master.m3u8'},
    {uri: 'https://d2ai2pzqw4qb5h.cloudfront.net/rainInPorchOverlookingForest/master.m3u8'},
    {uri: 'https://d2ai2pzqw4qb5h.cloudfront.net/rainPouringDown/master.m3u8'},
    {uri: 'https://d2ai2pzqw4qb5h.cloudfront.net/blueSplashes/master.m3u8'},
  ]);
  const [hlsLoadStatuses, setHLSsLoadStatuses] = useState([
    {shouldLoad: true},
    {shouldLoad: false},
    {shouldLoad: false},
    {shouldLoad: false},
    {shouldLoad: false},
  ]);
  const [intentionalVideoPlay, setIntentionalVideoPlay] = useState(true);
  const [filesAlreadyExisted, setFilesAlreadyExisted] = useState(false);
  const [initialExistenceArray, setInitialExistenceArray] = useState<boolean[]>([]);

  rainSounds[songIndex].playingSound.setVolume(rainSounds[songIndex].volume);
  rainSounds[songIndex].playingSound.setNumberOfLoops(-1);

  // have all files been cached before?
  useEffect(() => {
    const initialFileExistenceCheck = async () => {
      const initialExistenceArray = await Promise.all(
        rainSounds.map(async (video, index) => {
          if (index === 0) {
            // Skip the first element since it uses a local video asset
            return true;
          }

          const cachedFilePath = `${RNFS.CachesDirectoryPath}/${video.videoFile.uri.split('/').pop()}`;
          try {
            const fileInfo = await RNFS.stat(cachedFilePath);
            const fileSize = fileInfo.size;
            const isFullyDownloaded = fileSize === video.videoFileSize;

            // Update the videoSources array for elements other than the first one
            return isFullyDownloaded;
          } catch (error) {
            // If RNFS.stat fails, it means the file is either not fully downloaded or doesn't exist
            return false;
          }
        })
      );
      setInitialExistenceArray(initialExistenceArray);
    };

    initialFileExistenceCheck();
    setFilesAlreadyExisted(initialExistenceArray.every(exists => exists));
  }, []);

  const setNextShouldLoadHLS = (index = 0) => {
    // console.log('setNextShouldLoadHLS, index:' + index);
    if (index >= rainSounds.length) {
      console.log('setNextShouldLoadHLS, All HLS videos have been set to load');
      return;
    }

    updateHLSLoadStatuses(true, index);

    setTimeout(() => {
      setNextShouldLoadHLS(index + 1);
    }, 4000);
  };

  useEffect(() => {
    setNextShouldLoadHLS();
  }, []);

  const checkFileExistence = async () => {
    const existenceArray = await Promise.all(
      rainSounds.map(async (video, index) => {
        if (index === 0) {
          // Skip the first element since it uses a local video asset
          return true;
        }

        const cachedFilePath = `${RNFS.CachesDirectoryPath}/${video.videoFile.uri.split('/').pop()}`;
        try {
          const fileInfo = await RNFS.stat(cachedFilePath);
          const fileSize = fileInfo.size;
          const isFullyDownloaded = fileSize === video.videoFileSize;

          // Update the videoSources array for elements other than the first one
          setVideoSources(prevSources => {
            const updatedSources = [...prevSources];
            updatedSources[index] = {uri: isFullyDownloaded ? cachedFilePath : video.hlsPlaylist.uri};
            return updatedSources;
          });
          return isFullyDownloaded;
        } catch (error) {
          // If RNFS.stat fails, it means the file is either not fully downloaded or doesn't exist
          return false;
        }
      })
    );

    setVideoExistence(existenceArray);

    // Check if all values in videoExistence are true
    const allDownloaded = existenceArray.every(exists => exists);

    if (!allDownloaded) {
      // If not all files are fully downloaded, call the function again after a delay
      if (filesAlreadyExisted) {
        //
        checkFileExistence();
      } else {
        setTimeout(() => {
          console.log('checkFileExistence setting timeout, existenceArray:' + JSON.stringify(existenceArray));
          checkFileExistence();
        }, 2500);
      }
    }
  };

  useEffect(() => {
    updateHasSeenIntro(true);

    checkFileExistence();

    if (Platform.OS === 'android') {
      NativeModules.ExoPlayerModule.preparePlaylist([
        {name: 'relaxing_sounds_of_light_rain_falling_on_the_car_trim', volume: 0.7},
        {name: 'night_rain_on_a_car_trim', volume: 0.2},
        {name: 'cozy_cabin_porch_with_heavy_rainstorm_trim', volume: 0.7},
        {name: 'rain_hitting_a_campervan_roof_window', volume: 0.5},
        {name: 'rain_on_water_swimming_pool_snip', volume: 0.2},
      ]);
    }
    scrollX.addListener(({value}) => {
      const index = Math.round(value / width);
      if (index === rainSounds.length) {
        console.log('END OF SLIDES', songIndex);
      } else {
        if (index !== songIndex) {
          if (Platform.OS === 'android') {
            NativeModules.ExoPlayerModule.switchTrack(index);
            if (soundsPlaying[songIndex].playing) {
              updatePlayingStatus(false, songIndex); // set prev song to not play
              updatePlayingStatus(true, index); // set new song to play
            }
          }

          if (Platform.OS === 'ios') {
            if (rainSounds[songIndex].playingSound._playing) {
              updatePlayingStatus(false, songIndex);
              updatePlayingStatus(true, index);
              // if previous sound if playing, stop it
              rainSounds[songIndex].playingSound.stop();
              // play the newly selected sound
              rainSounds[index].playingSound.play();
            }
          }
          setSongIndex(index);
        }
      }
    });

    return () => {
      scrollX.removeAllListeners();
    };
  }, [scrollX, videoExistence[songIndex], songIndex, soundsPlaying[songIndex].playing]);

  const updatePlayingStatus = (playingStatus: boolean, index: number) => {
    const updatedSoundsPlaying = [...soundsPlaying];
    updatedSoundsPlaying[index].playing = playingStatus;
    setSoundsPlaying(updatedSoundsPlaying);
  };

  const updateHLSLoadStatuses = (hlsLoadStatus: boolean, index: number) => {
    const updatedHLSStatuses = [...hlsLoadStatuses];
    hlsLoadStatuses[index].shouldLoad = hlsLoadStatus;
    setHLSsLoadStatuses(updatedHLSStatuses);
  };

  const togglePlayback = (fromModal: boolean) => {
    if (Platform.OS === 'android') {
      NativeModules.ExoPlayerModule.isTrackPlaying((isPlaying: boolean) => {
        if (isPlaying) {
          NativeModules.ExoPlayerModule.pauseTrack();
          updatePlayingStatus(false, songIndex);
          // reset the timer if not IN the timer
          if (!fromModal) {
            if (hours > 0) setHours(0);
            if (minutes > 0) setMinutes(0);
            if (seconds > 0) setSeconds(0);
          }
          if (timerVisible) setTimerVisible(false);
        } else {
          updatePlayingStatus(true, songIndex);
          NativeModules.ExoPlayerModule.playTrack();
        }
      });
    }

    if (Platform.OS === 'ios') {
      // if (!rainSounds[songIndex].playingSound._playing) {
      //   // downloadFiles();
      //   handleDownloadTiming();
      // }
      if (rainSounds[songIndex].playingSound._playing) {
        rainSounds[songIndex].playingSound.stop();
        updatePlayingStatus(false, songIndex);
        // reset the timer if not IN the timer
        if (!fromModal) {
          if (hours > 0) setHours(0);
          if (minutes > 0) setMinutes(0);
          if (seconds > 0) setSeconds(0);
        }

        if (timerVisible) setTimerVisible(false);
      } else {
        updatePlayingStatus(true, songIndex);
        rainSounds[songIndex].playingSound.play(success => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
          useNativeDriver: true,
        })}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}>
        {rainSounds.map((video, index) => (
          <View style={styles.videoContainer} key={index}>
            {index === 0 ? (
              <Video
                key={`video-${video.id}-cached`}
                ref={videoRefs[index]}
                source={require('../../assets/videos/RainInACarAltHD.mp4')}
                style={styles.video}
                poster={video.videoPosterUri}
                posterResizeMode="cover"
                muted={true}
                volume={video.volume}
                rate={0.6}
                repeat={true}
                paused={!soundsPlaying[index].playing || !intentionalVideoPlay}
                resizeMode="cover"
              />
            ) : filesAlreadyExisted || (videoExistence[index] && videoSources[index].uri) ? (
              <Video
                key={`video-${video.id}-cached`}
                ref={videoRefs[index]}
                // source={
                //   videoExistence[index] && fileCache[video.videoFile.uri] !== undefined ? {uri: fileCache[video.videoFile.uri]} : video.hlsPlaylist
                // }
                source={videoSources[index]}
                style={styles.video}
                poster={video.videoPosterUri}
                posterResizeMode="cover"
                muted={true}
                volume={video.volume}
                rate={0.6}
                repeat={true}
                paused={!soundsPlaying[index].playing || !intentionalVideoPlay}
                resizeMode="cover"
              />
            ) : hlsLoadStatuses[index]?.shouldLoad ? (
              <Video
                key={`video-${video.id}-hls`}
                source={video.hlsPlaylist}
                style={styles.video}
                poster={video.videoPosterUri}
                posterResizeMode="cover"
                muted={true}
                volume={video.volume}
                rate={0.6}
                repeat={true}
                paused={!soundsPlaying[index].playing || !intentionalVideoPlay}
                resizeMode="cover"
              />
            ) : (
              <View style={{alignItems: 'center'}}>
                <Text style={styles.waitingText}>Please wait...</Text>
              </View>
            )}
          </View>
        ))}
      </Animated.ScrollView>
      <View style={styles.powerControls}>
        <TouchableOpacity style={styles.powerIcon} onPress={() => togglePlayback(false)}>
          <Ionicons
            name={'water-outline'}
            size={250}
            test-id={'ionicons-button'}
            style={styles.powerIcon}
            color={soundsPlaying[songIndex].playing ? 'rgba(191, 215, 234, 0.75)' : 'rgba(11, 57, 84, 1)'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.timerCountdown}>
        {timerVisible ? (
          <View style={styles.timerCountdown}>
            <CountdownTimer
              hours={hours}
              minutes={minutes}
              seconds={seconds}
              togglePlayback={togglePlayback}
              setTimerVisible={setTimerVisible}
              timerControlsFontColor={rainSounds[songIndex].timerControlsFontColor}
            />
          </View>
        ) : (
          <View style={styles.timerCountdown}></View>
        )}
      </View>
      <View style={styles.timerControls}>
        <TimerControls
          setTimerVisible={setTimerVisible}
          hours={hours}
          setHours={setHours}
          minutes={minutes}
          setMinutes={setMinutes}
          seconds={seconds}
          setSeconds={setSeconds}
          // playing={playing}
          playing={soundsPlaying[songIndex].playing}
          togglePlayback={togglePlayback}
          intentionalVideoPlay={intentionalVideoPlay}
          setIntentionalVideoPlay={setIntentionalVideoPlay}
          timerDialogBackgroundColor={rainSounds[songIndex].timerDialogBackgroundColor}
          timerDialogFontColor={rainSounds[songIndex].timerDialogFontColor}
          songIndex={songIndex}
          rainSounds={rainSounds}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(0, 0, 0)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    height: height * 0.7,
    flexDirection: 'row',
  },
  backgroundVideo: {
    height: height,
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'stretch',
    bottom: 0,
    right: 0,
  },
  videoContainer: {
    width: width,
    height: height,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  timerCountdown: {
    flexBasis: '20%',
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    bottom: '20%',
    right: 0,
  },
  timerControls: {
    flexBasis: '18%',
    marginBottom: 15,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
  },
  powerControls: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    marginRight: width * 0.2,
    marginLeft: width * 0.2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    shadowColor: '#ccc',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1.34,
    elevation: 3,
  },
  waitingText: {
    color: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  powerIcon: {
    opacity: 0.85,
    paddingTop: 20,
    height: '100%',
    borderRadius: 70,
  },
});

export default RainSlider;
