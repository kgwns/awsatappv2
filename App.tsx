import React, { useEffect } from 'react';
import AppNavigator from 'src/navigation/AppNavigator';
import { store, persistor } from 'src/redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import SplashScreen from 'react-native-splash-screen'
import 'src/i18n';

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide()
    }, 1000)
  },[])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;