import React from 'react'
import { RenderAPI, render } from '@testing-library/react-native'
import { Overlay } from '../Overlay'


describe('<Overlay>', () => {
    let instance: RenderAPI
    beforeAll(() => {
        const component = <Overlay />
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