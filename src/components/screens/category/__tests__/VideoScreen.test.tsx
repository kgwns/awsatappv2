import React from 'react'
import { render, RenderAPI } from '@testing-library/react-native'
import { VideoScreen } from '../VideoScreen'


describe('<VideoScreen>', () => {
    let instance: RenderAPI

    const mockOnPress = jest.fn()

    beforeEach(() => {
        const component = <VideoScreen/>
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should render VideoScreen', () => {
        expect(instance).toBeDefined()
    })
})