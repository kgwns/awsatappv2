import { render, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { ArticlePodCastWidget } from 'src/components/organisms'

describe('<ArticlePodCastWidget>', () => {
    let instance: RenderAPI

    beforeEach(() => {
        const component = <ArticlePodCastWidget/>
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