
import { render, RenderAPI } from '@testing-library/react-native'
import React from 'react'
import RelatedArticles from '../RelatedArticles'

describe('<RelatedArticles>', () => {
    let instance: RenderAPI

    beforeEach(() => {
        const component = <RelatedArticles />
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('should render component', () => {
        expect(instance).toBeDefined()
    })
})