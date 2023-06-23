import React, { useState } from 'react'
import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import { OpinionScreen } from '../OpinionScreen'
import { FlatList } from 'react-native';
import { OpinionWritersArticlesSection, OpinionWritersSection, PopUp } from 'src/components/organisms';
import {useNavigation} from '@react-navigation/native';
import { useBookmark, useLogin } from 'src/hooks';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
  useNavigationState: () => ([]),
  useIsFocused: () => jest.fn().mockImplementation(() => Boolean),
}));

jest.mock("src/hooks/useAppPlayer", () => ({
    useAppPlayer: () => {
      return {
        showMiniPlayer: true,
        selectedTrack: {
            id: 1,
            artwork: 'abc.com'
        },
      }
    },
  }));

jest.mock("src/hooks/useOpinionWriter", () => ({
    useOpinionWriter: () => {
        return {
            isLoading: true,
            opinionWriterData: [
                {
                    name: 'example',
                    description__value_export: {},
                    field_opinion_writer_path_export: {},
                    view_taxonomy_term: 'example',
                    tid: 'example',
                    vid_export: {},
                    field_description_export: {},
                    field_opinion_writer_path_export_1: {},
                    field_opinion_writer_photo_export: 'example',
                }
            ],
            relatedArticleData: [],
            opinionWriterError: '',
            fetchOpinionWriterRequest: () => {
                return []
            },
        }
    },
}));

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}));

jest.mock("src/hooks/useLogin", () => ({
    useLogin: jest.fn()
}));

const opinionsData = [
    {
        title: 'example',
        created_export: '2021-05-19T20:48:09+0000',
        field_opinion_writer_node_export: [
            {
                id: '1',
                title: 'example',
                url: 'example.com',
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

            },
        ],
        field_new_issueno_export: 'example',
        published_at_export: '2021-05-19T20:48:09+0000',
        body: 'example',
        field_edit_letter_writer_export: {},
        field_jwplayer_id_opinion_export: {},
        type: 'example',
        isBookmarked: true,
        jwplayer: {},
    },
];

jest.mock("src/hooks/useOpinions", () => ({
    useOpinions: () => {
        return {
            isLoading: false,
            opinionsData: opinionsData,
            opinionsError: '',
            writerOpinionsData: [],
            isWriterOpinionLoading: true,
            writerOpinionsError: '',
            fetchOpinionsRequest: () => {
                return []
            },
            fetchWriterOpinionsRequest: () => {
                return []
            },
            emptyWriterOpinionData: () => {
                return
            },
            emptyOpinionsData: () => {
                return
            },
        }
    },
}));

jest.mock('src/hooks/useBookmark', () => ({useBookmark: jest.fn()}));
const defaultBookmarkMock = {
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

describe('<OpinionScreen>', () => {
    let instance: RenderAPI
    const mockFunction = jest.fn();
    const opinionsDataInfo= mockFunction;
    const isShowPlayer= mockFunction;
    const page = mockFunction;
    const showupUp = mockFunction;

    const navigation = {
        navigate: mockFunction,
        reset: mockFunction,
    }

    const useBookmarkMock = jest.fn();
    const useLoginMock = jest.fn();

    beforeEach(() => {
        (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
        (useLogin as jest.Mock).mockImplementation(useLoginMock);
        (useLoginMock).mockReturnValue({
              isLoggedIn: false,
        });
        (useState as jest.Mock).mockImplementation(() => [opinionsData, opinionsDataInfo]);
        (useState as jest.Mock).mockImplementation(() => [false, isShowPlayer]);
        (useState as jest.Mock).mockImplementation(() => [0, page]);
        (useState as jest.Mock).mockImplementation(() => [false, showupUp]);
        (useBookmark as jest.Mock).mockImplementation(useBookmarkMock);
        useBookmarkMock.mockReturnValue({...defaultBookmarkMock});
        const component = <GestureHandlerRootView><OpinionScreen tabIndex={0} currentIndex={0}/></GestureHandlerRootView>
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should render OpinionScreen', () => {
        expect(instance).toBeDefined()
    })

    test('Should call FlatList onPress', () => {
        const element = instance.container.findByType(FlatList)
        fireEvent(element, 'onScrollBeginDrag');
        expect(global.refFlatList).toBeTruthy()
    });

    test('Should call OpinionWritersSection onPressWriter', () => {
        const element = instance.container.findAllByType(OpinionWritersSection)[0]
        fireEvent(element, 'onPressWriter');
        expect(navigation.navigate).toBeTruthy()
    });

    test('Should call PopUp onPressButton', () => {
        const element = instance.container.findAllByType(PopUp)[0]
        fireEvent(element, 'onPressButton');
        expect(navigation.reset).toBeTruthy();
    });


    test('Should call PopUp onClosePopUp', () => {
        const element = instance.container.findAllByType(PopUp)[0]
        fireEvent(element, 'onClosePopUp');
        expect(mockFunction).toBeTruthy();
    });

})

describe('<OpinionScreen>', () => {
    let instance: RenderAPI
    const mockFunction = jest.fn();
    const opinionsDataInfo= mockFunction;
    const isShowPlayer= mockFunction;
    const page = mockFunction;
    const showupUp = mockFunction;

    const navigation = {
        navigate: mockFunction,
        reset: mockFunction,
    }

    const useBookmarkMock = jest.fn();

    beforeEach(() => {
        (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
        (useState as jest.Mock).mockImplementation(() => [opinionsData, opinionsDataInfo]);
        (useState as jest.Mock).mockImplementation(() => [false, isShowPlayer]);
        (useState as jest.Mock).mockImplementation(() => [0, page]);
        (useState as jest.Mock).mockImplementation(() => [false, showupUp]);
        (useBookmark as jest.Mock).mockImplementation(useBookmarkMock);
        useBookmarkMock.mockReturnValue({
            bookmarkIdInfo: [],
            sendBookmarkInfo: () => [],
            removeBookmarkedInfo: () => [],
            validateBookmark: () => true,
        });
        const component = <GestureHandlerRootView><OpinionScreen tabIndex={0} currentIndex={0}/></GestureHandlerRootView>
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should render OpinionScreen', () => {
        expect(instance).toBeDefined()
    })

    test('Should call FlatList onPress', () => {
        const element = instance.container.findByType(FlatList)
        fireEvent(element, 'onScrollBeginDrag');
        expect(global.refFlatList).toBeTruthy()
    });

    test('Should call OpinionWritersSection onPressWriter', () => {
        const element = instance.container.findAllByType(OpinionWritersSection)[0]
        fireEvent(element, 'onPressWriter');
        expect(navigation.navigate).toBeTruthy()
    });

    test('Should call PopUp onPressButton', () => {
        const element = instance.container.findAllByType(PopUp)[0]
        fireEvent(element, 'onPressButton');
        expect(navigation.reset).toBeTruthy();
    });


    test('Should call PopUp onClosePopUp', () => {
        const element = instance.container.findAllByType(PopUp)[0]
        fireEvent(element, 'onClosePopUp');
        expect(mockFunction).toBeTruthy();
    });

})

describe('<OpinionWritersArticlesSection> when the user is not logged in', () => {
    let instance: RenderAPI
    const mockFunction = jest.fn();
    const opinionsDataInfo= mockFunction;
    const isShowPlayer= mockFunction;
    const page = mockFunction;
    const showupUp = mockFunction;

    const navigation = {
        navigate: mockFunction,
        reset: mockFunction,
    }

    const useBookmarkMock = jest.fn();
    const useLoginMock = jest.fn();

    beforeEach(() => {
        (useLogin as jest.Mock).mockImplementation(useLoginMock);
        (useLoginMock).mockReturnValue({
              isLoggedIn: false,
        });
        (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
        (useState as jest.Mock).mockImplementation(() => [opinionsData, opinionsDataInfo]);
        (useBookmark as jest.Mock).mockImplementation(useBookmarkMock);
        useBookmarkMock.mockReturnValue({
            bookmarkIdInfo: [],
            sendBookmarkInfo: () => [],
            removeBookmarkedInfo: () => [],
            validateBookmark: () => true,
        });
        const component = <GestureHandlerRootView><OpinionScreen tabIndex={0} currentIndex={0}/></GestureHandlerRootView>
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it("test OpinionWritersArticlesSection onScroll",() => {
        const element = instance.container.findByType(OpinionWritersArticlesSection);
        fireEvent(element,'onScroll');
        expect(element).toBeTruthy();
    });

    it("test OpinionWritersArticlesSection onUpdateOpinionArticlesBookmark",() => {
        const element = instance.container.findByType(OpinionWritersArticlesSection);
        fireEvent(element,'onUpdateOpinionArticlesBookmark');
        expect(opinionsDataInfo).toHaveBeenCalled();
    });
})


describe('<OpinionWritersArticlesSection> when the user is logged in', () => {
    let instance: RenderAPI
    const mockFunction = jest.fn();
    const opinionsDataInfo= mockFunction;
    const isShowPlayer= mockFunction;
    const page = mockFunction;
    const showupUp = mockFunction;

    const navigation = {
        navigate: mockFunction,
        reset: mockFunction,
    }

    const useBookmarkMock = jest.fn();
    const useLoginMock = jest.fn();

    beforeEach(() => {
        (useLogin as jest.Mock).mockImplementation(useLoginMock);
        (useLoginMock).mockReturnValue({
              isLoggedIn: true,
        });
        (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
        (useState as jest.Mock).mockImplementation(() => [opinionsData, opinionsDataInfo]);
        (useBookmark as jest.Mock).mockImplementation(useBookmarkMock);
        useBookmarkMock.mockReturnValue({
            bookmarkIdInfo: [],
            sendBookmarkInfo: () => [],
            removeBookmarkedInfo: () => [],
            validateBookmark: () => true,
        });
        const component = <GestureHandlerRootView><OpinionScreen tabIndex={0} currentIndex={0}/></GestureHandlerRootView>
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it("test OpinionWritersArticlesSection onScroll",() => {
        const element = instance.container.findByType(OpinionWritersArticlesSection);
        fireEvent(element,'onScroll');
        expect(element).toBeTruthy();
    });

    it("test OpinionWritersArticlesSection onUpdateOpinionArticlesBookmark",() => {
        const element = instance.container.findByType(OpinionWritersArticlesSection);
        fireEvent(element,'onUpdateOpinionArticlesBookmark',0);
        expect(opinionsDataInfo).toHaveBeenCalled();
    });
})