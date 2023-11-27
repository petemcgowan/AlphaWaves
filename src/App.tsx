import React, {useEffect} from 'react';
import {Text} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './redux/store';

// import {SafeAreaView} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

// import Config from 'react-native-config';
import CentralNavigation from './components/CentralNavigation';

function App(): JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <CentralNavigation />
      </PersistGate>
    </Provider>
  );
}

export default App;
