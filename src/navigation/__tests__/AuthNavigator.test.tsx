import {render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from 'src/navigation/AuthNavigator';
import {Provider} from 'react-redux';
import {storeSampleData} from '../../constants/Constants';

describe('<AuthNavigator>', () => {
  let instance: RenderAPI;

  describe('when AuthNavigator only', () => {
    beforeEach(() => {
      const component = (
        <NavigationContainer independent={true}>
          <Provider store={storeSampleData}>
            <AuthNavigator />
          </Provider>
      </NavigationContainer>
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render AuthNavigator', () => {
      expect(instance).toBeDefined();
    });
  });
});
