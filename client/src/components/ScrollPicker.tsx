import React, {useRef, useEffect} from 'react'
import {
  View,
  Text,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
  FlatList,
  Dimensions,
} from 'react-native'
import {RFPercentage} from 'react-native-responsive-fontsize'
const {width} = Dimensions.get('window')

// Configuration for the wheel physics
const ITEM_HEIGHT = 50 // Height of one number
const VISIBLE_ITEMS = 3

interface ScrollPickerProps {
  items: number[]
  selectedValue: number
  onValueChange: (val: number) => void
  textColor?: string
}

export const ScrollPicker = ({
  items,
  selectedValue,
  onValueChange,
  textColor = '#fff',
}: ScrollPickerProps) => {
  const flatListRef = useRef<FlatList>(null)

  // Calculate padding to center the content
  const paddingVertical = (ITEM_HEIGHT * VISIBLE_ITEMS) / 2 - ITEM_HEIGHT / 2

  // Scroll to initial value on mount
  useEffect(() => {
    const index = items.indexOf(selectedValue)
    if (index !== -1) {
      setTimeout(() => {
        flatListRef.current?.scrollToOffset({
          offset: index * ITEM_HEIGHT,
          animated: false,
        })
      }, 100)
    }
  }, [])

  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const offsetY = event.nativeEvent.contentOffset.y
    const index = Math.round(offsetY / ITEM_HEIGHT)

    // Clamp index to bounds
    const safeIndex = Math.max(0, Math.min(index, items.length - 1))
    const newValue = items[safeIndex]

    if (newValue !== selectedValue) {
      onValueChange(newValue)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.selectionOverlay} pointerEvents="none" />
      <FlatList
        ref={flatListRef}
        data={items}
        keyExtractor={item => item.toString()}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        contentContainerStyle={{
          paddingVertical: paddingVertical,
        }}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        // Improve performance on Android
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        initialNumToRender={15}
        renderItem={({item}) => {
          const isSelected = item === selectedValue
          return (
            <View style={styles.itemContainer}>
              <Text
                style={[
                  styles.itemText,
                  {
                    color: textColor,
                    opacity: isSelected ? 1 : 0.4,
                    fontWeight: isSelected ? '700' : '400',
                    fontSize: isSelected
                      ? RFPercentage(3.2)
                      : RFPercentage(2.8),
                  },
                ]}>
                {item < 10 ? `0${item}` : item}
              </Text>
            </View>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
    width: width * 0.2, // Width of one column
    overflow: 'hidden',
  },
  itemContainer: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    textAlign: 'center',
  },
  selectionOverlay: {
    position: 'absolute',
    top: ITEM_HEIGHT, // Position at the middle slot
    height: ITEM_HEIGHT,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    zIndex: -1,
  },
})
