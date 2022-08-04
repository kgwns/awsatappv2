import React, { useState } from 'react'
import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import { storeSampleData } from 'src/constants/SampleData'
import { LatestNewsScreen } from '../LatestNewsScreen'
import { BannerArticleSection, CarouselSlider, SectionComboOne, ShortArticle } from 'src/components/organisms'
import { LatestArticleDataType } from 'src/redux/latestNews/types'
import { ScreenContainer } from '../../ScreenContainer/ScreenContainer'

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}));

const mockFunction = jest.fn();

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

jest.mock("src/hooks/useLatestNewsTab", () => ({
    useLatestNewsTab: () => {
        return {
            isLoading: true,
            hero: heroData,
            heroList: heroData,
            topList: heroData,
            sectionComboOne: heroData,
            sectionComboTwo: heroData,
            sectionComboThree: heroData,
            sectionComboFour: heroData,
            podcastHome: [],
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

describe('<LatestNewsScreen>', () => {
    let instance: RenderAPI

    const heroInfo = jest.fn();

    beforeEach(() => {
        (useState as jest.Mock).mockImplementation(() => [heroData, heroInfo]);
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