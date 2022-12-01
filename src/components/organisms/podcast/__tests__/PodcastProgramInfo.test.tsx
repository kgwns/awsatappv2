import {render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import { PodcastProgramInfo } from '../PodcastProgramInfo';
import {PodcastProgramInfoData} from 'src/constants/Constants'
import {PodcastListItemType} from 'src/redux/podcast/types'

describe('<PodcastProgramInfo>', () => {
  let instance: RenderAPI;

  const samplePodcastData: PodcastListItemType = {
    nid: "29",
    type: "podcast",
    view_node: "http://srpcawsatdev.prod.acquia-sites.com/node/111",
    field_new_sub_title_export: null,
    title: "أول شحنة عسكرية أميركية لـ«الحر» وغرفة عمليات إيرانية في حمص",
    field_duration_export: null,
    field_episode_export: null,
    field_google_podcast_export: null,
    field_podcast_image_export: null,
    field_podcast_sect_export: {
      id: "94842",
      title: "صباح الخير",
      url: "http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/94842",
      bundle: "podcast_section",
      description: "<p class=\"text-align-right\">Breifing</p>\n",
      img_podcast_desktop: "http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/2022-02/podcast-banner2.jpg",
      img_podcast_mobile: "http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/2022-02/podcast2_0.jpg",
      name: "صباح الخير"
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
