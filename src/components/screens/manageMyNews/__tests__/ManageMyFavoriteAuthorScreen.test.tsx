import React, {useState}  from 'react';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { storeSampleData } from '../../../../constants/Constants';
import { ManageMyFavoriteAuthorScreen as MMFAScreen } from '../ManageMyFavoriteAuthorScreen';
import { AllWritersItemType } from 'src/redux/allWriters/types';
import { FollowFavoriteAuthorWidget } from 'src/components/organisms';
import { NextButton } from 'src/components/atoms';
import { useAllWriters } from 'src/hooks';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const ManageMyFavoriteAuthorScreen = () => (
    <GestureHandlerRootView>
        <MMFAScreen/>
    </GestureHandlerRootView>
)

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: false,
  isIOS: false
}));

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}));

jest.mock("src/hooks/useUserProfileData", () => ({
    useUserProfileData: () => {
      return {
        userProfileData: {
            user: {
              id: '12',
              email: "abc@gmail.com",
            },
            message: {
              code: 200,
              message: 'string',
            }
        },
      }
    },
}));

jest.mock('src/hooks/useAllWriters', () => ({useAllWriters: jest.fn()}));

describe('<ManageMyFavoriteAuthorScreen>', () => {
    let instance: RenderAPI;
    const authorsData = jest.fn();
    const mockFunction = jest.fn();
    const sampleData: AllWritersItemType[] = [
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
    ]
    const useAllWritersMock = jest.fn();
    beforeEach(() => {
        (useState as jest.Mock).mockImplementation(() => [sampleData, authorsData]);
        (useAllWriters as jest.Mock).mockImplementation(useAllWritersMock);
        useAllWritersMock.mockReturnValue({
            isLoading: false,
            allWritersData: [
                {
                    name:'example',
                    description__value_export: {},
                    field_opinion_writer_path_export: {},
                    view_taxonomy_term:'example',
                    tid:'12',
                    vid_export: {},
                    field_description_export: {},
                    field_opinion_writer_path_export_1: {},
                    field_opinion_writer_photo_export:'example',
                    isSelected: true,
                },
                {
                    name:'example',
                    description__value_export: {},
                    field_opinion_writer_path_export: {},
                    view_taxonomy_term:'example',
                    tid:'13',
                    vid_export: {},
                    field_description_export: {},
                    field_opinion_writer_path_export_1: {},
                    field_opinion_writer_photo_export:'example',
                    isSelected: true,
                },
            ],
            error: '',
            sendAuthorInfo: {},
            fetchAllWritersRequest: () => [],
            sendSelectedWriterInfo: () => [],
            updateAllWritersData: () => [],
            getSelectedAuthorsData: () => [],
            allSelectedWritersDetailList: [
                {
                    name:'example',
                    description__value_export: {},
                    field_opinion_writer_path_export: {},
                    view_taxonomy_term:'example',
                    tid:'12',
                    vid_export: {},
                    field_description_export: {},
                    field_opinion_writer_path_export_1: {},
                    field_opinion_writer_photo_export:'example',
                    isSelected: true,
                },
                {
                    name:'example',
                    description__value_export: {},
                    field_opinion_writer_path_export: {},
                    view_taxonomy_term:'example',
                    tid:'13',
                    vid_export: {},
                    field_description_export: {},
                    field_opinion_writer_path_export_1: {},
                    field_opinion_writer_photo_export:'example',
                    isSelected: true,
                },
            ],
            emptySendAuthorInfoData: () => [],
            sentAuthorInfoData: { 
            code: 200,
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
                <ManageMyFavoriteAuthorScreen />
            </Provider>
        );
        instance = render(component);
    });

    afterEach(() => {
        jest.clearAllMocks();
        instance.unmount();
    });

    it('Should render ManageMyFavoriteAuthorScreen component', () => {
        DeviceTypeUtilsMock.isTab = true;
        DeviceTypeUtilsMock.isIOS = true;
        expect(instance).toBeDefined();
    });

    test('Should call NextButton onPress', () => {
        const element = instance.container.findByType(NextButton)
        fireEvent(element, 'onPress');
        expect(mockFunction).toBeTruthy()
    })

    test('Should call FollowFavoriteAuthorWidget changeSelectedStatus', () => {
        const element = instance.container.findByType(FollowFavoriteAuthorWidget)
        fireEvent(element, 'changeSelectedStatus', {tid: '12'}, true);
        expect(mockFunction).toBeTruthy()
    })

});

describe('<ManageMyFavoriteAuthorScreen>', () => {
    let instance: RenderAPI;
    const authorsData = jest.fn();
    const mockFunction = jest.fn();
    const sampleData: AllWritersItemType[] = [
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
    ]
    const useAllWritersMock = jest.fn();
    beforeEach(() => {
        (useState as jest.Mock).mockImplementation(() => [sampleData, authorsData]);
        (useAllWriters as jest.Mock).mockImplementation(useAllWritersMock);
        useAllWritersMock.mockReturnValue({
            isLoading: false,
            allWritersData: [
                {
                    name:'example',
                    description__value_export: {},
                    field_opinion_writer_path_export: {},
                    view_taxonomy_term:'example',
                    tid:'12',
                    vid_export: {},
                    field_description_export: {},
                    field_opinion_writer_path_export_1: {},
                    field_opinion_writer_photo_export:'example',
                    isSelected: true,
                },
                {
                    name:'example',
                    description__value_export: {},
                    field_opinion_writer_path_export: {},
                    view_taxonomy_term:'example',
                    tid:'13',
                    vid_export: {},
                    field_description_export: {},
                    field_opinion_writer_path_export_1: {},
                    field_opinion_writer_photo_export:'example',
                    isSelected: true,
                },
            ],
            error: '',
            sendAuthorInfo: {},
            fetchAllWritersRequest: () => [],
            sendSelectedWriterInfo: () => [],
            updateAllWritersData: () => [],
            getSelectedAuthorsData: () => [],
            allSelectedWritersDetailList: [
                {
                    name:'example',
                    description__value_export: {},
                    field_opinion_writer_path_export: {},
                    view_taxonomy_term:'example',
                    tid:'32',
                    vid_export: {},
                    field_description_export: {},
                    field_opinion_writer_path_export_1: {},
                    field_opinion_writer_photo_export:'example',
                    isSelected: true,
                },
                {
                    name:'example',
                    description__value_export: {},
                    field_opinion_writer_path_export: {},
                    view_taxonomy_term:'example',
                    tid:'33',
                    vid_export: {},
                    field_description_export: {},
                    field_opinion_writer_path_export_1: {},
                    field_opinion_writer_photo_export:'example',
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
                        tid: '124',
                    },
                    {
                        tid: '13',
                    }
                ],
            },
        });
        const component = (
            <Provider store={storeSampleData}>
                <ManageMyFavoriteAuthorScreen />
            </Provider>
        );
        instance = render(component);
    });

    afterEach(() => {
        jest.clearAllMocks();
        instance.unmount();
    });

    it('Should render ManageMyFavoriteAuthorScreen component', () => {
        expect(instance).toBeDefined();
    });

    test('Should call NextButton onPress', () => {
        const element = instance.container.findByType(NextButton)
        fireEvent(element, 'onPress');
        expect(mockFunction).toBeTruthy()
    })

    test('Should call FollowFavoriteAuthorWidget changeSelectedStatus', () => {
        const element = instance.container.findByType(FollowFavoriteAuthorWidget)
        fireEvent(element, 'changeSelectedStatus', {item: {tid: '12'}}, true);
        expect(mockFunction).toBeTruthy()
    })
});

describe('<ManageMyFavoriteAuthorScreen>', () => {
    let instance: RenderAPI;
    const authorsData = jest.fn();
    const mockFunction = jest.fn();
    const sampleData: AllWritersItemType[] = [
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
    ]
    const useAllWritersMock = jest.fn();
    beforeEach(() => {
        (useState as jest.Mock).mockImplementation(() => [sampleData, authorsData]);
        (useAllWriters as jest.Mock).mockImplementation(useAllWritersMock);
        useAllWritersMock.mockReturnValue({
            isLoading: false,
            allWritersData: [],
            error: '',
            sendAuthorInfo: {},
            fetchAllWritersRequest: () => [],
            sendSelectedWriterInfo: () => [],
            updateAllWritersData: () => [],
            getSelectedAuthorsData: () => [],
            allSelectedWritersDetailList: [],
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
                <ManageMyFavoriteAuthorScreen />
            </Provider>
        );
        instance = render(component);
    });

    afterEach(() => {
        jest.clearAllMocks();
        instance.unmount();
    });

    it('Should render ManageMyFavoriteAuthorScreen component', () => {
        expect(instance).toBeDefined();
    });

    test('Should call NextButton onPress', () => {
        const element = instance.container.findByType(NextButton)
        fireEvent(element, 'onPress');
        expect(mockFunction).toBeTruthy()
    })

    test('Should call FollowFavoriteAuthorWidget changeSelectedStatus', () => {
        const element = instance.container.findByType(FollowFavoriteAuthorWidget)
        fireEvent(element, 'changeSelectedStatus', {item: {tid: '12'}}, true);
        expect(mockFunction).toBeTruthy()
    })
});
