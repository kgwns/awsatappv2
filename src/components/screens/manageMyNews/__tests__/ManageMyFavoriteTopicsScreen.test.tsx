import React, {useState}  from 'react';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { storeSampleData } from '../../../../constants/SampleData';
import { ManageMyFavoriteTopicsScreen } from '../ManageMyFavoriteTopicsScreen';
import { NextButton } from 'src/components/atoms';
import { AllSiteCategoriesItemType } from 'src/redux/allSiteCategories/types';
import { InterestedTopics } from 'src/components/organisms';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}));

describe('<ManageMyFavoriteTopicsScreen>', () => {
    let instance: RenderAPI;
    const mockFunction = jest.fn();
    const setTopicsData = jest.fn();
    const sampleData: AllSiteCategoriesItemType[] = [
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
            parent_target_id_export: {},
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
            parent_target_id_export: {},
            isSelected: true,
        },
    ]

    beforeEach(() => {
        (useState as jest.Mock).mockImplementation(() => [sampleData, setTopicsData]);
        const component = (
            <Provider store={storeSampleData}>
                <ManageMyFavoriteTopicsScreen />
            </Provider>
        );
        instance = render(component);
    });

    afterEach(() => {
        jest.clearAllMocks();
        instance.unmount();
    });

    test('Should render ManageMyFavoriteTopicsScreen component', () => {
        expect(instance).toBeDefined();
    });

    test('Should call NextButton onPress', () => {
        const element = instance.container.findByType(NextButton)
        fireEvent(element, 'onPress');
        expect(mockFunction).toBeTruthy()
    })

    test('Should call InterestedTopics onTopicsChanged', () => {
        const element = instance.container.findByType(InterestedTopics)
        fireEvent(element, 'onTopicsChanged', {item: {tid: '2'}}, true);
        expect(mockFunction).toBeTruthy()
    })
});
