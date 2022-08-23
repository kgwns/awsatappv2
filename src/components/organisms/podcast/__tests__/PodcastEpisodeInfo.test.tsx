import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import { PodcastEpisodeInfo } from '../PodcastEpisodeInfo';
import { ButtonOutline } from 'src/components/atoms';

const PodcastEpisodeData: any = [
  {
    nid: '12',
    title: 'example',
    field_new_sub_title_export: 'title',
    field_podcast_sect_export: {
      img_podcast_mobile: '123'
    },
    field_announcer_name_export: 'abc',
    field_total_duration_export: 10,
    field_spreaker_episode_export:'example',
    body_export: 'body',
    created_export: '2021-05-20T20:05:45+0000',
  },
];

describe('<PodcastEpisodeInfo>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();

  describe('when PodcastEpisodeInfo only', () => {
    beforeEach(() => {
      const component = (
          <PodcastEpisodeInfo data={PodcastEpisodeData} onListenPress={mockFunction} />
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

    it('when ButtonOutline only When onPress', () => {
      const testID = instance.container.findAllByType(ButtonOutline)[0];
      fireEvent(testID, 'onPress');
      expect(mockFunction).toBeTruthy();
    });

  });
});
