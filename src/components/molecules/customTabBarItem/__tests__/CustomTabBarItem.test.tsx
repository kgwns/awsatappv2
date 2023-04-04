import React from 'react'
import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import { CustomTabBarItem } from 'src/components/molecules/customTabBarItem/CustomTabBarItem'
import  * as constant from 'src/constants/Constants'
import { TouchableOpacity } from 'react-native'
const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: false,
  isAndroid: false
}));

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
        const component = <CustomTabBarItem tabName='كتابي' index={0} onPress={mockOnPress} isSelected={false} />
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    test('Should render component', () => {
        expect(instance).toBeDefined()
    })

    test('Should render component in tab', () => {
        DeviceTypeUtilsMock.isTab = true;
        expect(instance).toBeDefined()
    })

    test('Should render component in Android', () => {
        DeviceTypeUtilsMock.isAndroid = true;
        expect(instance).toBeDefined()
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
            const element = instance.getByTestId(constant.moleculesTestID.tabItemBtn)
            fireEvent.press(element, 'onPress')
            expect(instance).toBeDefined()
        })
    })
})


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
        const component = <CustomTabBarItem tabName='كتابي' index={0} onPress={mockOnPress} isSelected={false} />
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    test('Should render component with myNewsTabWriters', () => {
        const spyon = jest.spyOn(constant,'TranslateConstants').mockReturnValueOnce('myNewsTabWriters').mockReturnValueOnce('myNewsTabMedia').mockReturnValueOnce('myNewsTabTopics')
        expect(render(<CustomTabBarItem tabName='myNewsTabWriters' index={0} onPress={mockOnPress} isSelected={true} />)).toBeDefined();
        spyon.mockClear();
    })

    test('Should render component with myNewsTabMedia', () => {
        const spyon = jest.spyOn(constant,'TranslateConstants').mockReturnValueOnce('myNewsTabWriters').mockReturnValueOnce('myNewsTabMedia').mockReturnValueOnce('myNewsTabTopics')
        expect(render(<CustomTabBarItem tabName='myNewsTabMedia' index={0} onPress={mockOnPress} isSelected={true} />)).toBeDefined();
        spyon.mockClear();
    })

    test('Should render component with myNewsTabTopics', () => {
        const spyon = jest.spyOn(constant,'TranslateConstants').mockReturnValueOnce('myNewsTabWriters').mockReturnValueOnce('myNewsTabMedia').mockReturnValueOnce('myNewsTabTopics')
        expect(render(<CustomTabBarItem tabName='myNewsTabTopics' index={0} onPress={mockOnPress} isSelected={true} />)).toBeDefined();
        spyon.mockClear();
    })

})
