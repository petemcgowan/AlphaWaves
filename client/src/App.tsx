import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import BootSplash from 'react-native-bootsplash';

import CentralNavigation from './components/CentralNavigation';

function App(): JSX.Element {
  useEffect(() => {
    const init = async () => {
    };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
      console.log('BootSplash has been hidden successfully');
    });
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
