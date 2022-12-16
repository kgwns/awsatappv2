import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import React, { useState } from 'react';
import { AlertModal } from '../../AlertModal/AlertModal';
import { PopUp, PopUpType } from '../PopUp';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}));

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
    ...jest.requireActual('src/shared/utils/dimensions'),
    isTab: false,
}));
  

describe('PopUp', () => {

    let instance: RenderAPI;
    let mockFunction = jest.fn();
    const currentOrientation = mockFunction;
    const setheight = mockFunction;

    beforeEach(() => {
        (useState as jest.Mock).mockImplementation(() => ['LANDSCAPE', currentOrientation]);
        (useState as jest.Mock).mockImplementation(() => [2, setheight]);
        const component = (
            <PopUp 
                type={PopUpType.rbSheet}
                onPressButton={mockFunction}
                showPopUp={true}
                onClosePopUp={mockFunction} 
            />
        );
        instance = render(component);
    });

    afterEach(() => {
        jest.clearAllMocks();
        instance.unmount();
    });

    it('should render PopUp component', () => {
        DeviceTypeUtilsMock.isTab = true
        expect(instance).toBeDefined();
    });

})

describe('PopUp', () => {

    let instance: RenderAPI;
    let mockFunction = jest.fn();
    const currentOrientation = mockFunction;
    const setheight = mockFunction;

    beforeEach(() => {
        (useState as jest.Mock).mockImplementation(() => ['PORTRAIT', currentOrientation]);
        (useState as jest.Mock).mockImplementation(() => [2, setheight]);
        const component = (
            <PopUp 
                type={PopUpType.rbSheet}
                onPressButton={mockFunction}
                showPopUp={false}
                onClosePopUp={mockFunction} 
            />
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

describe('PopUp', () => {

    let instance: RenderAPI;
    let mockFunction = jest.fn();

    beforeEach(() => {
        const component = (
            <PopUp 
                type={PopUpType.alertModal}
                onPressButton={mockFunction}
                showPopUp={false}
                onClosePopUp={mockFunction} 
            />
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

describe('PopUp', () => {

    let instance: RenderAPI;
    let mockFunction = jest.fn();

    beforeEach(() => {
        const component = (
            <PopUp 
                type={PopUpType.alertModal}
                onPressButton={mockFunction}
                showPopUp={true}
                onClosePopUp={mockFunction} 
            />
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

    it('when AlertModal only When onClose', () => {
        const testID = instance.container.findAllByType(AlertModal)[0];
        fireEvent(testID, 'onClose');
        expect(mockFunction).toBeTruthy();
    });

    it('when AlertModal only When onPressSuccess', () => {
        const testID = instance.container.findAllByType(AlertModal)[0];
        fireEvent(testID, 'onPressSuccess');
        expect(mockFunction).toBeTruthy();
    });
})

describe('PopUp', () => {

    let instance: RenderAPI;
    let mockFunction = jest.fn();

    beforeEach(() => {
        const component = (
            <PopUp 
                type={"abc"}
                onPressButton={mockFunction}
                showPopUp={true}
                onClosePopUp={mockFunction} 
            />
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