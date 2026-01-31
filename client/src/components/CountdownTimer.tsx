import React from 'react'
import {Text, StyleSheet, Dimensions, View} from 'react-native'
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer'
import {Animated} from 'react-native'
import {RFPercentage} from 'react-native-responsive-fontsize'

const {width} = Dimensions.get('window')

interface CountdownTimerProps {
  hours: number
  minutes: number
  seconds: number
  togglePlayback: (fromModal: boolean) => void
  setTimerVisible: (timerVisible: boolean) => void
  timerControlsFontColor?: string
}

export default function CountdownTimer({
  hours,
  minutes,
  seconds,
  togglePlayback,
  setTimerVisible,
}: CountdownTimerProps) {
  const countDownInSecondsLocal = hours * 60 * 60 + minutes * 60 + seconds

  const formatRemainingTime = (countDownInSeconds: number) => {
    if (countDownInSeconds === 0) return '00:00'

    const h = Math.floor(countDownInSeconds / 3600)
    const m = Math.floor((countDownInSeconds % 3600) / 60)
    const s = countDownInSeconds % 60

    const mStr = m < 10 ? `0${m}` : m
    const sStr = s < 10 ? `0${s}` : s

    if (h > 0) {
      return `${h}:${mStr}:${sStr}`
    }
    return `${mStr}:${sStr}`
  }

  return (
    <View style={styles.container}>
      <CountdownCircleTimer
        isPlaying
        duration={countDownInSecondsLocal}
        initialRemainingTime={countDownInSecondsLocal} // Fixes initial jump
        size={width * 0.45}
        strokeWidth={6}
        trailStrokeWidth={6} // Match stroke width
        trailColor="rgba(255, 255, 255, 0.2)" // Subtle glass effect
        colors={['#A0E7E5', '#B4F8C8', '#FBE7C6']} // Calming Gradient (Cyan -> Green -> Sand)
        colorsTime={[countDownInSecondsLocal, countDownInSecondsLocal / 2, 0]}
        onComplete={() => {
          togglePlayback(false)
          setTimerVisible(false)
          return {shouldRepeat: false}
        }}>
        {({remainingTime, animatedColor}) => (
          <Animated.Text style={[styles.text, {color: animatedColor}]}>
            {formatRemainingTime(remainingTime)}
          </Animated.Text>
        )}
      </CountdownCircleTimer>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: RFPercentage(5),
    fontWeight: '300',
    fontVariant: ['tabular-nums'], // Keeps numbers from jumping width
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 10,
  },
})
