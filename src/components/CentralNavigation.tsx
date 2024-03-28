import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {bindActionCreators} from 'redux';
import rainSounds from '../model/data';
import RainSlider from '../screens/RainSlider';
import OnboardingDeck from '../screens/OnboardingDeck';
import {useSelector, useDispatch} from 'react-redux';
import {actionCreators} from '../redux/index';
// import {State} from '../redux/index';
import {RainSound} from '../types/RainSound';

const AppStack = createStackNavigator();

export default function CentralNavigation() {
  const hasSeenIntro = useSelector((state: State) => state.hasSeenIntro);
  // const hasSeenIntro = false;
  const dispatch = useDispatch();
  const {downloadAndCacheFiles} = bindActionCreators(actionCreators, dispatch);

  React.useEffect(() => {
    // Download And Cache files
    const fileUrls = rainSounds.map((item: RainSound) => {
      if (!item.videoFile) {
        console.log('Item without videoFile:', item);
      }
      return item.videoFile.uri;
    });
    dispatch(downloadAndCacheFiles(fileUrls));
  }, [dispatch]);

  return (
    <NavigationContainer>
      <AppStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {!hasSeenIntro && <AppStack.Screen name="Onboarding" component={OnboardingDeck} />}
        <AppStack.Screen name="RainSlider" component={RainSlider} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
