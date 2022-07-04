import React, { useState } from 'react'
import {render, RenderAPI } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import { storeSampleData } from '../../../../constants/SampleData'
import { SectionsScreen } from '../SectionsScreen'
import { useTopMenu } from 'src/hooks';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}));

jest.mock('src/hooks/useTopMenu', () => ({useTopMenu: jest.fn()}));

const mockString = 'mockString';

describe('<SectionsScreen>', () => {
    let instance: RenderAPI

    const setTabSelectedIndex = jest.fn();
    const setNewRoutes = jest.fn();
    const setIndex = jest.fn()

    const useTopMenuMock = jest.fn();
    const fetchTopMenuRequestMock = jest.fn();

    beforeEach(() => {
        (useState as jest.Mock).mockImplementation(() => [0, setTabSelectedIndex]);
        (useState as jest.Mock).mockImplementation(() => [[], setNewRoutes]);
        (useState as jest.Mock).mockImplementation(() => [0, setIndex]);
        (useTopMenu as jest.Mock).mockImplementation(useTopMenuMock);

        useTopMenuMock.mockReturnValue({
            isLoading: false,
            topMenuData: [{ tabName: mockString, keyName: 'home', isSelected: true, sectionId: 1 }],
            topMenuError: 'error',
            fetchTopMenuRequest: fetchTopMenuRequestMock,
        });

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
})