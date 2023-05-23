import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import React, { useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { ArticleSection, BannerArticleSection, CarouselSlider, PodcastWidget } from 'src/components/organisms';
import { EditorsChoiceDataType, HomePageArticleType, LatestArticleDataType, LatestPodcastDataType, MainSectionBlockType } from 'src/redux/latestNews/types';
import { VideoItemType } from 'src/redux/videoList/types';
import { ScreenContainer } from '../../ScreenContainer/ScreenContainer';
import { MainSectionScreen } from '../MainSectionScreen';
import { useNavigation } from '@react-navigation/native';
import AuthorSlider from 'src/components/organisms/AuthorSlider';
import { useAppPlayer, useLogin } from 'src/hooks';
import MainSectionShortArticle from 'src/components/organisms/MainSectionShortArticle';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: false,
}));

jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: false,
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
  useFocusEffect: () => jest.fn().mockImplementation(() => jest.fn()),
  useIsFocused: () => jest.fn()
}));

jest.mock('src/hooks/useLogin', () => ({ useLogin: jest.fn() }));
jest.mock('src/hooks/useAppPlayer', () => ({ useAppPlayer: jest.fn() }));

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

// jest.mock('src/shared/utils/utilities', () => ({ 
//   ...jest.requireActual('react'),
//   isNonEmptyArray: jest.fn().mockReturnValue(true) }));

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

jest.mock("react-native-track-player", () => ({
  play: jest.fn(),
  Event: ['PlaybackState', 'PlaybackError', 'PlaybackQueueEnded'],
  usePlaybackState: jest.fn(),
  useProgress: jest.fn().mockReturnValue({ duration: 43 }),
  useTrackPlayerEvents: jest.fn(),
  pause: jest.fn(),
  State: ['Playing', 'Buffering']
}))

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
    news_categories: {
      id: '1',
      title: 'abc',
      url: 'acs',
      bundle: 'abc',
      name: 'example',
    },
    author: 'example',
    created: 'example',
    isBookmarked: true,
    type: HomePageArticleType.ARTICLE,
    blockName: 'example',
    position: 'example',
    displayType: 'example',
  },
  {
    body: 'example',
    title: 'example',
    nid: '2',
    image: 'example',
    news_categories: {
      id: '1',
      title: 'abc',
      url: 'acs',
      bundle: 'abc',
      name: 'example',
    },
    author: 'example',
    created: 'example',
    isBookmarked: true,
    type: HomePageArticleType.ARTICLE,
    blockName: 'example',
    position: 'example',
    displayType: 'example',
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
      sectionComboEight: latestArticleData,
      podcastHome: podCastData,
      infoGraphicBlock: latestArticleData,
      coverage: [],
      featuredArticle: latestArticleData,
      horizontalArticle: [],
      editorsChoice: EditorsChoiceDataTypeData,
      archivedArticleSection: latestArticleData,
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
      infoGraphicBlockInfoLoaded:true,

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
      fetchSectionComboEight: () => {
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
      fetchInfoGraphicBlockData: () => {
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
      fetchArchivedArticleSection: () => {
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
      validateBookmark: () => true,
    }
  },
}));

describe('<MainSectionScreen>', () => {
  let instance: RenderAPI;

  const mockFunction = jest.fn();

  const refreshing = mockFunction;
  const coverageInfo = mockFunction;
  const sectionComboOneInfo = mockFunction;
  const sectionComboTwoInfo = mockFunction;
  const sectionComboThreeInfo = mockFunction;
  const sectionComboFourInfo = mockFunction;
  const sectionComboFiveInfo = mockFunction;
  const sectionComboSixInfo = mockFunction;
  const sectionComboSevenInfo = mockFunction;
  const opinionListData = mockFunction;
  const showupUp = mockFunction;
  const selectedTrack = mockFunction;
  const selectedType = mockFunction;
  const editorsChoiceInfo = mockFunction;
  const useLoginMock = mockFunction;
  const useAppPlayerMock = mockFunction;

  const navigation = {
    navigate: mockFunction,
  }

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useLogin as jest.Mock).mockImplementation(useLoginMock);
    (useAppPlayer as jest.Mock).mockImplementation(useAppPlayerMock);
    (useState as jest.Mock).mockImplementation(() => [true, refreshing]);
    (useState as jest.Mock).mockImplementation(() => [videoData, opinionListData]);
    (useState as jest.Mock).mockImplementation(() => [MainSectionBlockTypeData, coverageInfo]);
    (useState as jest.Mock).mockImplementation(() => [latestArticleData, sectionComboOneInfo]);
    (useState as jest.Mock).mockImplementation(() => [latestArticleData, sectionComboTwoInfo]);
    (useState as jest.Mock).mockImplementation(() => [latestArticleData, sectionComboThreeInfo]);
    (useState as jest.Mock).mockImplementation(() => [latestArticleData, sectionComboFourInfo]);
    (useState as jest.Mock).mockImplementation(() => [latestArticleData, sectionComboFiveInfo]);
    (useState as jest.Mock).mockImplementation(() => [latestArticleData, sectionComboSixInfo]);
    (useState as jest.Mock).mockImplementation(() => [latestArticleData, sectionComboSevenInfo]);
    (useState as jest.Mock).mockImplementation(() => [latestArticleData, opinionListData]);
    (useState as jest.Mock).mockImplementation(() => [true, showupUp]);
    (useState as jest.Mock).mockImplementation(() => ['12', selectedTrack]);
    (useState as jest.Mock).mockImplementation(() => ['abc', selectedType]);
    (useState as jest.Mock).mockImplementation(() => [EditorsChoiceDataTypeData, editorsChoiceInfo]);
    useLoginMock.mockReturnValue({
      isLoggedIn: true,
    });
    useAppPlayerMock.mockReturnValue({
      showMiniPlayer: false,
      isPlaying: false,
      selectedTrack: {
        id: 1,
        selectedTrack: {
          id: 1,
          artwork: 'abc.com'
        },
      },
      showControls: false,
      setControlState: () => [],
      setShowMiniPlayer: () => [],
      setPlay: () => [],
      setPlayerTrack: () => [],
    });
    const component = (
      <GestureHandlerRootView>
        <MainSectionScreen tabIndex={0} currentIndex={0} />
      </GestureHandlerRootView>
    )
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should render MainSectionScreen component', () => {
    expect(instance).toBeDefined();
  });

  it("should call ArticleSection onUpdateBookmark",() =>{
    const element = instance.container.findByType(ArticleSection)
    fireEvent(element, 'onUpdateBookmark','21',true);
    expect(mockFunction).toBeTruthy()
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
    expect(instance.container.findAllByType(FlatList).length).toBe(17)
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

  it('when CarouselSlider only When onUpdateHeroBookmark', () => {
    const testID = instance.container.findAllByType(CarouselSlider)[0];
    fireEvent(testID, 'onUpdateHeroBookmark', { index: 2 });
    expect(mockFunction).toBeTruthy();
  });

  it('when RefreshControl only When onRefresh', () => {
    const testID = instance.container.findAllByType(RefreshControl)[0];
    fireEvent(testID, 'onRefresh', { index: 2 });
    expect(refreshing).toBeTruthy();
  });

  it('when PodcastWidget only When onPress', () => {
    const testID = instance.container.findAllByType(PodcastWidget)[0];
    fireEvent(testID, 'onPress', podCastData[0]);
    expect(mockFunction).toBeTruthy();
  });

  it('when PodcastWidget only When onMorePress', () => {
    const testID = instance.container.findAllByType(PodcastWidget)[0];
    fireEvent(testID, 'onMorePress', podCastData[0]);
    expect(mockFunction).toBeTruthy();
  });


  // Video Widget reemoved from UI
  // it('when VideoContent only When onPress', () => {
  //   const testID = instance.container.findAllByType(VideoContent)[0];
  //   fireEvent(testID, 'onPress', videoData[0]);
  //   expect(navigation.navigate).toBeTruthy();
  // });

  test('Should call FlatList onPress', () => {
    const element = instance.container.findByType(FlatList)
    fireEvent(element, 'onScrollBeginDrag');
    expect(global.refFlatList).toBeTruthy()
  });

  it('when AuthorSlider only When onClose', () => {
    const testID = instance.container.findAllByType(AuthorSlider)[0];
    fireEvent(testID, 'onClose');
    expect(mockFunction).toBeTruthy();
  });

  it('when AuthorSlider only When getSelectedTrack', () => {
    const testID = instance.container.findAllByType(AuthorSlider)[0];
    fireEvent(testID, 'getSelectedTrack', '12', 'PODCAST');
    expect(mockFunction).toBeTruthy();
  });

  it('when AuthorSlider only When getSelectedTrack', () => {
    const testID = instance.container.findAllByType(AuthorSlider)[0];
    fireEvent(testID, 'getSelectedTrack', '1', 'OPINION');
    expect(mockFunction).toBeTruthy();
  });

});

describe('<MainSectionScreen>', () => {
  let instance: RenderAPI;

  const mockFunction = jest.fn();

  const refreshing = mockFunction;
  const coverageInfo = mockFunction;
  const sectionComboOneInfo = mockFunction;
  const sectionComboTwoInfo = mockFunction;
  const sectionComboThreeInfo = mockFunction;
  const sectionComboFourInfo = mockFunction;
  const sectionComboFiveInfo = mockFunction;
  const sectionComboSixInfo = mockFunction;
  const sectionComboSevenInfo = mockFunction;
  const opinionListData = mockFunction;
  const showupUp = mockFunction;
  const selectedTrack = mockFunction;
  const selectedType = mockFunction;
  const editorsChoiceInfo = mockFunction;
  const useLoginMock = mockFunction;
  const useAppPlayerMock = mockFunction;

  const navigation = {
    navigate: mockFunction,
  }

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useLogin as jest.Mock).mockImplementation(useLoginMock);
    (useAppPlayer as jest.Mock).mockImplementation(useAppPlayerMock);
    (useState as jest.Mock).mockImplementation(() => [false, refreshing]);
    (useState as jest.Mock).mockImplementation(() => [[], opinionListData]);
    (useState as jest.Mock).mockImplementation(() => [[], coverageInfo]);
    (useState as jest.Mock).mockImplementation(() => [[], sectionComboOneInfo]);
    (useState as jest.Mock).mockImplementation(() => [[], sectionComboTwoInfo]);
    (useState as jest.Mock).mockImplementation(() => [[], sectionComboThreeInfo]);
    (useState as jest.Mock).mockImplementation(() => [[], sectionComboFourInfo]);
    (useState as jest.Mock).mockImplementation(() => [[], sectionComboFiveInfo]);
    (useState as jest.Mock).mockImplementation(() => [[], sectionComboSixInfo]);
    (useState as jest.Mock).mockImplementation(() => [[], sectionComboSevenInfo]);
    (useState as jest.Mock).mockImplementation(() => [[], opinionListData]);
    (useState as jest.Mock).mockImplementation(() => [false, showupUp]);
    (useState as jest.Mock).mockImplementation(() => ['12', selectedTrack]);
    (useState as jest.Mock).mockImplementation(() => ['abc', selectedType]);
    (useState as jest.Mock).mockImplementation(() => [[], editorsChoiceInfo]);
    useLoginMock.mockReturnValue({
      isLoggedIn: false,
    });
    useAppPlayerMock.mockReturnValue({
      showMiniPlayer: true,
      isPlaying: true,
      selectedTrack: {
        id: 1,
        selectedTrack: {
          id: 1,
          artwork: 'abc.com'
        },
      },
      showControls: true,
      setControlState: () => [],
      setShowMiniPlayer: () => [],
      setPlay: () => [],
      setPlayerTrack: () => [],
    });
    const component = (
      <GestureHandlerRootView>
        <MainSectionScreen tabIndex={1} currentIndex={2} />
      </GestureHandlerRootView>
    )
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should render MainSectionScreen component', () => {
    DeviceTypeUtilsMock.isTab = true;
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
    fireEvent(testID, 'onPress', '2');
    expect(mockFunction).toBeTruthy();
  });

  it('when BannerArticleSection only When onUpdateBookmark', () => {
    const testID = instance.container.findAllByType(BannerArticleSection)[7];
    fireEvent(testID, 'onUpdateBookmark');
    expect(mockFunction).toBeTruthy();
  });

  it('when CarouselSlider only When onUpdateHeroBookmark', () => {
    const testID = instance.container.findAllByType(CarouselSlider)[0];
    fireEvent(testID, 'onUpdateHeroBookmark', { index: 2 });
    expect(mockFunction).toBeTruthy();
  });

  it('when RefreshControl only When onRefresh', () => {
    const testID = instance.container.findAllByType(RefreshControl)[0];
    fireEvent(testID, 'onRefresh', { index: 2 });
    expect(refreshing).toBeTruthy();
  });

  it('when PodcastWidget only When onPress', () => {
    const testID = instance.container.findAllByType(PodcastWidget)[0];
    fireEvent(testID, 'onPress', podCastData[0]);
    expect(mockFunction).toBeTruthy();
  });

  it('when PodcastWidget only When onPress', () => {
    const testID = instance.container.findAllByType(PodcastWidget)[0];
    fireEvent(testID, 'onPress', {});
    expect(mockFunction).toBeTruthy();
  });

  it('when ShortArticle only When onPress', () => {
    const testID = instance.container.findAllByType(MainSectionShortArticle)[0];
    fireEvent(testID, 'onPress', '2');
    expect(mockFunction).toBeTruthy();
  });

  it('when ShortArticle only When onUpdateBookmark', () => {
    const testID = instance.container.findAllByType(MainSectionShortArticle)[0];
    fireEvent(testID, 'onUpdateBookmark', '2', true);
    expect(mockFunction).toBeTruthy();
  });

  it('when ShortArticle only When showSignUpPopUp', () => {
    const testID = instance.container.findAllByType(MainSectionShortArticle)[0];
    fireEvent(testID, 'showSignUpPopUp');
    expect(mockFunction).toBeTruthy();
  });

  test('Should call FlatList onPress', () => {
    const element = instance.container.findByType(FlatList)
    fireEvent(element, 'onScrollBeginDrag');
    expect(global.refFlatList).toBeTruthy()
  });
});


describe('<MainSectionScreen>', () => {
  let instance: RenderAPI;

  const mockFunction = jest.fn();
  
  const refreshing = mockFunction;
  const coverageInfo = mockFunction;
  const sectionComboOneInfo = mockFunction;
  const sectionComboTwoInfo = mockFunction;
  const sectionComboThreeInfo = mockFunction;
  const sectionComboFourInfo = mockFunction;
  const sectionComboFiveInfo = mockFunction;
  const sectionComboSixInfo = mockFunction;
  const sectionComboSevenInfo = mockFunction;
  const opinionListData = mockFunction;
  const showupUp = mockFunction;
  const selectedTrack = mockFunction;
  const selectedType = mockFunction;
  const editorsChoiceInfo = mockFunction;
  const useLoginMock = mockFunction;
  const useAppPlayerMock = mockFunction;
  const navigation = {
    navigate: mockFunction,
  }

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useLogin as jest.Mock).mockImplementation(useLoginMock);
    (useAppPlayer as jest.Mock).mockImplementation(useAppPlayerMock);
    (useState as jest.Mock).mockImplementation(() => [false, refreshing]);
    (useState as jest.Mock).mockImplementation(() => [[], opinionListData]);
    (useState as jest.Mock).mockImplementation(() => [[], coverageInfo]);
    (useState as jest.Mock).mockImplementation(() => [[], sectionComboOneInfo]);
    (useState as jest.Mock).mockImplementation(() => [[], sectionComboTwoInfo]);
    (useState as jest.Mock).mockImplementation(() => [[], sectionComboThreeInfo]);
    (useState as jest.Mock).mockImplementation(() => [[], sectionComboFourInfo]);
    (useState as jest.Mock).mockImplementation(() => [[], sectionComboFiveInfo]);
    (useState as jest.Mock).mockImplementation(() => [[], sectionComboSixInfo]);
    (useState as jest.Mock).mockImplementation(() => [[], sectionComboSevenInfo]);
    (useState as jest.Mock).mockImplementation(() => [[], opinionListData]);
    (useState as jest.Mock).mockImplementation(() => [false, showupUp]);
    (useState as jest.Mock).mockImplementation(() => ['12', selectedTrack]);
    (useState as jest.Mock).mockImplementation(() => ['abc', selectedType]);
    (useState as jest.Mock).mockImplementation(() => [[], editorsChoiceInfo]);
    useLoginMock.mockReturnValue({
      isLoggedIn: true,
    });
    const component = (
      <GestureHandlerRootView>
        <MainSectionScreen tabIndex={1} currentIndex={2} />
      </GestureHandlerRootView>
    )
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should render MainSectionScreen component', () => {
    expect(instance).toBeDefined();
  });
});
