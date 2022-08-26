import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React, {useState}  from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { ArticleSection, BannerArticleSection, CarouselSlider, PodcastWidget, VideoContent } from 'src/components/organisms';
import { EditorsChoiceDataType, LatestArticleDataType, LatestPodcastDataType, MainSectionBlockType } from 'src/redux/latestNews/types';
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
      selectedTrack: {
        id: 1
      },
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
    isBookmarked: true
  },
  {
    nid: '13',
    title: 'abc',
    isBookmarked: true
  }
]

jest.mock("src/hooks/useVideoList", () => ({
  useVideoList: () => {
    return {
      isLoading: true,
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
    field_spotify_export: {
      url: "string",
      text: "string"
    },
    field_spreaker_episode_export: 'url',
    field_spreaker_show_export: "abc",
    isBookmarked: true
  },
]

const MainSectionBlockTypeData: MainSectionBlockType[] = [
  {
    body: 'example',
    title: 'example',
    nid: '1',
    image: 'example',
    news_categories : {
      id: '1',
      title: 'abc',
      url: 'acs',
      bundle: 'abc',
      name: 'example',
    },
    author: 'example',
    created: 'example',
    isBookmarked: true,
    type: 'example',
    blockName: 'example',
    position: 'example',
  },
  {
    body: 'example',
    title: 'example',
    nid: '2',
    image: 'example',
    news_categories : {
      id: '1',
      title: 'abc',
      url: 'acs',
      bundle: 'abc',
      name: 'example',
    },
    author: 'example',
    created: 'example',
    isBookmarked: true,
    type: 'example',
    blockName: 'example',
    position: 'example',
  },
]

const EditorsChoiceDataTypeData: EditorsChoiceDataType[] = [
  {
    field_news_categories: {
      id: '1',
      title: 'example',
      url: 'example',
      bundle: 'example',
      name: 'example',
    },
    created: 'example',
    publication_date: 'example',
    type: 'example',
    blockname: 'example',
    entityqueue_relationship_position: 'example',
    title: 'example',
    body: 'example',
    nid: '11',
    image: 'example',
    news_categories: {
      id: '1',
      title: 'example',
      url: 'example',
      bundle: 'example',
      name: 'example',
    },
    author: 'example',
    isBookmarked: true
  },
  {
    field_news_categories: {
      id: '2',
      title: 'example',
      url: 'example',
      bundle: 'example',
      name: 'example',
    },
    created: 'example',
    publication_date: 'example',
    type: 'example',
    blockname: 'example',
    entityqueue_relationship_position: 'example',
    title: 'example',
    body: 'example',
    nid: '12',
    image: 'example',
    news_categories: {
      id: '2',
      title: 'example',
      url: 'example',
      bundle: 'example',
      name: 'example',
    },
    author: 'example',
    isBookmarked: true
  },
]

const latestArticleData: LatestArticleDataType[] = [
  {
    title:
      'غرق عشرات المهاجرين بالقنال الإنجليزي… لندن وباريس يتبادلات الاتهامات',
    image: 'https://picsum.photos/300/200',
    nid: '2',
    author: 'أمريكا',
    created: 'أمريكا',
    body: 'تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، اليوم الأربعاء، بدعم مجموعة من المخترقين نفذوا هجمات ببرامج فدية تستهدف أشخاصًا في الولايات المتحدة وأستراليا.',
    isBookmarked: true,
    news_categories: {
      id: 'example',
      title: 'example',
      url: 'example',
      bundle: 'example',
      name: 'example',
    }
  },
  {
    title:
      'غرق عشرات المهاجرين بالقنال الإنجليزي… لندن وباريس يتبادلات الاتهامات',
    image: 'https://picsum.photos/300/200',
    nid: '2',
    author: 'أمريكا',
    created: 'أمريكا',
    body: 'تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، اليوم الأربعاء، بدعم مجموعة من المخترقين نفذوا هجمات ببرامج فدية تستهدف أشخاصًا في الولايات المتحدة وأستراليا.',
    isBookmarked: true,
    news_categories: {
      id: 'example',
      title: 'example',
      url: 'example',
      bundle: 'example',
      name: 'example',
    },
  },
  {
    title:
      'غرق عشرات المهاجرين بالقنال الإنجليزي… لندن وباريس يتبادلات الاتهامات',
    image: 'https://picsum.photos/300/200',
    nid: '2',
    author: 'أمريكا',
    created: 'أمريكا',
    body: 'تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، اليوم الأربعاء، بدعم مجموعة من المخترقين نفذوا هجمات ببرامج فدية تستهدف أشخاصًا في الولايات المتحدة وأستراليا.',
    isBookmarked: true,
    news_categories: {
      id: 'example',
      title: 'example',
      url: 'example',
      bundle: 'example',
      name: 'example',
    },
  },
];

jest.mock("src/hooks/useLatestNewsTab", () => ({
  useLatestNewsTab: () => {
    return {
            ticker: latestArticleData,
            hero: latestArticleData,
            heroList: latestArticleData,
            topList: latestArticleData,
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
            sectionComboOne: latestArticleData,
            sectionComboTwo: latestArticleData,
            sectionComboThree: latestArticleData,
            sectionComboFour: latestArticleData,
            sectionComboFive: latestArticleData,
            sectionComboSix: latestArticleData,
            sectionComboSeven: latestArticleData,
            podcastHome: podCastData,
            coverage: MainSectionBlockTypeData,
            featuredArticle: MainSectionBlockTypeData,
            horizontalArticle: MainSectionBlockTypeData,
            editorsChoice: EditorsChoiceDataTypeData,
            spotlight: [
              {
                title: 'example',
                field_tag_spotlight_export: {
                  id: '11',
                  title: 'example',
                  bundle: 'example',
                  name: 'example',
                },
                field_image: 'example',
              },
              {
                title: 'example',
                field_tag_spotlight_export: {
                  id: '12',
                  title: 'example',
                  bundle: 'example',
                  name: 'example',
                },
                field_image: 'example',
              },
            ],
            spotlightArticleSection: latestArticleData,
            coverageInfoLoaded: true,
            featuredArticleLoaded: true,
            horizontalArticleLoaded: true,
            opinionLoaded: true,
            podcastHomeLoaded: true,
            editorChoiceLoaded: true,
            sectionComboOneLoaded: true,
            sectionComboTwoLoaded: true,
            sectionComboThreeLoaded: true,

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
      bookMarkSuccessInfo: {},
      bookmarkDetail: [],
      error: 'string',
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
    (useState as jest.Mock).mockImplementation(() => [latestArticleData, setSectionComboOneInfo]);
    (useState as jest.Mock).mockImplementation(() => [latestArticleData, setSectionComboTwoInfo]);
    (useState as jest.Mock).mockImplementation(() => [latestArticleData, setSectionComboThreeInfo]);
    (useState as jest.Mock).mockImplementation(() => [latestArticleData, setSectionComboFourInfo]);
    (useState as jest.Mock).mockImplementation(() => [latestArticleData, setSectionComboFiveInfo]);
    (useState as jest.Mock).mockImplementation(() => [latestArticleData, setSectionComboSixInfo]);
    (useState as jest.Mock).mockImplementation(() => [latestArticleData, setSectionComboSevenInfo]);
    (useState as jest.Mock).mockImplementation(() => [latestArticleData, setOpinionListData]);
    (useState as jest.Mock).mockImplementation(() => [false, setShowPopUp]);
    (useState as jest.Mock).mockImplementation(() => [null, setSelectedTrack]);
    (useState as jest.Mock).mockImplementation(() => [null, setSelectedType]);
    (useState as jest.Mock).mockImplementation(() => [[], setEditorsChoiceInfo]);
    const component = <MainSectionScreen tabIndex={1} currentIndex={1} />;
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
    expect(instance.container.findAllByType(FlatList).length).toBe(6)
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

  it('when BannerArticleSection only When onPress', () => {
    const testID = instance.container.findAllByType(BannerArticleSection)[1];
    fireEvent(testID, 'onPress');
    expect(mockFunction).toBeTruthy();
  });

  it('when BannerArticleSection only When onUpdateBookmark', () => {
    const testID = instance.container.findAllByType(BannerArticleSection)[1];
    fireEvent(testID, 'onUpdateBookmark');
    expect(mockFunction).toBeTruthy();
  });

  it('when BannerArticleSection only When onPress', () => {
    const testID = instance.container.findAllByType(BannerArticleSection)[2];
    fireEvent(testID, 'onPress');
    expect(mockFunction).toBeTruthy();
  });

  it('when BannerArticleSection only When onUpdateBookmark', () => {
    const testID = instance.container.findAllByType(BannerArticleSection)[2];
    fireEvent(testID, 'onUpdateBookmark');
    expect(mockFunction).toBeTruthy();
  });

  it('when BannerArticleSection only When onPress', () => {
    const testID = instance.container.findAllByType(BannerArticleSection)[3];
    fireEvent(testID, 'onPress');
    expect(mockFunction).toBeTruthy();
  });

  it('when BannerArticleSection only When onUpdateBookmark', () => {
    const testID = instance.container.findAllByType(BannerArticleSection)[3];
    fireEvent(testID, 'onUpdateBookmark');
    expect(mockFunction).toBeTruthy();
  });

  it('when BannerArticleSection only When onPress', () => {
    const testID = instance.container.findAllByType(BannerArticleSection)[4];
    fireEvent(testID, 'onPress');
    expect(mockFunction).toBeTruthy();
  });

  it('when BannerArticleSection only When onUpdateBookmark', () => {
    const testID = instance.container.findAllByType(BannerArticleSection)[4];
    fireEvent(testID, 'onUpdateBookmark');
    expect(mockFunction).toBeTruthy();
  });

  it('when BannerArticleSection only When onPress', () => {
    const testID = instance.container.findAllByType(BannerArticleSection)[5];
    fireEvent(testID, 'onPress');
    expect(mockFunction).toBeTruthy();
  });

  it('when BannerArticleSection only When onUpdateBookmark', () => {
    const testID = instance.container.findAllByType(BannerArticleSection)[5];
    fireEvent(testID, 'onUpdateBookmark');
    expect(mockFunction).toBeTruthy();
  });

  it('when BannerArticleSection only When onPress', () => {
    const testID = instance.container.findAllByType(BannerArticleSection)[6];
    fireEvent(testID, 'onPress');
    expect(mockFunction).toBeTruthy();
  });

  it('when BannerArticleSection only When onUpdateBookmark', () => {
    const testID = instance.container.findAllByType(BannerArticleSection)[6];
    fireEvent(testID, 'onUpdateBookmark');
    expect(mockFunction).toBeTruthy();
  });

  it('when BannerArticleSection only When onPress', () => {
    const testID = instance.container.findAllByType(BannerArticleSection)[7];
    fireEvent(testID, 'onPress');
    expect(mockFunction).toBeTruthy();
  });

  it('when BannerArticleSection only When onUpdateBookmark', () => {
    const testID = instance.container.findAllByType(BannerArticleSection)[7];
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
    expect(setRefreshing).toBeTruthy();
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

