import React from 'react'
import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import { TabWithBarItem } from 'src/components/molecules/tabWithBarItem/TabWithBarItem'
import { moleculesTestID } from 'src/constants/Constants'

describe('<TabBarComponent>', () => {
    let instance: RenderAPI

    let tabItem = {
        tabName: 'العالم العربي',
        isSelected: false
    }

    const mockOnPress = jest.fn().mockImplementation(() => {
        tabItem.isSelected = !tabItem.isSelected
    })

    const onPressmock = jest.fn()

    beforeEach(() => {
        const component = <TabWithBarItem {...tabItem} index={0} onPress={onPressmock} />
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    test('Should render component', () => {
        expect(instance).toBeDefined()
    })

    describe('onPress action in item', () => {
        const onPressmock = jest.fn()
        beforeEach(() => {
            const component = <TabWithBarItem {...tabItem} index={0} onPress={onPressmock} />
            instance = render(component)
        })

        test('Should check bar getting render when select', () => {
            const element = instance.getByTestId(moleculesTestID.tabItemBtn)
            fireEvent.press(element, 'onPress')
            expect(onPressmock).toHaveBeenCalledTimes(1);
        })
    })
})