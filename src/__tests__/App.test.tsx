import {render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import { Provider } from 'react-redux';
import { storeSampleData } from 'src/constants/SampleData';
import { GetFCMToken } from 'src/firebase/notification/notification';
import App from '../../App';

describe('<App>', () => {
  let instance: RenderAPI;

  describe('when App only', () => {
    beforeEach(() => {
      const component = (
        <Provider store={storeSampleData}>
          <GetFCMToken/>
          <App />
        </Provider>
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render App', () => {
      expect(instance).toBeDefined();
    });
  });
});
