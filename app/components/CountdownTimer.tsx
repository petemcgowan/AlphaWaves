import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { Animated } from 'react-native'

interface CountdownTimerProps {
  hours: number
  minutes: number
  seconds: number
  togglePlayback: () => void
  setTimerVisible: (timerVisible: boolean) => void
  timerControlsFontColor: string
}

export default function CountdownTimer({
  hours,
  minutes,
  seconds,
  togglePlayback,
  setTimerVisible,
  timerControlsFontColor,
}: CountdownTimerProps) {
  const countDownInSecondsLocal = hours * 60 * 60 + minutes * 60 + seconds

  const formatRemainingTime = (countDownInSeconds: number) => {
    if (countDownInSecondsLocal === countDownInSeconds) {
      return // no need to reformat
    }

    if (countDownInSeconds === 0) {
      return '00:00'
    }

    const hoursMethod2 = Math.floor(countDownInSeconds / 3600)
    const minutesMethod2 = Math.floor((countDownInSeconds % 3600) / 60)
    const secondsMethod2 = countDownInSeconds % 60

    let secondString = String(secondsMethod2)
    if (secondsMethod2 < 10) {
      secondString = `0${secondsMethod2}`
    } else {
      secondString = String(secondsMethod2)
    }
    let minuteString = String(minutesMethod2)
    if (minutesMethod2 < 10) {
      minuteString = `0${minutesMethod2}`
    } else {
      minuteString = String(minutesMethod2)
    }

    // return `${minutes}:${seconds}`;
    return `${hoursMethod2}:${minuteString}:${secondString}`
  }

  return (
    <CountdownCircleTimer
      isPlaying
      duration={countDownInSecondsLocal}
      size={165}
      updateInterval={0.1}
      strokeWidth={9}
      colors={[
        '#9CDE9F',
        '#D1F5BE',
        '#3C91E6',
        '#9FD356',
        '#342E37',
        '#AB814A',
        '#FA824C',
        '#4B3B40',
        '#82735C',
        '#9DB17C',
      ]}
      colorsTime={[
        countDownInSecondsLocal,
        (countDownInSecondsLocal / 9) * 8,
        (countDownInSecondsLocal / 9) * 7,
        (countDownInSecondsLocal / 9) * 6,
        (countDownInSecondsLocal / 9) * 5,
        (countDownInSecondsLocal / 9) * 4,
        (countDownInSecondsLocal / 9) * 3,
        (countDownInSecondsLocal / 9) * 2,
        (countDownInSecondsLocal / 9) * 1,
        0,
      ]}
      onComplete={() => {
        togglePlayback()
        setTimerVisible(false)
        return [true, 0]
      }}
    >
      {({ remainingTime, animatedColor }) => (
        <Animated.Text style={{ color: animatedColor }}>
          <Text style={[styles.text, { color: timerControlsFontColor }]}>
            {formatRemainingTime(remainingTime)}
          </Text>
        </Animated.Text>
      )}
    </CountdownCircleTimer>
  )
}

const styles = StyleSheet.create({
  timerTextContainer: {
    margin: 3,
  },
  timer: {
    alignItems: 'center',
  },
  text: {
    fontSize: 31,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
