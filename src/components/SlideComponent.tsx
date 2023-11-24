import React, { useRef } from 'react'
import { View, Text, Dimensions, StyleSheet, Image } from 'react-native'
import Video from 'react-native-video'
import { RFPercentage } from 'react-native-responsive-fontsize'

const { width, height } = Dimensions.get('window')

export interface SlideComponentProps {
  type: string
  title: string
  description1: string
  description2: string
  image: string
  videoLink: string
  hasSeenIntro: boolean
}

const SlideComponent = ({
  type,
  title,
  description1,
  description2,
  image,
  videoLink,
  hasSeenIntro,
}: SlideComponentProps) => {
  const dominantColor = 'rgb(38, 27, 21)' // Dominant colour of image
  const videoRef = useRef(null)

  return (
    <View style={styles.slideContainer}>
      {image && (
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={image} resizeMode="contain" />
        </View>
      )}
      <View style={styles.titleBox}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.textBox1}>
        <Text style={styles.text}>{description1}</Text>
      </View>
      <View style={styles.textBox2}>
        <Text style={styles.text}>{description2}</Text>
      </View>
    </View>
  )
}

export default SlideComponent

const styles = StyleSheet.create({
  slideContainer: {
    width: width,
    paddingTop: 10,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  imageContainer: {
    // flex: 0.7, // of slideContainer
    width: width,
    height: height * 0.5,
    alignSelf: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  titleBox: {
    // flex: 0.08, // of slideContainer
  },
  textBox1: {
    // flex: 0.11, // of slideContainer
    paddingHorizontal: 5,
    // flexShrink: 1,
    alignItems: 'center',
  },
  textBox2: {
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'flex-end', // so the text flows to the bottom
    marginBottom: 10,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    // fontSize: 20,
    fontSize: RFPercentage(2.6),
    justifyContent: 'center',
  },
  titleText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    // fontSize: 18,
    fontSize: RFPercentage(3.2),
    justifyContent: 'center',
    marginBottom: 10,
  },
})
