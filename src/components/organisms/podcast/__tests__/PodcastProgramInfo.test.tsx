import {render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import { PodcastProgramInfo } from '../PodcastProgramInfo';
import {PodcastProgramInfoData} from 'src/constants/SampleData'

describe('<PodcastProgramInfo>', () => {
  let instance: RenderAPI;

  describe('when PodcastProgramInfo only', () => {
    beforeEach(() => {
      const component = (
          <PodcastProgramInfo data={PodcastProgramInfoData} />
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render PodcastProgramInfo', () => {
      expect(instance).toBeDefined();
    });
  });
});
