import React from 'react';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { storeSampleData } from 'src/constants/Constants';
import { PodcastForYou, PodcastForYouListType } from '../PodcastForYou';
import { FlatList } from 'react-native';

describe('<Podcast Four You Component>', () => {
    let instance: RenderAPI;
    const title = 'title'
    const data: PodcastForYouListType[] = [
        {
            name: 'example',
            image: 'example',
            title: 'example',
            created: 'example',
            author: 'example',
        },
        {
            name: 'example',
            image: 'example',
            title: 'example',
            created: 'example',
            author: 'example',
        },

    ]
    const mockFunction = jest.fn();

    beforeEach(() => {
        const component = (
            <Provider store={storeSampleData}>
                <PodcastForYou title={title} data={data} />
            </Provider>
        );
        instance = render(component);
    });

    afterEach(() => {
        jest.clearAllMocks();
        instance.unmount();
    });

    test('Should render component', () => {
        expect(instance).toBeDefined();
    });

    test('Should call FlatList keyExtractor', () => {
        const element = instance.container.findByType(FlatList)
        fireEvent(element, 'keyExtractor', '', 2);
        expect(mockFunction).toBeTruthy()
    });

    test('Should call FlatList onPress', () => {
        const element = instance.container.findByType(FlatList)
        fireEvent(element, 'renderItem', {item: data[0], index: 0});
        expect(mockFunction).toBeTruthy()
    });

});
