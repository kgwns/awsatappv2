import { GetFCMToken, registerBackgroundPushNotification } from '../notification';
import { useNotificationSaveToken } from 'src/hooks';
import React from 'react';
import { render } from '@testing-library/react-native';
import { RenderAPI } from '@testing-library/react-native';

jest.mock('src/hooks/useNotificationSaveToken', () => ({
  useNotificationSaveToken: jest.fn(),
}));

jest.mock('@notifee/react-native',() => ({
    onForegroundEvent: jest.fn(),
    onBackgroundEvent: jest.fn()
}))

jest.mock('@react-native-firebase/messaging', () => {
  return () => ({
    getToken: jest.fn(() => Promise.resolve('myMockToken')),
    onMessage: jest.fn(() => Promise.resolve({notification:'notification'})),
    onNotificationOpenedApp: jest.fn(() => Promise.resolve(true)),
    getInitialNotification: jest.fn(() => Promise.resolve({data:{type:'dynamic-section',id:'2'}})),
    setBackgroundMessageHandler: jest.fn().mockImplementation(() => Promise.resolve())
  })
});

jest.mock('@react-native-community/push-notification-ios', () => {
  return {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn()
  }
});
const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isIOS: true,
}));

jest.mock("@react-native-firebase/remote-config", () => ({
  firebase: {
    remoteConfig: () => ({
      getValue:() => ({
          _value: JSON.stringify({
            notification: [{
              id: 2,
              title: "title"
            }, {
              id: 1,
              title: "title1"
            }]
          })
      })
      
    })
  },
}));


describe('<GetFCMToken>', () => {
  const useNotificationSaveTokenMock = jest.fn();
  let instance: RenderAPI;
  beforeEach(() => {
    jest.useFakeTimers({
      legacyFakeTimers: true
    });
    (useNotificationSaveToken as jest.Mock).mockImplementation(
      useNotificationSaveTokenMock,
    );
    useNotificationSaveTokenMock.mockReturnValue({
      saveTokenRequest: {
        fcm_token: '',
        platform: '',
        device_name: '',
      },
    });

    const component = <GetFCMToken />;
    instance = render(component);
  });
  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });
  it('Should render component', () => {
    DeviceTypeUtilsMock.isIOS = false;
    expect(instance).toBeDefined();
  });
  it('Should render component in iOS', () => {
    DeviceTypeUtilsMock.isIOS = true;
    expect(instance).toBeDefined();
  });
});


describe('<registerBackgroundPushNotification>', () => {
  beforeEach(() => {
    jest.useFakeTimers({
      legacyFakeTimers: true
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('Should render component', () => {
    registerBackgroundPushNotification();
  });
});
