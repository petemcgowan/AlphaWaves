import React, {useMemo, useState, useEffect} from 'react'
import {StyleSheet, View, Image, Platform} from 'react-native'
import Video from 'react-native-video'
import {StatusBadge} from './StatusBadge'
import {getLocalPath} from '../services/FileService'

interface SlideItemProps {
  item: any
  index: number
  activeIndex: number
  downloadedFiles: any
  isPlaying: boolean
  intentionalVideoPlay: boolean
}

const SlideItem = ({
  item,
  index,
  activeIndex,
  downloadedFiles,
  isPlaying,
  intentionalVideoPlay,
}: SlideItemProps) => {
  const isCurrent = index === activeIndex

  // State to track if the video has actually rendered its first frame
  const [videoLoaded, setVideoLoaded] = useState(false)

  // CRASH PREVENTION: Only render the video if it is the current slide.
  const shouldRenderVideo = isCurrent

  // Reset loaded state when we swipe away
  useEffect(() => {
    if (!isCurrent) {
      setVideoLoaded(false)
    }
  }, [isCurrent])

  const source = useMemo(() => {
    if (downloadedFiles[item.videoFile?.uri]) {
      return {uri: 'file://' + getLocalPath(item.videoFile.uri)}
    }
    if (item.hlsPlaylist?.uri) {
      return item.hlsPlaylist
    }
    return {uri: item.videoFile?.uri}
  }, [item, downloadedFiles])

  const isLocal = !!downloadedFiles[item.videoFile?.uri]

  const posterSource = item.videoPoster
    ? item.videoPoster
    : {uri: item.videoPosterUri}

  const shouldPlay = isCurrent && isPlaying && intentionalVideoPlay

  return (
    <View style={styles.videoContainer}>
      {/* Poster Image: Always visible. Acts as the background while video buffers. */}
      <Image source={posterSource} style={styles.video} resizeMode="cover" />

      {/* Video Player */}
      {shouldRenderVideo && (
        <Video
          source={source}
          // keep opacity at 0 until the native player says it's ready
          style={[styles.absoluteVideo, {opacity: videoLoaded ? 1 : 0}]}
          posterResizeMode="cover"
          muted={true}
          resizeMode="cover"
          repeat={true}
          useTextureView={true}
          ignoreSilentSwitch="ignore"
          paused={!shouldPlay}
          // "I have a frame ready to show"
          onReadyForDisplay={() => setVideoLoaded(true)}
          // Fallback: Sometimes onReadyForDisplay doesn't fire on cached loops,
          onLoad={() => setVideoLoaded(true)}
        />
      )}

      {isCurrent && <StatusBadge isLocal={isLocal} isVisible={isCurrent} />}
    </View>
  )
}

const styles = StyleSheet.create({
  videoContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  absoluteVideo: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
})

export default SlideItem
