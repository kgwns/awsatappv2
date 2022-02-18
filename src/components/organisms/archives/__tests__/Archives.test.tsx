import { render, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { Archives } from 'src/components/organisms'

describe('<Archives>', () => {
    let instance: RenderAPI

    beforeEach(() => {
        const component = <Archives />
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