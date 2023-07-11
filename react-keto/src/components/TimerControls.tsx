import React, { useState } from 'react'
import { FaVideo, FaTimes } from 'react-icons/fa'
import TimePickerModal from './TimePickerModal'
import rainSounds from '../model/data'
import Utils from '../utils/Utils'
import '../styles/CountdownTimer.css'

const secondOptions = Utils.selectionDropDownRange(0, 59).map(
  (second) => second.value
)

const minuteOptions = Utils.selectionDropDownRange(0, 59).map(
  (minute) => minute.value
)
const hourOptions = Utils.selectionDropDownRange(0, 23).map(
  (hour) => hour.value
)

interface TimerControlsProps {
  setTimerVisible: (timerVisible: boolean) => void
  hours: number
  setHours: (hours: number) => void
  minutes: number
  setMinutes: (minutes: number) => void
  seconds: number
  setSeconds: (seconds: number) => void
  playing: boolean
  togglePlayback: () => void
  intentionalVideoPlay: boolean
  setIntentionalVideoPlay: (intentionalVideoPlay: boolean) => void
  timerDialogBackgroundColor: string
  timerDialogFontColor: string
  songIndex: number
}

export type ChangeHandler = (value: {
  hours: number
  minutes: number
  seconds: number
}) => void

export default function TimerControls({
  setTimerVisible,
  hours,
  setHours,
  minutes,
  setMinutes,
  seconds,
  setSeconds,
  playing,
  togglePlayback,
  intentionalVideoPlay,
  setIntentionalVideoPlay,
  timerDialogBackgroundColor,
  timerDialogFontColor,
  songIndex,
}: TimerControlsProps) {
  const [modalVisible, setModalVisible] = useState(false)

  const handleChange: ChangeHandler = (value: {
    hours: number
    minutes: number
    seconds: number
  }) => {
    setHours(value.hours)
    setMinutes(value.minutes)
    setSeconds(value.seconds)
  }

  return (
    <div>
      <div>
        {/* <TimePickerModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          timerDialogBackgroundColor={timerDialogBackgroundColor}
          timerDialogFontColor={timerDialogFontColor}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
          // setHours={setHours}
          // setMinutes={setMinutes}
          // setSeconds={setSeconds}
          handleChange={handleChange}
          // hourOptions={hourOptions}
          // minuteOptions={minuteOptions}
          // secondOptions={secondOptions}
          playing={playing}
          togglePlayback={togglePlayback}
          setTimerVisible={setTimerVisible}
        /> */}
      </div>
      <div className="bottomContainer">
        <div className="pagination">
          {rainSounds.map((_, index) => (
            <p
              key={index}
              className={index === songIndex ? 'activeDot' : 'dot'}
            >
              •
            </p>
          ))}
        </div>
        <div className="bottomControls">
          <div style={{ width: window.innerWidth * 0.1 }}></div>
          <div style={{ width: window.innerWidth * 0.4, alignItems: 'center' }}>
            <button onClick={() => setModalVisible(true)}>
              <FaTimes size={90} color="#777777" />
            </button>
          </div>
          <div style={{ width: window.innerWidth * 0.4, alignItems: 'center' }}>
            <button
              onClick={() => setIntentionalVideoPlay(!intentionalVideoPlay)}
            >
              <FaVideo
                size={90}
                color={
                  intentionalVideoPlay
                    ? 'rgba(11, 57, 84, 0.75)'
                    : 'rgba(119, 119, 119, 0.75)'
                }
              />
            </button>
          </div>
          <div style={{ width: window.innerWidth * 0.1 }}></div>
        </div>
      </div>
    </div>
  )
}
