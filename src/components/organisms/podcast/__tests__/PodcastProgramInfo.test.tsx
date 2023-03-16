import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { PodcastProgramInfo } from '../PodcastProgramInfo';
import { Linking } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { PodcastVerticalListProps } from 'src/components/molecules/podcast/PodcastVerticalList';

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
    ...jest.requireActual('src/shared/utils/dimensions'),
    isTab: false,
}));
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
      id: "94842",
      title: "صباح الخير",
      url: "http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/94842",
      bundle: "podcast_section",
      description: "<p class=\"text-align-right\">Breifing</p>\n",
      img_podcast_desktop: "http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/2022-02/podcast-banner2.jpg",
      img_podcast_mobile: "http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/2022-02/podcast2_0.jpg",
      name: "صباح الخير",
      image: 'https://picsum.photos/200/300',
      apple_podcasts: {
        url: 'https://appletest.com',
        text: 'apple'
      },
      google_podcast: {
        url: 'https://googletest.com',
        text: 'google'
      },
      spotify: {
        url: 'https://spotifytest.com',
        text: 'spotify'
      },
      anghami: {
        url: 'https://anghamitest.com',
        text: 'anghami'
      }
    },
    field_spotify_export: null,
    field_spreaker_episode_export: null,
    field_spreaker_show_export: null,
    field_announcer_name_export: null,
    field_apple_podcast_export: null,
    body_export: 'body'
  }

  describe('Test podcast Program info', () => {
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
    it('test when clicks on apple podcasts url', () => {
      const testId = instance.getByTestId('applePodcastsUrl');
      fireEvent(testId, 'onPress');
      expect(Linking.openURL).toHaveBeenCalled()
    });
    it('test when clicks on Google podcasts url', () => {
      const testId = instance.getByTestId('googlePodcastUrl');
      fireEvent(testId, 'onPress');
      expect(Linking.openURL).toHaveBeenCalled()
    });
    it('test when clicks on spotify podcasts url', () => {
      const testId = instance.getByTestId('spotifyPodcastUrl');
      fireEvent(testId, 'onPress');
      expect(Linking.openURL).toHaveBeenCalled()
    });
    it('test when clicks on anghami podcasts url', () => {
      const testId = instance.getByTestId('anghamiPodcastUrl');
      fireEvent(testId, 'onPress');
      expect(Linking.openURL).toHaveBeenCalled()
    });
  });

  describe('checking in tablet', () => {
    beforeEach(() => {
      DeviceTypeUtilsMock.isTab = true
      const component = (
        <PodcastProgramInfo data={samplePodcastData} />
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('test when clicks on apple podcasts url in tab', () => {
      const testId = instance.getByTestId('tabApplePodcastsUrl');
      fireEvent(testId, 'onPress');
      expect(Linking.openURL).toHaveBeenCalled()
    });
    it('test when clicks on Google podcasts url in tab', () => {
      const testId = instance.getByTestId('tabGooglePodcastUrl');
      fireEvent(testId, 'onPress');
      expect(Linking.openURL).toHaveBeenCalled()
    });
    it('test when clicks on spotify podcasts url in tab', () => {
      jest.spyOn(DeviceInfo, 'isTablet').mockReturnValueOnce(true)
      const testId = instance.getByTestId('tabSpotifyPodcastUrl');
      fireEvent(testId, 'onPress');
      expect(Linking.openURL).toHaveBeenCalled()
    });
    it('test when clicks on anghami podcasts url in tab', () => {
      jest.spyOn(DeviceInfo, 'isTablet').mockReturnValueOnce(true)
      const testId = instance.getByTestId('tabAnghamiPodcastUrl');
      fireEvent(testId, 'onPress');
      expect(Linking.openURL).toHaveBeenCalled()
    });
  })
});
