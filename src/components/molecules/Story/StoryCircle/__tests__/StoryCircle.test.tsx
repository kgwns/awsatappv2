import { render, RenderAPI } from '@testing-library/react-native'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import StoryCircle from 'src/components/molecules/Story/StoryCircle/StoryCircle'

describe('<StoryCircle />', () => {
    let instance: RenderAPI
    const imageUrl = 'https://picsum.photos/200/300'
    const mockOnPress = jest.fn()

    beforeEach(() => {
        const component = (
            <GestureHandlerRootView>
                <StoryCircle storyImageUrl={imageUrl} onPress={mockOnPress} />
            </GestureHandlerRootView>
        )
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
