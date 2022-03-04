import React from 'react';
import { render, RenderAPI } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { storeSampleData } from '../../../../constants/SampleData';
import { ManageMyFavoriteTopicsScreen } from '../ManageMyFavoriteTopicsScreen';

describe('<ManageMyFavoriteTopicsScreen>', () => {
    let instance: RenderAPI;

    beforeEach(() => {
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
});
