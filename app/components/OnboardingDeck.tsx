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
import Slide1 from '../screens/Slide1'
import Slide2 from '../screens/Slide2'
import Slide3 from '../screens/Slide3'

const { width, height } = Dimensions.get('window')
const slides = [Slide1, Slide2, Slide3]

const Slider = () => {
  const [activeSlide, setActiveSlide] = useState(0)
  const navigation = useNavigation()
  const [backgroundColor, setBackgroundColor] = useState('#000')
  const slideColors = ['rgb(38, 27, 21)', 'rgb(25, 26, 29)', 'rgb(9, 21, 39)']

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
        setBackgroundColor(slideColors[slide]) // Set the background color when the slide changes
        console.log(slideColors[slide])
      }
    }
  }

  const onStartNowPress = () => {
    navigation.navigate('RainSlider')
  }

  const onLinkPress = () => {
    console.log('LinkPress')
  }

  useEffect(() => {}, [])

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: backgroundColor }]}
    >
      <ScrollView
        horizontal
        pagingEnabled
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {slides.map((SlideComponent, index) => (
          <SlideComponent key={index} />
        ))}
      </ScrollView>

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

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.button} onPress={onStartNowPress}>
          <Text style={styles.buttonText}>Start Now</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.link} onPress={onLinkPress}>
          <Text style={styles.linkText}>Your Link Text Here</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 0.55,
    paddingTop: 20,
  },
  imageBox: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: height * 0.3 + 10,
    justifyContent: 'center',
    alignItems: 'center',
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
  buttonContainer: {
    flex: 0.15,
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Slider
