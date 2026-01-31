import React, {useState, useEffect, useRef} from 'react'
import {
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native'
import PagerView from 'react-native-pager-view'
import TimerControls from '../components/TimerControls'
import CountdownTimer from '../components/CountdownTimer'
import {Ionicons} from '@react-native-vector-icons/ionicons'
import {useSelector} from 'react-redux'
import {RFPercentage} from 'react-native-responsive-fontsize'
import BackgroundTimer from 'react-native-background-timer'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated'

import {useInstantPlayer} from '../hooks/useInstantPlayer'
import SlideItem from './SlideItem'

const {width, height} = Dimensions.get('window')

interface CategorySliderProps {
  data: any[]
  isActiveCategory: boolean
  title: string
  isPlaying: boolean
  onTogglePlay: (playing: boolean) => void
  showSwipeHint?: boolean
}

const CategorySlider = ({
  data,
  isActiveCategory,
  title,
  isPlaying,
  onTogglePlay,
  showSwipeHint = false,
}: CategorySliderProps) => {
  const [songIndex, setSongIndex] = useState(0)
  // @ts-ignore
  const downloadedFiles = useSelector(state => state.cache.downloadedFiles)
  const [intentionalVideoPlay, setIntentionalVideoPlay] = useState(true)

  // Timer State
  const [timerVisible, setTimerVisible] = useState(false)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  // Background Timer Ref
  const backgroundTimeoutRef = useRef<number | null>(null)

  const effectiveIsPlaying = isPlaying && isActiveCategory

  // Animation State
  const translateY = useSharedValue(0)
  const opacity = useSharedValue(0)

  const togglePlayback = (forcePlay = false) => {
    const newState = forcePlay ? true : !isPlaying
    onTogglePlay(newState)
    if (timerVisible && !newState) {
      setTimerVisible(false)
      setHours(0)
      setMinutes(0)
      setSeconds(0)
    }
  }

  useInstantPlayer(
    data[songIndex],
    effectiveIsPlaying,
    data[songIndex].volume || 1.0,
  )

  // --- Background timer logic ---
  useEffect(() => {
    if (backgroundTimeoutRef.current !== null) {
      BackgroundTimer.clearTimeout(backgroundTimeoutRef.current)
      backgroundTimeoutRef.current = null
    }

    if (timerVisible && effectiveIsPlaying) {
      const totalMilliseconds = (hours * 3600 + minutes * 60 + seconds) * 1000

      console.log(
        `[Timer] Starting background timer for: ${totalMilliseconds}ms`,
      )

      backgroundTimeoutRef.current = BackgroundTimer.setTimeout(() => {
        console.log('[Timer] Expired in background. Stopping.')
        togglePlayback(false)
      }, totalMilliseconds)
    }

    return () => {
      if (backgroundTimeoutRef.current !== null) {
        BackgroundTimer.clearTimeout(backgroundTimeoutRef.current)
      }
    }
  }, [timerVisible, effectiveIsPlaying, hours, minutes, seconds])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{translateY: translateY.value}],
  }))

  return (
    <View style={styles.container}>
      {/*Wrapper View:*/}
      <View style={styles.pagerWrapper}>
        <PagerView
          style={styles.pagerView}
          initialPage={0}
          orientation="horizontal"
          offscreenPageLimit={2}
          overScrollMode="never"
          onPageSelected={e => setSongIndex(e.nativeEvent.position)}>
          {data.map((item, index) => {
            if (Math.abs(songIndex - index) > 1) return <View key={index} />

            return (
              <View style={styles.page} key={index} collapsable={false}>
                <SlideItem
                  item={item}
                  index={index}
                  activeIndex={songIndex}
                  downloadedFiles={downloadedFiles}
                  isPlaying={effectiveIsPlaying}
                  intentionalVideoPlay={intentionalVideoPlay}
                />
              </View>
            )
          })}
        </PagerView>
      </View>

      {/* Controls Overlay */}
      <View style={styles.powerControls}>
        <TouchableOpacity
          style={styles.powerIcon}
          onPress={() => togglePlayback()}>
          <Ionicons
            name={title === 'Rain' ? 'water-outline' : 'power'}
            size={250}
            style={styles.powerIcon}
            color={
              title === 'Rain'
                ? effectiveIsPlaying
                  ? 'rgba(191, 215, 234, 0.75)'
                  : 'rgba(11, 57, 84, 1)'
                : effectiveIsPlaying
                ? 'rgba(11, 57, 84, 1)'
                : 'rgba(191, 215, 234, 0.75)'
            }
          />
        </TouchableOpacity>
      </View>

      <View style={styles.timerCountdown}>
        {timerVisible && (
          <CountdownTimer
            hours={hours}
            minutes={minutes}
            seconds={seconds}
            togglePlayback={togglePlayback}
            setTimerVisible={setTimerVisible}
            timerControlsFontColor={data[songIndex]?.timerControlsFontColor}
          />
        )}
      </View>

      {showSwipeHint && !effectiveIsPlaying && (
        <View style={styles.hintContainer} pointerEvents="none">
          <Animated.View style={animatedStyle}>
            <View style={styles.hintContent}>
              <Text style={styles.hintText}>SWIPE UP FOR FOCUS</Text>
              <Ionicons
                name="chevron-up"
                size={24}
                color="rgba(255,255,255,0.6)"
              />
            </View>
          </Animated.View>
        </View>
      )}

      <View style={styles.timerControls}>
        <TimerControls
          setTimerVisible={setTimerVisible}
          hours={hours}
          setHours={setHours}
          minutes={minutes}
          setMinutes={setMinutes}
          seconds={seconds}
          setSeconds={setSeconds}
          playing={effectiveIsPlaying}
          togglePlayback={togglePlayback}
          intentionalVideoPlay={intentionalVideoPlay}
          setIntentionalVideoPlay={setIntentionalVideoPlay}
          timerDialogBackgroundColor={
            data[songIndex]?.timerDialogBackgroundColor
          }
          timerDialogFontColor={data[songIndex]?.timerDialogFontColor}
          songIndex={songIndex}
          rainSounds={data}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  // enforce clipping
  pagerWrapper: {
    flex: 1,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  pagerView: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  page: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  timerCountdown: {
    flexBasis: '20%',
    marginBottom: height * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    bottom: '20%',
    right: 0,
  },
  timerControls: {
    flexBasis: '18%',
    marginBottom: height * 0.045,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
  },
  powerControls: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    marginRight: width * 0.2,
    marginLeft: width * 0.2,
    marginTop: height * 0.02,
    justifyContent: 'flex-start',
    alignItems: 'center',
    pointerEvents: 'box-none',
  },
  powerIcon: {
    opacity: 0.85,
    paddingTop: height * 0.02,
    height: '100%',
    borderRadius: 70,
  },
  hintContainer: {
    position: 'absolute',
    bottom: height * 0.25,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  hintContent: {
    alignItems: 'center',
    opacity: 0.8,
  },
  hintText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: RFPercentage(2.3),
    marginBottom: height * 0.02,
    letterSpacing: 2,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
})

export default CategorySlider
