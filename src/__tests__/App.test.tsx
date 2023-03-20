import {render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import {Provider} from 'react-redux';
import {storeSampleData} from 'src/constants/Constants';
import {GetFCMToken} from 'src/firebase/notification/notification';
import App from '../../App';
jest.mock('@react-native-firebase/app', () => {
  return {
    messaging: jest.fn(() => {
      return {
        onMessage: jest.fn(),
        getToken: jest.fn(() => Promise.resolve('myMockToken')),
      };
    }),
  };
});

jest.mock('@react-native-firebase/remote-config', () => ({
  firebase: {
    remoteConfig: jest.fn(() => ({
      setDefaults: jest.fn().mockReturnValue(Promise.resolve('MockResponse')),
    })),
  },
}));

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isIOS: true
}));


jest.mock('@react-native-firebase/messaging', () => {
  return jest.fn().mockReturnValue({
    getToken: jest.fn().mockResolvedValue(''),
    requestPermission: jest.fn().mockResolvedValue(true),
    registerDeviceForRemoteMessages: jest.fn(),
    AuthorizationStatus: jest.fn(),
    setBackgroundMessageHandler: jest.fn(),
    getInitialNotification: jest.fn().mockResolvedValue(''),
    onNotificationOpenedApp: jest.fn(),
    onMessage: jest.fn()
  });
});

describe('<App>', () => {
  let instance: RenderAPI;

  describe('when App only', () => {
    beforeEach(() => {
      const component = (
        <Provider store={storeSampleData}>
          <GetFCMToken />
          <App />
        </Provider>
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render App', () => {
      DeviceTypeUtilsMock.isIOS = false;
      expect(instance).toBeDefined();
    });
    it('Should render App in iOS', () => {
      DeviceTypeUtilsMock.isIOS = true;
      expect(instance).toBeDefined();
    });
  });
});
