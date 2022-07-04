import React from 'react';
import { render, RenderAPI } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { storeSampleData } from 'src/constants/SampleData';
import { PodcastForYou, PodcastForYouListType } from '../PodcastForYou';

describe('<Podcast Four You Component>', () => {
    let instance: RenderAPI;
    const title = 'title'
    const data: PodcastForYouListType[] = []

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

});
