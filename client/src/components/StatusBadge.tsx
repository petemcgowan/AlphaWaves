import Ionicons from '@react-native-vector-icons/ionicons'
import {useEffect, useRef} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated'

const sessionHistory = {
  hasSeenOfflineBadge: false,
}

export const StatusBadge = ({
  isLocal,
  isVisible,
}: {
  isLocal: boolean
  isVisible: boolean
}) => {
  const opacity = useSharedValue(0)
  // Track the previous state to detect CHANGES
  const wasLocal = useRef(isLocal)
  // Track if we showed the badge *for this specific slide visit*
  const hasShownThisVisit = useRef(false)

  useEffect(() => {
    // RESET when swiping away
    if (!isVisible) {
      opacity.value = withTiming(0, {duration: 200})
      hasShownThisVisit.current = false
      return
    }

    // Prevent double-showing on the same slide visit
    if (hasShownThisVisit.current) {
      // Exception: If status CHANGED (Streaming -> Local) while watching, we allow a re-show
      if (isLocal === wasLocal.current) return
    }

    let shouldShow = false

    // --- LOGIC GATES ---

    // SCENARIO A: Status Changed (Download Finished while watching)
    // ALWAYS SHOW (Positive Reinforcement)
    if (isLocal && !wasLocal.current) {
      shouldShow = true
    }

    // SCENARIO B: Streaming (Network Usage)
    // ALWAYS SHOW (Warning). If I swipe to a new slide and it's streaming, tell me.
    else if (!isLocal) {
      shouldShow = true
    }

    // SCENARIO C: Offline Ready (Initial)
    // ONLY SHOW ONCE PER APP SESSION. (Don't nag about success).
    else if (isLocal && !sessionHistory.hasSeenOfflineBadge) {
      shouldShow = true
      sessionHistory.hasSeenOfflineBadge = true
    }

    // --- ANIMATION TRIGGER ---
    if (shouldShow) {
      // Reset opacity to ensure animation plays from start
      opacity.value = 0
      opacity.value = withSequence(
        withTiming(1, {duration: 500}),
        withDelay(2000, withTiming(0, {duration: 500})),
      )
      hasShownThisVisit.current = true
    }

    wasLocal.current = isLocal
  }, [isLocal, isVisible])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  return (
    <Animated.View style={[styles.badgeContainer, animatedStyle]}>
      <View
        style={[
          styles.badgePill,
          {
            backgroundColor: isLocal
              ? 'rgba(0, 0, 0, 0.6)'
              : 'rgba(0, 0, 0, 0.6)',
            borderColor: isLocal ? '#2ecc71' : '#3498db',
          },
        ]}>
        <Ionicons
          name={isLocal ? 'checkmark-circle' : 'cloud-download-outline'}
          size={14}
          color={isLocal ? '#2ecc71' : '#3498db'}
        />
        <Text
          style={[styles.badgeText, {color: isLocal ? '#2ecc71' : '#3498db'}]}>
          {isLocal ? 'OFFLINE READY' : 'STREAMING'}
        </Text>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  badgeContainer: {
    position: 'absolute',
    top: 80,
    left: 20,
    zIndex: 999,
  },
  badgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    gap: 6,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
})
