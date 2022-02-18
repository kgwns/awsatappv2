import { render, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { ContentForYou } from 'src/components/organisms'

describe('<Content for you>', () => {
    let instance: RenderAPI

    beforeEach(() => {
        const component = <ContentForYou />
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