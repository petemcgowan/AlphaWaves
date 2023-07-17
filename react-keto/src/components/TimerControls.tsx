import React, { useState } from 'react'
import { FaClock, FaVideo } from 'react-icons/fa'
import rainSounds from '../model/data'
import '../styles/TimerControls.css'
import TouchstripDialog from './TouchstripDialog'

interface TimerControlsProps {
  setTimerVisible: React.Dispatch<React.SetStateAction<boolean>>
  tsModalVisible: boolean
  setTsModalVisible: (tsModalVisible: boolean) => void
  hours: number
  setHours: React.Dispatch<React.SetStateAction<number>>
  minutes: number
  setMinutes: React.Dispatch<React.SetStateAction<number>>
  seconds: number
  setSeconds: React.Dispatch<React.SetStateAction<number>>
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
  tsModalVisible,
  setTsModalVisible,
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
  const handleConfirm = () => {
    console.log('handleConfirm, Selected Hours:', hours)
    console.log('handleConfirm, Selected Minutes:', minutes)
    console.log('handleConfirm, Selected Seconds:', seconds)
    setTsModalVisible(false)

    setTimerVisible(true)
    if (!playing) {
      togglePlayback()
    }
  }

  const handleTsCloseModal = () => {
    setTsModalVisible(false)
  }

  const clickTimerButton = () => {
    setTsModalVisible(true)
  }

  return (
    <div>
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '10vw',
          height: '10vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {tsModalVisible && (
          <TouchstripDialog
            onCancel={handleTsCloseModal}
            handleConfirm={handleConfirm}
            selectedHours={hours}
            setSelectedHours={setHours}
            selectedMinutes={minutes}
            setSelectedMinutes={setMinutes}
            selectedSeconds={seconds}
            setSelectedSeconds={setSeconds}
          />
        )}
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
            <button className="timerControlButton" onClick={clickTimerButton}>
              <FaClock
                size={90}
                color="#777777"
                className="timerControlButton"
              />
            </button>
          </div>
          <div style={{ width: window.innerWidth * 0.4, alignItems: 'center' }}>
            <button
              className="timerControlButton"
              onClick={() => setIntentionalVideoPlay(!intentionalVideoPlay)}
            >
              <FaVideo
                size={90}
                className="timerControlButton"
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
