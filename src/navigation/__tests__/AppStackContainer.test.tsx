import {render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import AppStackContainer from 'src/navigation/AppStackContainer';
import {Provider} from 'react-redux';
import {storeSampleData} from '../../constants/SampleData';

describe('<AppStackContainer>', () => {
  let instance: RenderAPI;

  describe('when AppStackContainer only', () => {
    beforeEach(() => {
      const component = (
          <Provider store={storeSampleData}>
            <AppStackContainer />
          </Provider>
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render AppStackContainer', () => {
      expect(instance).toBeDefined();
    });
  });
});
