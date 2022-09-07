import React from 'react'
import { RenderAPI, render } from '@testing-library/react-native'
import { PlaceholderImage } from '../PlaceHolderImage'


describe('<PlaceholderImage>', () => {
    let instance: RenderAPI
    beforeAll(() => {
        const component = <PlaceholderImage name={'bookMarkActiveWhite'} url={'abc.png'}/>
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

describe('<PlaceholderImage>', () => {
    let instance: RenderAPI
    beforeAll(() => {
        const component = <PlaceholderImage/>
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