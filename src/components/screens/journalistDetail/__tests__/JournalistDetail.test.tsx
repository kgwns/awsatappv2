import React, { useState } from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { storeSampleData } from '../../../../constants/Constants';
import { JournalistDetail } from '../JournalistDetail';
import { useJournalist, UseJournalistReturn } from 'src/hooks/useJournalist';
import { JournalistArticleData, JournalistDetailDataType } from 'src/redux/journalist/types';
import { useAllWriters } from 'src/hooks';
import { SelectedAuthorDataType } from 'src/redux/allWriters/types';
import { ScreenContainer } from '../../ScreenContainer/ScreenContainer';
import { WriterBannerImage } from 'src/components/molecules';
import { useNavigation } from '@react-navigation/native';
import { Animated, FlatList } from 'react-native';
import { JournalistSection } from 'src/components/organisms';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const authorTID = '12345'
const JID = '12345'

const sampleDetailData: JournalistDetailDataType = {
    authorName: 'Test Author',
    authorImage: 'www.image.com',
    authorDescription: 'Most read article',
    facebook_url: '',
    isFollowed: false,
    instagram_url: '',
    twitter_url: '',
    youtube_url: '',
    field_clickable: '',
}

const sampleArticleData: JournalistArticleData = {
    title: 'title',
    nid: JID,
    image: 'www.image.com',
    news_categories: {
        name: 'test',
        id: JID,
        url: '',
        bundle: '',
        title: '',
    },
    created: 'Author',
    isBookmarked: false,
}

const sampleSelectedAuthorData: SelectedAuthorDataType = {
    code: 200,
    message: 'success',
    data: [{ tid: authorTID }]
}

const defaultJournalistData: UseJournalistReturn = {
    isArticleLoading: false,
    journalistArticleInfo: [sampleArticleData],
    journalistArticleErrorInfo: 'error',
    getJournalistArticleInfo: () => [sampleArticleData],
    emptyJournalistArticleInfo: () => {},
    isDetailLoading: false,
    journalistDetailData: [sampleDetailData],
    journalistDetailErrorInfo: 'error',
    getJournalistDetailInfo: () => { },
}

const routeProps = [
    {
        routes: 'ArticleDetailScreen',
        index: 0
    }
]

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useEffect: jest.fn(),
    useState: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
    useIsFocused: jest.fn(),
    useNavigation: jest.fn(),
    useNavigationState: () => routeProps,
}))

jest.mock('src/hooks/useAllWriters', () => ({ useAllWriters: jest.fn() }))

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
            validateBookmark: () => true,
        }
    },
}));

jest.mock("src/hooks/useJournalist", () => ({
    useJournalist: () => {
        return {
            isArticleLoading: false,
            journalistArticleInfo: [sampleArticleData],
            journalistArticleErrorInfo: 'error',
            getJournalistArticleInfo: () => [sampleArticleData],
            emptyJournalistArticleInfo: jest.fn(),
            isDetailLoading: false,
            journalistDetailData: [sampleDetailData],
            journalistDetailErrorInfo: 'error',
            getJournalistDetailInfo: () => { },
        }
    },
}));

jest.mock("src/hooks/useLogin", () => ({
    useLogin: () => {
        return {
            isLoggedIn: true,
        }
    },
}));

jest.mock('src/hooks/useWriterDetail', () => ({
    useWriterDetail: () => {
        return {
            emptyWriterDetailData: () => {}
        }
    }
}))

const showupUp = false;
const page = 2;
const isFollowed = false;
const scrollY = new Animated.Value(60);
const articleState = [sampleArticleData];
const journalistDetail: JournalistDetailDataType[] = [sampleDetailData];

const mockFn = jest.fn();

const setShowPopUp = mockFn;
const setPage = mockFn;
const setIsFollowed = mockFn;
const setScrollY = mockFn;
const setArticleState = mockFn;
const setJournalistDetail = mockFn;

describe('< Journalist Detail Screen', () => {
    let instance: any;
    const useJournalistMock = mockFn;
    const useAllWritersMock = mockFn;
    const navigation = {
        navigate: mockFn,
        popToTop: mockFn,
        goBack: mockFn,
    }

    beforeEach(() => {
        
        (useAllWriters as jest.Mock).mockImplementation(useAllWritersMock);
        (useNavigation as jest.Mock).mockReturnValueOnce(navigation);

        (useState as jest.Mock).mockImplementation(() => [showupUp, setShowPopUp]);
        (useState as jest.Mock).mockImplementation(() => [page, setPage]);
        (useState as jest.Mock).mockImplementation(() => [isFollowed, setIsFollowed]);
        (useState as jest.Mock).mockImplementation(() => [scrollY, setScrollY]);
        (useState as jest.Mock).mockImplementation(() => [articleState, setArticleState]);
        (useState as jest.Mock).mockImplementation(() => [journalistDetail, setJournalistDetail]);

        useAllWritersMock.mockReturnValue({
            selectedAuthorsData: sampleSelectedAuthorData,
            removeAuthorRequest: () => {},
            getSelectedAuthorsData: () => {},
            sendSelectedWriterInfo: () => {},
        })

        const routeProps = { params: { tid: '12345' } };
        const component = (
            <Provider store={storeSampleData}>
                <GestureHandlerRootView>
                    <JournalistDetail route={routeProps} />
                </GestureHandlerRootView>
            </Provider>
        );
        instance = render(component);
    });

    afterEach(() => {
        jest.clearAllMocks();
        instance.unmount();
    });

    test('Should render Journalist', () => {
        expect(instance).toBeDefined();
    });

    test('### Check FlatList scroll ###', () => {
        const element = instance.container.findByType(FlatList)
        fireEvent(element, 'onScroll', { nativeEvent: { contentOffset: { y: new Animated.Value(60) } } });
        expect(mockFn).toBeTruthy();
    });

    test('### Check ScreenContainer onCloseSignUpAlert ###', () => {
        const element = instance.container.findByType(ScreenContainer)
        fireEvent(element, 'onCloseSignUpAlert');
        expect(mockFn).toBeTruthy();
    });

    test('### Check WriterBannerImage render ###', () => {
        const element = instance.container.findByType(WriterBannerImage);
        expect(element).toBeDefined();
    })

    test('### Check WriterBannerImage onPress Follow ###', () => {
        const element = instance.container.findByType(WriterBannerImage);
        fireEvent(element, 'onPressFollow', authorTID)
        expect(element).toBeDefined();
    })

    test('### Check WriterBannerImage onPress Writer ###', () => {
        const element = instance.container.findByType(WriterBannerImage);
        fireEvent(element, 'onPressWriter', authorTID)
        expect(navigation.navigate).toBeCalled();
    })

    test('### Check WriterBannerImage onPress Home ###', () => {
        const element = instance.container.findByType(WriterBannerImage);
        fireEvent(element, 'onPressHome')
        expect(navigation.popToTop).toBeCalled();
    })

    test('### Check WriterBannerImage onPress Return ###', () => {
        const element = instance.container.findByType(WriterBannerImage);
        fireEvent(element, 'onPressReturn')
        expect(navigation.goBack).toBeCalled();
    })

    test('### JournalistSection onUpdateArticlesBookmark call', () => {
        const element = instance.container.findByType(JournalistSection);
        fireEvent(element, 'onUpdateArticlesBookmark', 0);
        expect(mockFn).toBeCalled();
    })

    test('### JournalistSection onScroll End call', () => {
        const element = instance.container.findByType(JournalistSection);
        fireEvent(element, 'onScroll');
        expect(mockFn).toBeCalled();
    })
})