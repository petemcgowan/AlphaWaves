import React, {useState, useMemo} from 'react'
import {
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native'
import PagerView from 'react-native-pager-view'
import TimerControls from '../components/TimerControls'
import CountdownTimer from '../components/CountdownTimer'
import {Ionicons} from '@react-native-vector-icons/ionicons'
import Video from 'react-native-video'
import {useSelector} from 'react-redux'
import {RFPercentage} from 'react-native-responsive-fontsize'

import {getLocalPath} from '../services/FileService'
import {StatusBadge} from '../components/StatusBadge'
import {useInstantPlayer} from '../hooks/useInstantPlayer'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated'

const {width, height} = Dimensions.get('window')

// --- NEW SUB-COMPONENT ---
const SlideItem = ({
  item,
  index,
  activeIndex,
  downloadedFiles,
  isPlaying,
  intentionalVideoPlay,
  title,
}) => {
  const isCurrent = index === activeIndex

  // Only mount Video if it is the CURRENT slide.
  const showVideoComponent = isCurrent

  const source = useMemo(() => {
    // Disk Cache
    if (downloadedFiles[item.videoFile?.uri]) {
      return {uri: 'file://' + getLocalPath(item.videoFile.uri)}
    }
    // HLS
    if (item.hlsPlaylist?.uri) {
      return item.hlsPlaylist
    }
    // Fallback
    return {uri: item.videoFile?.uri}
  }, [item, downloadedFiles])

  const isLocal = !!downloadedFiles[item.videoFile?.uri]

  const posterSource = item.videoPoster
    ? item.videoPoster
    : {uri: item.videoPosterUri}

  return (
    <View style={styles.videoContainer}>
      {/* POSTER */}
      <Image source={posterSource} style={styles.video} resizeMode="cover" />

      {showVideoComponent && (
        <Video
          source={source}
          style={styles.absoluteVideo} // Absolute to sit on top of poster
          posterResizeMode="cover"
          muted={true}
          resizeMode="cover"
          repeat={true}
          ignoreSilentSwitch="ignore"
          // playInBackground={false}
          // playWhenInactive={false}
          paused={!isPlaying || !intentionalVideoPlay}
          // paused={false}
          // Buffer settings to help Slide 2 load faster
          // bufferConfig={{
          //   minBufferMs: 5000,
          //   maxBufferMs: 30000,
          //   bufferForPlaybackMs: 1000, // Reduced wait time
          //   bufferForPlaybackAfterRebufferMs: 2000,
          // }}
        />
      )}
      {/* Status Badge */}
      {isCurrent && <StatusBadge isLocal={isLocal} isVisible={isCurrent} />}
    </View>
  )
}

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

  // Audio Hook
  useInstantPlayer(
    data[songIndex],
    effectiveIsPlaying,
    data[songIndex].volume || 1.0,
  )

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{translateY: translateY.value}],
  }))

  return (
    <View style={styles.container}>
      <PagerView
        style={styles.pagerView}
        initialPage={0}
        orientation="horizontal"
        onPageSelected={e => setSongIndex(e.nativeEvent.position)}>
        {data.map((item, index) => {
          // Don't render far-away slides
          if (Math.abs(songIndex - index) > 1) return <View key={index} />

          return (
            <View style={styles.page} key={index}>
              <SlideItem
                item={item}
                index={index}
                activeIndex={songIndex}
                downloadedFiles={downloadedFiles}
                isPlaying={effectiveIsPlaying}
                intentionalVideoPlay={intentionalVideoPlay}
                title={title}
              />
            </View>
          )
        })}
      </PagerView>

      {/* CONTROLS OVERLAY */}
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

      {/* SWIPE HINT */}
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
  pagerView: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  page: {
    flex: 1,
  },
  videoContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  absoluteVideo: {
    width: '100%',
    height: '100%',
    position: 'absolute', // Sits on top of poster
    top: 0,
    left: 0,
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
