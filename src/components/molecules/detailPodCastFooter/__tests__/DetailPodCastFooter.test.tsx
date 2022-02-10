import { render, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { DetailPodCastFooter } from 'src/components/molecules';

describe('<DetailPodCastFooter>', () => {
    let instance: RenderAPI

    beforeEach(() => {
        const component = <DetailPodCastFooter />
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