import 'react-native-gesture-handler/jestSetup';
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
  };
});

jest.mock('react-redux', () => {
  const ActualReactRedux = jest.requireActual('react-redux');
  return {
      ...ActualReactRedux,
      useDispatch: jest.fn().mockImplementation(() => {
        return jest.fn()
      }),
      useSelector: jest.fn().mockImplementation(() => {
          return jest.fn();
      }),
  };
});

jest.mock('react-native-device-info', () => mockRNDeviceInfo);

jest.mock('react-native-share', () => {
  return {
    open: jest.fn().mockImplementation(() => jest.fn())
  }
})

jest.mock('react-native-color-matrix-image-filters', () => {
  return {
    Grayscale: jest.fn().mockImplementation(() => jest.fn())
  }
})

jest.mock('redux-persist', () => {
  const real = jest.requireActual('redux-persist');
  return {
    ...real,
    persistReducer: jest
      .fn()
      .mockImplementation((config, reducers) => reducers),
  };
});


