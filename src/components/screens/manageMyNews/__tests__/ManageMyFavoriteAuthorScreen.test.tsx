import React, {useState}  from 'react';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { storeSampleData } from '../../../../constants/SampleData';
import { ManageMyFavoriteAuthorScreen } from '../ManageMyFavoriteAuthorScreen';
import { AllWritersItemType } from 'src/redux/allWriters/types';
import { FollowFavoriteAuthorWidget } from 'src/components/organisms';
import { NextButton } from 'src/components/atoms';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}));

jest.mock("src/hooks/useUserProfileData", () => ({
    useUserProfileData: () => {
      return {
        isLoading: false,
        userProfileData: {},
        userProfileError: 'string',
        sentUserProfileData: {},
        fetchProfileDataRequest: () => [],
        sendUserProfileInfo: () => [],
        updateUserImageRequest: () => [],
        emptyUserProfileInfoData: () => [],
      }
    },
}));

jest.mock("src/hooks/useAllWriters", () => ({
    useAllWriters: () => {
      return {
        isLoading: false,
        allWritersData: [
            {
                name:'example',
                description__value_export: {},
                field_opinion_writer_path_export: {},
                view_taxonomy_term:'example',
                tid:'1',
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
                tid:'2',
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
                tid:'1',
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
                tid:'2',
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
                    tid: '12',
                },
                {
                    tid: '13',
                }
            ],
        },
      }
    },
  }));

describe('<ManageMyFavoriteAuthorScreen>', () => {
    let instance: RenderAPI;
    const setAuthorsData = jest.fn();
    const mockFunction = jest.fn();
    const sampleData: AllWritersItemType[] = [
        {
            name: 'example',
            description__value_export: {},
            field_opinion_writer_path_export: {},
            view_taxonomy_term: 'example',
            tid: '1',
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
            tid: '2',
            vid_export: {},
            field_description_export: {},
            field_opinion_writer_path_export_1: {},
            field_opinion_writer_photo_export: 'example',
            isSelected: true,
        },
    ]

    beforeEach(() => {
        (useState as jest.Mock).mockImplementation(() => [sampleData, setAuthorsData]);
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
        fireEvent(element, 'changeSelectedStatus', {item: {tid: '2'}}, true);
        expect(mockFunction).toBeTruthy()
    })
});
