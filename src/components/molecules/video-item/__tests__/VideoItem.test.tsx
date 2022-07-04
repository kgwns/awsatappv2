import React from 'react'
import { render, RenderAPI } from '@testing-library/react-native'
import { VideoItem } from '../VideoItem'


describe('<VideoItem>', () => {
    let instance: RenderAPI

    const mockOnPress = jest.fn()

    beforeEach(() => {
        const component = <VideoItem title='title' des='des' imageUrl='url' videoLabel='vl' 
        time='00' month='m' date='7' views='55'  />
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should render VideoItem', () => {
        expect(instance).toBeDefined()
    })
})