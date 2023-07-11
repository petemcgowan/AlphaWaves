import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'

import RainSlider from '../screens/RainSlider'
import OnboardingDeck from '../components/OnboardingDeck'

const AppStack = createStackNavigator()

export default function CentralNavigation() {
  const hasSeenIntro = false //
  return (
    <NavigationContainer>
      <AppStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* {!hasSeenIntro && (
          <AppStack.Screen name="Onboarding" component={OnboardingDeck} />
        )} */}
        <AppStack.Screen name="RainSlider" component={RainSlider} />
      </AppStack.Navigator>
    </NavigationContainer>
  )
}
