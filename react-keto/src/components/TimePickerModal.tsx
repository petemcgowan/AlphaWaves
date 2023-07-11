import React, { useState } from 'react'
import Modal from 'react-modal'
import TimePicker from 'react-ios-time-picker'
import { ChangeHandler } from './CountdownTimer'

Modal.setAppElement('#root') // Specify the app root element for accessibility

interface TimerPickerModalProps {
  modalVisible: boolean
  setModalVisible: (modalVisible: boolean) => void
  timerDialogBackgroundColor: string
  timerDialogFontColor: string
  hours: number
  minutes: number
  seconds: number
  handleChange: ChangeHandler
  // setHours: (hours: number) => void
  // setMinutes: (minutes: number) => void
  // setSeconds: (seconds: number) => void
  playing: boolean
  togglePlayback: () => void
  setTimerVisible: (timerVisible: boolean) => void
  // intentionalVideoPlay: boolean
  // setIntentionalVideoPlay: (intentionalVideoPlay: boolean) => void
  // songIndex: number
}

const TimePickerModal = ({
  modalVisible,
  setModalVisible,
  timerDialogBackgroundColor,
  timerDialogFontColor,
  hours,
  minutes,
  seconds,
  // setHours,
  // setMinutes,
  // setSeconds,
  handleChange,
  // hourOptions,
  // minuteOptions,
  // secondOptions,
  playing,
  togglePlayback,
  setTimerVisible,
}: TimerPickerModalProps) => {
  const [modalOpen, setModalOpen] = useState(false)

  const closeModal = () => {
    setModalVisible(false)
  }

  const confirmModal = () => {
    if (hours === 0 && minutes === 0 && seconds === 0) {
      setModalVisible(false)
      return
    }
    setModalVisible(!modalVisible)
    setTimerVisible(true)
    if (!playing) {
      togglePlayback()
    }
  }

  // const handleChange = (timeValue) => {
  //   setHours(timeValue.getHours())
  //   setMinutes(timeValue.getMinutes())
  //   setSeconds(timeValue.getSeconds())
  // }

  // const confirmModal = () => {
  //   // Handle confirm button click
  // }

  return (
    <div>
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <div className="modalView">
          <TimePicker
            textColor="#777777"
            value={{ hours, minutes, seconds }}
            onChange={handleChange}
          />

          <div className="modalBottomButtons">
            <button
              className="button"
              style={{ backgroundColor: '#777777' }}
              onClick={closeModal}
            >
              Back
            </button>
            <button
              className="button"
              style={{ backgroundColor: '#777777' }}
              onClick={confirmModal}
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default TimePickerModal
