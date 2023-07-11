import React from 'react'
import '../styles/CountdownTimer.css'

interface CountdownTimerProps {
  hours: number
  minutes: number
  seconds: number
  togglePlayback: () => void
  setTimerVisible: (timerVisible: boolean) => void
  timerControlsFontColor: string
}

export type ChangeHandler = (value: {
  hours: number
  minutes: number
  seconds: number
}) => void

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  hours,
  minutes,
  seconds,
  togglePlayback,
  setTimerVisible,
  timerControlsFontColor,
}) => {
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
    <div className="countdown-timer">
      <div className="timer-wrapper">
        <div className="timer">
          <p className="timer-text" style={{ color: timerControlsFontColor }}>
            {formatRemainingTime(countDownInSecondsLocal)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CountdownTimer
