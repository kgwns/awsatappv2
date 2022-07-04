import React from 'react';
import { render, RenderAPI } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { storeSampleData } from 'src/constants/SampleData';
import { ManageMyNewsScreen } from '../ManageMyNewsScreen';

describe('<ManageMyNews Component>', () => {
    let instance: RenderAPI;
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

});
