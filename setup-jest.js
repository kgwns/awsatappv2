import 'react-native-gesture-handler/jestSetup';
import {LoginManager} from 'react-native-fbsdk-next';
import mockRNDeviceInfo from 'react-native-device-info/jest/react-native-device-info-mock';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};
  return Reanimated;
});
jest.mock('@notifee/react-native', () =>
  require('@notifee/react-native/jest-mock'),
);
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('react-native/Libraries/LogBox/LogBox');
jest.spyOn(global.console, 'warn').mockImplementation(() => jest.fn());
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: jest.fn(),
      goBack: jest.fn(),
      addListener: jest.fn(),
    }),
    useIsFocused: () => jest.fn().mockImplementation(() => Boolean),
    useFocusEffect: () => jest.fn().mockImplementation(() => jest.fn()),
  };
});

jest.mock('react-redux', () => {
  const ActualReactRedux = jest.requireActual('react-redux');
  return {
    ...ActualReactRedux,
    useDispatch: jest.fn().mockImplementation(() => {
      return jest.fn();
    }),
    useSelector: jest.fn().mockImplementation(() => {
      return jest.fn();
    }),
  };
});

jest.mock('react-native-device-info', () => mockRNDeviceInfo);

jest.mock('react-native-share', () => {
  return {
    open: jest.fn().mockImplementation(() => jest.fn()),
  };
});

jest.mock('react-native-color-matrix-image-filters', () => {
  return {
    Grayscale: jest.fn().mockImplementation(() => jest.fn()),
  };
});

jest.mock('keyboard-aware-view', () => {
  return {
    KeyboardAwareView: jest.fn().mockImplementation(() => jest.fn()),
  };
});

jest.mock('react-native-keyboard-aware-scroll-view', () => {
  const KeyboardAwareScrollView = ({children}) => children;
  return {KeyboardAwareScrollView};
});

jest.mock('@react-native-google-signin/google-signin', () => {});

jest.mock('react-native-image-crop-picker', () => {
  return {
    ImagePicker: jest.fn().mockImplementation(() => jest.fn()),
  };
});

jest
  .spyOn(LoginManager, 'logInWithPermissions')
  .mockImplementation(() => Promise.resolve({isCancelled: false}));

jest.mock('react-native-video', () => 'Video');

jest.mock('react-native-track-player', () => {
  return {
    usePlaybackState: jest.fn().mockImplementation(() => jest.fn()),
    State: jest.fn().mockImplementation(() => jest.fn()),
    useProgress: jest.fn().mockImplementation(() => jest.fn()),
    useTrackPlayerEvents: jest.fn().mockImplementation(() => jest.fn()),
    Event: jest.fn().mockImplementation(() => jest.fn()),
    reset: jest.fn(),
    stop: jest.fn(),
    setupPlayer: jest.fn(),
    play: jest.fn(),
    add: jest.fn(),
    updateOptions: jest.fn(),
    getState: jest.fn()
  };
});
jest.mock('react-native-adjust', () => {
  const actualNav = jest.requireActual('react-native-adjust');
  return {
    ...actualNav,
    AdjustEvent: jest.fn().mockImplementation(() => jest.fn()),
    AdjustConfig: () => ({
      setLogLevel: jest.fn(),
      setDelayStart: jest.fn(),
      setNeedsCost: jest.fn(),
      setAttributionCallbackListener: jest.fn(),
      setEventTrackingSucceededCallbackListener: jest.fn(),
      setEventTrackingFailedCallbackListener: jest.fn(),
      setSessionTrackingSucceededCallbackListener: jest.fn(),
      setSessionTrackingFailedCallbackListener: jest.fn(),
      deactivateSKAdNetworkHandling: jest.fn(),
      setDeviceKnown: jest.fn(),
      setPreinstallTrackingEnabled: jest.fn(),
      setAllowIdfaReading: jest.fn(),
      setAllowiAdInfoReading: jest.fn(),
      setAllowAdServicesInfoReading: jest.fn(),
      setShouldLaunchDeeplink: jest.fn(),
    }),
    Adjust: {
      getSdkVersion: jest.fn().mockReturnValue(() => {}),
      requestTrackingAuthorizationWithCompletionHandler: jest.fn(),
      create: jest.fn(),
      trackEvent: jest.fn(),
      updateConversionValue: jest.fn(),
      getAppTrackingAuthorizationStatus: jest.fn(),
      getAdid: jest.fn(),
      getIdfa: jest.fn(),
      getGoogleAdId: jest.fn(),
      getAmazonAdId: jest.fn(),
      getAttribution: jest.fn(),
      sendFirstPackages: jest.fn()
    },
  };
});

jest.mock('react-native-adjust-oaid', () => {
  const actualNav = jest.requireActual('react-native-adjust-oaid');
  return {
    ...actualNav,
    AdjustOaid: jest.fn().mockImplementation(() => jest.fn()),
  };
});

jest.mock('react-native-restart', () => {
  return {
    Restart: jest.fn().mockImplementation(() => jest.fn()),
  };
});

jest.mock('src/redux/store.ts', () => {
  return {
    store: {
      getState: jest.fn().mockReturnValue({appCommon:{
        baseUrlConfig:{
          baseUrl: 'https://aawsat.srpcdigital.com/',
          umsUrl:  "https://awsatapi.srpcdigital.com/",
          imageUrl: 'https://static.srpcdigital.com/',
          profileImageUrl: "https://awsatapi.srpcdigital.com/storage/",
          liveBlogUrl: "https://aawsat.srpcdigital.com/livenews/",
        }
      }}),
      subscribe: jest.fn().mockReturnValue(() => jest.fn()),
    },
    persistor: {
      getState: jest.fn().mockReturnValue({}),
      subscribe: jest.fn().mockReturnValue(() => jest.fn()),
    },
  };
});

jest.mock('redux-persist', () => {
  const real = jest.requireActual('redux-persist');
  return {
    ...real,
    persistReducer: jest
      .fn()
      .mockImplementation((config, reducers) => reducers),
  };
});
jest.mock('redux-saga', () => {
  const real = jest.requireActual('redux-saga');
  return {
    ...real,
    createSagaMiddleware: jest.fn().mockImplementation(() => jest.fn()),
  };
});

jest.mock('@react-native-firebase/messaging', () => {
  return jest.fn().mockReturnValue({
    getToken: jest.fn().mockResolvedValue(''),
    requestPermission: jest.fn().mockResolvedValue(true),
    registerDeviceForRemoteMessages: jest.fn(),
    AuthorizationStatus: jest.fn(),
    setBackgroundMessageHandler: jest.fn(),
    getInitialNotification: jest.fn().mockResolvedValue(''),
    onNotificationOpenedApp: jest.fn(),
  });
});

jest.mock('@react-native-firebase/app', () => {
  const actualNav = jest.requireActual('@react-native-firebase/app');
  return {
    ...actualNav,
    messaging: {onMessage: jest.fn()},
  };
});

jest.mock('react-native-permissions', () =>
  require('react-native-permissions/mock'),
);

jest.mock('@invertase/react-native-apple-authentication',()=> ({
  ...jest.requireActual('@invertase/react-native-apple-authentication'),
  appleAuth:{
    isSupported:true,
    performRequest: jest.fn().mockReturnValue({response:true}),
    Operation:{
      LOGIN: 'LOGIN'
    },
    Scope:{
      EMAIL: 'EMAIL',
      FULL_NAME: 'FULL_NAME'
    }
  }
}))

jest.mock('react-native-orientation-locker',() => {
  return {
    addDeviceOrientationListener: jest.fn(),
    removeDeviceOrientationListener: jest.fn(),
    lockToPortrait: jest.fn(),
    lockToLandscape: jest.fn(),
    unlockAllOrientations: jest.fn(),
    getDeviceOrientation: jest.fn()
  }
})

jest.mock('axios-cache-adapter',() => ({
  ...jest.requireActual('axios-cache-adapter'),
  setupCache: jest.fn().mockReturnValue({adapter: jest.fn()})   
}))
