import React from 'react'
import { render, RenderAPI } from '@testing-library/react-native'
import { OpinionScreen } from '../OpinionScreen'


describe('<OpinionScreen>', () => {
    let instance: RenderAPI

    beforeEach(() => {
        const component = <OpinionScreen/>
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should render OpinionScreen', () => {
        expect(instance).toBeDefined()
    })
})