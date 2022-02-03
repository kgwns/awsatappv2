import React, { useEffect, useRef } from 'react'
import { Appearance, ColorSchemeName, I18nManager, NativeEventSubscription, useColorScheme } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { useDispatch } from 'react-redux'
import { storeAppTheme } from 'src/redux/appCommon/action'
import { Theme } from 'src/redux/appCommon/types'
import { isDarkTheme } from '../shared/utils'
import AppStackContainer from './AppStackContainer'

const SplashNavigation = () => {
    const dispatch = useDispatch()
    const theme = useColorScheme()
    let isDarkMode = isDarkTheme(theme)
    let subscription = useRef<NativeEventSubscription>(null).current

    useEffect(() => {
        updateColorScheme()
        return () => subscription?.remove()
    }, [])

    const updateColorScheme = () => {
        dispatch(storeAppTheme(isDarkMode ? Theme.DARK : Theme.LIGHT))
        subscription = Appearance.addChangeListener(onThemeChange)
    }

    const onThemeChange = ({ colorScheme }: { colorScheme: ColorSchemeName }) => {
        isDarkMode = isDarkTheme(colorScheme)
        dispatch(storeAppTheme(isDarkMode ? Theme.DARK : Theme.LIGHT))
    }

    useEffect(() => {
        I18nManager.forceRTL(true)
        SplashScreen.hide()
    }, [])

    return <AppStackContainer />
}

export default SplashNavigation
