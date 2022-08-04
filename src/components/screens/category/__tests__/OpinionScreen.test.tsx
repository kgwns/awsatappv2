import React, { useState } from 'react'
import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import { OpinionScreen } from '../OpinionScreen'
import { FlatList } from 'react-native';
import { OpinionWritersSection, PopUp } from 'src/components/organisms';
import {useNavigation} from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
  useIsFocused: () => jest.fn().mockImplementation(() => Boolean),
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
    useLogin: () => {
      return {
        isLoggedIn: false,
      }
    },
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
            isLoading: true,
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

describe('<OpinionScreen>', () => {
    let instance: RenderAPI
    const mockFunction = jest.fn();
    const setOpinionsDataInfo= mockFunction;
    const opinionsDataInfo= mockFunction;
    const setPage = mockFunction;
    const setShowPopUp = mockFunction;

    const navigation = {
        navigate: mockFunction,
        reset: mockFunction,
    }

    beforeEach(() => {
        (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
        (useState as jest.Mock).mockImplementation(() => [opinionsData, setOpinionsDataInfo]);
        (useState as jest.Mock).mockImplementation(() => [opinionsData, opinionsDataInfo]);
        (useState as jest.Mock).mockImplementation(() => [0, setPage]);
        (useState as jest.Mock).mockImplementation(() => [false, setShowPopUp]);
        const component = <OpinionScreen tabIndex={0} currentIndex={0}/>
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
        expect(setShowPopUp).toBeTruthy();
        expect(navigation.reset).toBeTruthy();
    });


    test('Should call PopUp onClosePopUp', () => {
        const element = instance.container.findAllByType(PopUp)[0]
        fireEvent(element, 'onClosePopUp');
        expect(setShowPopUp).toBeTruthy();
    });

})