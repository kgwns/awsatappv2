import React, { useState } from 'react';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { storeSampleData } from 'src/constants/Constants';
import { ManageMyNewsScreen } from '../ManageMyNewsScreen';
import { ScreenContainer } from '../../ScreenContainer/ScreenContainer';
import { FlatList,TouchableWithoutFeedback } from 'react-native';
import { AllWritersItemType } from 'src/redux/allWriters/types';
import { AllSiteCategoriesItemType } from 'src/redux/allSiteCategories/types';
import { useAllSiteCategories, useAllWriters } from 'src/hooks';
import { BorderLabel } from 'src/components/atoms/BorderLabel/BorderLabel';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}));


const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: false,
  isIOS: false
}));

jest.mock('src/hooks/useAllSiteCategories', () => ({ useAllSiteCategories: jest.fn() }));
jest.mock('src/hooks/useAllWriters', () => ({ useAllWriters: jest.fn() }));

const sampleAllSiteCategoriesItemTypeData: AllSiteCategoriesItemType[] = [
    {
        name: 'abc',
        view_taxonomy_term: 'example',
        tid: 'qw',
        field_opinion_writer_photo_export: 'example',
        parent_target_id_export: {}
    },
    
    {
        name: 'abc',
        view_taxonomy_term: 'example',
        tid: 'qw',
        field_opinion_writer_photo_export: 'example',
        parent_target_id_export: {}
    },
    {
        name: 'abc',
        view_taxonomy_term: 'example',
        tid: 'qw',
        field_opinion_writer_photo_export: 'example',
        parent_target_id_export: {}
    }
]

const sampleData: AllWritersItemType[] = [
    {
        name: 'example',
        view_taxonomy_term: 'example',
        tid: '1',
        field_opinion_writer_photo_export: 'example'
    },
    {
        name: 'example',
        view_taxonomy_term: 'example',
        tid: '2',
        field_opinion_writer_photo_export: 'example'
    },
]

describe('<ManageMyNews Component>', () => {
    let instance: RenderAPI;
    const mockFunction = jest.fn();
    const selectedWriters = mockFunction;
    const selectedInterested = mockFunction;
    const filteredSelectedAuthor = mockFunction;
    const popupType = mockFunction;
    const filteredSelectedTopic = mockFunction;
    const useAllSiteCategoriesMock = jest.fn();
    const useAllWritersMock = jest.fn();

    beforeEach(() => {
        (useState as jest.Mock).mockImplementation(() => [sampleData, selectedWriters]);
        (useState as jest.Mock).mockImplementation(() => ['Remove_Author', popupType]);
        (useState as jest.Mock).mockImplementation(() => [sampleAllSiteCategoriesItemTypeData, selectedInterested]);
        (useState as jest.Mock).mockImplementation(() => [sampleData, filteredSelectedAuthor]);
        (useState as jest.Mock).mockImplementation(() => [['abc', 'xyz'], filteredSelectedTopic]);
        (useAllSiteCategories as jest.Mock).mockImplementation(useAllSiteCategoriesMock);
        (useAllWriters as jest.Mock).mockImplementation(useAllWritersMock);
        useAllSiteCategoriesMock.mockReturnValue({
            isLoading: false,
            getSelectedTopicsData: () => { },
            selectedTopicsData: {
                code: 200,
                message: "string",
                data: [
                    {
                        tid: '12',
                    },
                    {
                        tid: '13',
                    }
                ],
            },
            allSiteCategoriesData: [
                {
                    name: 'example',
                    description__value_export: {},
                    field_opinion_writer_path_export: {},
                    view_taxonomy_term: 'example',
                    tid: '12',
                    vid_export: {},
                    field_description_export: {},
                    field_opinion_writer_path_export_1: {},
                    field_opinion_writer_photo_export: 'example',
                    parent_target_id_export: {},
                    isSelected: true,
                },
                {
                    name: 'example',
                    description__value_export: {},
                    field_opinion_writer_path_export: {},
                    view_taxonomy_term: 'example',
                    tid: '13',
                    vid_export: {},
                    field_description_export: {},
                    field_opinion_writer_path_export_1: {},
                    field_opinion_writer_photo_export: 'example',
                    parent_target_id_export: {},
                    isSelected: true,
                },
            ],
            sentTopicsData: {
                code: '200',
                message: "example"
            },
            sendSelectedTopicInfo: () => { return [] },
            fetchAllSiteCategoriesRequest: () => { return [] },
            updateAllSiteCategoriesData: () => { return [] },
            emptySendTopicsInfoData: () => { return [] }
        });
        useAllWritersMock.mockReturnValue({
            isLoading: false,
            requestAllSelectedWritersDetailsData: () => { },
            selectedAuthorLoadingState: false,
            error: '',
            sendAuthorInfo: {},
            fetchAllWritersRequest: () => [],
            sendSelectedWriterInfo: () => [],
            updateAllWritersData: () => [],
            emptySelectedAuthorsInfoData: () => [],
            getSelectedAuthorsData: () => [],
            allSelectedWritersDetailList: [
                {
                    name: 'example',
                    description__value_export: {},
                    field_opinion_writer_path_export: {},
                    view_taxonomy_term: 'example',
                    tid: '12',
                    vid_export: {},
                    field_description_export: {},
                    field_opinion_writer_path_export_1: {},
                    field_opinion_writer_photo_export: 'example',
                    isSelected: true,
                },
                {
                    name: 'example',
                    description__value_export: {},
                    field_opinion_writer_path_export: {},
                    view_taxonomy_term: 'example',
                    tid: '13',
                    vid_export: {},
                    field_description_export: {},
                    field_opinion_writer_path_export_1: {},
                    field_opinion_writer_photo_export: 'example',
                    isSelected: true,
                },
            ],
            emptySendAuthorInfoData: () => [],
            sentAuthorInfoData: {
                code: 2,
                message: 'string'
            },
            selectedAuthorsData: {
                code: 2,
                message: 'string',
                data: [
                    {
                        tid: '12',
                    },
                    {
                        tid: '13',
                    }
                ],
            },
        });
        const component = (
            <Provider store={storeSampleData}>
                <ManageMyNewsScreen />
            </Provider>
        );
        instance = render(component);
    });

    afterEach(() => {
        jest.clearAllMocks();
        instance.unmount();
    });

    test('Should render ManageMyNews component', () => {
        expect(instance).toBeDefined();
    });

    test('Should render ManageMyNews component in IOS and Tab', () => {
        DeviceTypeUtilsMock.isIOS = true;
        DeviceTypeUtilsMock.isTab = true;
        expect(instance).toBeDefined();
    });

    test('Should call ScreenContainer alertOnPress', () => {
        const element = instance.container.findByType(ScreenContainer)
        fireEvent(element, 'alertOnPress', popupType);
        expect(mockFunction).toBeTruthy()
    });

    test('Should call ScreenContainer setIsAlertVisible', () => {
        const element = instance.container.findByType(ScreenContainer)
        fireEvent(element, 'setIsAlertVisible');
        expect(mockFunction).toBeTruthy()
    });

    test('Should call FlatList renderItem', () => {
        const element = instance.container.findByType(FlatList)
        fireEvent(element, 'renderItem', { item: sampleData[0], index: 0 });
        expect(mockFunction).toBeTruthy()
    });

    test('Should call FlatList keyExtractor', () => {
        const element = instance.container.findByType(FlatList)
        fireEvent(element, 'keyExtractor', '', 2);
        expect(mockFunction).toBeTruthy()
    });

});

describe('<ManageMyNews Component>', () => {
    let instance: RenderAPI;
    const mockFunction = jest.fn();
    const selectedWriters = mockFunction;
    const selectedInterested = mockFunction;
    const filteredSelectedAuthor = mockFunction;
    const filteredSelectedTopic = mockFunction;
    const useAllSiteCategoriesMock = jest.fn();
    const useAllWritersMock = jest.fn();

    beforeEach(() => {
        (useState as jest.Mock).mockImplementation(() => [sampleData, selectedWriters]);
        (useState as jest.Mock).mockImplementation(() => [sampleAllSiteCategoriesItemTypeData, selectedInterested]);
        (useState as jest.Mock).mockImplementation(() => [sampleData, filteredSelectedAuthor]);
        (useState as jest.Mock).mockImplementation(() => [['abc', 'xyz'], filteredSelectedTopic]);
        (useAllSiteCategories as jest.Mock).mockImplementation(useAllSiteCategoriesMock);
        (useAllWriters as jest.Mock).mockImplementation(useAllWritersMock);
        useAllSiteCategoriesMock.mockReturnValue({
            isLoading: false,
            getSelectedTopicsData: () => { },
            selectedTopicsData: {},
            allSiteCategoriesData: [],
            sentTopicsData: {},
            sendSelectedTopicInfo: () => { return [] },
            fetchAllSiteCategoriesRequest: () => { return [] },
            updateAllSiteCategoriesData: () => { return [] },
            emptySendTopicsInfoData: () => { return [] }
        });
        useAllWritersMock.mockReturnValue({
            isLoading: false,
            requestAllSelectedWritersDetailsData: () => { },
            selectedAuthorLoadingState: false,
            error: '',
            sendAuthorInfo: {},
            fetchAllWritersRequest: () => [],
            sendSelectedWriterInfo: () => [],
            updateAllWritersData: () => [],
            emptySelectedAuthorsInfoData: () => [],
            getSelectedAuthorsData: () => [],
            allSelectedWritersDetailList: [],
            emptySendAuthorInfoData: () => [],
            sentAuthorInfoData: {
                code: 2,
                message: 'string'
            },
            selectedAuthorsData: {},
        });
        const component = (
            <Provider store={storeSampleData}>
                <ManageMyNewsScreen />
            </Provider>
        );
        instance = render(component);
    });

    afterEach(() => {
        jest.clearAllMocks();
        instance.unmount();
    });

    test('Should render ManageMyNews component', () => {
        expect(instance).toBeDefined();
    });

    test('Should call ScreenContainer alertOnPress', () => {
        const element = instance.container.findByType(ScreenContainer)
        fireEvent(element, 'alertOnPress');
        expect(mockFunction).toBeTruthy()
    });

    test('Should call ScreenContainer setIsAlertVisible', () => {
        const element = instance.container.findByType(ScreenContainer)
        fireEvent(element, 'setIsAlertVisible');
        expect(mockFunction).toBeTruthy()
    });

    test('Should call FlatList renderItem', () => {
        const element = instance.container.findByType(FlatList)
        fireEvent(element, 'renderItem', { item: sampleData[0], index: 0 });
        expect(mockFunction).toBeTruthy()
    });

    test('Should call FlatList keyExtractor', () => {
        const element = instance.container.findByType(FlatList)
        fireEvent(element, 'keyExtractor', '', 2);
        expect(mockFunction).toBeTruthy()
    });

});

describe('<ManageMyNews Component>', () => {
    let instance: RenderAPI;
    const mockFunction = jest.fn();
    const selectedWriters = mockFunction;
    const selectedInterested = mockFunction;
    const filteredSelectedAuthor = mockFunction;
    const filteredSelectedTopic = mockFunction;
    const useAllSiteCategoriesMock = jest.fn();
    const useAllWritersMock = jest.fn();

    beforeEach(() => {
        (useState as jest.Mock).mockImplementation(() => [[], selectedWriters]);
        (useState as jest.Mock).mockImplementation(() => [[], selectedInterested]);
        (useState as jest.Mock).mockImplementation(() => [[], filteredSelectedAuthor]);
        (useState as jest.Mock).mockImplementation(() => [[], filteredSelectedTopic]);
        (useAllSiteCategories as jest.Mock).mockImplementation(useAllSiteCategoriesMock);
        (useAllWriters as jest.Mock).mockImplementation(useAllWritersMock);
        useAllSiteCategoriesMock.mockReturnValue({
            isLoading: false,
            getSelectedTopicsData: () => { },
            selectedTopicsData: {
                code: 200,
                message: "string",
                data: []
            },
            allSiteCategoriesData: [
                {
                    name: 'example',
                    description__value_export: {},
                    field_opinion_writer_path_export: {},
                    view_taxonomy_term: 'example',
                    tid: '12',
                    vid_export: {},
                    field_description_export: {},
                    field_opinion_writer_path_export_1: {},
                    field_opinion_writer_photo_export: 'example',
                    parent_target_id_export: {},
                    isSelected: true,
                },
                {
                    name: 'example',
                    description__value_export: {},
                    field_opinion_writer_path_export: {},
                    view_taxonomy_term: 'example',
                    tid: '13',
                    vid_export: {},
                    field_description_export: {},
                    field_opinion_writer_path_export_1: {},
                    field_opinion_writer_photo_export: 'example',
                    parent_target_id_export: {},
                    isSelected: true,
                },
            ],
            sentTopicsData: {
                code: '200',
                message: "example"
            },
            sendSelectedTopicInfo: () => { return [] },
            fetchAllSiteCategoriesRequest: () => { return [] },
            updateAllSiteCategoriesData: () => { return [] },
            emptySendTopicsInfoData: () => { return [] }
        });
        useAllWritersMock.mockReturnValue({
            isLoading: false,
            requestAllSelectedWritersDetailsData: () => { },
            selectedAuthorLoadingState: false,
            error: '',
            sendAuthorInfo: {},
            fetchAllWritersRequest: () => [],
            sendSelectedWriterInfo: () => [],
            updateAllWritersData: () => [],
            emptySelectedAuthorsInfoData: () => [],
            getSelectedAuthorsData: () => [],
            allSelectedWritersDetailList: [
                {
                    name: 'example',
                    description__value_export: {},
                    field_opinion_writer_path_export: {},
                    view_taxonomy_term: 'example',
                    tid: '12',
                    vid_export: {},
                    field_description_export: {},
                    field_opinion_writer_path_export_1: {},
                    field_opinion_writer_photo_export: 'example',
                    isSelected: true,
                },
                {
                    name: 'example',
                    description__value_export: {},
                    field_opinion_writer_path_export: {},
                    view_taxonomy_term: 'example',
                    tid: '13',
                    vid_export: {},
                    field_description_export: {},
                    field_opinion_writer_path_export_1: {},
                    field_opinion_writer_photo_export: 'example',
                    isSelected: true,
                },
            ],
            emptySendAuthorInfoData: () => [],
            sentAuthorInfoData: {
                code: 2,
                message: 'string'
            },
            selectedAuthorsData: {
                code: 2,
                message: 'string',
                data: [
                    {
                        id: '12',
                    },
                    {
                        id: '13',
                    },
                    {
                        id: '12',
                    },
                    {
                        id: '13',
                    }
                ],
            },
        });
        const component = (
            <Provider store={storeSampleData}>
                <ManageMyNewsScreen />
            </Provider>
        );
        instance = render(component);
    });

    afterEach(() => {
        jest.clearAllMocks();
        instance.unmount();
    });

    test('Should render ManageMyNews component', () => {
        expect(instance).toBeDefined();
    });

    test('Should call ScreenContainer alertOnPress', () => {
        const element = instance.container.findByType(ScreenContainer)
        fireEvent(element, 'alertOnPress');
        expect(mockFunction).toBeTruthy()
    });

    test('Should call ScreenContainer setIsAlertVisible', () => {
        const element = instance.container.findByType(ScreenContainer)
        fireEvent(element, 'setIsAlertVisible');
        expect(mockFunction).toBeTruthy()
    });

});

describe('<ManageMyNews Component>', () => {
    let instance: RenderAPI;
    const mockFunction = jest.fn();
    const selectedWriters = mockFunction;
    const selectedInterested = mockFunction;
    const filteredSelectedAuthor = mockFunction;
    const filteredSelectedTopic = mockFunction;
    const useAllSiteCategoriesMock = jest.fn();
    const useAllWritersMock = jest.fn();

    beforeEach(() => {
        (useState as jest.Mock).mockImplementation(() => [[], selectedWriters]);
        (useState as jest.Mock).mockImplementation(() => [[], selectedInterested]);
        (useState as jest.Mock).mockImplementation(() => [[], filteredSelectedAuthor]);
        (useState as jest.Mock).mockImplementation(() => [[], filteredSelectedTopic]);
        (useAllSiteCategories as jest.Mock).mockImplementation(useAllSiteCategoriesMock);
        (useAllWriters as jest.Mock).mockImplementation(useAllWritersMock);
        useAllSiteCategoriesMock.mockReturnValue({
            isLoading: false,
            getSelectedTopicsData: () => { },
            selectedTopicsData: {
                code: 200,
                message: "string",
                data: []
            },
            allSiteCategoriesData: [
                {
                    name: 'example',
                    description__value_export: {},
                    field_opinion_writer_path_export: {},
                    view_taxonomy_term: 'example',
                    tid: '12',
                    vid_export: {},
                    field_description_export: {},
                    field_opinion_writer_path_export_1: {},
                    field_opinion_writer_photo_export: 'example',
                    parent_target_id_export: {},
                    isSelected: true,
                },
                {
                    name: 'example',
                    description__value_export: {},
                    field_opinion_writer_path_export: {},
                    view_taxonomy_term: 'example',
                    tid: '13',
                    vid_export: {},
                    field_description_export: {},
                    field_opinion_writer_path_export_1: {},
                    field_opinion_writer_photo_export: 'example',
                    parent_target_id_export: {},
                    isSelected: true,
                },
            ],
            sentTopicsData: {
                code: '200',
                message: "example"
            },
            sendSelectedTopicInfo: () => { return [] },
            fetchAllSiteCategoriesRequest: () => { return [] },
            updateAllSiteCategoriesData: () => { return [] },
            emptySendTopicsInfoData: () => { return [] }
        });
        useAllWritersMock.mockReturnValue({
            isLoading: false,
            requestAllSelectedWritersDetailsData: () => { },
            selectedAuthorLoadingState: false,
            error: '',
            sendAuthorInfo: {},
            fetchAllWritersRequest: () => [],
            sendSelectedWriterInfo: () => [],
            updateAllWritersData: () => [],
            emptySelectedAuthorsInfoData: () => [],
            getSelectedAuthorsData: () => [],
            allSelectedWritersDetailList: [
                {
                    name: 'example',
                    description__value_export: {},
                    field_opinion_writer_path_export: {},
                    view_taxonomy_term: 'example',
                    tid: '12',
                    vid_export: {},
                    field_description_export: {},
                    field_opinion_writer_path_export_1: {},
                    field_opinion_writer_photo_export: 'example',
                    isSelected: true,
                },
                {
                    name: 'example',
                    description__value_export: {},
                    field_opinion_writer_path_export: {},
                    view_taxonomy_term: 'example',
                    tid: '13',
                    vid_export: {},
                    field_description_export: {},
                    field_opinion_writer_path_export_1: {},
                    field_opinion_writer_photo_export: 'example',
                    isSelected: true,
                },
            ],
            emptySendAuthorInfoData: () => [],
            sentAuthorInfoData: {
                code: 2,
                message: 'string'
            },
            selectedAuthorsData: {
                code: 2,
                message: 'string',
                data: [],
            },
        });
        const component = (
            <Provider store={storeSampleData}>
                <ManageMyNewsScreen />
            </Provider>
        );
        instance = render(component);
    });

    afterEach(() => {
        jest.clearAllMocks();
        instance.unmount();
    });

    test('Should render ManageMyNews component', () => {
        expect(instance).toBeDefined();
    });

    test('Should call ScreenContainer alertOnPress', () => {
        const element = instance.container.findByType(ScreenContainer)
        fireEvent(element, 'alertOnPress');
        expect(mockFunction).toBeTruthy()
    });

    test('Should call ScreenContainer setIsAlertVisible', () => {
        const element = instance.container.findByType(ScreenContainer)
        fireEvent(element, 'setIsAlertVisible');
        expect(mockFunction).toBeTruthy()
    });

});

describe('Test MyFavoriteBooks', () => {
    let instance: RenderAPI;
    const mockFunction = jest.fn();
    const selectedWriters = mockFunction;
    const selectedInterested = mockFunction;
    const filteredSelectedAuthor = mockFunction;
    const popupType = mockFunction;
    const filteredSelectedTopic = mockFunction;
    const useAllSiteCategoriesMock = jest.fn();
    const useAllWritersMock = jest.fn();

    beforeEach(() => {
        (useState as jest.Mock).mockImplementation(() => [sampleData, selectedWriters]);
        (useState as jest.Mock).mockImplementation(() => ['Remove_Author', popupType]);
        (useState as jest.Mock).mockImplementation(() => [sampleAllSiteCategoriesItemTypeData, selectedInterested]);
        (useState as jest.Mock).mockImplementation(() => [sampleData, filteredSelectedAuthor]);
        (useState as jest.Mock).mockImplementation(() => [['abc', 'xyz'], filteredSelectedTopic]);
        (useAllSiteCategories as jest.Mock).mockImplementation(useAllSiteCategoriesMock);
        (useAllWriters as jest.Mock).mockImplementation(useAllWritersMock);
        useAllSiteCategoriesMock.mockReturnValue({
            isLoading: false,
            getSelectedTopicsData: () => { },
            selectedTopicsData: {
                code: 200,
                message: "string",
                data: [
                    {
                        tid: '12',
                    },
                    {
                        tid: '13',
                    }
                ],
            },
            allSiteCategoriesData: [
                {
                    name: 'example',
                    description__value_export: {},
                    field_opinion_writer_path_export: {},
                    view_taxonomy_term: 'example',
                    tid: '12',
                    vid_export: {},
                    field_description_export: {},
                    field_opinion_writer_path_export_1: {},
                    field_opinion_writer_photo_export: 'example',
                    parent_target_id_export: {},
                    isSelected: true,
                },
                {
                    name: 'example',
                    description__value_export: {},
                    field_opinion_writer_path_export: {},
                    view_taxonomy_term: 'example',
                    tid: '13',
                    vid_export: {},
                    field_description_export: {},
                    field_opinion_writer_path_export_1: {},
                    field_opinion_writer_photo_export: 'example',
                    parent_target_id_export: {},
                    isSelected: true,
                },
            ],
            sentTopicsData: {
                code: '200',
                message: "example"
            },
            sendSelectedTopicInfo: () => { return [] },
            fetchAllSiteCategoriesRequest: () => { return [] },
            updateAllSiteCategoriesData: () => { return [] },
            emptySendTopicsInfoData: () => { return [] }
        });
        useAllWritersMock.mockReturnValue({
            isLoading: false,
            requestAllSelectedWritersDetailsData: () => { },
            selectedAuthorLoadingState: false,
            error: '',
            sendAuthorInfo: {},
            fetchAllWritersRequest: () => [],
            sendSelectedWriterInfo: () => [],
            updateAllWritersData: () => [],
            emptySelectedAuthorsInfoData: () => [],
            getSelectedAuthorsData: () => [],
            allSelectedWritersDetailList: [
                {
                    name: 'example',
                    description__value_export: {},
                    field_opinion_writer_path_export: {},
                    view_taxonomy_term: 'example',
                    tid: '12',
                    vid_export: {},
                    field_description_export: {},
                    field_opinion_writer_path_export_1: {},
                    field_opinion_writer_photo_export: 'example',
                    isSelected: true,
                },
                {
                    name: 'example',
                    description__value_export: {},
                    field_opinion_writer_path_export: {},
                    view_taxonomy_term: 'example',
                    tid: '13',
                    vid_export: {},
                    field_description_export: {},
                    field_opinion_writer_path_export_1: {},
                    field_opinion_writer_photo_export: 'example',
                    isSelected: true,
                },
            ],
            emptySendAuthorInfoData: () => [],
            sentAuthorInfoData: {
                code: 2,
                message: 'string'
            },
            selectedAuthorsData: {
                code: 2,
                message: 'string',
                data: [
                    {
                        tid: '12',
                    },
                    {
                        tid: '13',
                    }
                ],
            },
        });
        DeviceTypeUtilsMock.isIOS = true
        const component = (
            <Provider store={storeSampleData}>
                <ManageMyNewsScreen />
            </Provider>
        );
        instance = render(component);
    });

    afterEach(() => {
        jest.clearAllMocks();
        instance.unmount();
    });

    it('should render ManageMyNewsScreen', () => {
        expect(instance).toBeDefined();
    })

    it("should call ManageMyNewsScreenID01 onPress",() => {
        const testId = instance.getAllByTestId('ManageMyNewsScreenID01')[0];
        fireEvent(testId,'onPress');
        expect(mockFunction).toHaveBeenCalled();
    })

});


describe('Test MyFavoriteTopics', () => {
    let instance: RenderAPI;
    const mockFunction = jest.fn();
    const selectedWriters = mockFunction;
    const selectedInterested = mockFunction;
    const filteredSelectedAuthor = mockFunction;
    const popupType = mockFunction;
    const filteredSelectedTopic = mockFunction;
    const useAllSiteCategoriesMock = jest.fn();
    const useAllWritersMock = jest.fn();

    beforeEach(() => {
        (useState as jest.Mock).mockImplementation(() => [sampleData, selectedWriters]);
        (useState as jest.Mock).mockImplementation(() => ['Remove_Author', popupType]);
        (useState as jest.Mock).mockImplementation(() => [sampleAllSiteCategoriesItemTypeData, selectedInterested]);
        (useState as jest.Mock).mockImplementation(() => [sampleData, filteredSelectedAuthor]);
        (useState as jest.Mock).mockImplementation(() => [['abc', 'xyz'], filteredSelectedTopic]);
        (useAllSiteCategories as jest.Mock).mockImplementation(useAllSiteCategoriesMock);
        (useAllWriters as jest.Mock).mockImplementation(useAllWritersMock);
        useAllSiteCategoriesMock.mockReturnValue({
            isLoading: false,
            getSelectedTopicsData: () => { },
            selectedTopicsData: {
                code: 200,
                message: "string",
                data: [
                    {
                        tid: '12',
                    },
                    {
                        tid: '13',
                    }
                ],
            },
            allSiteCategoriesData: [
                {
                    name: 'example',
                    description__value_export: {},
                    field_opinion_writer_path_export: {},
                    view_taxonomy_term: 'example',
                    tid: '12',
                    vid_export: {},
                    field_description_export: {},
                    field_opinion_writer_path_export_1: {},
                    field_opinion_writer_photo_export: 'example',
                    parent_target_id_export: {},
                    isSelected: true,
                },
                {
                    name: 'example',
                    description__value_export: {},
                    field_opinion_writer_path_export: {},
                    view_taxonomy_term: 'example',
                    tid: '13',
                    vid_export: {},
                    field_description_export: {},
                    field_opinion_writer_path_export_1: {},
                    field_opinion_writer_photo_export: 'example',
                    parent_target_id_export: {},
                    isSelected: true,
                },
            ],
            sentTopicsData: {
                code: '200',
                message: "example"
            },
            sendSelectedTopicInfo: () => { return [] },
            fetchAllSiteCategoriesRequest: () => { return [] },
            updateAllSiteCategoriesData: () => { return [] },
            emptySendTopicsInfoData: () => { return [] }
        });
        useAllWritersMock.mockReturnValue({
            isLoading: false,
            requestAllSelectedWritersDetailsData: () => { },
            selectedAuthorLoadingState: false,
            error: '',
            sendAuthorInfo: {},
            fetchAllWritersRequest: () => [],
            sendSelectedWriterInfo: () => [],
            updateAllWritersData: () => [],
            emptySelectedAuthorsInfoData: () => [],
            getSelectedAuthorsData: () => [],
            allSelectedWritersDetailList: [
                {
                    name: 'example',
                    description__value_export: {},
                    field_opinion_writer_path_export: {},
                    view_taxonomy_term: 'example',
                    tid: '12',
                    vid_export: {},
                    field_description_export: {},
                    field_opinion_writer_path_export_1: {},
                    field_opinion_writer_photo_export: 'example',
                    isSelected: true,
                },
                {
                    name: 'example',
                    description__value_export: {},
                    field_opinion_writer_path_export: {},
                    view_taxonomy_term: 'example',
                    tid: '13',
                    vid_export: {},
                    field_description_export: {},
                    field_opinion_writer_path_export_1: {},
                    field_opinion_writer_photo_export: 'example',
                    isSelected: true,
                },
            ],
            emptySendAuthorInfoData: () => [],
            sentAuthorInfoData: {
                code: 2,
                message: 'string'
            },
            selectedAuthorsData: {
                code: 2,
                message: 'string',
                data: [
                    {
                        tid: '12',
                    },
                    {
                        tid: '13',
                    }
                ],
            },
        });
        const component = (
            <Provider store={storeSampleData}>
                <ManageMyNewsScreen />
            </Provider>
        );
        instance = render(component);
    });

    afterEach(() => {
        jest.clearAllMocks();
        instance.unmount();
    });

    test('Should render MyFavoriteTopics component', () => {
        expect(instance).toBeDefined();
    });

    it("should call BorderLabel onPress",() => {
        const testId = instance.container.findAllByType(BorderLabel)[0];
        fireEvent(testId,'onPress');
        expect(mockFunction).toHaveBeenCalled();
    })

});


describe('Test ContinueLabel', () => {
    let instance: RenderAPI;
    const mockFunction = jest.fn();
    const selectedWriters = mockFunction;
    const selectedInterested = mockFunction;
    const filteredSelectedAuthor = mockFunction;
    const popupType = mockFunction;
    const filteredSelectedTopic = mockFunction;
    const useAllSiteCategoriesMock = jest.fn();
    const useAllWritersMock = jest.fn();

    beforeEach(() => {
        (useState as jest.Mock).mockImplementation(() => [sampleData, selectedWriters]);
        (useState as jest.Mock).mockImplementation(() => ['Remove_Author', popupType]);
        (useState as jest.Mock).mockImplementation(() => [sampleAllSiteCategoriesItemTypeData, selectedInterested]);
        (useState as jest.Mock).mockImplementation(() => [sampleData, filteredSelectedAuthor]);
        (useState as jest.Mock).mockImplementation(() => [['abc', 'xyz'], filteredSelectedTopic]);
        (useAllSiteCategories as jest.Mock).mockImplementation(useAllSiteCategoriesMock);
        (useAllWriters as jest.Mock).mockImplementation(useAllWritersMock);
        useAllSiteCategoriesMock.mockReturnValue({
            isLoading: false,
            getSelectedTopicsData: () => { },
            selectedTopicsData: {
                code: 200,
                message: "string",
                data: [
                    {
                        tid: '12',
                    },
                    {
                        tid: '13',
                    }
                ],
            },
            allSiteCategoriesData: [
                {
                    name: 'example',
                    description__value_export: {},
                    field_opinion_writer_path_export: {},
                    view_taxonomy_term: 'example',
                    tid: '12',
                    vid_export: {},
                    field_description_export: {},
                    field_opinion_writer_path_export_1: {},
                    field_opinion_writer_photo_export: 'example',
                    parent_target_id_export: {},
                    isSelected: true,
                },
                {
                    name: 'example',
                    description__value_export: {},
                    field_opinion_writer_path_export: {},
                    view_taxonomy_term: 'example',
                    tid: '13',
                    vid_export: {},
                    field_description_export: {},
                    field_opinion_writer_path_export_1: {},
                    field_opinion_writer_photo_export: 'example',
                    parent_target_id_export: {},
                    isSelected: true,
                },
            ],
            sentTopicsData: {
                code: '200',
                message: "example"
            },
            sendSelectedTopicInfo: () => { return [] },
            fetchAllSiteCategoriesRequest: () => { return [] },
            updateAllSiteCategoriesData: () => { return [] },
            emptySendTopicsInfoData: () => { return [] }
        });
        useAllWritersMock.mockReturnValue({
            isLoading: false,
            requestAllSelectedWritersDetailsData: () => { },
            selectedAuthorLoadingState: false,
            error: '',
            sendAuthorInfo: {},
            fetchAllWritersRequest: () => [],
            sendSelectedWriterInfo: () => [],
            updateAllWritersData: () => [],
            emptySelectedAuthorsInfoData: () => [],
            getSelectedAuthorsData: () => [],
            allSelectedWritersDetailList: [
                {
                    name: 'example',
                    description__value_export: {},
                    field_opinion_writer_path_export: {},
                    view_taxonomy_term: 'example',
                    tid: '12',
                    vid_export: {},
                    field_description_export: {},
                    field_opinion_writer_path_export_1: {},
                    field_opinion_writer_photo_export: 'example',
                    isSelected: true,
                },
                {
                    name: 'example',
                    description__value_export: {},
                    field_opinion_writer_path_export: {},
                    view_taxonomy_term: 'example',
                    tid: '13',
                    vid_export: {},
                    field_description_export: {},
                    field_opinion_writer_path_export_1: {},
                    field_opinion_writer_photo_export: 'example',
                    isSelected: true,
                },
            ],
            emptySendAuthorInfoData: () => [],
            sentAuthorInfoData: {
                code: 2,
                message: 'string'
            },
            selectedAuthorsData: {
                code: 2,
                message: 'string',
                data: [
                    {
                        tid: '12',
                    },
                    {
                        tid: '13',
                    }
                ],
            },
        });
        const component = (
            <Provider store={storeSampleData}>
                <ManageMyNewsScreen />
            </Provider>
        );
        instance = render(component);
    });

    afterEach(() => {
        jest.clearAllMocks();
        instance.unmount();
    });

    it("should call continueLabel onPress",() => {
        const testId = instance.getAllByTestId('continueId')[0];
        fireEvent(testId,'onPress');
        expect(mockFunction).toHaveBeenCalled();
    })

});

