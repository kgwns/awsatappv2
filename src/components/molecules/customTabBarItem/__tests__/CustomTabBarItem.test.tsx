import React from 'react'
import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import { CustomTabBarItem } from 'src/components/molecules/customTabBarItem/CustomTabBarItem'
import { moleculesTestID } from 'src/constants/Constants'
import { TouchableOpacity } from 'react-native'

describe('<CustomTabBarItem>', () => {
    let instance: RenderAPI

    let tabItem = {
        tabName: 'كتابي',
        isSelected: false
    }

    const mockOnPress = jest.fn().mockImplementation(() => {
        tabItem.isSelected = !tabItem.isSelected
    })

    beforeEach(() => {
        const component = <CustomTabBarItem tabName='مواضيعي' index={0} onPress={mockOnPress} isSelected={false} />
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    test('Should render component', () => {
        expect(instance).toBeDefined()
    })

    test('Should render component', () => {
        expect(render(<CustomTabBarItem tabName='كتابي' index={0} onPress={mockOnPress} isSelected={true} />)).toBeDefined()
    })

    test('Should render component', () => {
        expect(render(<CustomTabBarItem tabName='ميديا' index={0} onPress={mockOnPress} isSelected={true} />)).toBeDefined()
    })

    test('Should render component', () => {
        expect(render(<CustomTabBarItem tabName='مواضيعي' index={0} onPress={mockOnPress} isSelected={true} />)).toBeDefined()
    })

    it('When MenuButton Press', () => {
        const listButton = instance.container.findAllByType(TouchableOpacity)[0];
        fireEvent(listButton, 'onPress');
        expect(mockOnPress).toHaveBeenCalled;
    });

    describe('onPress action in item', () => {
        beforeEach(() => {
            const component = <CustomTabBarItem {...tabItem} tabName='ميديا' index={0} onPress={mockOnPress} />
            instance = render(component)
        })

        test('Should check bar getting render when select', () => {
            const element = instance.getByTestId(moleculesTestID.tabItemBtn)
            fireEvent.press(element, 'onPress')
            expect(instance).toBeDefined()
        })
    })
})