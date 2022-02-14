import React from 'react'
import { render, RenderAPI } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import { storeSampleData } from '../../../../constants/SampleData'
import { ArticleDetailScreen } from '../ArticleDetailScreen'
// import { useLatestNewsTab } from 'src/hooks/useLatestNewsTab'

describe('<ArticleDetailScreen>', () => {
    let instance: RenderAPI

    beforeEach(() => {
        const component = 
            <Provider store={storeSampleData}>
                <ArticleDetailScreen route={{ params: { nid: 123 } }} />
            </Provider> 
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should render component', () => {
        expect(instance).toBeDefined()
    })
})