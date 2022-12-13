import {render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import { PodcastProgramInfo } from '../PodcastProgramInfo';
import { PodcastVerticalListProps } from 'src/components/molecules';

describe('<PodcastProgramInfo>', () => {
  let instance: RenderAPI;

  const samplePodcastData: PodcastVerticalListProps = {
    nid: "29",
    view_node: "http://srpcawsatdev.prod.acquia-sites.com/node/111",
    field_new_sub_title_export: null,
    title: "أول شحنة عسكرية أميركية لـ«الحر» وغرفة عمليات إيرانية في حمص",
    field_duration_export: null,
    field_episode_export: null,
    field_google_podcast_export: null,
    field_podcast_image_export: null,
    field_podcast_sect_export: {
      img_podcast_mobile: '',
      anghami: {
        url: '',
      },
      apple_podcasts: {
        url: '',
      },
      google_podcast: {
        url: '',
      },
      spotify: {
        url: '',
      },
    },
    field_spotify_export: null,
    field_spreaker_episode_export: null,
    field_spreaker_show_export: null,
    field_announcer_name_export: null,
    field_apple_podcast_export: null,
    body_export: null
  }

  describe('when PodcastProgramInfo only', () => {
    beforeEach(() => {
      const component = (
          <PodcastProgramInfo data={samplePodcastData} />
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
