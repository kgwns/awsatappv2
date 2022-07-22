import React from 'react';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { storeSampleData } from 'src/constants/SampleData';
import { ManageMyNewsScreen } from '../ManageMyNewsScreen';
import { ScreenContainer } from '../../ScreenContainer/ScreenContainer';
import { FlatList } from 'react-native';
import { AllWritersItemType } from 'src/redux/allWriters/types';

const sampleData: AllWritersItemType[] = [
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
        isSelected: true
    },
    {
        name: 'example',
        description__value_export: {},
        field_opinion_writer_path_export: {},
        view_taxonomy_term: 'example',
        tid: '3',
        vid_export: {},
        field_description_export: {},
        field_opinion_writer_path_export_1: {},
        field_opinion_writer_photo_export: 'example',
        isSelected: true
    },
  ]

describe('<ManageMyNews Component>', () => {
    let instance: RenderAPI;
    const mockFunction = jest.fn();

    beforeEach(() => {
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
        fireEvent(element, 'renderItem', {item: sampleData[0], index: 0});
        expect(mockFunction).toBeTruthy()
    });

    test('Should call FlatList keyExtractor', () => {
        const element = instance.container.findByType(FlatList)
        fireEvent(element, 'keyExtractor', '', 2);
        expect(mockFunction).toBeTruthy()
    });

});
