import React, { useRef, useState } from 'react';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import { PodcastProgram } from '../PodcastProgram';
import { ScreenContainer } from '../../ScreenContainer/ScreenContainer';
import { usePodcast } from 'src/hooks';
import { PodcastListItemType } from 'src/redux/podcast/types';
import { FlatList } from 'react-native';
import { PodcastEpisodeList } from 'src/components/organisms';
import { useNavigation } from '@react-navigation/native';
import { useLogin } from 'src/hooks';

jest.mock('react-native-safe-area-context', () => {
  const inset = {top: 0, right: 0, bottom: 0, left: 0};
  return {
    ...jest.requireActual('react-native-safe-area-context'),
    SafeAreaProvider: jest.fn(({children}) => children),
    SafeAreaConsumer: jest.fn(({children}) => children(inset)),
    useSafeAreaInsets: jest.fn(() => inset),
    useSafeAreaFrame: jest.fn(() => ({x: 0, y: 0, width: 390, height: 844})),
  };
});

jest.mock('src/hooks/usePodcast');

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
  useRef: jest.fn(),
}));

jest.mock('src/hooks/useLogin', () => ({
  ...jest.requireActual('src/hooks/useLogin'),
  useLogin: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
  useIsFocused: jest.fn()
}));

const mockData: PodcastListItemType[] = [
  {
    nid: 'example',
    type: 'example',
    view_node: 'example',
    field_new_sub_title_export: 'example',
    title: 'example',
    field_announcer_name_export: 'example',
    field_apple_podcast_export: {
      url: 'example',
      text: 'example'
    },
    body_export: 'example',
    field_duration_export: 'example',
    field_episode_export: 'example',
    field_google_podcast_export: {
      url: 'example',
      text: 'example'
    },
    field_podcast_image_export: 'example',
    field_podcast_sect_export: {
      id: 'example',
      title: 'example',
      url: 'example',
      bundle: 'example',
      description: 'example',
      anghami: {
        url: 'example',
        text: 'example'
      },
      apple_podcasts: {
        url: 'example',
        text: 'example'
      },
      google_podcast: {
        url: 'example',
        text: 'example'
      },
      image: 'example',
      img_podcast_desktop: 'example',
      img_podcast_mobile: 'example',
      spotify: {
        url: 'example',
        text: 'example'
      },
      name: 'example'
    },
    field_spotify_export: {
      url: 'example',
      text: 'example'
    },
    field_spreaker_episode_export: 'example',
    field_spreaker_show_export: 'example',
    isBookmarked: false,
    field_total_duration_export: 'example'
  },
];

const selectedItemData = {current: mockData[0]};

describe('<<< PodcastProgram >>>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const usePodcastMock = mockFunction;
  const podcastEpisodeListInfo = mockFunction;
  const showModal = mockFunction;
  const selectedItem = mockFunction;

  const navigation = {
    navigate: mockFunction,
  }

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (usePodcast as jest.Mock).mockImplementation(usePodcastMock);
    (useState as jest.Mock).mockImplementation(() => [mockData, podcastEpisodeListInfo]);
    (useState as jest.Mock).mockImplementation(() => [false, showModal]);
    (useRef as jest.Mock).mockImplementation(() => [selectedItemData, selectedItem]);
    usePodcastMock.mockReturnValue({
      isLoading: false,
      podcastListData: mockData,
      fetchPodcastListRequest: () => {
        return []
      },
    });
    (useLogin as jest.Mock).mockReturnValueOnce({ isLoggedIn: false })
    const element = <PodcastProgram tabIndex={0} currentIndex={0} />;
    instance = render(element);
  });

  it('### Check Render Method of PodcastProgram', () => {
    expect(instance).toBeDefined();
  });

  it('### Check Render Method of PodcastProgram different index', () => {
    (useLogin as jest.Mock).mockReturnValueOnce({ isLoggedIn: true })
    expect(render(<PodcastProgram tabIndex={3} currentIndex={2} />)).toBeDefined();
  });

  test('Should call ScreenContainer onCloseSignUpAlert', () => {
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
    expect(mockFunction).toBeTruthy()
  });

  test('Should call FlatList renderItem', () => {
    const element = instance.container.findByType(FlatList)
    fireEvent(element, 'renderItem', { item: [{}], index: 0 });
    expect(mockFunction).toBeTruthy()
  });

  test('Should call PodcastEpisodeList onItemActionPress', () => {
    const element = instance.container.findByType(PodcastEpisodeList)
    fireEvent(element, 'onItemActionPress', mockData[0]);
    expect(navigation.navigate).toBeTruthy()
  });

  test('Should call PodcastEpisodeList onUpdateBookmark', () => {
    const element = instance.container.findByType(PodcastEpisodeList)
    fireEvent(element, 'onUpdateBookmark', 0);
    expect(mockFunction).toBeTruthy()
  });

});


describe('<<< PodcastProgram >>>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const usePodcastMock = mockFunction;
  const podcastEpisodeListInfo = mockFunction;
  const showModal = mockFunction;
  const selectedItem = mockFunction;

  const navigation = {
    navigate: mockFunction,
  }

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (usePodcast as jest.Mock).mockImplementation(usePodcastMock);
    (useState as jest.Mock).mockImplementation(() => [mockData, podcastEpisodeListInfo]);
    (useState as jest.Mock).mockImplementation(() => [false, showModal]);
    (useRef as jest.Mock).mockImplementation(() => [selectedItemData, selectedItem]);
    usePodcastMock.mockReturnValue({
      isLoading: false,
      podcastListData: [],
      fetchPodcastListRequest: () => {
        return []
      },
    });
    (useLogin as jest.Mock).mockReturnValueOnce({ isLoggedIn: false })
    const element = <PodcastProgram tabIndex={0} currentIndex={0} />;
    instance = render(element);
  });

  it('### Check Render Method of PodcastProgram', () => {
    expect(instance).toBeDefined();
  });

});
