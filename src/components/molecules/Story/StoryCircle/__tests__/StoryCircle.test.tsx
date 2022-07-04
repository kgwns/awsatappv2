import { render, RenderAPI } from '@testing-library/react-native'
import React from 'react'
import StoryCircle from '../StoryCircle'

describe('<StoryCircle />', () => {
    let instance: RenderAPI
    const imageUrl = 'https://picsum.photos/200/300'
    const mockOnPress = jest.fn()

    beforeEach(() => {
        const component = <StoryCircle storyImageUrl={imageUrl} onPress={mockOnPress} />
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
