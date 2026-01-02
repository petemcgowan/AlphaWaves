import React, {useState, useEffect} from 'react'
import {
  ScrollView,
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useDispatch} from 'react-redux'
import {bindActionCreators} from 'redux'
import {State} from '../redux/index'
import SlideComponent, {SlideComponentProps} from '../components/SlideComponent'
import {RFPercentage} from 'react-native-responsive-fontsize'
import {actionCreators} from '../redux/index'

const rain_falling_brain_alpha_waves_energy = require('../../assets/images/rain_falling_brain_alpha_waves_energy.jpg')
const productivity_replenishing_sleep_cleansing_rain_calming = require('../../assets/images/productivity_replenishing_sleep_cleansing_rain_calming.jpg')
const surreal_sand_timer = require('../../assets/images/surreal_sand_timer.jpg')

import noise_poster from '../../assets/images/posters/onboarding/noise_onboarding_poster.jpg'
import binaural_poster from '../../assets/images/posters/onboarding/binaural_onboarding5.jpg'

const {width, height} = Dimensions.get('window')
const CLOUDFRONT_URL = 'https://d2lxk2a39jwsfn.cloudfront.net'

export type Slide = {
  component: React.ComponentType<SlideComponentProps>
  title: string
  type: 'image'
  description: string
  image: any
  videoLink: string | null
  color: string
}

const slides = [
  {
    component: SlideComponent,
    title: 'Welcome to Alpha Waves',
    type: 'image',
    description1: `Alpha waves, ranging from 8 to 12 Hz, are produced by our brain in a relaxed state.`,
    description2: `A lack of these waves indicates we're not fully at ease.`,
    image: rain_falling_brain_alpha_waves_energy,
    videoLink: null,
    color: 'rgb(38, 27, 21)',
  },
  {
    component: SlideComponent,
    title: 'Alpha Waves Benefits',
    type: 'image',
    description1: `Boosting alpha waves can enhance creativity, reduce stress, and promote calmness.`,
    description2: `A lack of these waves can leave you feeling restless or mentally fatigued.`,
    image: productivity_replenishing_sleep_cleansing_rain_calming,
    videoLink: null,
    color: 'rgb(9, 21, 39)',
  },
  {
    component: SlideComponent,
    title: 'Focus with Noise',
    type: 'video', // <--- Trigger Video Mode
    description1: 'Block out distractions with Pink and Brown noise',
    description2:
      'Swipe vertically to switch between Rain, Noise, and Binaural decks',

    // HLS Stream
    videoSource: {
      uri: `${CLOUDFRONT_URL}/hls/welcome/noise_onboarding.m3u8`,
    },
    posterSource: noise_poster,
    color: 'rgb(20, 20, 20)', // Dark gray for Noise vibe
  },
  {
    component: SlideComponent,
    title: 'Deep Theta State',
    type: 'video',
    description1: 'Achieve deep relaxation with Binaural Beats.',
    description2: 'Headphones are required for the physics to work!',

    // HLS Stream
    videoSource: {
      uri: `${CLOUDFRONT_URL}/hls/welcome/binaural_onboarding5.m3u8`,
    },
    posterSource: binaural_poster,
    color: 'rgb(10, 10, 30)', // Deep Cosmic Blue/Black
  },
  {
    component: SlideComponent,
    title: 'Timer for Sleep',
    type: 'image',
    description1: `Use the built-in timer to control the duration of alpha wave sounds,`,
    description2: `Toggle video playback using the 'video' button for a customized experience.`,
    image: surreal_sand_timer,
    videoLink: null,
    color: 'rgb(25, 26, 29)',
  },
]

const OnboardingDeck = () => {
  const [activeSlide, setActiveSlide] = useState(0)
  const navigation = useNavigation()
  const [backgroundColor, setBackgroundColor] = useState('#000')
  const dispatch = useDispatch()
  const {updateHasSeenIntro} = bindActionCreators(actionCreators, dispatch)

  const onScroll = (event: any) => {
    const slide = Math.round(
      event.nativeEvent.contentOffset.x /
        event.nativeEvent.layoutMeasurement.width,
    )
    if (slide !== activeSlide) {
      setActiveSlide(slide)

      if (slide > slides.length - 1) {
        console.log('Slides end reached')
      } else {
        setBackgroundColor(slides[slide].color) // Set the background color when the slide changes
        console.log('slides[slide].color:' + slides[slide].color)
      }
    }
  }

  const onStartNowPress = () => {
    updateHasSeenIntro(true)
    navigation.navigate('MatrixPlayer')
  }

  useEffect(() => {
    console.log('OnboardingDeck useEffect')
  }, [])

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: backgroundColor}]}>
      {/* <View style={styles.topContainer}> */}
      <ScrollView
        horizontal
        pagingEnabled
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}>
        {slides.map((slide, index) => {
          const SlideComponent = slide.component
          return (
            <SlideComponent
              type={slide.type}
              key={index}
              title={slide.title}
              description1={slide.description1}
              description2={slide.description2}
              image={slide.image}
              videoSource={slide.videoSource}
              posterSource={slide.posterSource}
              isActive={index === activeSlide}
            />
          )
        })}
      </ScrollView>

      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View style={styles.dotContainer} key={index}>
            <Text
              key={index}
              style={index === activeSlide ? styles.activeDot : styles.dot}>
              •
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onStartNowPress}>
          <Text style={styles.buttonText}>Start Now</Text>
        </TouchableOpacity>
      </View>
      {/* </View> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
  },
  videoInner: {
    width: '100%',
    height: '100%',
  },
  scrollView: {
    // flex: 0.84, // of topContainer
    paddingTop: height * 0.01,
    width: width,
  },
  buttonContainer: {
    flex: 0.1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.03,
  },
  pagination: {
    flex: 0.06,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.01,
  },
  button: {
    width: width * 0.6,
    height: height * 0.07,
    backgroundColor: 'rgb(76, 175, 80)',
    paddingHorizontal: width * 0.05,
    marginBottom: height * 0.07,
    borderRadius: 30,
    elevation: 5, // for Android
    shadowOffset: {
      // for iOS
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25, // for iOS
    shadowRadius: 3.84, // for iOS
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    fontSize: RFPercentage(6.8),
    lineHeight: RFPercentage(6.8), // special handling for special character
    color: '#888',
    marginHorizontal: width * 0.02,
  },
  activeDot: {
    fontSize: RFPercentage(6.8),
    lineHeight: RFPercentage(6.8), // special handling for special character
    textAlignVertical: 'center',
    color: '#FFF',
    marginHorizontal: width * 0.02,
  },
  buttonText: {
    color: '#FFF',
    fontSize: RFPercentage(2.5),
    textAlign: 'center',
  },
})

export default OnboardingDeck
