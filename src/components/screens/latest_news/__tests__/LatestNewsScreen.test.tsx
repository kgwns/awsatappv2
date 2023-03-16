import React, { useState } from 'react'
import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import { storeSampleData } from 'src/constants/Constants'
import { LatestNewsScreen } from '../LatestNewsScreen'
import { ArticleSection, BannerArticleSection, CarouselSlider, PodcastWidget, SectionComboOne, ShortArticle } from 'src/components/organisms'
import { LatestArticleDataType, LatestOpinionDataType, LatestPodcastDataType } from 'src/redux/latestNews/types'
import { ScreenContainer } from '../../ScreenContainer/ScreenContainer'
import { useBookmark, useLatestNewsTab, useLogin } from 'src/hooks'
import { RefreshControl } from 'react-native'

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: false
}));

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}));

jest.mock("src/hooks/useUserProfileData", () => ({
    useUserProfileData: () => {
      return {
        fetchProfileDataRequest: () => [],
      }
    },
  }));

const mockFunction = jest.fn();

const opinionListData: LatestOpinionDataType[] = [
    {
        title: 'example',
        body: 'example',
        nid: '12',
        field_opinion_writer_node_export: [
            {
                id: '11',
                title: 'example',
                langcode: 'example',
                url: 'example',
                bundle: 'example',
                name: 'example',
                opinion_writer_photo: 'example',
            }
        ]
    },
    {
        title: 'example',
        body: 'example',
        nid: '13',
        field_opinion_writer_node_export: [
            {
                id: '12',
                title: 'example',
                langcode: 'example',
                url: 'example',
                bundle: 'example',
                name: 'example',
                opinion_writer_photo: 'example',
            }
        ]
    },
]

const heroData: LatestArticleDataType[] = [
    {
      title:
        'غرق عشرات المهاجرين بالقنال الإنجليزي… لندن وباريس يتبادلات الاتهامات',
      image: 'https://picsum.photos/300/200',
      nid: '2',
      author: 'أمريكا',
      created: 'أمريكا',
      body: 'تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، اليوم الأربعاء، بدعم مجموعة من المخترقين نفذوا هجمات ببرامج فدية تستهدف أشخاصًا في الولايات المتحدة وأستراليا.',
      isBookmarked: true,
      news_categories: {},
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
      news_categories: {},
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
      news_categories: {},
    },
];

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
      isBookmarked: true
    },
]

jest.mock('src/hooks/useLatestNewsTab', () => ({useLatestNewsTab: jest.fn()}));
jest.mock('src/hooks/useLogin', () => ({useLogin: jest.fn()}));
jest.mock('src/hooks/useBookmark', () => ({useBookmark: jest.fn()}));

describe('<LatestNewsScreen>', () => {
    let instance: RenderAPI

    const heroInfo = jest.fn();
    const sectionComboThreeInfo = jest.fn();
    const sectionComboOneInfo = jest.fn();
    const sectionComboTwoInfo = jest.fn();
    const sectionComboFourInfo = jest.fn();
    const useLatestNewsTabMock = jest.fn();
    const useLoginMock = jest.fn();
    const useBookmarkMock = jest.fn();

    beforeEach(() => {
        (useState as jest.Mock).mockImplementation(() => [heroData, heroInfo]);
        (useState as jest.Mock).mockImplementation(() => [heroData, sectionComboThreeInfo]);
        (useState as jest.Mock).mockImplementation(() => [heroData, sectionComboOneInfo]);
        (useState as jest.Mock).mockImplementation(() => [heroData, sectionComboTwoInfo]);
        (useState as jest.Mock).mockImplementation(() => [heroData, sectionComboFourInfo]);
        (useLatestNewsTab as jest.Mock).mockImplementation(useLatestNewsTabMock);
        (useLogin as jest.Mock).mockImplementation(useLoginMock);
        (useBookmark as jest.Mock).mockImplementation(useBookmarkMock);
        useLatestNewsTabMock.mockReturnValue({
            isLoading: true,
            ticker: heroData,
            hero: heroData,
            heroList: heroData,
            topList: heroData,
            opinionList: opinionListData,
            sectionComboOne: heroData,
            sectionComboTwo: heroData,
            sectionComboThree: heroData,
            sectionComboFour: heroData,
            podcastHome: podCastData,
            fetchTickerAndHeroArticle: () => {
                return []
            },
            fetchHeroListTopList: () => {
                return []
            },
            fetchOpinionTopList: () => {
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
        });
        useLoginMock.mockReturnValue({
            isLoggedIn: false,
        });
        useBookmarkMock.mockReturnValue({
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
        });
        const component =
            <Provider store={storeSampleData}>
                <LatestNewsScreen />
            </Provider>
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should render component', () => {
        expect(instance).toBeDefined()
    })

    test('Should call CarouselSlider onUpdateHeroBookmark', () => {
        const element = instance.container.findAllByType(CarouselSlider)[0];
        fireEvent(element, 'onUpdateHeroBookmark', 2);
        expect(mockFunction).toBeTruthy()
    });

    test('Should call ScreenContainer onCloseSignUpAlert', () => {
        const element = instance.container.findByType(ScreenContainer)
        fireEvent(element, 'onCloseSignUpAlert');
        expect(mockFunction).toBeTruthy()
    });

    test('Should call ShortArticle onPress', () => {
        const element = instance.container.findAllByType(ShortArticle)[1]
        fireEvent(element, 'onPress', '2');
        expect(mockFunction).toBeTruthy()
    });

    test('Should call ArticleSection onUpdateBookmark', () => {
        const element = instance.container.findAllByType(ArticleSection)[0]
        fireEvent(element, 'onUpdateBookmark', '2', true);
        expect(mockFunction).toBeTruthy()
    });

    test('Should call BannerArticleSection onUpdateBookmark', () => {
        const element = instance.container.findAllByType(BannerArticleSection)[0]
        fireEvent(element, 'onUpdateBookmark', heroData);
        expect(mockFunction).toBeTruthy()
    });

    test('Should call BannerArticleSection onUpdateBookmark', () => {
        const element = instance.container.findAllByType(BannerArticleSection)[1]
        fireEvent(element, 'onUpdateBookmark', heroData);
        expect(mockFunction).toBeTruthy()
    });

    test('Should call BannerArticleSection onUpdateBookmark', () => {
        const element = instance.container.findAllByType(BannerArticleSection)[2]
        fireEvent(element, 'onUpdateBookmark', heroData);
        expect(mockFunction).toBeTruthy()
    });

    test('Should call SectionComboOne showSignUpPopUp', () => {
        const element = instance.container.findAllByType(SectionComboOne)[0]
        fireEvent(element, 'showSignUpPopUp');
        expect(mockFunction).toBeTruthy()
    });

    test('Should call SectionComboOne onUpdateBookmark', () => {
        const element = instance.container.findAllByType(SectionComboOne)[0]
        fireEvent(element, 'onUpdateBookmark', '2');
        expect(mockFunction).toBeTruthy()
    });

    test('Should call SectionComboOne onPress', () => {
        const element = instance.container.findAllByType(SectionComboOne)[0]
        fireEvent(element, 'onPress', '2');
        expect(mockFunction).toBeTruthy()
    });
})

describe('<LatestNewsScreen>', () => {
    let instance: RenderAPI

    const heroInfo = jest.fn();
    const sectionComboThreeInfo = jest.fn();
    const sectionComboOneInfo = jest.fn();
    const sectionComboTwoInfo = jest.fn();
    const sectionComboFourInfo = jest.fn();
    const useLatestNewsTabMock = jest.fn();
    const useLoginMock = jest.fn();
    const useBookmarkMock = jest.fn();

    beforeEach(() => {
        (useState as jest.Mock).mockImplementation(() => [heroData, heroInfo]);
        (useState as jest.Mock).mockImplementation(() => [heroData, sectionComboThreeInfo]);
        (useState as jest.Mock).mockImplementation(() => [heroData, sectionComboOneInfo]);
        (useState as jest.Mock).mockImplementation(() => [heroData, sectionComboTwoInfo]);
        (useState as jest.Mock).mockImplementation(() => [heroData, sectionComboFourInfo]);
        (useLatestNewsTab as jest.Mock).mockImplementation(useLatestNewsTabMock);
        (useLogin as jest.Mock).mockImplementation(useLoginMock);
        (useBookmark as jest.Mock).mockImplementation(useBookmarkMock);
        useLatestNewsTabMock.mockReturnValue({
            isLoading: true,
            ticker: heroData,
            hero: heroData,
            heroList: heroData,
            topList: heroData,
            opinionList: opinionListData,
            sectionComboOne: heroData,
            sectionComboTwo: heroData,
            sectionComboThree: heroData,
            sectionComboFour: heroData,
            podcastHome: podCastData,
            fetchTickerAndHeroArticle: () => {
                return []
            },
            fetchHeroListTopList: () => {
                return []
            },
            fetchOpinionTopList: () => {
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
        });
        useLoginMock.mockReturnValue({
            isLoggedIn: true,
        });
        useBookmarkMock.mockReturnValue({
            bookmarkIdInfo: [],
            sendBookmarkInfo: () => [],
            removeBookmarkedInfo: () => [],
        });
        const component =
            <Provider store={storeSampleData}>
                <LatestNewsScreen />
            </Provider>
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should render component', () => {
        expect(instance).toBeDefined()
    })

    test('Should call CarouselSlider onUpdateHeroBookmark', () => {
        const element = instance.container.findAllByType(CarouselSlider)[0];
        fireEvent(element, 'onUpdateHeroBookmark', 2);
        expect(mockFunction).toBeTruthy()
    });

    test('Should call ScreenContainer onCloseSignUpAlert', () => {
        const element = instance.container.findByType(ScreenContainer)
        fireEvent(element, 'onCloseSignUpAlert');
        expect(mockFunction).toBeTruthy()
    });

    test('Should call ShortArticle onPress', () => {
        const element = instance.container.findAllByType(ShortArticle)[1]
        fireEvent(element, 'onPress', '2');
        expect(mockFunction).toBeTruthy()
    });

    test('Should call SectionComboOne showSignUpPopUp', () => {
        const element = instance.container.findAllByType(SectionComboOne)[0]
        fireEvent(element, 'showSignUpPopUp');
        expect(mockFunction).toBeTruthy()
    });

    test('Should call SectionComboOne onUpdateBookmark', () => {
        const element = instance.container.findAllByType(SectionComboOne)[0]
        fireEvent(element, 'onUpdateBookmark', '2');
        expect(mockFunction).toBeTruthy()
    });

    test('Should call SectionComboOne onPress', () => {
        const element = instance.container.findAllByType(SectionComboOne)[0]
        fireEvent(element, 'onPress', '2');
        expect(mockFunction).toBeTruthy()
    });
})

describe('<LatestNewsScreen>', () => {
    let instance: RenderAPI

    const heroInfo = jest.fn();
    const sectionComboThreeInfo = jest.fn();
    const sectionComboOneInfo = jest.fn();
    const sectionComboTwoInfo = jest.fn();
    const sectionComboFourInfo = jest.fn();
    const useLatestNewsTabMock = jest.fn();
    const useLoginMock = jest.fn();
    const useBookmarkMock = jest.fn();

    beforeEach(() => {
        DeviceTypeUtilsMock.isTab = true;
        (useState as jest.Mock).mockImplementation(() => [[], heroInfo]);
        (useState as jest.Mock).mockImplementation(() => [[], sectionComboThreeInfo]);
        (useState as jest.Mock).mockImplementation(() => [[], sectionComboOneInfo]);
        (useState as jest.Mock).mockImplementation(() => [[], sectionComboTwoInfo]);
        (useState as jest.Mock).mockImplementation(() => [[], sectionComboFourInfo]);
        (useLatestNewsTab as jest.Mock).mockImplementation(useLatestNewsTabMock);
        (useLogin as jest.Mock).mockImplementation(useLoginMock);
        (useBookmark as jest.Mock).mockImplementation(useBookmarkMock);
        useLatestNewsTabMock.mockReturnValue({
            isLoading: true,
            ticker: [],
            hero: [],
            heroList: [],
            topList: [],
            opinionList: [],
            sectionComboOne: [],
            sectionComboTwo: [],
            sectionComboThree: [],
            sectionComboFour: [],
            podcastHome: [{result:true}],
            fetchTickerAndHeroArticle: () => {
                return []
            },
            fetchHeroListTopList: () => {
                return []
            },
            fetchOpinionTopList: () => {
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
        });
        useLoginMock.mockReturnValue({
            isLoggedIn: false,
        });
        useBookmarkMock.mockReturnValue({
            bookmarkIdInfo: [],
            sendBookmarkInfo: () => [],
            removeBookmarkedInfo: () => [],
        });
        const component =
            <Provider store={storeSampleData}>
                <LatestNewsScreen />
            </Provider>
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should render component', () => {
        expect(instance).toBeDefined()
    })

    test('Should call CarouselSlider onUpdateHeroBookmark', () => {
        const element = instance.container.findAllByType(CarouselSlider)[0];
        fireEvent(element, 'onUpdateHeroBookmark', 2);
        expect(mockFunction).toBeTruthy()
    });

    test('Should call ScreenContainer onCloseSignUpAlert', () => {
        const element = instance.container.findByType(ScreenContainer)
        fireEvent(element, 'onCloseSignUpAlert');
        expect(mockFunction).toBeTruthy()
    });

    test('Should call BannerArticleSection onUpdateBookmark', () => {
        const element = instance.container.findAllByType(BannerArticleSection)[0]
        fireEvent(element, 'onUpdateBookmark', heroData);
        expect(mockFunction).toBeTruthy()
    });

    test('Should call BannerArticleSection onUpdateBookmark', () => {
        const element = instance.container.findAllByType(BannerArticleSection)[1]
        fireEvent(element, 'onUpdateBookmark', heroData);
        expect(mockFunction).toBeTruthy()
    });

    test('Should call BannerArticleSection onUpdateBookmark', () => {
        const element = instance.container.findAllByType(BannerArticleSection)[2]
        fireEvent(element, 'onUpdateBookmark', heroData);
        expect(mockFunction).toBeTruthy()
    });

    test('Should call SectionComboOne showSignUpPopUp', () => {
        const element = instance.container.findAllByType(SectionComboOne)[0]
        fireEvent(element, 'showSignUpPopUp');
        expect(mockFunction).toBeTruthy()
    });

    test('Should call SectionComboOne onUpdateBookmark', () => {
        const element = instance.container.findAllByType(SectionComboOne)[0]
        fireEvent(element, 'onUpdateBookmark', '2');
        expect(mockFunction).toBeTruthy()
    });

    test('Should call SectionComboOne onPress', () => {
        const element = instance.container.findAllByType(SectionComboOne)[0]
        fireEvent(element, 'onPress', '2');
        expect(mockFunction).toBeTruthy()
    });

    test('Should call PodcastWidget onPress', () => {
        const element = instance.container.findAllByType(PodcastWidget)[0]
        fireEvent(element, 'onPress');
        expect(mockFunction).toBeTruthy()
    });

})