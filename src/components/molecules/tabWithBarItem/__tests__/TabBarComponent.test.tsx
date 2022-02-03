import React from 'react'
import { render, RenderAPI } from '@testing-library/react-native'
import { TabBarComponent } from '../TabBarComponent'
import { sectionTabItem } from 'src/constants/SampleData'

describe('<TabBarComponent>', () => {
    let instance: RenderAPI

    const mockOnPress = jest.fn()

    beforeEach(() => {
        const component = <TabBarComponent tabItem={sectionTabItem} onPressTabItem={mockOnPress} />
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    test('Should render component', () => {
        expect(instance).toBeDefined()
    })
})