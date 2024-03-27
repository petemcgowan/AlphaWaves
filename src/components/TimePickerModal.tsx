import React from 'react';
import {Modal, View, Text, Pressable, StyleSheet, Platform, Dimensions} from 'react-native';
import {TimePicker} from 'react-native-simple-time-picker';
import {Picker, PickerColumn, PickerItem} from 'react-native-picky';
import {RFPercentage} from 'react-native-responsive-fontsize';

const {width, height} = Dimensions.get('window');

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
    setModalVisible(false);
  };

  const confirmModal = () => {
    if (hours === 0 && minutes === 0 && seconds === 0) {
      setModalVisible(false);
      return;
    }
    setModalVisible(!modalVisible);
    setTimerVisible(true);
    if (!playing) {
      togglePlayback(true);
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={closeModal}>
      <View>
        <View style={[styles.modalView, {backgroundColor: timerDialogBackgroundColor}]}>
          {Platform.OS === 'ios' && (
            <TimePicker
              textColor={timerDialogFontColor}
              value={{hours, minutes, seconds}}
              onChange={handleChange}
              pickerShows={['hours', 'minutes', 'seconds']}
            />
          )}
          {Platform.OS === 'android' && (
            <Picker textColor={timerDialogFontColor} textSize={width * 0.09}>
              <PickerColumn selectedValue={hours} onChange={event => setHours(+event.value.toString())}>
                {hourOptions.map(hourValue => (
                  <PickerItem label={hourValue.toString()} value={hourValue.toString()} key={hourValue} />
                ))}
              </PickerColumn>
              <PickerColumn selectedValue={minutes} onChange={event => setMinutes(+event.value.toString())}>
                {minuteOptions.map(minuteValue => (
                  <PickerItem label={minuteValue.toString()} value={minuteValue.toString()} key={minuteValue} />
                ))}
              </PickerColumn>
              <PickerColumn selectedValue={seconds} onChange={event => setSeconds(+event.value.toString())}>
                {secondOptions.map(secondValue => (
                  <PickerItem label={secondValue.toString()} value={secondValue.toString()} key={secondValue} />
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
              onPress={closeModal}>
              <Text style={styles.textStyle}>Back</Text>
            </Pressable>
            <Pressable
              style={[
                styles.button,
                {
                  backgroundColor: timerDialogFontColor,
                },
              ]}
              onPress={confirmModal}>
              <Text style={styles.textStyle}>Confirm</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TimePickerModal;

const styles = StyleSheet.create({
  button: {
    width: '50%',
    borderRadius: 10,
    padding: width * 0.03,
    elevation: 2,
  },
  modalBottomButtons: {
    flexDirection: 'row',
    width: '100%',
  },
  textStyle: {
    color: '#777777',
    textAlign: 'center',
    fontSize: RFPercentage(2.85),
  },
  modalView: {
    marginTop: height * 0.1,
    borderRadius: 20,
    padding: height * 0.02,
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
});
