import React, {useState}  from 'react';
import { render, RenderAPI } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import { storeSampleData } from 'src/constants/SampleData'
import { ThemeProvider, useTheme } from '../ThemeProvider'
import { DEFAULT_LIGHT_THEME } from '../colors'

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}));

// jest.mock('react-native-adjust-oaid', () => {
//     const actualNav = jest.requireActual('react-native-adjust-oaid');
//     return {
//       ...actualNav,
//       NativeModules: jest.fn().mockImplementation(() => jest.fn())
//     };
// });

describe('<ThemeProvider>', () => {
    let instance: RenderAPI
    const mockFunction = jest.fn();
    // const setTheme = mockFunction;
    const ThemeManager = {
        setTheme: mockFunction,
    }
    describe('when ThemeProvider only', () => {
        beforeEach(() => {
            (useState as jest.Mock).mockImplementation(() => [DEFAULT_LIGHT_THEME, ThemeManager.setTheme]);
            const component =
                <Provider store={storeSampleData}>
                    <ThemeProvider initial={DEFAULT_LIGHT_THEME} />
                </Provider>
            instance = render(component)
        })

        afterEach(() => {
            jest.clearAllMocks()
            instance.unmount()
        })

        xit('Should render ThemeProvider', () => {
            expect(instance).toBeDefined()
        })
        // xit('useTheme to be Defined', () => {
        //     expect(useTheme).toBeDefined()
        // })
    })
})