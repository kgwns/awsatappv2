import {render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import { VideoInfo } from '../VideoInfo';
import {videoTabData} from 'src/constants/SampleData';

describe('<VideoInfo>', () => {
  let instance: RenderAPI;

  describe('when VideoInfo only', () => {
    beforeEach(() => {
      const component = (
          <VideoInfo data={videoTabData[0]} />
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render VideoInfo', () => {
      expect(instance).toBeDefined();
    });
  });
});
