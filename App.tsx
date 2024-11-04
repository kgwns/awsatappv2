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
import { checkNotificationPermission } from 'src/firebase/notification/notification';
import { checkPermission } from 'src/shared/utils/LocationPermission';
import { isIOS, isTab } from 'src/shared/utils';
import { FetchArabicData } from 'src/firebase/RemoteConfig/RemoteConfig';
import { Adjust } from 'react-native-adjust';
import { useAds } from 'src/hooks/useAds';

const App = () => {

  const permissionDelay = isIOS ? 4000 : 5500;
  const {initializeAdMob} = useAds();
  
  useEffect(() => {
    initializeAdMob();
    if (isTab) {
      Orientation.unlockAllOrientations()
    } else {
      Orientation.lockToPortrait()
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      checkPermission()
      checkNotificationPermission();
      Adjust.requestTrackingAuthorizationWithCompletionHandler(function (status) {
        switch (status) {
          case 0:
            // ATTrackingManagerAuthorizationStatusNotDetermined case   //  The user hasn't been asked yet
            break;
          case 1:
            // ATTrackingManagerAuthorizationStatusRestricted case     //  The user device is restricted
            break;
          case 2:
            // ATTrackingManagerAuthorizationStatusDenied case    //  The user denied access to IDFA
            break;
          case 3:
            // ATTrackingManagerAuthorizationStatusAuthorized case  //  The user authorized access to IDFA
            break;
        }
      });
    }, permissionDelay)
  }, [])

  useEffect(() => {
    AppPlayer.initializePlayer();
  }, [])

  return (
    <Provider store={store}>
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