import React from 'react'
import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import { VideoScreen } from '../VideoScreen'
import { FlatList } from 'react-native'
import { VideoItem } from 'src/components/molecules'


describe('<VideoScreen>', () => {
    let instance: RenderAPI

    const mockOnPress = jest.fn()

    beforeEach(() => {
        const component = <VideoScreen tabIndex={0} currentIndex={0}/>
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should render VideoScreen', () => {
        expect(instance).toBeDefined()
    })

    test('Should call FlatList onPress', () => {
        const element = instance.container.findByType(FlatList)
        fireEvent(element, 'onScrollBeginDrag');
        expect(global.refFlatList).toBeTruthy()
    });
    
})