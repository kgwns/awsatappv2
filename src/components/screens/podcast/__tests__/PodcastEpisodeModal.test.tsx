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
import { PodcastEpisodeItemType, PodcastListItemType } from 'src/redux/podcast/types';
import { useLogin } from 'src/hooks';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
  useIsFocused: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock('src/hooks/useLogin', () => ({useLogin: jest.fn()}));

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

const podcastEpisodeData: PodcastEpisodeItemType[] =[
  {
    field_duration_export_1: "2",
    nid: "abc",
    type: "abc",
    view_node: "abc",
    field_new_sub_title_export: "abc",
    title: "abc",
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
      id: "abc",
      title: "abc",
      url: "abc",
      bundle: "abc",
      description: "abc",
      img_podcast_desktop: "abc",
      img_podcast_mobile: "abc",
      name: "abc",
      image: "abc"
    },
    field_spotify_export: {
      url: "string",
      text: "string"
    },
    field_spreaker_episode_export: "abc",
    field_spreaker_show_export: "abc",
    isBookmarked: false,
    field_total_duration_export: "abc"
  },
]

jest.mock("src/hooks/usePodcast", () => ({
  usePodcast: () => {
    return {
      isLoading: true,
      podcastEpisodeData: podcastEpisodeData,
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
              nid: '29',
              bundle: 'string'
          }
      ],
      sendBookmarkInfo: () => [],
      removeBookmarkedInfo: () => [],
    }
  },
}));

jest.mock("src/hooks/useAppPlayer", () => ({
  useAppPlayer: () => {
    return {
      showMiniPlayer: true,
      selectedTrack: {id: 1},
      setShowMiniPlayer: () => [],
      setPlayerTrack: () => [],
    }
  },
}));

describe('<PodcastEpisodeModal >', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();

  const navigation = {
    reset: jest.fn(),
    navigate: jest.fn(),
    goBack: jest.fn(),
  }

  describe('when PodcastEpisode only', () => {
    const useLoginMock = mockFunction;

    beforeEach(() => {
      (useLogin as jest.Mock).mockImplementation(useLoginMock);
      (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
      (useState as jest.Mock).mockImplementation(() => [podCastData, mockFunction]);
      useLoginMock.mockReturnValue({
        isLoggedIn: false,
      });
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
    it('when onPressBookmark is pressed from PodcastEpisodeContent', () => {
      const testID = instance.container.findByType(PodcastEpisodeContent);
      fireEvent(testID, 'onPressBookmark', '2');
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

describe('<PodcastEpisode >', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();

  const setIsSaved = mockFunction;
  const podcastEpisodeDetailInfo = mockFunction;
  const podcastEpisodeListInfo = mockFunction;
  const nid = mockFunction;
  const showupUp = mockFunction;

  const navigation = {
    reset: jest.fn(),
    navigate: jest.fn(),
    goBack: jest.fn(),
  }

  describe('when PodcastEpisode only', () => {
    const useLoginMock = mockFunction;

    beforeEach(() => {
      (useLogin as jest.Mock).mockImplementation(useLoginMock);
      (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
      (useState as jest.Mock).mockImplementation(() => ["29", nid]);
      (useState as jest.Mock).mockImplementation(() => [true, showupUp]);
      (useState as jest.Mock).mockImplementation(() => [podCastData, podcastEpisodeDetailInfo]);
      (useState as jest.Mock).mockImplementation(() => [podCastData, podcastEpisodeListInfo]);
      useLoginMock.mockReturnValue({
        isLoggedIn: false,
      });
      const component = (
        <Provider store={storeSampleData}>
          <SafeAreaProvider>
            <PodcastEpisode  route={{ params: { data: PodcastEpisodeData, podcastListData: [] } }}/>
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
    it('when onPressBookmark is pressed from PodcastEpisodeContent', () => {
      const testID = instance.container.findByType(PodcastEpisodeContent);
      fireEvent(testID, 'onPressBookmark', '2');
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

describe('<PodcastEpisode >', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();

  const podcastEpisodeDetailInfo = mockFunction;
  const podcastEpisodeListInfo = mockFunction;
  const nid = mockFunction;
  const showupUp = mockFunction;

  const navigation = {
    reset: jest.fn(),
    navigate: jest.fn(),
    goBack: jest.fn(),
  }

  describe('when PodcastEpisode only', () => {
    const useLoginMock = mockFunction;

    beforeEach(() => {
      (useLogin as jest.Mock).mockImplementation(useLoginMock);
      (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
      (useState as jest.Mock).mockImplementation(() => ["29", nid]);
      (useState as jest.Mock).mockImplementation(() => [true, showupUp]);
      (useState as jest.Mock).mockImplementation(() => [podCastData, podcastEpisodeDetailInfo]);
      (useState as jest.Mock).mockImplementation(() => [podCastData, podcastEpisodeListInfo]);
      useLoginMock.mockReturnValue({
        isLoggedIn: true,
      });
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
    it('when onPressBookmark is pressed from PodcastEpisodeContent', () => {
      const testID = instance.container.findByType(PodcastEpisodeContent);
      fireEvent(testID, 'onPressBookmark', '2');
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
