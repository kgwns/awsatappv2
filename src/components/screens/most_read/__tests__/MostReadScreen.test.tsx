import React from 'react'
import { render, RenderAPI } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import { storeSampleData } from '../../../../constants/SampleData'
import { MostReadScreen } from '../MostReadScreen'

describe('<MostReadScreen>', () => {
    let instance: RenderAPI

    beforeEach(() => {
        const component = 
            <Provider store={storeSampleData}>
                <MostReadScreen />
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