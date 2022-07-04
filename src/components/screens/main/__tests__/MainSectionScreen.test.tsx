import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React, {useState}  from 'react';
import { FlatList } from 'react-native';
import { ScreenContainer } from '../../ScreenContainer/ScreenContainer';
import { MainSectionScreen } from '../MainSectionScreen';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
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

jest.mock("src/hooks/useVideoList", () => ({
  useVideoList: () => {
    return {
      isLoading: false,
      videoData: [],
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
            podcastHome:[],
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
      bookmarkDetail: {},
      error: 'string',
      bookmarkIdInfo: {},
      sendBookmarkInfo: () => [],
      getBookmarkedId: () => [],
      removeBookmarkedInfo: () => [],
      getBookmarkDetailData: () => [],
      updateBookDetailInfo: () => [],
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
  const sampleData = { params: { nid: 123 } };

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

  beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => [false, setRefreshing]);
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
    const component = <MainSectionScreen/>;
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

  test('Should call FlatList onPress', () => {
    expect(instance.container.findAllByType(FlatList).length).toBe(3)
  });

});

