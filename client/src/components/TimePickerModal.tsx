import React from 'react'
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native'
import {RFPercentage} from 'react-native-responsive-fontsize'
import {ScrollPicker} from './ScrollPicker'

const {width, height} = Dimensions.get('window')

// Helper to generate arrays [0...N]
const generateRange = (max: number) => Array.from({length: max}, (_, i) => i)

interface TimePickerModalProps {
  modalVisible: boolean
  setModalVisible: (v: boolean) => void
  timerDialogBackgroundColor: string
  timerDialogFontColor: string
  hours: number
  minutes: number
  seconds: number
  setHours: (v: number) => void
  setMinutes: (v: number) => void
  setSeconds: (v: number) => void
  playing: boolean
  togglePlayback: (force?: boolean) => void
  setTimerVisible: (v: boolean) => void
}

const TimePickerModal = ({
  modalVisible,
  setModalVisible,
  timerDialogBackgroundColor = '#222',
  timerDialogFontColor = '#fff',
  hours,
  minutes,
  seconds,
  setHours,
  setMinutes,
  setSeconds,
  playing,
  togglePlayback,
  setTimerVisible,
}: TimePickerModalProps) => {
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
      togglePlayback(true)
    }
  }

  // Generate data arrays
  const hourOptions = generateRange(24)
  const minuteOptions = generateRange(60)
  const secondOptions = generateRange(60)

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}>
      <View style={styles.centeredView}>
        <View
          style={[
            styles.modalView,
            {backgroundColor: timerDialogBackgroundColor},
          ]}>
          {/* Header Labels (Optional, mimics spindle headers) */}
          <View style={styles.headerRow}>
            <Text style={[styles.label, {color: timerDialogFontColor}]}>
              Hr
            </Text>
            <Text style={[styles.label, {color: timerDialogFontColor}]}>
              Min
            </Text>
            <Text style={[styles.label, {color: timerDialogFontColor}]}>
              Sec
            </Text>
          </View>

          {/* The Spinners */}
          <View style={styles.pickerContainer}>
            <ScrollPicker
              items={hourOptions}
              selectedValue={hours}
              onValueChange={setHours}
              textColor={timerDialogFontColor}
            />
            <ScrollPicker
              items={minuteOptions}
              selectedValue={minutes}
              onValueChange={setMinutes}
              textColor={timerDialogFontColor}
            />
            <ScrollPicker
              items={secondOptions}
              selectedValue={seconds}
              onValueChange={setSeconds}
              textColor={timerDialogFontColor}
            />
          </View>

          {/* Buttons */}
          <View style={styles.modalBottomButtons}>
            <Pressable
              style={[styles.button, {backgroundColor: '#fff'}]}
              onPress={closeModal}>
              <Text style={styles.textStyle}>Back</Text>
            </Pressable>
            <Pressable
              style={[styles.button, {backgroundColor: '#fff'}]}
              onPress={confirmModal}>
              <Text style={styles.textStyle}>Confirm</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default TimePickerModal

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)', // Dim background
  },
  modalView: {
    width: width * 0.9,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 25,
    marginTop: 10,
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 35,
    marginBottom: 5,
  },
  label: {
    fontSize: RFPercentage(2.0),
    opacity: 0.7,
    fontWeight: 'bold',
  },
  modalBottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
  },
  button: {
    flex: 1,
    borderRadius: 10,
    padding: 12,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: RFPercentage(2.1),
  },
})
