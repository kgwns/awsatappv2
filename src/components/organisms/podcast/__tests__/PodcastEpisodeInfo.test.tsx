import {render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import { PodcastEpisodeInfo } from '../PodcastEpisodeInfo';
import {PodcastEpisodeData} from 'src/constants/SampleData';

describe('<PodcastEpisodeInfo>', () => {
  let instance: RenderAPI;

  describe('when PodcastEpisodeInfo only', () => {
    beforeEach(() => {
      const component = (
          <PodcastEpisodeInfo data={PodcastEpisodeData[0]} />
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render PodcastEpisodeInfo', () => {
      expect(instance).toBeDefined();
    });
  });
});
