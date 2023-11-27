import React, {useState, useEffect, useRef} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Animated,
  Platform,
  TouchableOpacity,
  NativeModules,
} from 'react-native';
import rainSounds from '../model/data';
// import { useNavigation } from '@react-navigation/native'
import TimerControls from '../components/TimerControls';
import CountdownTimer from '../components/CountdownTimer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';

const {width, height} = Dimensions.get('window');

const RainSlider = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [songIndex, setSongIndex] = useState(0);
  // const [playing, setPlaying] = useState(false)

  const [timerVisible, setTimerVisible] = useState(false);

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [soundsPlaying, setSoundsPlaying] = useState([
    {playing: false},
    {playing: false},
    {playing: false},
    {playing: false},
    {playing: false},
  ]);
  console.log('soundsPlaying' + JSON.stringify(soundsPlaying));
  const [intentionalVideoPlay, setIntentionalVideoPlay] = useState(true);

  rainSounds[songIndex].playingSound.setVolume(0.9);
  rainSounds[songIndex].playingSound.setNumberOfLoops(-1);

  useEffect(() => {
    if (Platform.OS === 'android') {
      NativeModules.ExoPlayerModule.preparePlaylist([
        'relaxing_sounds_of_light_rain_falling_on_the_car_trim',
        'night_rain_on_a_car_trim',
        'cozy_cabin_porch_with_heavy_rainstorm_trim',
        'rain_hitting_a_campervan_roof_window',
        'rain_on_water_swimming_pool_snip',
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
  }, [scrollX, songIndex, soundsPlaying[songIndex].playing]);

  const updatePlayingStatus = (playingStatus: boolean, index: number) => {
    const updatedSoundsPlaying = [...soundsPlaying];
    updatedSoundsPlaying[index].playing = playingStatus;
    setSoundsPlaying(updatedSoundsPlaying);
  };

  const togglePlayback = () => {
    if (Platform.OS === 'android') {
      NativeModules.ExoPlayerModule.isTrackPlaying((isPlaying: boolean) => {
        if (isPlaying) {
          NativeModules.ExoPlayerModule.pauseTrack();
          updatePlayingStatus(false, songIndex);
          if (timerVisible) setTimerVisible(false);
        } else {
          updatePlayingStatus(true, songIndex);
          NativeModules.ExoPlayerModule.playTrack();
        }
      });
    }

    if (Platform.OS === 'ios') {
      if (rainSounds[songIndex].playingSound._playing) {
        rainSounds[songIndex].playingSound.stop();
        updatePlayingStatus(false, songIndex);

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
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true}
        )}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}>
        {rainSounds.map((video, index) => (
          <View style={styles.videoContainer} key={index}>
            {Platform.OS === 'ios' && (
              <Video
                key={video.id}
                source={video.videoBackground}
                style={styles.video}
                muted={true}
                volume={video.volume}
                rate={0.6}
                repeat={true}
                // buffered={true}
                // paused={!playing || !intentionalVideoPlay}
                paused={!soundsPlaying[index].playing || !intentionalVideoPlay}
                resizeMode="cover"
              />
            )}
            {Platform.OS === 'android' && (
              <Video
                key={video.id}
                source={video.videoBackground}
                style={styles.video}
                poster={rainSounds[songIndex].videoPosterUri}
                posterResizeMode="cover"
                muted={true}
                volume={video.volume}
                rate={0.6}
                repeat={true}
                // paused={!playing || !intentionalVideoPlay}
                paused={!soundsPlaying[index].playing || !intentionalVideoPlay}
                resizeMode="cover"
              />
            )}
          </View>
        ))}
      </Animated.ScrollView>
      <View style={styles.powerControls}>
        <TouchableOpacity
          style={styles.powerIcon}
          onPress={() => togglePlayback()}>
          <Ionicons
            name={'water-outline'}
            size={250}
            style={styles.powerIcon}
            color={
              soundsPlaying[songIndex].playing
                ? 'rgba(191, 215, 234, 0.75)'
                : 'rgba(11, 57, 84, 1)'
            }
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
              timerControlsFontColor={
                rainSounds[songIndex].timerControlsFontColor
              }
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
          timerDialogBackgroundColor={
            rainSounds[songIndex].timerDialogBackgroundColor
          }
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
  videoContainer: {
    // width: width - 1,
    width: width,
    height: height,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  powerIcon: {
    opacity: 0.85,
    paddingTop: 30,
    height: '100%',
    borderRadius: 70,
  },
});

export default RainSlider;
