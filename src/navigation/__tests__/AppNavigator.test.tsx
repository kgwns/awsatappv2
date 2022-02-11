import {render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from 'src/navigation/AppNavigator';
import {Provider} from 'react-redux';
import {storeSampleData} from '../../constants/SampleData';

describe('<AppNavigator>', () => {
  let instance: RenderAPI;

  describe('when AppNavigator only', () => {
    beforeEach(() => {
      const component = (
        <NavigationContainer independent={true}>
          <Provider store={storeSampleData}>
            <AppNavigator />
          </Provider>
      </NavigationContainer>
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    xit('Should render AppNavigator', () => {
      expect(instance).toBeDefined();
    });
  });
});
