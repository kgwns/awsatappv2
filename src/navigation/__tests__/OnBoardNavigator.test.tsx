import {render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import OnBoardNavigator from 'src/navigation/OnBoardNavigator';
import {Provider} from 'react-redux';
import {storeSampleData} from '../../constants/SampleData';

describe('<OnBoardNavigator>', () => {
  let instance: RenderAPI;

  describe('when OnBoardNavigator only', () => {
    beforeEach(() => {
      const component = (
        <NavigationContainer independent={true}>
          <Provider store={storeSampleData}>
            <OnBoardNavigator />
          </Provider>
      </NavigationContainer>
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render OnBoardNavigator', () => {
      expect(instance).toBeDefined();
    });
  });
});
