import React from 'react'
import { render, RenderAPI } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import { storeSampleData } from '../../../../constants/SampleData'
import { MyNewsScreen } from '../MyNewsScreen'

describe('<MyNewsScreen>', () => {
    let instance: RenderAPI

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
})