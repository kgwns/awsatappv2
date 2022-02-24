import React, { useEffect } from 'react';
import { store, persistor } from 'src/redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import 'src/i18n';
import SplashNavigation from './src/navigation/SplashNavigation';
import { ThemeProvider } from 'src/shared/styles/ThemeProvider';
import { DEFAULT_LIGHT_THEME } from 'src/shared/styles/colors';
import Orientation from 'react-native-orientation-locker'

const App = () => {
  useEffect(() => {
    Orientation.lockToPortrait()
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider initial={DEFAULT_LIGHT_THEME} >
          <SplashNavigation />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}

export default App