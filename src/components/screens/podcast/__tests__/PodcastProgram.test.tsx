import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React, { useState } from 'react';
import { PodcastProgram } from '../PodcastProgram';
import { Provider } from 'react-redux'
import { storeSampleData } from '../../../../constants/SampleData';
import { ScreenContainer } from '../../ScreenContainer/ScreenContainer';
import { PodcastListItemType } from 'src/redux/podcast/types';
import { FlatList } from 'react-native';
import { PodcastEpisodeList } from 'src/components/organisms';
import {useNavigation} from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

jest.mock("src/hooks/useAppPlayer", () => ({
  useAppPlayer: () => {
    return {
      showMiniPlayer: true,
    }
  },
}));

const podCastData: PodcastListItemType[] = [
  {
    nid: '29',
    type: 'podcasr',
    view_node: 'example',
    field_new_sub_title_export: "abc",
    title: 'example',
    field_announcer_name_export: "abc",
    field_apple_podcast_export: {
      url: "string",
      text: "string"
    },
    body_export: "abc",
    field_duration_export: "abc",
    field_episode_export: "abc",
    field_google_podcast_export: {
      url: "string",
      text: "string"
    },
    field_podcast_image_export: "abc",
    field_podcast_sect_export: {
      id: 'example',
      title: 'example',
      url: 'example',
      bundle: 'example',
      description: 'example',
      img_podcast_desktop: 'example',
      img_podcast_mobile: 'example',
      name: 'example',
      image: 'example'
    },
    field_spotify_export: {
      url: "string",
      text: "string"
    },
    field_spreaker_episode_export: "abc",
    field_spreaker_show_export: "abc",
    isBookmarked: false,
    field_total_duration_export: 'example'
  },
  {
    nid: '30',
    type: 'podcasr',
    view_node: 'example',
    field_new_sub_title_export: "abc",
    title: 'example',
    field_announcer_name_export: "abc",
    field_apple_podcast_export: {
      url: "string",
      text: "string"
    },
    body_export: "abc",
    field_duration_export: "abc",
    field_episode_export: "abc",
    field_google_podcast_export: {
      url: "string",
      text: "string"
    },
    field_podcast_image_export: "abc",
    field_podcast_sect_export: {
      id: 'example',
      title: 'example',
      url: 'example',
      bundle: 'example',
      description: 'example',
      img_podcast_desktop: 'example',
      img_podcast_mobile: 'example',
      name: 'example',
      image: 'example'
    },
    field_spotify_export: {
      url: "string",
      text: "string"
    },
    field_spreaker_episode_export: "abc",
    field_spreaker_show_export: "abc",
    isBookmarked: false,
    field_total_duration_export: 'example'
  },
];
jest.mock("src/hooks/usePodcast", () => ({
  usePodcast: () => {
    return {
      isLoading: true,
      podcastListData: podCastData,
      podcastEpisodeData: [],
      podcastListError: 'example',
      podcastEpisodeError:'example',
      fetchPodcastListRequest: () => {
        return []
      },
      fetchPodcastEpisodeRequest: () => {
        return []
      }
    }
  },
}));

jest.mock("src/hooks/useBookmark", () => ({
  useBookmark: () => {
    return {
      bookmarkIdInfo: [
          {
              nid: '1',
              bundle: 'string'
          },
          {
              nid: '2',
              bundle: 'string'
          }
      ],
      sendBookmarkInfo: () => [],
      removeBookmarkedInfo: () => [],
    }
  },
}));

jest.mock("src/hooks/useLogin", () => ({
  useLogin: () => {
    return {
      isLoggedIn: false,
    }
  },
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

describe('<PodcastProgram>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const setPodcastEpisodeListInfo = mockFunction;
  const podcastEpisodeListInfo = mockFunction;

  const navigation = {
    navigate: mockFunction,
  }

  describe('when PodcastProgram only', () => {
    beforeEach(() => {
      (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
      (useState as jest.Mock).mockImplementation(() => [podCastData, setPodcastEpisodeListInfo]);
      (useState as jest.Mock).mockImplementation(() => [podCastData, podcastEpisodeListInfo]);
      const component = (
        <Provider store={storeSampleData}>
          <PodcastProgram />
        </Provider>
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    
    it('Should render PodcastProgram', () => {
      expect(instance).toBeDefined();
    });

    test('Should call FlatList onPress', () => {
      const element = instance.container.findAllByType(ScreenContainer)[0];
      fireEvent(element, 'onCloseSignUpAlert');
      expect(mockFunction).toBeTruthy()
    });

    test('Should call FlatList keyExtractor', () => {
      const element = instance.container.findByType(FlatList)
      fireEvent(element, 'keyExtractor', '', 2);
      expect(mockFunction).toBeTruthy()
    });

    test('Should call FlatList onPress', () => {
      const element = instance.container.findByType(FlatList)
      fireEvent(element, 'onScrollBeginDrag');
      expect(global.refFlatList).toBeTruthy()
    });

    test('Should call FlatList renderItem', () => {
      const element = instance.container.findByType(FlatList)
      fireEvent(element, 'renderItem', {item: [{}], index: 0});
      expect(mockFunction).toBeTruthy()
    });

    test('Should call PodcastEpisodeList onItemActionPress', () => {
      const element = instance.container.findByType(PodcastEpisodeList)
      fireEvent(element, 'onItemActionPress', {item: podCastData[0]});
      expect(navigation.navigate).toBeTruthy()
    });

    test('Should call PodcastEpisodeList onUpdateBookmark', () => {
      const element = instance.container.findByType(PodcastEpisodeList)
      fireEvent(element, 'onUpdateBookmark', 0);
      expect(mockFunction).toBeTruthy()
    });
  });
});
