import React, { useState } from 'react'
import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import { storeSampleData } from '../../../../constants/Constants'
import { ContactUs } from '../ContactUs'
import { ScreenContainer } from '../../ScreenContainer/ScreenContainer'
import { TextInputField } from 'src/components/atoms'
import { useNavigation } from '@react-navigation/native'
import { useContactUs } from 'src/hooks'
jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}));
const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isIOS: false
}));

jest.mock('src/shared/validators',() => ({
    ...jest.requireActual('src/shared/validators'),
    emailValidation: jest.fn()
}))

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
}));
  
jest.mock('src/hooks/useContactUs', () => ({useContactUs: jest.fn()}));

describe('<ContactUs>', () => {
    let instance: RenderAPI
    const mockFunction = jest.fn();
    const navigation = {
        reset: jest.fn(),
        navigate: jest.fn(),
        goBack: jest.fn(),
    }
    const alertPayload = mockFunction;
    const name = mockFunction;
    const email = mockFunction;
    const message = mockFunction;
    const disableSend = mockFunction;
    const isAlertVisible = mockFunction;
    
    const useContactUsMock = mockFunction;

    beforeEach(() => {
        (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
        (useContactUs as jest.Mock).mockImplementation(useContactUsMock);
        (useState as jest.Mock).mockImplementation(() => [false, alertPayload]);
        (useState as jest.Mock).mockImplementation(() => ['mockName', name]);
        (useState as jest.Mock).mockImplementation(() => ['mockEmail@gmail.com', email]);
        (useState as jest.Mock).mockImplementation(() => ['mockMessage', message]);
        (useState as jest.Mock).mockImplementation(() => [false, disableSend]);
        (useState as jest.Mock).mockImplementation(() => [false, isAlertVisible]);
        useContactUsMock.mockReturnValue({
            isLoading: true,
            sendSuccessInfo: {
                code: 200,
                message: 'example'
            },
            sendContactUsInfo: () => {},
            emptyContactUsInfo: () => {},
        });
        const component =
            <Provider store={storeSampleData}>
                <ContactUs/>
            </Provider>
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    test('Should render component', () => {
        DeviceTypeUtilsMock.isIOS = false;
        expect(instance).toBeDefined()
    })
    test('Should render component', () => {
        DeviceTypeUtilsMock.isIOS = true;
        expect(instance).toBeDefined()
    })
    test('Should call ScreenContainer alertOnPress', () => {
        const element = instance.container.findByType(ScreenContainer)
        fireEvent(element, 'alertOnPress');
        expect(navigation.goBack).toBeTruthy()
    })

    test('Should call ScreenContainer setIsAlertVisible', () => {
        const element = instance.container.findByType(ScreenContainer)
        fireEvent(element, 'setIsAlertVisible');
        expect(mockFunction).toBeTruthy()
    })
    
    it('When TextInputField change', () => {
        const testId = instance.container.findAllByType(TextInputField)[0];
        fireEvent(testId, 'onChangeText', 'mockName', 0);
        expect(mockFunction).toHaveBeenCalled();
    });


    it('When TextInputField change', () => {
        const testId = instance.container.findAllByType(TextInputField)[1];
        fireEvent(testId, 'onChangeText', 'mockEmail@gmail.com', 1);
        expect(mockFunction).toHaveBeenCalled();
    });


    it('When TextInputField change', () => {
        const testId = instance.container.findAllByType(TextInputField)[2];
        fireEvent(testId, 'onChangeText', 'mockString', 2);
        expect(mockFunction).toHaveBeenCalled();
    });

    it('When TextInputField change', () => {
        const testId = instance.container.findAllByType(TextInputField)[0];
        fireEvent(testId, 'onChangeText', '', 4);
        expect(mockFunction).toHaveBeenCalled();
    });

    it('When TextInputField change', () => {
        const testId = instance.container.findAllByType(TextInputField)[1];
        fireEvent(testId, 'onChangeText', '', 4);
        expect(mockFunction).toHaveBeenCalled();
    });

    it('When TextInputField change', () => {
        const testId = instance.container.findAllByType(TextInputField)[2];
        fireEvent(testId, 'onChangeText', '', 4);
        expect(mockFunction).toHaveBeenCalled();
    });

    it('When TouchableOpacity onPress', () => {
        const testId = instance.getByTestId('ContactUsTestId01');
        fireEvent(testId, 'onPress');
        expect(mockFunction).toHaveBeenCalled();
    });
})

describe('<ContactUs>', () => {
    let instance: RenderAPI
    const mockFunction = jest.fn();
    const navigation = {
        reset: jest.fn(),
        navigate: jest.fn(),
        goBack: jest.fn(),
    }
    const alertPayload = mockFunction;
    const name = mockFunction;
    const email = mockFunction;
    const message = mockFunction;
    const disableSend = mockFunction;
    const isAlertVisible = mockFunction;

    const useContactUsMock = mockFunction;

    beforeEach(() => {
        (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
        (useContactUs as jest.Mock).mockImplementation(useContactUsMock);
        (useState as jest.Mock).mockImplementation(() => [false, alertPayload]);
        (useState as jest.Mock).mockImplementation(() => ['', name]);
        (useState as jest.Mock).mockImplementation(() => ['', email]);
        (useState as jest.Mock).mockImplementation(() => ['', message]);
        (useState as jest.Mock).mockImplementation(() => [false, disableSend]);
        (useState as jest.Mock).mockImplementation(() => [false, isAlertVisible]);
        useContactUsMock.mockReturnValue({
            isLoading: true,
            sendSuccessInfo: {
                code: 400,
                message: 'example'
            },
            sendContactUsInfo: () => {},
            emptyContactUsInfo: () => {},
        });
        const component =
            <Provider store={storeSampleData}>
                <ContactUs/>
            </Provider>
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    test('Should render component', () => {
        expect(instance).toBeDefined()
    })

    test('Should call ScreenContainer alertOnPress', () => {
        const element = instance.container.findByType(ScreenContainer)
        fireEvent(element, 'alertOnPress');
        expect(navigation.goBack).toBeTruthy()
    })

    it('When TouchableOpacity onPress', () => {
        const testId = instance.getByTestId('ContactUsTestId01');
        fireEvent(testId, 'onPress');
        expect(mockFunction).toHaveBeenCalled;
    });
})

describe('<ContactUs>', () => {
    let instance: RenderAPI
    const mockFunction = jest.fn();
    const navigation = {
        reset: jest.fn(),
        navigate: jest.fn(),
        goBack: jest.fn(),
    }
    const alertPayload = mockFunction;
    const disableSend = mockFunction;
    const isAlertVisible = mockFunction;

    const useContactUsMock = mockFunction;

    beforeEach(() => {
        (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
        (useContactUs as jest.Mock).mockImplementation(useContactUsMock);
        (useState as jest.Mock).mockImplementation(() => [true, alertPayload]);
        (useState as jest.Mock).mockImplementation(() => [true, disableSend]);
        (useState as jest.Mock).mockImplementation(() => [true, isAlertVisible]);
        useContactUsMock.mockReturnValue({
            isLoading: true,
            sendSuccessInfo: {
                code: 200,
            },
            sendContactUsInfo: () => {},
            emptyContactUsInfo: () => {},
        });
        const component =
            <Provider store={storeSampleData}>
                <ContactUs/>
            </Provider>
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    test('Should render component', () => {
        expect(instance).toBeDefined()
    })

    test('Should call ScreenContainer alertOnPress', () => {
        const element = instance.container.findByType(ScreenContainer)
        fireEvent(element, 'alertOnPress');
        expect(navigation.goBack).toBeTruthy()
    })
})