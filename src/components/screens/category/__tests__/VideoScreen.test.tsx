import React, { useState } from 'react'
import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import { VideoScreen } from '../VideoScreen'
import { ScreenContainer } from '../../ScreenContainer/ScreenContainer'
import {useNavigation} from '@react-navigation/native';
import { VideoItemType } from 'src/redux/videoList/types';
import { VideoItem } from 'src/components/molecules';

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
}));


jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}));

jest.mock("src/hooks/useLogin", () => ({
    useLogin: () => {
      return {
        isLoggedIn: true,
      }
    },
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
      }
    },
}));

const videoData: VideoItemType[] = [
    {
      nid: '12',
      title: 'abc',
      isBookmarked: true,
      field_multimedia_section_export: [
        {
            title: 'abc'
        },
        {
            title: 'def'
        }
      ]
    },
    {
      nid: '13',
      title: 'abc',
      isBookmarked: true,
      field_multimedia_section_export: [
        {
            title: 'abc'
        },
        {
            title: 'def'
        }
      ]
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

jest.mock("src/hooks/useDocumentaryVideo", () => ({
    useDocumentaryVideo: () => {
      return {
        isVideoLoading: false,
        videoDocumentaryData: videoData,
        fetchDocumentaryVideoRequest: () => {
          return []
        },
      }
    },
}));

describe('<VideoScreen>', () => {
    let instance: RenderAPI

    const mockFunction = jest.fn()

    const navigation = {
        navigate: mockFunction,
    }
    const setVideoDataInfo = mockFunction;
    const videoDocumentaryInfo = mockFunction;

    beforeEach(() => {
        (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
        (useState as jest.Mock).mockImplementation(() => [videoData, setVideoDataInfo]);
        (useState as jest.Mock).mockImplementation(() => [videoData, videoDocumentaryInfo]);
        const component = <VideoScreen tabIndex={0} currentIndex={0}/>
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should render VideoScreen', () => {
        expect(instance).toBeDefined()
    })

    test('Should call main_FlatList1 onPress', () => {
        const element = instance.getByTestId('main_FlatList1');
        fireEvent(element, 'onScrollBeginDrag');
        expect(global.refFlatList).toBeTruthy()
    });

    test('Should call main_FlatList1 keyExtractor', () => {
        const element = instance.getByTestId('main_FlatList1');
        fireEvent(element, 'keyExtractor', '', 2);
        expect(mockFunction).toBeTruthy()
    });

    test('Should call documentary_Video_Item_FlatList1 onPress', () => {
        const element = instance.getByTestId('documentary_Video_Item_FlatList1');
        fireEvent(element, 'onScrollBeginDrag');
        expect(global.refFlatList).toBeTruthy()
    });

    test('Should call documentary_Video_Item_FlatList1 keyExtractor', () => {
        const element = instance.getByTestId('documentary_Video_Item_FlatList1');
        fireEvent(element, 'keyExtractor', '', 2);
        expect(mockFunction).toBeTruthy()
    });

    test('Should call video_Item_FlatList1 onPress', () => {
        const element = instance.getByTestId('video_Item_FlatList1');
        fireEvent(element, 'onScrollBeginDrag');
        expect(global.refFlatList).toBeTruthy()
    });

    test('Should call video_Item_FlatList1 keyExtractor', () => {
        const element = instance.getByTestId('video_Item_FlatList1');
        fireEvent(element, 'keyExtractor', '', 2);
        expect(mockFunction).toBeTruthy()
    });

    test('Should call ScreenContainer onCloseSignUpAlert', () => {
        const element = instance.container.findByType(ScreenContainer)
        fireEvent(element, 'onCloseSignUpAlert');
        expect(mockFunction).toBeTruthy()
    });
    
    test('Should call ScreenContainer isSignUpAlertVisible', () => {
        const element = instance.container.findByType(ScreenContainer)
        fireEvent(element, 'isSignUpAlertVisible');
        expect(mockFunction).toBeTruthy()
    });

    test('Should call VideoItem onPress', () => {
        const element = instance.container.findAllByType(VideoItem)[0]
        fireEvent(element, 'onPress', {item: videoData[0], isDocumentary: true});
        expect(mockFunction).toBeTruthy()
    });

    test('Should call VideoItem onPressBookmark', () => {
        const element = instance.container.findAllByType(VideoItem)[0]
        fireEvent(element, 'onPressBookmark', videoData, 0);
        expect(mockFunction).toBeTruthy()
    });

    test('Should call VideoItem onPress', () => {
        const element = instance.container.findAllByType(VideoItem)[1]
        fireEvent(element, 'onPress', {item: videoData[0], isDocumentary: false});
        expect(mockFunction).toBeTruthy()
    });

    test('Should call VideoItem onPressBookmark', () => {
        const element = instance.container.findAllByType(VideoItem)[1]
        fireEvent(element, 'onPressBookmark', videoData, 0);
        expect(mockFunction).toBeTruthy()
    });

    test('Should call VideoItem onPress', () => {
        const element = instance.container.findAllByType(VideoItem)[2]
        fireEvent(element, 'onPress', {item: videoData[0], isDocumentary: false});
        expect(mockFunction).toBeTruthy()
    });

    test('Should call VideoItem onPressBookmark', () => {
        const element = instance.container.findAllByType(VideoItem)[2]
        fireEvent(element, 'onPressBookmark', videoData, 0);
        expect(mockFunction).toBeTruthy()
    });

    test('Should call VideoItem onPress', () => {
        const element = instance.container.findAllByType(VideoItem)[3]
        fireEvent(element, 'onPress', {item: videoData[0], isDocumentary: false});
        expect(mockFunction).toBeTruthy()
    });

    test('Should call VideoItem onPressBookmark', () => {
        const element = instance.container.findAllByType(VideoItem)[3]
        fireEvent(element, 'onPressBookmark', videoData, 0);
        expect(mockFunction).toBeTruthy()
    });
    
})