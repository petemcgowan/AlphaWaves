import React from 'react'
import { View, Text, Dimensions, StyleSheet } from 'react-native'

const { width, height } = Dimensions.get('window')

const Slide2 = () => {
  return (
    <View style={[styles.slide, { backgroundColor: 'green' }]} key={'1'}>
      <Text style={{ fontSize: 14 }}>Slide 1</Text>
    </View>
  )
}

export default Slide2

const styles = StyleSheet.create({
  slide: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
