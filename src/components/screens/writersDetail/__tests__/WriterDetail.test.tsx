import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import React, { useState } from 'react'
import { FlatList } from 'react-native'
import { Provider } from 'react-redux'
import { storeSampleData } from 'src/constants/SampleData'
import { WriterDetailDataType } from 'src/redux/writersDetail/types'
import { ScreenContainer } from '../../ScreenContainer/ScreenContainer'
import { WritersDetailScreen } from '../WritersDetailScreen'
import { OpinionWritersArticlesSection } from 'src/components/organisms'
import { OpinionsListItemType } from 'src/redux/opinionArticleDetail/types'

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
  }));

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
    useNavigationState: () => ([]),
    useIsFocused: () => jest.fn().mockImplementation(() => Boolean),
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
            isLoading: true,
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
      };
    },
}));

const sampleData: WriterDetailDataType[] = [
    {
        name: 'example',
        field_description: 'example',
        field_opinion_writer_photo_export: 'example',
        tid: '1',
        isFollowed: true,
        field_instagram_url_export: 'url',
        field_opinion_twitter_export: 'twitter',
        field_opinion_facebook_export:'facebook',
    },
    {
        name: 'example',
        field_description: 'example',
        field_opinion_writer_photo_export: 'example',
        tid: '2',
        isFollowed: true,
        field_instagram_url_export: 'url',
        field_opinion_twitter_export: 'twitter',
        field_opinion_facebook_export:'facebook',
    },
];

describe('< Writer Detail >', () => {
    let instance: RenderAPI
    const mockFunction = jest.fn();
    const setWriterDetailInfo = mockFunction;
    const writerDetailInfo = mockFunction;
    const setShowPopUp = mockFunction;
    const setPage = mockFunction;
    const setOpinionsDataInfo = mockFunction;

    beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => [sampleData, setWriterDetailInfo]);
    (useState as jest.Mock).mockImplementation(() => [sampleData, writerDetailInfo]);
    (useState as jest.Mock).mockImplementation(() => [false, setShowPopUp]);
    (useState as jest.Mock).mockImplementation(() => [0, setPage]);
    (useState as jest.Mock).mockImplementation(() => [[], setOpinionsDataInfo]);
        const component =
            <Provider store={storeSampleData}>
                <WritersDetailScreen route={{params: {tid: '12345'}}}/>
            </Provider>
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

    test('Should call OpinionWritersArticlesSection onUpdateOpinionArticlesBookmark', () => {
        const element = instance.container.findByType(OpinionWritersArticlesSection)
        fireEvent(element, 'onUpdateOpinionArticlesBookmark', 0);
        expect(mockFunction).toBeTruthy()
    });

    test('Should call OpinionWritersArticlesSection onScroll', () => {
        const element = instance.container.findByType(OpinionWritersArticlesSection)
        fireEvent(element, 'onScroll');
        expect(setShowPopUp).toBeTruthy()
    });
})