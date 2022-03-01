import React from 'react';
import { render, RenderAPI } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { storeSampleData } from 'src/constants/SampleData';
import { ProfileSettings } from '../ProfileSettings';

describe('<ProfileSettings>', () => {
    let instance: RenderAPI;

    beforeEach(() => {
        const component = (
            <Provider store={storeSampleData}>
                <ProfileSettings />
            </Provider>
        );
        instance = render(component);
    });

    afterEach(() => {
        jest.clearAllMocks();
        instance.unmount();
    });

    test('Should render ProfileSettings', () => {
        expect(instance).toBeDefined();
    });
});
