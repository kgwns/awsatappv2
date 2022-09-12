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

    const index = jest.fn();
    const routes = jest.fn();
    const hidePlayerVisibility = jest.fn()

    const useTopMenuMock = jest.fn();
    const fetchTopMenuRequestMock = jest.fn();

    beforeEach(() => {
        (useState as jest.Mock).mockImplementation(() => [0, index]);
        (useState as jest.Mock).mockImplementation(() => [[{child: {tabName: 'example', isSelected: true}}], routes]);
        (useState as jest.Mock).mockImplementation(() => [false, hidePlayerVisibility]);
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

describe('<SectionsScreen>', () => {
    let instance: RenderAPI

    const index = jest.fn();
    const routes = jest.fn();
    const hidePlayerVisibility = jest.fn()

    const useTopMenuMock = jest.fn();
    const fetchTopMenuRequestMock = jest.fn();

    beforeEach(() => {
        (useState as jest.Mock).mockImplementation(() => [1, index]);
        (useState as jest.Mock).mockImplementation(() => [[{child: {tabName: 'example', isSelected: true}}], routes]);
        (useState as jest.Mock).mockImplementation(() => [true, hidePlayerVisibility]);
        (useTopMenu as jest.Mock).mockImplementation(useTopMenuMock);

        useTopMenuMock.mockReturnValue({
            isLoading: true,
            topMenuData: [],
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