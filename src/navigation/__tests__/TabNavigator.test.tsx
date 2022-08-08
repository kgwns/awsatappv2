import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigator from '../TabNavigator';
import {Provider} from 'react-redux';
import {storeSampleData} from '../../constants/SampleData';
import { TouchableOpacity } from 'react-native';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
  useNavigationState: () => ([]),
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
    test('Should call TouchableOpacity onPress', () => {
      const element = instance.container.findAllByType(TouchableOpacity)[0];
      fireEvent(element, 'onPress');
      expect(mockFn).toBeTruthy();
    });
  });
});
