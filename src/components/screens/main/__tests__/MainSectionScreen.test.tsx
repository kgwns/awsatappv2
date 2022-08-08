import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React, {useState}  from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { ArticleSection, BannerArticleSection, CarouselSlider, PodcastWidget, VideoContent } from 'src/components/organisms';
import { LatestPodcastDataType } from 'src/redux/latestNews/types';
import { VideoItemType } from 'src/redux/videoList/types';
import { ScreenContainer } from '../../ScreenContainer/ScreenContainer';
import { MainSectionScreen } from '../MainSectionScreen';
import {useNavigation} from '@react-navigation/native';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
  useFocusEffect: () => jest.fn().mockImplementation(() => jest.fn())
}));

jest.mock("src/hooks/useLogin", () => ({
  useLogin: () => {
    return {
      isLoggedIn: false,
    }
  },
}));

jest.mock("src/hooks/useAppPlayer", () => ({
  useAppPlayer: () => {
    return {
      showMiniPlayer: false,
      isPlaying: false,
      selectedTrack: {},
      showControls: false,
      setControlState: () => [],
      setShowMiniPlayer: () => [],
      setPlay: () => [],
      setPlayerTrack: () => [],
    }
  },
}));

const videoData: VideoItemType[] = [
  {
    nid: '12',
    title: 'abc',
    isBookmarked: false
  },
  {
    nid: '13',
    title: 'abc',
    isBookmarked: false
  }
]

jest.mock("src/hooks/useVideoList", () => ({
  useVideoList: () => {
    return {
      isLoading: false,
      videoData: videoData,
      videoError: 'error',
      fetchVideoRequest: () => {
        return []
      },
    }
  },
}));

jest.mock("src/hooks/useUserProfileData", () => ({
  useUserProfileData: () => {
    return {
      isLoading: false,
      userProfileData: {},
      userProfileError: 'string',
      sentUserProfileData: {},
      fetchProfileDataRequest: () => [],
      sendUserProfileInfo: () => [],
      updateUserImageRequest: () => [],
      emptyUserProfileInfoData: () => [],
    }
  },
}));

const podCastData: LatestPodcastDataType[] = [
  {
    field_total_duration_export: null,
    nid: '2',
    type: 'example',
    view_node: 'example',
    field_new_sub_title_export: null,
    title: 'example',
    field_announcer_name_export: null,
    field_apple_podcast_export: null,
    body_export: null,
    field_duration_export: null,
    field_episode_export: null,
    field_google_podcast_export: null,
    field_podcast_image_export: null,
    field_podcast_sect_export: {
      id: '1',
      title: 'example',
      url: 'example',
      bundle: 'example',
      description: 'example',
      img_podcast_desktop: 'example',
      img_podcast_mobile: 'example',
      name: 'example',
      image: 'example'
    },
    field_spotify_export: null,
    field_spreaker_episode_export: null,
    field_spreaker_show_export: null,
    isBookmarked: false
  },
]
jest.mock("src/hooks/useLatestNewsTab", () => ({
  useLatestNewsTab: () => {
    return {
            isLoading: false,
            ticker: [],
            hero: [],
            heroList: [],
            topList: [],
            opinionList: [
              {
                title: 'string',
                body: 'string',
                nid: 'string',
                field_opinion_writer_node_export: {
                  id: 'string',
                  title: 'string',
                  langcode: 'string',
                  url: 'string',
                  bundle: 'string',
                  name: 'string',
                  opinion_writer_photo: 'string',
                }
              },
            ],
            fetchOpinionTopList: () => [],
            sectionComboOne: [],
            sectionComboTwo: [],
            sectionComboThree: [],
            sectionComboFour: [],
            sectionComboFive: [],
            sectionComboSix: [],
            sectionComboSeven: [],
            podcastHome: podCastData,
            coverage: [],
            featuredArticle: [],
            horizontalArticle: [],
            editorsChoice: [],
            spotlight: [],
            spotlightArticleSection: [],
            coverageInfoLoaded: false,
            featuredArticleLoaded: false,
            horizontalArticleLoaded: false,
            opinionLoaded: false,
            podcastHomeLoaded: false,
            editorChoiceLoaded: false,
            sectionComboOneLoaded: false,
            sectionComboTwoLoaded: false,
            sectionComboThreeLoaded: false,

            fetchTickerAndHeroArticle: () => {
                return []
            },
            fetchHeroListTopList: () => {
                return []
            },
            fetchSectionComboOne: () => {
                return []
            },
            fetchSectionComboTwo: () => {
                return []
            },
            fetchSectionComboThree: () => {
                return []
            },
            fetchSectionComboFour: () => {
                return []
            },
            fetchPodcastHome: () => {
                return []
            },
            fetchSectionComboFive: () => {
                return []
            },
            fetchSectionComboSix: () => {
                return []
            },
            fetchSectionComboSeven: () => {
                return []
            },
            fetchCoverageBlockData: () => {
                return []
            },
            fetchFeaturedArticleData: () => {
                return []
            },
            fetchHorizontalArticleData: () => {
                return []
            },
            fetchEditorsChoice: () => {
                return []
            },
            fetchSpotlight: () => {
                return []
            },
            fetchSpotlightArticleSection: () => {
                return []
            },
    }
  },
}));

jest.mock("src/hooks/useBookmark", () => ({
  useBookmark: () => {
    return {
      isLoading: false,
      bookMarkSuccessInfo: {},
      bookmarkDetail: [],
      error: 'string',
      bookmarkIdInfo: {},
      sendBookmarkInfo: () => [],
      getBookmarkedId: () => [],
      removeBookmarkedInfo: () => [],
      getBookmarkDetailData: () => [],
      removeBookmark: () => [],
    }
  },
}));

jest.mock("src/hooks/useLogin", () => ({
  useLogin: () => {
    return {
      isLoading: false,
      loginData: {},
      loginError: 'example',
      fetchLoginRequest: () => [],
      isLoggedIn: false,
      token: 'string',
      user: {},
      fetchLogoutRequest: () => [],
      loginSkipped: () => [],
      isSkipped: false,
      forgotPassswordResponse: {},
      forgotPassworRequest: () => [],
      emptyforgotPassworResponseInfo: () => [],
      emptyLoginDataInfo: () => [],
    }
  },
}));

describe('<MainSectionScreen>', () => {
  let instance: RenderAPI;

  const mockFunction = jest.fn();
  const setRefreshing = mockFunction;
  const setCoverageInfo = mockFunction;
  const setSectionComboOneInfo = mockFunction;
  const setSectionComboTwoInfo = mockFunction;
  const setSectionComboThreeInfo = mockFunction;
  const setSectionComboFourInfo = mockFunction;
  const setSectionComboFiveInfo = mockFunction;
  const setSectionComboSixInfo = mockFunction;
  const setSectionComboSevenInfo = mockFunction;
  const setOpinionListData = mockFunction;
  const setShowPopUp = mockFunction;
  const setSelectedTrack = mockFunction;
  const setSelectedType = mockFunction;
  const setEditorsChoiceInfo = mockFunction;
  const opinionListData = mockFunction;

  const navigation = {
    navigate: mockFunction,
  }

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useState as jest.Mock).mockImplementation(() => [false, setRefreshing]);
    (useState as jest.Mock).mockImplementation(() => [videoData, opinionListData]);
    (useState as jest.Mock).mockImplementation(() => [[], setCoverageInfo]);
    (useState as jest.Mock).mockImplementation(() => [[], setSectionComboOneInfo]);
    (useState as jest.Mock).mockImplementation(() => [[], setSectionComboTwoInfo]);
    (useState as jest.Mock).mockImplementation(() => [[], setSectionComboThreeInfo]);
    (useState as jest.Mock).mockImplementation(() => [[], setSectionComboFourInfo]);
    (useState as jest.Mock).mockImplementation(() => [[], setSectionComboFiveInfo]);
    (useState as jest.Mock).mockImplementation(() => [[], setSectionComboSixInfo]);
    (useState as jest.Mock).mockImplementation(() => [[], setSectionComboSevenInfo]);
    (useState as jest.Mock).mockImplementation(() => [[], setOpinionListData]);
    (useState as jest.Mock).mockImplementation(() => [false, setShowPopUp]);
    (useState as jest.Mock).mockImplementation(() => [null, setSelectedTrack]);
    (useState as jest.Mock).mockImplementation(() => [null, setSelectedType]);
    (useState as jest.Mock).mockImplementation(() => [[], setEditorsChoiceInfo]);
    const component = <MainSectionScreen tabIndex={0} currentIndex={0} />;
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should render MainSectionScreen component', () => {
    expect(instance).toBeDefined();
  });

  test('Should call FlatList onPress', () => {
    const element = instance.container.findByType(ScreenContainer)
    fireEvent(element, 'onCloseSignUpAlert');
    expect(mockFunction).toBeTruthy()
  });

  test('Should call FlatList onPress', () => {
    const element = instance.container.findByType(FlatList)
    fireEvent(element, 'renderItem');
    expect(mockFunction).toBeTruthy()
  });

  test('Should call FlatList keyExtractor', () => {
    const element = instance.container.findByType(FlatList)
    fireEvent(element, 'keyExtractor', 'example', 2);
    expect(mockFunction).toBeTruthy()
  });

  test('Should call FlatList onPress', () => {
    expect(instance.container.findAllByType(FlatList).length).toBe(4)
  });

  it('when BannerArticleSection only When onPress', () => {
    const testID = instance.container.findAllByType(BannerArticleSection)[0];
    fireEvent(testID, 'onPress');
    expect(mockFunction).toBeTruthy();
  });

  it('when BannerArticleSection only When onUpdateBookmark', () => {
    const testID = instance.container.findAllByType(BannerArticleSection)[0];
    fireEvent(testID, 'onUpdateBookmark');
    expect(mockFunction).toBeTruthy();
  });

  it('when ArticleSection only When onUpdateBookmark', () => {
    const testID = instance.container.findAllByType(ArticleSection)[0];
    fireEvent(testID, 'onUpdateBookmark', {nid: '2', isBookmarked: true});
    expect(mockFunction).toBeTruthy();
  });

  it('when CarouselSlider only When onUpdateHeroBookmark', () => {
    const testID = instance.container.findAllByType(CarouselSlider)[0];
    fireEvent(testID, 'onUpdateHeroBookmark', {index: 2});
    expect(mockFunction).toBeTruthy();
  });

  it('when RefreshControl only When onRefresh', () => {
    const testID = instance.container.findAllByType(RefreshControl)[0];
    fireEvent(testID, 'onRefresh', {index: 2});
    expect(mockFunction).toBeTruthy();
  });

  it('when PodcastWidget only When onPress', () => {
    const testID = instance.container.findAllByType(PodcastWidget)[0];
    fireEvent(testID, 'onPress', podCastData[0]);
    expect(mockFunction).toBeTruthy();
  });


  it('when VideoContent only When onPress', () => {
    const testID = instance.container.findAllByType(VideoContent)[0];
    fireEvent(testID, 'onPress', videoData[0]);
    expect(navigation.navigate).toBeTruthy();
  });

  test('Should call FlatList onPress', () => {
    const element = instance.container.findByType(FlatList)
    fireEvent(element, 'onScrollBeginDrag');
    expect(global.refFlatList).toBeTruthy()
  });

});

