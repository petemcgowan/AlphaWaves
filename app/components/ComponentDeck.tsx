import React, { useState, useEffect, useRef } from 'react'
import {
  ScrollView,
  Dimensions,
  StyleSheet,
  View,
  Animated,
  Text,
  TouchableOpacity,
} from 'react-native'
import rainSounds from '../model/data'
import { useNavigation } from '@react-navigation/native'
import CSlide1 from '../screens/CSlide1'
import CSlide2 from '../screens/CSlide2'
import TimerControls from './TimerControls'
import CountdownTimer from './CountdownTimer'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Video from 'react-native-video'

const { width, height } = Dimensions.get('window')
const slides = [CSlide1, CSlide2]

const ComponentDeck = () => {
  const scrollX = useRef(new Animated.Value(0)).current
  const [activeSlide, setActiveSlide] = useState(0)
  const [songIndex, setSongIndex] = useState(0)
  const navigation = useNavigation()
  const [playing, setPlaying] = useState(false)
  const [timerVisible, setTimerVisible] = useState(false)

  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [intentionalVideoPlay, setIntentionalVideoPlay] = useState(true)

  const videos = [
    require('../../assets/videos/rainInPorchOverlookingForest.mp4'),
    require('../../assets/videos/RainInACar540x960.mp4'),
    require('../../assets/videos/HeavyRainOnWindowOnTheTrain.mp4'),
  ]

  rainSounds[songIndex].playingSound.setVolume(0.9)
  rainSounds[songIndex].playingSound.setNumberOfLoops(-1)

  const onScroll = (event: any) => {
    const slide = Math.ceil(
      event.nativeEvent.contentOffset.x /
        event.nativeEvent.layoutMeasurement.width
    )
    if (slide !== activeSlide) {
      setActiveSlide(slide)
    }
  }

  const onStartNowPress = () => {
    navigation.navigate('RainPlayer')
  }

  const onLinkPress = () => {
    console.log('LinkPress')
  }

  useEffect(() => {
    scrollX.addListener(({ value }) => {
      const index = Math.round(value / width)
      // console.log('scrollX, index:' + index)
      if (index === rainSounds.length) {
        console.log('END OF SLIDES', songIndex)
        // end of slides
        // // scroll back to the top
        // rainSliderRef.current.scrollToOffset({
        //   offset: 0,
        //   animated: true,
        // })
      } else {
        // console.log('useEffect, checking index', index, 'songIndex', songIndex) //
        if (index !== songIndex) {
          if (rainSounds[songIndex].playingSound._playing) {
            // if previous sound if playing, stop it
            // console.log('stopping songIndex', songIndex)
            rainSounds[songIndex].playingSound.stop()
            // console.log('starting index', index)
            // play the newly selected sound
            rainSounds[index].playingSound.play()
          }
          setSongIndex(index)
        }
      }
    })

    return () => {
      scrollX.removeAllListeners()
    }
  }, [scrollX, songIndex, playing])

  const togglePlayback = () => {
    if (rainSounds[songIndex].playingSound._playing) {
      rainSounds[songIndex].playingSound.stop()
      setPlaying(!playing)
      if (timerVisible) setTimerVisible(false)
    } else {
      setPlaying(true)
      rainSounds[songIndex].playingSound.play((success) => {
        if (success) {
          console.log('successfully finished playing')
        } else {
          console.log('playback failed due to audio decoding errors')
        }
      })
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onStartNowPress}>
        <Text style={styles.buttonText}>Start Now</Text>
      </TouchableOpacity>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        // onScroll={onScroll}
        // onScroll={Animated.ScrollView(
        //   [
        //     {
        //       nativeEvent: {
        //         contentOffset: { x: scrollX },
        //       },
        //     },
        //   ],
        //   { useNativeDriver: true }
        // )}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true } // Set to false, adjust according to your needs
        )}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {rainSounds.map((video, index) => (
          <View style={styles.videoContainer} key={index}>
            <Video
              source={video.videoBackground}
              style={styles.video}
              muted={true}
              volume={0.5}
              rate={0.6}
              repeat={true}
              buffered={true}
              paused={!playing}
              resizeMode="cover"
            />
          </View>
        ))}
      </Animated.ScrollView>
      <View style={styles.powerControls}>
        <TouchableOpacity
          style={styles.powerIcon}
          onPress={() => togglePlayback()}
        >
          <Ionicons
            name={'water-outline'}
            size={250}
            style={styles.powerIcon}
            color={
              playing ? 'rgba(0, 255, 0, 0.75)' : 'rgba(255, 211, 105, 0.75)'
            }
          />
        </TouchableOpacity>
      </View>

      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <Text
            key={index}
            style={index === activeSlide ? styles.activeDot : styles.dot}
          >
            •
          </Text>
        ))}
      </View>

      {/* <View style={styles.timerCountdown}>
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
      </View> */}
      <View style={styles.timerControls}>
        <TimerControls
          setTimerVisible={setTimerVisible}
          hours={hours}
          setHours={setHours}
          minutes={minutes}
          setMinutes={setMinutes}
          seconds={seconds}
          setSeconds={setSeconds}
          playing={playing}
          togglePlayback={togglePlayback}
          intentionalVideoPlay={intentionalVideoPlay}
          setIntentionalVideoPlay={setIntentionalVideoPlay}
          timerDialogBackgroundColor={
            rainSounds[songIndex].timerDialogBackgroundColor
          }
          timerDialogFontColor={rainSounds[songIndex].timerDialogFontColor}
        />
      </View>
    </View>
  )
}

// {slides.map((slide, index) => (
//   <View style={[styles.slide, { backgroundColor: slide }]} key={index}>
//     <Text style={styles.text}>Slide {index + 1}</Text>
//   </View>
// ))}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(30, 35, 58)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerCountdown: {
    flexBasis: '25%',
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerControls: {
    flexBasis: '18%',
    marginBottom: 15,
    // ...StyleSheet.absoluteFillObject,
    // height: height,
    // top: 0,
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
  slide: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    color: 'white',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: height * 0.3 + 10,
  },
  dot: {
    fontSize: 50,
    color: '#888',
    margin: 5,
  },
  activeDot: {
    fontSize: 50,
    color: '#FFF',
    margin: 5,
  },
  button: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: 'rgb(44, 207, 157)',
    padding: 10,
    borderRadius: 20,
    elevation: 5, // for Android
    shadowOffset: {
      // for iOS
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25, // for iOS
    shadowRadius: 3.84, // for iOS
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
  link: {
    position: 'absolute',
    bottom: 20,
  },
  linkText: {
    color: 'rgb(44, 207, 157)',
    fontSize: 16,
    textDecorationLine: 'underline',
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
    // bottom: 0,
    right: 0,
    marginRight: width * 0.2,
    marginLeft: width * 0.2,
    justifyContent: 'flex-start',
    // flexBasis: '57%',
    // width: width,
    // justifyContent: 'center',
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
    width: Dimensions.get('window').width - 1,
    height: Dimensions.get('window').height,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  powerIcon: {
    opacity: 0.85,
    paddingTop: 30,
    // paddingLeft: width / 37, // Ionicons don't centre properly without help
    // height: '100%',
    borderRadius: 70,
  },
})

export default ComponentDeck
