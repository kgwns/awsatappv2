import { render, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { PopUp, PopUpType } from '../PopUp';


describe('PopUp', () => {

    let instance: RenderAPI;
    let mockFunction = jest.fn();

    beforeEach(() => {
        const component = (
            <PopUp type={PopUpType.rbSheet}
                onPressButton={mockFunction}
                showPopUp={false}
                onClosePopUp={mockFunction} />
        );
        instance = render(component);
    });

    afterEach(() => {
        jest.clearAllMocks();
        instance.unmount();
    });

    it('should render PopUp component', () => {
        expect(instance).toBeDefined();
    });

})