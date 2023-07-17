import React, { useEffect, useState } from 'react'
import '../styles/CountdownTimer.css'

interface CountdownTimerProps {
  hours: number
  minutes: number
  seconds: number
  togglePlayback: () => void
  timerControlsFontColor: string
  tsModalVisible: boolean
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  hours,
  minutes,
  seconds,
  togglePlayback,
  timerControlsFontColor,
  tsModalVisible,
}) => {
  const initialCount = hours * 3600 + minutes * 60 + seconds
  const [count, setCount] = useState(initialCount)

  useEffect(() => {
    const timerId = setInterval(() => {
      setCount((currentCount) => currentCount - 1)
    }, 1000)

    return () => clearInterval(timerId)
  }, [])

  useEffect(() => {
    if (count === 0) {
      togglePlayback()
    }
  }, [count])

  const formatRemainingTime = (countDownInSeconds: number) => {
    const hours = Math.floor(countDownInSeconds / 3600)
    const minutes = Math.floor((countDownInSeconds % 3600) / 60)
    const seconds = countDownInSeconds % 60

    const hoursStr = hours.toString().padStart(2, '0')
    const minutesStr = minutes.toString().padStart(2, '0')
    const secondsStr = seconds.toString().padStart(2, '0')

    return `${hoursStr}:${minutesStr}:${secondsStr}`
  }

  return (
    <div className="countdown-timer">
      <div className="timer-wrapper">
        <div className="timer">
          <p className="timer-text" style={{ color: timerControlsFontColor }}>
            {formatRemainingTime(count)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CountdownTimer
