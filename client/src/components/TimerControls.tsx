import React, {useState} from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import {Ionicons} from '@react-native-vector-icons/ionicons'
import {SafeAreaView} from 'react-native-safe-area-context'
import Utils from './Utils'
import TimePickerModal from './TimePickerModal'
import {RainSound} from '../types/RainSound'
import {RFPercentage} from 'react-native-responsive-fontsize'

const {width} = Dimensions.get('window')

const secondOptions = Utils.selectionDropDownRange(0, 59).map(
  second => second.value,
)

const minuteOptions = Utils.selectionDropDownRange(0, 59).map(
  minute => minute.value,
)
const hourOptions = Utils.selectionDropDownRange(0, 23).map(hour => hour.value)

interface TimerControlsProps {
  setTimerVisible: (timerVisible: boolean) => void
  hours: number
  setHours: (hours: number) => void
  minutes: number
  setMinutes: (minutes: number) => void
  seconds: number
  setSeconds: (seconds: number) => void
  playing: boolean
  togglePlayback: (fromModal: boolean) => void
  intentionalVideoPlay: boolean
  setIntentionalVideoPlay: (intentionalVideoPlay: boolean) => void
  timerDialogBackgroundColor: string
  timerDialogFontColor: string
  songIndex: number
  rainSounds: RainSound[]
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
  rainSounds,
}: TimerControlsProps) {
  const [modalVisible, setModalVisible] = useState(false)

  const handleChange: ChangeHandler = (value: {
    hours: number | string
    minutes: number | string
    seconds: number | string
  }) => {
    // TimePicker changes the type depending on whether it was last used or not 😳
    setHours(
      typeof value.hours === 'string' ? parseInt(value.hours, 10) : value.hours,
    )
    setMinutes(
      typeof value.minutes === 'string'
        ? parseInt(value.minutes, 10)
        : value.minutes,
    )
    setSeconds(
      typeof value.seconds === 'string'
        ? parseInt(value.seconds, 10)
        : value.seconds,
    )
  }

  return (
    <View>
      <SafeAreaView>
        <TimePickerModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          timerDialogBackgroundColor={timerDialogBackgroundColor}
          timerDialogFontColor={timerDialogFontColor}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
          setHours={setHours}
          setMinutes={setMinutes}
          setSeconds={setSeconds}
          handleChange={handleChange}
          hourOptions={hourOptions}
          minuteOptions={minuteOptions}
          secondOptions={secondOptions}
          playing={playing}
          togglePlayback={togglePlayback}
          setTimerVisible={setTimerVisible}
        />
      </SafeAreaView>
      <View style={styles.bottomContainer}>
        <View style={styles.pagination}>
          {rainSounds.map((_, index) => (
            <Text
              key={index}
              style={index === songIndex ? styles.activeDot : styles.dot}>
              •
            </Text>
          ))}
        </View>
        <View style={styles.bottomControls}>
          <View style={{width: width * 0.1}}></View>
          <View
            style={{
              width: width * 0.4,
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Ionicons
                name="timer-outline"
                size={90}
                color={timerDialogBackgroundColor}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: width * 0.4,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => setIntentionalVideoPlay(!intentionalVideoPlay)}>
              <Ionicons
                name="videocam-outline"
                size={90}
                color={
                  intentionalVideoPlay
                    ? // ? 'rgba(11, 57, 84, 0.75)'
                      timerDialogBackgroundColor
                    : 'rgba(119, 119, 119, 0.75)'
                }
              />
            </TouchableOpacity>
          </View>
          <View style={{width: width * 0.1}}></View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bottomContainer: {
    borderTopColor: '#393E46',
    borderTopWidth: 1,
    width: width,
    alignItems: 'center',
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '80%',
  },
  dot: {
    fontSize: RFPercentage(6.8),
    color: '#888',
    marginHorizontal: width * 0.02,
  },
  activeDot: {
    fontSize: RFPercentage(6.8),
    color: '#FFF',
    marginHorizontal: width * 0.02,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
