import React from 'react'
import { render, RenderAPI } from '@testing-library/react-native'
import { ScreenContainer } from '../ScreenContainer'
import { Provider } from 'react-redux'
import { storeSampleData } from '../../../../constants/SampleData'

describe('<Screen Container>', () => {
    let instance: RenderAPI
    const screenComponent = <></>

    beforeEach(() => {
        const component = 
            <Provider store={storeSampleData}>
                <ScreenContainer children={screenComponent} />
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