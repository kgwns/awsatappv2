import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigator from '../TabNavigator';
import {Provider} from 'react-redux';
import {storeSampleData} from '../../constants/Constants';
import { TouchableOpacity } from 'react-native';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
  useNavigationState: () => ([]),
}));

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: false,
  isIOS: false
}));


describe('<TabNavigator>', () => {
  let instance: RenderAPI;
  const mockFn = jest.fn();

  describe('when TabNavigator only', () => {
    beforeEach(() => {
      const component = (
        <NavigationContainer>
          <Provider store={storeSampleData}>
            <TabNavigator />
          </Provider>
        </NavigationContainer>
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render TabNavigator', () => {
      expect(instance).toBeDefined();
    });
    it('Should render TabNavigator in Tab', () => {
      DeviceTypeUtilsMock.isTab = true;
      expect(instance).toBeDefined();
    });
    it('Should render TabNavigator in iOS', () => {
      DeviceTypeUtilsMock.isIOS = true;
      expect(instance).toBeDefined();
    });
    test('Should call TouchableOpacity onPress', () => {
      const element = instance.container.findAllByType(TouchableOpacity)[0];
      fireEvent(element, 'onPress');
      expect(mockFn).toBeTruthy();
    });
  });
});
