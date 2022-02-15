
import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import React from 'react'
import { ButtonImage } from 'src/components/atoms'
import { ArticleDetailFooter } from '../ArticleDetailFooter'

describe('<ArticleDetailFooter>', () => {
    let instance: RenderAPI

    beforeEach(() => {
        const component = <ArticleDetailFooter />
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('should render component', () => {
        expect(instance).toBeDefined()
    })

    it('Should call theme button', () => {
        const element = instance.container.findAllByType(ButtonImage)[0]
        fireEvent(element, 'onPress')
        expect(element).toBeTruthy()
    })

    it('Should call font increase button', () => {
        const element = instance.container.findAllByType(ButtonImage)[1]
        fireEvent(element, 'onPress')
        expect(element).toBeTruthy()
    })

    it('Should call share button', () => {
        const element = instance.container.findAllByType(ButtonImage)[2]
        fireEvent(element, 'onPress')
        expect(element).toBeTruthy()
    })
})