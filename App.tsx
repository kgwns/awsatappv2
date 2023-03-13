import React, { useEffect } from 'react';
import { store, persistor } from 'src/redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import 'src/i18n';
import SplashNavigation from './src/navigation/SplashNavigation';
import { ThemeProvider } from 'src/shared/styles/ThemeProvider';
import { DEFAULT_LIGHT_THEME } from 'src/shared/styles/colors';
import Orientation from 'react-native-orientation-locker'
import AppPlayer from 'src/shared/utils/appPlayer';
import { GetFCMToken } from 'src/firebase/notification/notification';
import TrackPlayer from 'react-native-track-player';
import { checkPermission } from 'src/shared/utils/LocationPermission';
import { isIOS } from 'src/shared/utils';
import { FetchArabicData } from 'src/firebase/RemoteConfig/RemoteConfig';

const App = () => {

  const permissionDelay = isIOS ? 1500 : 5500;

  useEffect(() => {
    Orientation.lockToPortrait()
  }, [])

  useEffect(() => {
    // setTimeout(() => {
      checkPermission()
    // }, permissionDelay)
  }, [])

  useEffect(() => {
    AppPlayer.initializePlayer();
    return(() => {
      TrackPlayer.destroy();
    });
  }, [])
  
  return (
    <Provider store={store}>
      <GetFCMToken/>
      <FetchArabicData/>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider initial={DEFAULT_LIGHT_THEME} >
          <SplashNavigation />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}

export default App