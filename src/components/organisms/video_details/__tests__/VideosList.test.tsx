import {render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import { VideosList } from '../VideosList';
import {videoTabData} from 'src/constants/SampleData'

describe('<VideosList>', () => {
  let instance: RenderAPI;

  describe('when VideosList only', () => {
    beforeEach(() => {
      const component = (
          <VideosList data={videoTabData} />
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render VideosList', () => {
      expect(instance).toBeDefined();
    });
  });
});
