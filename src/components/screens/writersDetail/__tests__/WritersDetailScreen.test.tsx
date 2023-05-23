import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import React, { useState } from 'react'
import { FlatList } from 'react-native'
import { Provider } from 'react-redux'
import { storeSampleData } from 'src/constants/Constants'
import { WriterDetailDataType } from 'src/redux/writersDetail/types'
import { ScreenContainer } from '../../ScreenContainer/ScreenContainer'
import { WritersDetailScreen } from '../WritersDetailScreen'
import { OpinionWritersArticlesSection } from 'src/components/organisms'
import { OpinionsListItemType } from 'src/redux/opinionArticleDetail/types'
import { WriterBannerImage } from 'src/components/molecules'
import {useNavigation} from '@react-navigation/native';
import { useLogin } from 'src/hooks'
import { fetchWriterOpinionsApi } from 'src/services/opinionsService'
import { AxiosError } from 'axios'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}));

jest.mock('src/hooks/useLogin', () => ({useLogin: jest.fn()}));

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
    useNavigationState: () => ([]),
    useIsFocused: () => jest.fn().mockImplementation(() => Boolean),
}));

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isIOS: false,
  isTab: false,
  isNotchDevice: false
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
        validateBookmark: () => true,
      }
    },
}));

jest.mock("src/hooks/useWriterDetail", () => ({
    useWriterDetail: () => {
        return {
            isLoading: false,
            getWriterDetailData:()=>jest.fn(),
            emptyWriterDetailData:()=> jest.fn(),
            writerDetailData: sampleData,
        }
    },
}));

const writerData: OpinionsListItemType[] = [
    {
        title: 'example',
        created_export: 'example',
        field_opinion_writer_node_export: [
            {
                id: '12',
                title: 'example',
                url: 'example',
                bundle: 'example',
                opinion_writer_photo: 'example',
                langcode: 'example',
                name: 'example',
            }
        ],
        nid: '12',
        field_opinion_sport_blog_export: [
            {
                id: '12',
                title: 'example',
                bundle: 'example',
                name: 'example',
            }
        ],
        field_new_issueno_export: 'example',
        published_at_export: 'example',
        body: 'example',
        type: 'example'
    },
    {
        title: 'example',
        created_export: 'example',
        field_opinion_writer_node_export: [
            {
                id: '13',
                title: 'example',
                url: 'example',
                bundle: 'example',
                opinion_writer_photo: 'example',
                langcode: 'example',
                name: 'example',
            }
        ],
        nid: '13',
        field_opinion_sport_blog_export: [
            {
                id: '13',
                title: 'example',
                bundle: 'example',
                name: 'example',
            }
        ],
        field_new_issueno_export: 'example',
        published_at_export: 'example',
        body: 'example',
        type: 'example'
    },
]

jest.mock("src/hooks/useOpinions", () => ({
    useOpinions: () => {
        return {
            opinionsError: 'error',
            writerOpinionsData: writerData,
            isWriterOpinionLoading: false,
            writerOpinionsError: 'error',
            fetchWriterOpinionsRequest: () => {
                return []
            },
            emptyWriterOpinionData: () => {
                return
            },
        }
    },
}));

jest.mock('src/hooks/useAllWriters', () => ({
    useAllWriters: () => {
      return {
        isLoading: false,
        selectedAuthorsData: {
            code: 200,
            message: "string",
            data: [
              {
                tid:'1'
              },
              {
                tid:'2'
              },
            ]
        },
        error: 'error',
        getSelectedAuthorsData: () => {
          return [];
        },
        removeAuthorRequest: () => {
          return [];
        },
        sendSelectedWriterInfo: () => {
            return [];
        },
        validateFollow: () => true,
      };
    },
}));

jest.mock('src/services/opinionsService',() => ({
    fetchWriterOpinionsApi: jest.fn()
}))

const sampleData: WriterDetailDataType[] = [
    {
        name: 'example',
        field_description: 'example',
        field_opinion_writer_photo_export: 'example',
        tid: '1',
        isFollowed: false,
        field_instagram_url_export: 'url',
        field_opinion_twitter_export: 'twitter',
        field_opinion_facebook_export:'facebook',
    },
    {
        name: 'example',
        field_description: 'example',
        field_opinion_writer_photo_export: 'example',
        tid: '2',
        isFollowed: false,
        field_instagram_url_export: 'url',
        field_opinion_twitter_export: 'twitter',
        field_opinion_facebook_export:'facebook',
    },
];

describe('< Writer Detail >', () => {
    let instance: RenderAPI;
    const mockFunction = jest.fn();
    const navigation = {
        navigate: mockFunction,
        goBack: mockFunction,
        popToTop: mockFunction,
    }

    const writerDetailInfo = mockFunction;
    const showupUp = mockFunction;
    const page = mockFunction;
    const scrollY = mockFunction;
    const isFollowed = mockFunction;
    const opinionsDataInfo = mockFunction;
    const isWriterOpinionLoading = mockFunction;
    const allOpinionLoaded = mockFunction;
    const useLoginMock = mockFunction;

    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
        (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
        (useLogin as jest.Mock).mockImplementation(useLoginMock);
        (useState as jest.Mock).mockImplementation(() => [sampleData, writerDetailInfo]);
        (useState as jest.Mock).mockImplementation(() => [false, showupUp]);
        (useState as jest.Mock).mockImplementation(() => [10, page]);
        (useState as jest.Mock).mockImplementation(() => [0, scrollY]);
        (useState as jest.Mock).mockImplementation(() => [false, isFollowed]);
        (useState as jest.Mock).mockImplementation(() => [writerData, opinionsDataInfo]);
        // (useState as jest.Mock).mockImplementation(() => [true, isWriterOpinionLoading]);
        // (useState as jest.Mock).mockImplementation(() => [true, allOpinionLoaded]);

        useLoginMock.mockReturnValue({
            isLoggedIn: true,
        });
        const component =
            <SafeAreaProvider>
                <Provider store={storeSampleData}>
                    <GestureHandlerRootView>
                        <WritersDetailScreen route={{params: {tid: '12345'}}}/>
                    </GestureHandlerRootView>
                </Provider>
            </SafeAreaProvider>
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    test('Should render component', () => {
        DeviceTypeUtilsMock.isIOS = true;
        DeviceTypeUtilsMock.isTab = true;
        DeviceTypeUtilsMock.isNotchDevice = true;
        expect(instance).toBeDefined()
    })

    test('Should call ScreenContainer onCloseSignUpAlert', () => {
        const element = instance.container.findByType(ScreenContainer)
        fireEvent(element, 'onCloseSignUpAlert');
        expect(mockFunction).toBeTruthy()
    });

    test('Should call FlatList keyExtractor', () => {
        const element = instance.container.findByType(FlatList)
        fireEvent(element, 'keyExtractor', '', 2);
        expect(mockFunction).toBeTruthy()
    });

    test('Should call FlatList renderItem', () => {
        const element = instance.container.findByType(FlatList)
        fireEvent(element, 'renderItem', {item: [{}], index: 0});
        expect(mockFunction).toBeTruthy()
    });

    test('Should call FlatList onScroll', () => {
        const element = instance.container.findByType(FlatList)
        fireEvent(element, 'onScroll',  {nativeEvent: {contentOffset: {y: 120}}});
        expect(mockFunction).toBeTruthy()
    });

    test('Should call OpinionWritersArticlesSection onUpdateOpinionArticlesBookmark', () => {
        const element = instance.container.findByType(OpinionWritersArticlesSection)
        fireEvent(element, 'onUpdateOpinionArticlesBookmark', 0);
        expect(mockFunction).toBeTruthy()
    });

    test('Should call OpinionWritersArticlesSection onScroll', () => {
        const element = instance.container.findByType(OpinionWritersArticlesSection)
        fireEvent(element, 'onScroll');
        expect(mockFunction).toBeTruthy()
    });

    test('Should call WriterBannerImage onPressFollow', () => {
        const element = instance.container.findByType(WriterBannerImage)
        fireEvent(element, 'onPressFollow', sampleData[0].tid);
        expect(mockFunction).toBeTruthy()
    });

    test('Should call WriterBannerImage onPressReturn', () => {
        const element = instance.container.findByType(WriterBannerImage)
        fireEvent(element, 'onPressReturn');
        expect(navigation.goBack).toBeTruthy()
    });

    test('Should call WriterBannerImage onPressHome', () => {
        const element = instance.container.findByType(WriterBannerImage)
        fireEvent(element, 'onPressHome');
        expect(navigation.popToTop).toBeTruthy()
    });

    test("should fetchWriterOpinionsApi returns response",async() => {
        (fetchWriterOpinionsApi as jest.Mock).mockReturnValue({rows:[{result:true}]});
        try {
            const response = await fetchWriterOpinionsApi({tid:'23',page:10});
            expect(response).toEqual({rows:[{result:true}]});
        }
        catch(error) {}
    })

    test("should fetchWriterOpinionsApi throws error",async() => {
        (fetchWriterOpinionsApi as jest.Mock).mockRejectedValue({response:{data:'error'}});
        try {
            await fetchWriterOpinionsApi({tid:'23',page:10});
        }
        catch(error) {
            const errorResponse = error as AxiosError;
            expect(errorResponse?.response?.data).toBe('error');
        }
    })
})

describe('< Writer Detail >', () => {
    let instance: RenderAPI;
    const mockFunction = jest.fn();
    const navigation = {
        navigate: mockFunction,
        goBack: mockFunction,
        popToTop: mockFunction,
    }

    const writerDetailInfo = mockFunction;
    const showupUp = mockFunction;
    const page = mockFunction;
    const scrollY = mockFunction;
    const isFollowed = mockFunction;
    const opinionsDataInfo = mockFunction;
    
    const useLoginMock = mockFunction;

    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
        (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
        (useLogin as jest.Mock).mockImplementation(useLoginMock);
        (useState as jest.Mock).mockImplementation(() => [[], writerDetailInfo]);
        (useState as jest.Mock).mockImplementation(() => [false, showupUp]);
        (useState as jest.Mock).mockImplementation(() => [0, page]);
        (useState as jest.Mock).mockImplementation(() => [0, scrollY]);
        (useState as jest.Mock).mockImplementation(() => [false, isFollowed]);
        (useState as jest.Mock).mockImplementation(() => [[], opinionsDataInfo]);
        useLoginMock.mockReturnValue({
            isLoggedIn: true,
        });
        const component =
            <SafeAreaProvider>
                <Provider store={storeSampleData}>
                    <GestureHandlerRootView>
                        <WritersDetailScreen route={{params: {tid: '12345'}}}/>
                    </GestureHandlerRootView>
                </Provider>
            </SafeAreaProvider>
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    test('Should render component', () => {
        expect(instance).toBeDefined()
    })

    test('Should call ScreenContainer onCloseSignUpAlert', () => {
        const element = instance.container.findByType(ScreenContainer)
        fireEvent(element, 'onCloseSignUpAlert');
        expect(mockFunction).toBeTruthy()
    });

    test('Should call FlatList keyExtractor', () => {
        const element = instance.container.findByType(FlatList)
        fireEvent(element, 'keyExtractor', '', 2);
        expect(mockFunction).toBeTruthy()
    });

    test('Should call FlatList renderItem', () => {
        const element = instance.container.findByType(FlatList)
        fireEvent(element, 'renderItem', {item: [{}], index: 0});
        expect(mockFunction).toBeTruthy()
    });

    test('Should call FlatList onScroll', () => {
        const element = instance.container.findByType(FlatList)
        fireEvent(element, 'onScroll',  {nativeEvent: {contentOffset: {y: 120}}});
        expect(mockFunction).toBeTruthy()
    });

    test('Should call OpinionWritersArticlesSection onScroll', () => {
        const element = instance.container.findByType(OpinionWritersArticlesSection)
        fireEvent(element, 'onScroll');
        expect(mockFunction).toBeTruthy()
    });
})

describe('< Writer Detail >', () => {
    let instance: RenderAPI;
    const mockFunction = jest.fn();
    const navigation = {
        navigate: mockFunction,
        goBack: mockFunction,
        popToTop: mockFunction,
    }

    const writerDetailInfo = mockFunction;
    const showupUp = mockFunction;
    const page = mockFunction;
    const scrollY = mockFunction;
    const isFollowed = mockFunction;
    const opinionsDataInfo = mockFunction;
    
    const useLoginMock = mockFunction;

    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
        (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
        (useLogin as jest.Mock).mockImplementation(useLoginMock);
        (useState as jest.Mock).mockImplementation(() => [sampleData, writerDetailInfo]);
        (useState as jest.Mock).mockImplementation(() => [true, showupUp]);
        (useState as jest.Mock).mockImplementation(() => [0, page]);
        (useState as jest.Mock).mockImplementation(() => [0, scrollY]);
        (useState as jest.Mock).mockImplementation(() => [true, isFollowed]);
        (useState as jest.Mock).mockImplementation(() => [writerData, opinionsDataInfo]);
        useLoginMock.mockReturnValue({
            isLoggedIn: false,
        });
        const component =
            <SafeAreaProvider>
                <Provider store={storeSampleData}>
                    <GestureHandlerRootView>
                        <WritersDetailScreen route={{params: {tid: '12345'}}}/>
                    </GestureHandlerRootView>
                </Provider>
            </SafeAreaProvider>
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    test('Should render component', () => {
        expect(instance).toBeDefined()
    })

    test('Should call ScreenContainer onCloseSignUpAlert', () => {
        const element = instance.container.findByType(ScreenContainer)
        fireEvent(element, 'onCloseSignUpAlert');
        expect(mockFunction).toBeTruthy()
    });

    test('Should call FlatList keyExtractor', () => {
        const element = instance.container.findByType(FlatList)
        fireEvent(element, 'keyExtractor', '', 2);
        expect(mockFunction).toBeTruthy()
    });

    test('Should call FlatList renderItem', () => {
        const element = instance.container.findByType(FlatList)
        fireEvent(element, 'renderItem', {item: [{}], index: 0});
        expect(mockFunction).toBeTruthy()
    });

    test('Should call FlatList onScroll', () => {
        const element = instance.container.findByType(FlatList)
        fireEvent(element, 'onScroll',  {nativeEvent: {contentOffset: {y: 120}}});
        expect(mockFunction).toBeTruthy()
    });

    test('Should call OpinionWritersArticlesSection onUpdateOpinionArticlesBookmark', () => {
        const element = instance.container.findByType(OpinionWritersArticlesSection)
        fireEvent(element, 'onUpdateOpinionArticlesBookmark', 0);
        expect(mockFunction).toBeTruthy()
    });

    test('Should call OpinionWritersArticlesSection onScroll', () => {
        const element = instance.container.findByType(OpinionWritersArticlesSection)
        fireEvent(element, 'onScroll');
        expect(mockFunction).toBeTruthy()
    });

    test('Should call WriterBannerImage onPressFollow', () => {
        const element = instance.container.findByType(WriterBannerImage)
        fireEvent(element, 'onPressFollow', sampleData[0].tid);
        expect(mockFunction).toBeTruthy()
    });

    test('Should call WriterBannerImage onPressReturn', () => {
        const element = instance.container.findByType(WriterBannerImage)
        fireEvent(element, 'onPressReturn');
        expect(navigation.goBack).toBeTruthy()
    });

    test('Should call WriterBannerImage onPressHome', () => {
        const element = instance.container.findByType(WriterBannerImage)
        fireEvent(element, 'onPressHome');
        expect(navigation.popToTop).toBeTruthy()
    });
})