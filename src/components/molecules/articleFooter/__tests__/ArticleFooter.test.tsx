import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import React from 'react'
import { moleculesTestID } from '../../../../constants'
import { articleFooterSample } from '../../../../constants/SampleData'
import ArticleFooter from '../ArticleFooter'

describe('<ArticleFooter>', () => {
    let instance: RenderAPI

    beforeEach(() => {
        const component = <ArticleFooter {...articleFooterSample}/>
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('should render component', () => {
        expect(instance).toBeDefined()
    })

    it('Check onPress method', () => {
        const element = instance.getByTestId(moleculesTestID.storySaveBtn)
        fireEvent.press(element)
    })
})
