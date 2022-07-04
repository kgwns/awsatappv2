import {render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import { PodcastEpisodeContent } from '../PodcastEpisodeContent';
import {PodcastEpisodeData} from 'src/constants/SampleData'

describe('<PodcastEpisodeContent>', () => {
  let instance: RenderAPI;

  describe('when PodcastEpisodeContent only', () => {
    beforeEach(() => {
      const component = (
          <PodcastEpisodeContent data={PodcastEpisodeData} />
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render PodcastEpisodeContent', () => {
      expect(instance).toBeDefined();
    });
  });
});
