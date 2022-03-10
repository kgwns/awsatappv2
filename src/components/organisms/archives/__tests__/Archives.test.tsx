import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { Archives } from 'src/components/organisms'
import { FilterComponent } from 'src/components/molecules';

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

    it('Test Change filter item', () => {
        const element = instance.container.findByType(FilterComponent)
        fireEvent(element,'onPress',0)
        expect(element).toBeTruthy()
    })
})