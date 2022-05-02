import React, { useState } from 'react'
import { render, RenderAPI } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import { storeSampleData } from '../../../../constants/SampleData'
import { SectionsScreen } from '../SectionsScreen'

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}));

const mockString = 'mockString'

jest.mock("src/hooks/useTopMenu", () => ({
    useTopMenu: (...args: any) => {
        return {
            isLoading: false,
            topMenuData: [{ tabName: mockString, keyName: 'home', isSelected: true, sectionId: 1 }],
            topMenuError: 'error',
            fetchTopMenuRequest: () => {
                return []
            },
        }
    },
}));

describe('<SectionsScreen>', () => {
    let instance: RenderAPI

    const setTabSelectedIndex = jest.fn()
    const setNewRoutes = jest.fn()

    beforeEach(() => {
        (useState as jest.Mock).mockImplementation(() => [0, setTabSelectedIndex]);
        (useState as jest.Mock).mockImplementation(() => [[], setNewRoutes])

        const component =
            <Provider store={storeSampleData}>
                <SectionsScreen />
            </Provider>
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    test('Should render component', () => {
        expect(instance).toBeDefined()
    })
    // test('Check tab getting change when onClick', () => {
    //     const tabBar = instance.container.findByType(TabBarComponent)
    //     fireEvent(tabBar, 'onPressTabItem', 0)
    //     expect(tabBar).toBeTruthy()
    // })
    // test('Check tab getting change when SectionStoryScreen', () => {
    //     const firstTab = instance.container.findByType(SectionStoryScreen)
    //     fireEvent(firstTab, 'onCalled', 0)
    //     expect(firstTab).toBeTruthy()
    // })
    // it('when onTextChange is called from SectionStoryScreen', () => {
    //     const sectionStoryId = instance.getByTestId('tabContent');
    //     expect(sectionStoryId).toBeTruthy
    // });    
})