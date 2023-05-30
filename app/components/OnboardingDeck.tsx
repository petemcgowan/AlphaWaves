import React, { useState, useEffect } from 'react'
import {
  ScrollView,
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Slide1 from '../screens/Slide1'
import Slide2 from '../screens/Slide2'

const { width, height } = Dimensions.get('window')
const slides = [Slide1, Slide2]

const Slider = () => {
  const [activeSlide, setActiveSlide] = useState(0)
  const navigation = useNavigation()

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
    navigation.navigate('SliderDeck')
  }

  const onLinkPress = () => {
    console.log('LinkPress')
  }

  useEffect(() => {}, [])

  return (
    <View style={styles.container}>
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

      <TouchableOpacity style={styles.button} onPress={onStartNowPress}>
        <Text style={styles.buttonText}>Start Now</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.link} onPress={onLinkPress}>
        <Text style={styles.linkText}>Your Link Text Here</Text>
      </TouchableOpacity>
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
})

export default Slider
