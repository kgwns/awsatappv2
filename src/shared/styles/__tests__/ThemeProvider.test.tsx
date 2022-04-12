import React from 'react'
import { render, RenderAPI } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import { storeSampleData } from 'src/constants/SampleData'
import { ThemeProvider, useTheme } from '../ThemeProvider'
import { DEFAULT_LIGHT_THEME } from '../colors'

describe('<ThemeProvider>', () => {
    let instance: RenderAPI

    beforeEach(() => {
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

    test('Should render ThemeProvider', () => {
        expect(instance).toBeDefined()
    })
    test('useTheme to be Defined', () => {
        expect(useTheme).toBeDefined()
    })
})