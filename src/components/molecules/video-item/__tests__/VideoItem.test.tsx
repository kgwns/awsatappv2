import React from 'react'
import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import { VideoItem } from '../VideoItem'
import { ButtonOutline } from 'src/components/atoms'


describe('<VideoItem>', () => {
    let instance: RenderAPI

    const mockOnPress = jest.fn()

    beforeEach(() => {
        const component = <VideoItem imageUrl={'avc.com'} title={'abc'} des={'example'} onPress={mockOnPress} isDocumentary={true} isBookmarked={false} onPressBookmark={mockOnPress} />
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should render VideoItem', () => {
        expect(instance).toBeDefined()
    })

    test('Should call ButtonOutline onPress', () => {
        const element = instance.container.findAllByType(ButtonOutline)[0];
        fireEvent(element, 'onPress');
        expect(mockOnPress).toBeTruthy();
    })
    
})