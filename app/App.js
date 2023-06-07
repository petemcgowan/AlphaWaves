import React, { useEffect } from 'react'
import { Text } from 'react-native'

import SplashScreen from 'react-native-splash-screen'
import CentralNavigation from './components/CentralNavigation'

const App = () => {
  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return <CentralNavigation />
}

export default App
