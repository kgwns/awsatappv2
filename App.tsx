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
import { isIOS, isNotEmpty } from 'src/shared/utils';
import { FetchArabicData } from 'src/firebase/RemoteConfig/RemoteConfig';
import { getCacheApiRequest } from 'src/services/api';
import { BASE_URL, BASE_URL_CONFIG } from 'src/services/apiUrls';
import { useAppCommon } from 'src/hooks';

const App = () => {

  const permissionDelay = isIOS ? 1500 : 5500;

  const { baseUrlConfig, storeBaseUrlConfigInfo } = useAppCommon();

  useEffect(() => {
    getBaseURL();
  }, [])
  
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

  const getBaseURL = async () => {
    console.log('Called :::::::')
    try {
      const response = await getCacheApiRequest(
        `${BASE_URL_CONFIG}`,
      );
      const url = isNotEmpty(response.baseurl) ? response : BASE_URL
      console.log("🚀 ~ file: App.tsx:53 ~ getBaseURL ~ url:", url)
      storeBaseUrlConfigInfo(url);
      return response;
    } catch (error) {
      throw error;
    }
  }

  console.log("🚀 ~ file: App.tsx:63 ~ App ~ baseUrlConfig:", baseUrlConfig)

  if (!isNotEmpty(baseUrlConfig)) {
    return null;
  } 
  
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