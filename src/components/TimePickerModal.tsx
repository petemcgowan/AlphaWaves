import React from 'react'
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  Platform,
} from 'react-native'
import { TimePicker } from 'react-native-simple-time-picker'
import { Picker, PickerColumn, PickerItem } from 'react-native-picky'

const TimePickerModal = ({
  modalVisible,
  setModalVisible,
  timerDialogBackgroundColor,
  timerDialogFontColor,
  hours,
  minutes,
  seconds,
  setHours,
  setMinutes,
  setSeconds,
  handleChange,
  hourOptions,
  minuteOptions,
  secondOptions,
  playing,
  togglePlayback,
  setTimerVisible,
}) => {
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

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <View>
        <View
          style={[
            styles.modalView,
            { backgroundColor: timerDialogBackgroundColor },
          ]}
        >
          {Platform.OS === 'ios' && (
            <TimePicker
              textColor={timerDialogFontColor}
              value={{ hours, minutes, seconds }}
              onChange={handleChange}
              pickerShows={['hours', 'minutes', 'seconds']}
            />
          )}
          {Platform.OS === 'android' && (
            <Picker textColor={timerDialogFontColor} textSize={60}>
              <PickerColumn
                selectedValue={hours}
                onChange={(event) => setHours(+event.value.toString())}
              >
                {hourOptions.map((hourValue) => (
                  <PickerItem
                    label={hourValue.toString()}
                    value={hourValue.toString()}
                    key={hourValue}
                  />
                ))}
              </PickerColumn>
              <PickerColumn
                selectedValue={minutes}
                onChange={(event) => setMinutes(+event.value.toString())}
              >
                {minuteOptions.map((minuteValue) => (
                  <PickerItem
                    label={minuteValue.toString()}
                    value={minuteValue.toString()}
                    key={minuteValue}
                  />
                ))}
              </PickerColumn>
              <PickerColumn
                selectedValue={seconds}
                onChange={(event) => setSeconds(+event.value.toString())}
              >
                {secondOptions.map((secondValue) => (
                  <PickerItem
                    label={secondValue.toString()}
                    value={secondValue.toString()}
                    key={secondValue}
                  />
                ))}
              </PickerColumn>
            </Picker>
          )}
          <View style={styles.modalBottomButtons}>
            <Pressable
              style={[
                styles.button,
                {
                  backgroundColor: timerDialogFontColor,
                },
              ]}
              onPress={closeModal}
            >
              <Text style={styles.textStyle}>Back</Text>
            </Pressable>
            <Pressable
              style={[
                styles.button,
                {
                  backgroundColor: timerDialogFontColor,
                },
              ]}
              onPress={confirmModal}
            >
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
  button: {
    width: '50%',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  modalBottomButtons: {
    flexDirection: 'row',
    width: '100%',
  },
  textStyle: {
    color: '#777777',
    textAlign: 'center',
    fontSize: 22,
  },
  modalView: {
    marginTop: 80,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
})
