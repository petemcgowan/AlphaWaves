import React, {useState} from 'react'

import {StyleSheet, View} from 'react-native'
import PagerView from 'react-native-pager-view'
import {useDispatch, useSelector} from 'react-redux'
import {markVerticalSwipeComplete} from '../redux/slices/uiSlice'
import CategorySlider from '../components/CategorySlider'
import {rainSounds, noiseSounds, thetaSounds} from '../model/data'
import BreatheSlider from '../components/BreatheSlider'

export const MatrixPlayer = () => {
  // 0 = Rain, 1 = Noise
  const [verticalIndex, setVerticalIndex] = useState(0)
  const [globalIsPlaying, setGlobalIsPlaying] = useState(false)
  const dispatch = useDispatch()
  // Track if user has discovered the vertical swipe
  // @ts-ignore
  const hasSwipedVertical = useSelector(state => state.ui.hasSwipedVertical)

  const handlePageSelected = (e: any) => {
    const position = e.nativeEvent.position
    setVerticalIndex(position)
    console.log('position:', position)

    // If they swipe to Noise (1) or Theta (2), they learned the gesture.
    if (position > 0) {
      dispatch(markVerticalSwipeComplete())
    }
  }

  return (
    <PagerView
      style={styles.pagerView}
      initialPage={0}
      orientation="vertical"
      onPageSelected={handlePageSelected}>
      {/* Slide deck  1: Rain */}
      <View key="1" style={styles.page}>
        <CategorySlider
          data={rainSounds}
          title="Rain"
          isActiveCategory={verticalIndex === 0}
          isPlaying={globalIsPlaying}
          onTogglePlay={setGlobalIsPlaying}
          showSwipeHint={!hasSwipedVertical}
        />
      </View>

      {/* Slide deck 2: Noise */}
      <View key="2" style={styles.page}>
        <CategorySlider
          data={noiseSounds}
          title="Noise"
          isActiveCategory={verticalIndex === 1}
          isPlaying={globalIsPlaying}
          onTogglePlay={setGlobalIsPlaying}
          showSwipeHint={false}
        />
      </View>

      {/* Slide deck  1: Binaural Beats */}
      <View key="3" style={styles.page}>
        <BreatheSlider
          data={thetaSounds}
          isActiveCategory={verticalIndex === 2}
          isPlaying={globalIsPlaying}
          onTogglePlay={setGlobalIsPlaying}
        />
      </View>
    </PagerView>
  )
}

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
    backgroundColor: 'black',
  },
  page: {
    flex: 1,
  },
})
