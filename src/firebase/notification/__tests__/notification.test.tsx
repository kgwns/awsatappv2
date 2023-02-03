import {GetFCMToken} from '../notification';
import {useNotificationSaveToken} from 'src/hooks';
import React from 'react';
import {render} from '@testing-library/react-native';
import {RenderAPI} from '@testing-library/react-native'

jest.mock('src/hooks/useNotificationSaveToken', () => ({
  useNotificationSaveToken: jest.fn(),
}));

jest.mock('src/navigation/NavigationUtils', () => ({
  navigate: jest.fn(),
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
    onMessage: jest.fn(),
  });
});

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

jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isAndroid: true,
}));

describe('<GetFCMToken>', () => {
  const useNotificationSaveTokenMock = jest.fn();
  let instance: RenderAPI;
  const navigate = jest.fn();

  beforeEach(() => {
    (useNotificationSaveToken as jest.Mock).mockImplementation(
      useNotificationSaveTokenMock,
    );
    (navigate as jest.Mock).mockReturnValueOnce(navigate);
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
    expect(instance).toBeDefined();
  });
});
