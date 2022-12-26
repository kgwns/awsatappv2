import { render, RenderAPI } from '@testing-library/react-native'
import React from 'react'
import StoryHeader from 'src/components/molecules/Story/StoryHeader/StoryHeader'

describe('<StoryHeader />', () => {
    let instance: RenderAPI

    beforeEach(() => {
        const component = <StoryHeader headerTitle='الحكومة' />
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
