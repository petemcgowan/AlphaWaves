import React, { useState, useEffect } from 'react'
import {
  ScrollView,
  Dimensions,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
// import Slide1 from './Slide1'
// import Slide2 from './Slide2'
// import Slide3 from './Slide3'
import { State } from '../redux/index'
import { useSelector } from 'react-redux'
import SlideComponent, {
  SlideComponentProps,
} from '../components/SlideComponent'
import { RFPercentage } from 'react-native-responsive-fontsize'

const rain_falling_brain_alpha_waves_energy = require('../../assets/images/rain_falling_brain_alpha_waves_energy.png')
const productivity_replenishing_sleep_cleansing_rain_calming = require('../../assets/images/productivity_replenishing_sleep_cleansing_rain_calming.png')
const surreal_sand_timer = require('../../assets/images/surreal_sand_timer.png')

const { width, height } = Dimensions.get('window')
// const slides = [Slide1, Slide2, Slide3]

// const slides = []

export type Slide = {
  component: React.ComponentType<SlideComponentProps>
  title: string
  type: 'image' // you can expand this with other types if needed
  description: string
  image: any // replace with the correct type if you know it
  videoLink: string | null
  color: string
}

const slides = [
  {
    component: SlideComponent,
    title: 'Welcome to Alpha Waves',
    type: 'image',
    description1: `Alpha waves, ranging from 8 to 12 Hz, are produced by our brain in a relaxed, meditative state.\n`,
    description2: `A lack of these waves indicates we're not fully at ease.`,
    image: rain_falling_brain_alpha_waves_energy,
    videoLink: null,
    color: 'rgb(38, 27, 21)',
  },
  {
    // through activities like meditation
    component: SlideComponent,
    title: 'Alpha Waves Benefits',
    type: 'image',
    description1: `Boosting alpha waves can enhance your creativity, reduce stress, and promote calmness.\n`,
    description2: `An imbalance of these waves is often linked to depression.`,
    image: productivity_replenishing_sleep_cleansing_rain_calming,
    videoLink: null,
    color: 'rgb(9, 21, 39)',
  },
  {
    component: SlideComponent,
    title: 'Timer for Sleep',
    type: 'image',
    description1: `Use the built-in timer to control the duration of alpha wave sounds.\n`,
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
  // const slideColors = ['rgb(38, 27, 21)', 'rgb(25, 26, 29)', 'rgb(9, 21, 39)']
  // const hasSeenIntro = useSelector((state: State) => state.hasSeenIntro)
  const hasSeenIntro = false

  const onScroll = (event: any) => {
    const slide = Math.ceil(
      event.nativeEvent.contentOffset.x /
        event.nativeEvent.layoutMeasurement.width
    )
    if (slide !== activeSlide) {
      setActiveSlide(slide)

      console.log('activeSlide:' + activeSlide + ', slide:' + slide)
      console.log('slides.length:' + slides.length)
      if (slide > slides.length - 1) {
        console.log('Slides end reached')
      } else {
        setBackgroundColor(slides[slide].color) // Set the background color when the slide changes
        console.log('slides[slide].color:' + slides[slide].color)
      }
    }
  }

  const onStartNowPress = () => {
    navigation.navigate('RainSlider')
  }

  useEffect(() => {}, [])

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: backgroundColor }]}
    >
      {/* <View style={styles.topContainer}> */}
      <ScrollView
        horizontal
        pagingEnabled
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
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
              videoLink={slide.videoLink}
              hasSeenIntro={hasSeenIntro}
            />
          )
        })}
      </ScrollView>

      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View style={styles.dotContainer} key={index}>
            <Text
              key={index}
              style={index === activeSlide ? styles.activeDot : styles.dot}
            >
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
  scrollView: {
    flex: 0.84, // of topContainer
    paddingTop: 20,
  },
  buttonContainer: {
    flex: 0.1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pagination: {
    flex: 0.06,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  button: {
    width: width * 0.65,
    height: height * 0.07,
    backgroundColor: 'rgb(255, 165, 0)',
    paddingHorizontal: 10,
    marginBottom: 30,
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
    fontSize: RFPercentage(6.2),
    lineHeight: RFPercentage(6.2), // special handling for special character
    color: '#888',
    marginHorizontal: 11,
  },
  activeDot: {
    fontSize: RFPercentage(6.8),
    lineHeight: RFPercentage(6.8), // special handling for special character
    textAlignVertical: 'center',
    color: '#FFF',
    marginHorizontal: 11,
  },
  buttonText: {
    color: '#FFF',
    fontSize: RFPercentage(2.7),
  },
})

export default OnboardingDeck
