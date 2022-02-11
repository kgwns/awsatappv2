import React from 'react'
import { render, RenderAPI } from '@testing-library/react-native'
import { MenuButton } from '../MenuButton'

describe('<MenuButton>', () => {
    let instance: RenderAPI

    const mockOnPress = jest.fn()

    beforeEach(() => {
        const component = <MenuButton icon='arrowNext' title='title' onPress={mockOnPress} screenName='screenname'/>
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should render MenuButton', () => {
        expect(instance).toBeDefined()
    })
})