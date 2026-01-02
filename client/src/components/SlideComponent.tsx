import React, {useState, useRef, useEffect} from 'react'
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native'
import Video, {ResizeMode} from 'react-native-video'
import {RFPercentage} from 'react-native-responsive-fontsize'

const {width, height} = Dimensions.get('window')

export interface SlideComponentProps {
  type: string
  title: string
  description1: string
  description2: string
  image: string
  videoSource?: {uri: string}
  posterSource?: any
  isActive?: boolean
}

const SlideComponent = ({
  type,
  title,
  description1,
  description2,
  image,
  videoSource,
  posterSource,
  isActive = true,
}: SlideComponentProps) => {
  const [isVideoReady, setIsVideoReady] = useState(false)
  const videoRef = useRef<Video>(null)

  // Reset ready state when swiping away
  useEffect(() => {
    if (!isActive) {
      setIsVideoReady(false)
    }
  }, [isActive])

  console.log('Intro videoSource:', videoSource)
  console.log('Intro isVideoReady:', isVideoReady)
  console.log('Intro isActive:', isActive)

  return (
    <View style={styles.slideContainer}>
      <View style={styles.mediaSection}>
        <View style={styles.mediaWrapper}>
          {/* CASE A: STATIC IMAGE */}
          {type === 'image' && image && (
            <Image style={styles.image} source={image} resizeMode="contain" />
          )}

          {/* CASE B: VIDEO WITH POSTER */}
          {type === 'video' && videoSource && (
            <View style={styles.videoInner}>
              {/* 2. THE VIDEO (Top Layer) */}
              {isActive && (
                <Video
                  ref={videoRef}
                  source={videoSource}
                  // FORCE Aspect Ratio to prevent "Square" flash on Android
                  style={[
                    styles.fullScreen,
                    {
                      opacity: isVideoReady ? 1 : 0,
                      aspectRatio: 9 / 16, // Forces Vertical shape immediately
                    },
                  ]}
                  onError={e => console.log('Video Error:', e)}
                  resizeMode={ResizeMode.CONTAIN}
                  muted={true}
                  repeat={true}
                  paused={!isActive}
                  playInBackground={false}
                  playWhenInactive={false}
                  ignoreSilentSwitch="ignore"
                  // Reveal video only when fully rendered
                  onReadyForDisplay={() => setIsVideoReady(true)}
                />
              )}
            </View>
          )}
        </View>
      </View>

      <View style={styles.textSection}>
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
    </View>
  )
}

export default SlideComponent

const styles = StyleSheet.create({
  slideContainer: {
    width: width,
    height: '100%',
    alignItems: 'center',
    paddingTop: height * 0.01,
  },
  mediaSection: {
    flex: 0.7,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: width * 0.01,
  },
  textSection: {
    flex: 0.3,
    alignItems: 'center',
    paddingHorizontal: width * 0.01,
  },
  mediaWrapper: {
    width: '95%',
    height: '100%',
    overflow: 'hidden',
    justifyContent: 'center', // Centers content if aspect ratios differ
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  videoInner: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Unified style for Video and Poster to ensure perfect overlap
  fullScreen: {
    width: '100%',
    height: '100%',
    position: 'absolute', // Ensures they stack on top of each other
  },
  titleBox: {marginTop: height * 0.02, marginBottom: height * 0.01},
  titleText: {
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  textBox1: {marginTop: height * 0.01},
  textBox2: {marginVertical: height * 0.02},
  textBox: {
    width: '90%',
    alignItems: 'center',
  },
  text: {
    fontSize: RFPercentage(2.1),
    color: '#ccc',
    textAlign: 'center',
  },
})
