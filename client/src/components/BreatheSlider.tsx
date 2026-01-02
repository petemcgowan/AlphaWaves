import React, {useState, useEffect, useMemo} from 'react' // <--- Import useMemo
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  AppState,
} from 'react-native'
import PagerView from 'react-native-pager-view'
import {
  Canvas,
  Circle,
  BlurMask,
  RadialGradient,
  vec,
} from '@shopify/react-native-skia'
import {
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
  ReduceMotion,
} from 'react-native-reanimated'
import {RFPercentage} from 'react-native-responsive-fontsize'
import {Ionicons} from '@react-native-vector-icons/ionicons'
import TimerControls from '../components/TimerControls'
import CountdownTimer from '../components/CountdownTimer'

import {useInstantPlayer} from '../hooks/useInstantPlayer'

const {width, height} = Dimensions.get('window')
const CENTER = {x: width / 2, y: height / 2}

interface BreatheSliderProps {
  data: any[]
  isActiveCategory: boolean
  isPlaying: boolean
  onTogglePlay: (playing: boolean) => void
}

const BreatheSlider = ({
  data,
  isActiveCategory,
  isPlaying,
  onTogglePlay,
}: BreatheSliderProps) => {
  const [slideIndex, setSlideIndex] = useState(0)
  // Timer & UI State
  const [timerVisible, setTimerVisible] = useState(false)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [intentionalVideoPlay, setIntentionalVideoPlay] = useState(true) // "Video Off" toggle
  const [isAppActive, setIsAppActive] = useState(true)
  // --- ANIMATION STATE ---
  const r = useSharedValue(width * 0.2)

  const effectiveIsPlaying = isPlaying && isActiveCategory

  useInstantPlayer(
    data[slideIndex], // Pass the whole object!
    effectiveIsPlaying,
    data[slideIndex].volume || 1.0,
  )

  useEffect(() => {
    const sub = AppState.addEventListener('change', state => {
      setIsAppActive(state === 'active')
    })
    return () => sub.remove()
  }, [])

  // 2. Update Animation Logic
  const shouldAnimate = isPlaying && isActiveCategory && isAppActive

  useEffect(() => {
    if (shouldAnimate) {
      // Start Breathing
      r.value = withRepeat(
        withTiming(width * 0.45, {
          duration: 4000,
          easing: Easing.inOut(Easing.ease),
          reduceMotion: ReduceMotion.Never,
        }),
        -1,
        true,
      )
    } else {
      // Stop/Reset Breathing
      r.value = withTiming(width * 0.2, {
        duration: 1000,
        reduceMotion: ReduceMotion.Never,
      })
    }
  }, [shouldAnimate])

  const togglePlayback = () => {
    const newState = !isPlaying
    onTogglePlay(newState)

    // Timer reset logic
    if (timerVisible && !newState) {
      setTimerVisible(false)
      setHours(0)
      setMinutes(0)
      setSeconds(0)
    }
  }

  const currentColors = useMemo(() => {
    return data[slideIndex].orbColor || ['#A0C4FF', '#1c1c1c']
  }, [slideIndex, data])

  return (
    <View style={styles.container}>
      {/* 1. HORIZONTAL PAGER */}
      <PagerView
        style={styles.pagerView}
        initialPage={0}
        orientation="horizontal"
        onPageSelected={e => setSlideIndex(e.nativeEvent.position)}>
        {data.map((item, index) => {
          // Only render canvas if we are close to the slide (Performance)
          const isCurrent = slideIndex === index
          // Optimize rendering
          if (Math.abs(slideIndex - index) > 1) return <View key={index} />

          return (
            <View style={styles.page} key={index}>
              {intentionalVideoPlay && (
                <Canvas style={{flex: 1}}>
                  <Circle c={vec(CENTER.x, CENTER.y)} r={r}>
                    <RadialGradient
                      c={vec(CENTER.x, CENTER.y)}
                      r={width * 0.65}
                      colors={currentColors}
                    />
                    <BlurMask blur={30} style="normal" />
                  </Circle>
                </Canvas>
              )}

              <View style={styles.textOverlay}>
                {intentionalVideoPlay && (
                  <>
                    <Text style={styles.titleText}>{item.title}</Text>
                    <Text style={styles.guideText}>
                      {effectiveIsPlaying ? 'Breathe...' : 'Theta Resonance'}
                    </Text>
                  </>
                )}
                {item.isLocked && (
                  <View style={styles.lockBadge}>
                    {/* <Ionicons name="lock-closed" size={12} color="#fff" /> */}
                    {/* <Text style={styles.lockText}>PREMIUM</Text> */}
                  </View>
                )}
              </View>
            </View>
          )
        })}
      </PagerView>

      {/* 3. CONTROLS */}
      <View style={styles.powerControls}>
        <TouchableOpacity style={styles.powerIcon} onPress={togglePlayback}>
          <Ionicons
            name={'infinite'}
            size={120}
            color={
              effectiveIsPlaying
                ? 'rgba(255, 255, 255, 0.4)'
                : 'rgba(255, 255, 255, 0.8)'
            }
          />
        </TouchableOpacity>
      </View>

      {/* 3. TIMER & SETTINGS */}
      <View style={styles.timerCountdown}>
        {timerVisible && (
          <CountdownTimer
            hours={hours}
            minutes={minutes}
            seconds={seconds}
            togglePlayback={togglePlayback}
            setTimerVisible={setTimerVisible}
            timerControlsFontColor={'#fff'}
          />
        )}
      </View>

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
          // Default styling for Theta
          timerDialogBackgroundColor={'#222'}
          timerDialogFontColor={'#fff'}
          songIndex={slideIndex}
          rainSounds={data} // Just for length check inside component
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#050505'},
  pagerView: {flex: 1},
  page: {flex: 1},
  textOverlay: {
    position: 'absolute',
    top: height * 0.15,
    width: width,
    alignItems: 'center',
    gap: 10,
  },
  titleText: {
    color: 'white',
    fontSize: RFPercentage(2.3),
    fontWeight: 'bold',
    opacity: 0.7,
  },
  guideText: {
    color: '#fff',
    fontSize: RFPercentage(2.6),
    letterSpacing: RFPercentage(0.6),
    fontWeight: '200',
    textTransform: 'uppercase',
  },
  lockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 10,
    gap: 4,
  },
  lockText: {
    color: 'white',
    fontSize: RFPercentage(1.4),
    fontWeight: 'bold',
  },
  powerControls: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'box-none',
    marginTop: height * 0.4,
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
    pointerEvents: 'box-none',
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
    pointerEvents: 'box-none',
  },
  powerIcon: {
    opacity: 0.85,
    paddingTop: height * 0.03,
    height: '100%',
    borderRadius: 70,
  },
})

export default BreatheSlider
