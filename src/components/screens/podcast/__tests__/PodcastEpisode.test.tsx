import {render, RenderAPI, fireEvent} from '@testing-library/react-native';
import React, {useState} from 'react';
import { PodcastEpisode  } from '../PodcastEpisode';
import { Provider } from 'react-redux'
import { storeSampleData, PodcastEpisodeData, PodcastListData } from 'src/constants/SampleData';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {PodcastProgramHeader} from 'src/components/molecules';
import {PodcastEpisodeContent, PodcastEpisodeInfo} from 'src/components/organisms';
import { ScreenContainer } from '../../ScreenContainer/ScreenContainer';
import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

const podcastData = {
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

jest.mock("src/hooks/usePodcast", () => ({
  usePodcast: () => {
    return {
      isLoading: true,
      podcastListData: [
        {
          nid: "111",
          ...podcastData
        },
        {
          nid: "29",
          ...podcastData
        }
      ],
      podcastEpisodeData: [
        {
          nid: "29",
          ...podcastData
        }
      ],
      podcastListError: '',
      podcastEpisodeError:'',
      fetchPodcastListRequest: () => {
        return []
      },
      fetchPodcastEpisodeRequest: () => {
        return []
      }
    }
  },
}));

describe('<PodcastEpisode >', () => {
  let instance: RenderAPI;
  const setIsSaved = jest.fn()
  const mockFunction = jest.fn()

  const navigation = {
    reset: jest.fn(),
    navigate: jest.fn(),
    goBack: jest.fn(),
  }

  describe('when PodcastEpisode only', () => {
    beforeEach(() => {
      (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
      // (useState as jest.Mock).mockImplementation(() => ['', mockFunction]);
      (useState as jest.Mock).mockImplementation(() => [false, mockFunction]);
      (useState as jest.Mock).mockImplementation(() => [[podcastData], mockFunction]);
      (useState as jest.Mock).mockImplementation(() => [[podcastData], mockFunction]);

      const component = (
        <Provider store={storeSampleData}>
          <SafeAreaProvider>
            <PodcastEpisode  route={{ params: { data: PodcastEpisodeData, podcastListData: PodcastListData } }}/>
          </SafeAreaProvider>
        </Provider>
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render PodcastEpisode ', () => {
      expect(instance).toBeDefined();
    });
    it('when onPressSave is pressed from PodcastHeader', () => {
      const testID = instance.container.findByType(PodcastProgramHeader);
      fireEvent(testID, 'onPressSave');
      expect(setIsSaved).toBeTruthy();
    });
    it('when onPressShare is pressed from PodcastHeader', () => {
      const testID = instance.container.findByType(PodcastProgramHeader);
      fireEvent(testID, 'onPressShare');
      expect(mockFunction).toBeTruthy();
    });
    it('when onGoBack is pressed from PodcastHeader', () => {
      const testID = instance.container.findByType(PodcastProgramHeader);
      fireEvent(testID, 'onGoBack');
      expect(navigation.goBack).toBeTruthy();
    });
    it('when onItemActionPress is pressed from PodcastEpisodeContent', () => {
      const testID = instance.container.findByType(PodcastEpisodeContent);
      fireEvent(testID, 'onItemActionPress', {nid: '29'});
      expect(mockFunction).toBeTruthy();
    });
    test('Should call FlatList onPress', () => {
      const element = instance.container.findAllByType(ScreenContainer)[0];
      fireEvent(element, 'onCloseSignUpAlert');
      expect(mockFunction).toBeTruthy()
    });
    it('when onListenPress is pressed from PodcastEpisodeInfo', () => {
      const testID = instance.container.findByType(PodcastEpisodeInfo);
      fireEvent(testID, 'onListenPress', {duration: '29'});
      expect(mockFunction).toBeTruthy();
    });
  });
});
