import {render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import { PodcastProgram } from '../PodcastProgram';
import { Provider } from 'react-redux'
import { storeSampleData } from '../../../../constants/SampleData';

describe('<PodcastProgram>', () => {
  let instance: RenderAPI;

  describe('when PodcastProgram only', () => {
    beforeEach(() => {
      const component = (
        <Provider store={storeSampleData}>
          <PodcastProgram />
        </Provider>
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render PodcastProgram', () => {
      expect(instance).toBeDefined();
    });
  });
});
