import {render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import { PodcastEpisodeList } from '../PodcastEpisodeList';
import {PodcastEpisodeData} from 'src/constants/SampleData'

describe('<PodcastEpisodeList>', () => {
  let instance: RenderAPI;

  describe('when PodcastEpisodeList only', () => {
    beforeEach(() => {
      const component = (
          <PodcastEpisodeList data={PodcastEpisodeData} />
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render PodcastEpisodeList', () => {
      expect(instance).toBeDefined();
    });
  });
});
