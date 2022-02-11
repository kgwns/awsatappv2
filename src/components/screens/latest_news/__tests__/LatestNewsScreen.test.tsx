import React from 'react'
import { render, RenderAPI } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import { storeSampleData } from '../../../../constants/SampleData'
import { LatestNewsScreen } from '../LatestNewsScreen'
// import { useLatestNewsTab } from 'src/hooks/useLatestNewsTab'

describe('<LatestNewsScreen>', () => {
    let instance: RenderAPI

    // jest.mock('src/hooks/useLatestNewsTab', () => ({
    //     useLatestNewsTab: () => jest.fn()
    // }));

    beforeEach(() => {
        const component = 
            <Provider store={storeSampleData}>
                <LatestNewsScreen />
            </Provider> 
        instance = render(component)
    })

    // beforeEach(() => {
    //     (useLatestNewsTab as jest.Mock).mockReturnValue(() => useLatestNewsTab)
    // })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    xit('Should render component', () => {
        expect(instance).toBeDefined()
    })
})