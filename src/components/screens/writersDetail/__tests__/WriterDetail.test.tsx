import { render, RenderAPI } from '@testing-library/react-native'
import React from 'react'
import { Provider } from 'react-redux'
import { storeSampleData } from 'src/constants/SampleData'
import { WritersDetailScreen } from '../WritersDetailScreen'


describe('< Writer Detail >', () => {
    let instance: RenderAPI

    beforeEach(() => {
        const component =
            <Provider store={storeSampleData}>
                <WritersDetailScreen route={{params: {tid: '12345'}}}/>
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