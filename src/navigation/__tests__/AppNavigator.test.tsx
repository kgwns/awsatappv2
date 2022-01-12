import {render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from 'src/navigation/AppNavigator';

describe('<AppNavigator>', () => {
  let instance: RenderAPI;

  describe('when AppNavigator only', () => {
    beforeEach(() => {
      const component = (
        <NavigationContainer independent={true}>
          <AppNavigator />
        </NavigationContainer>
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      //instance.unmount();
    });
    it('Should render AppNavigator', () => {
      expect(instance).toBeDefined();
    });
  });
});
