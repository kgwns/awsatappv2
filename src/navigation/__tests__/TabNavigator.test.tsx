import {render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigator from '../TabNavigator';
import {Provider} from 'react-redux';
import {storeSampleData} from '../../constants/SampleData';

describe('<TabNavigator>', () => {
  let instance: RenderAPI;
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
    xit('Should render TabNavigator', () => {
      expect(instance).toBeDefined();
    });
  });
});
