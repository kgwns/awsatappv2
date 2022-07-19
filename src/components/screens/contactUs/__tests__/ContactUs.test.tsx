import React from 'react'
import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import { storeSampleData } from '../../../../constants/SampleData'
import { ContactUs } from '../ContactUs'
import { ScreenContainer } from '../../ScreenContainer/ScreenContainer'
import { TextInputField } from 'src/components/atoms'

jest.mock("src/hooks/useContactUs", () => ({
    useContactUs: () => {
      return {
        isLoading: true,
        sendSuccessInfo: {},
        sendErrorInfo: 'error',
        sendContactUsInfo: () => {},
        emptyContactUsInfo: () => {},
      }
    },
  }));

describe('<ContactUs>', () => {
    let instance: RenderAPI
    const mockFunction = jest.fn();
    
    beforeEach(() => {
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
        expect(mockFunction).toBeTruthy()
    })

    test('Should call ScreenContainer setIsAlertVisible', () => {
        const element = instance.container.findByType(ScreenContainer)
        fireEvent(element, 'setIsAlertVisible');
        expect(mockFunction).toBeTruthy()
    })
    
    it('When TextInputField change', () => {
        const testId = instance.container.findAllByType(TextInputField)[0];
        fireEvent(testId, 'onChangeText',['mockString','email']);
        expect(mockFunction).toHaveBeenCalled;
    });


    it('When TextInputField change', () => {
        const testId = instance.container.findAllByType(TextInputField)[1];
        fireEvent(testId, 'onChangeText',['mockString','email']);
        expect(mockFunction).toHaveBeenCalled;
    });


    it('When TextInputField change', () => {
        const testId = instance.container.findAllByType(TextInputField)[2];
        fireEvent(testId, 'onChangeText',['mockString','email']);
        expect(mockFunction).toHaveBeenCalled;
    });
})