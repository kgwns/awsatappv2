import { render, RenderAPI } from '@testing-library/react-native'
import React from 'react'
import StoryTitle from 'src/components/molecules/Story/StoryTitle/StoryTitle'

describe('<StoryTitle />', () => {
    let instance: RenderAPI

    beforeEach(() => {
        const component = <StoryTitle storyTitle='الحكومة' />
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
