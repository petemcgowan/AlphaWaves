import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import RainSlider from '../screens/RainSlider'
import OnboardingDeck from '../screens/OnboardingDeck'
import { useSelector } from 'react-redux'
import { actionCreators } from '../redux/index'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { State } from '../redux/index'

const AppStack = createStackNavigator()

export default function CentralNavigation() {
  const hasSeenIntro = useSelector((state: State) => state.hasSeenIntro)
  // const hasSeenIntro = false
  const dispatch = useDispatch()
  const { updateHasSeenIntro } = bindActionCreators(actionCreators, dispatch)

  React.useEffect(() => {
    // Has seen intro, now turn off onboarding
    updateHasSeenIntro(true)
  })

  return (
    <NavigationContainer>
      <AppStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!hasSeenIntro && (
          <AppStack.Screen name="Onboarding" component={OnboardingDeck} />
        )}
        <AppStack.Screen name="RainSlider" component={RainSlider} />
      </AppStack.Navigator>
    </NavigationContainer>
  )
}
