import React from 'react'
import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import { storeSampleData } from '../../../../constants/SampleData'
import { MyNewsScreen } from '../MyNewsScreen'
import { ScreenContainer } from '../../ScreenContainer/ScreenContainer'
import { SignupAlertCard } from 'src/components/molecules'

describe('<MyNewsScreen>', () => {
    let instance: RenderAPI
    const mockFunction = jest.fn();
    
    beforeEach(() => {
        const component =
            <Provider store={storeSampleData}>
                <MyNewsScreen />
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

    test('Should call ScreenContainer onCloseSignUpAlert', () => {
        const element = instance.container.findByType(ScreenContainer)
        fireEvent(element, 'onCloseSignUpAlert');
        expect(mockFunction).toBeTruthy()
    });

    test('Should call SignupAlertCard onCloseSignUpAlert', () => {
        const element = instance.container.findByType(SignupAlertCard)
        fireEvent(element, 'onCloseSignUpAlert');
        expect(mockFunction).toBeTruthy()
    });
})