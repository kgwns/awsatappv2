import React, { useEffect, useRef } from 'react'
import { I18nManager, NativeEventSubscription, useColorScheme, AppState } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { useDispatch } from 'react-redux'
import { storeAppTheme, storeAppFirstSession } from 'src/redux/appCommon/action'
import { Theme } from 'src/redux/appCommon/types'
import { useAppCommon, useBookmark, useLogin, useUserProfileData } from 'src/hooks'
import { isDarkTheme } from '../shared/utils'
import AppStackContainer from './AppStackContainer'

const SplashNavigation = () => {
    const dispatch = useDispatch()
    const theme = useColorScheme()
    let isDarkMode = isDarkTheme(theme)
    let subscription = useRef<NativeEventSubscription>(null).current

    const { getBookmarkedId } = useBookmark()
    const { isLoggedIn } = useLogin()
    const { fetchProfileDataRequest } = useUserProfileData();

    const { isFirstSession } = useAppCommon()
    useEffect(() => {
        updateAppThemeState()
        return () => subscription?.remove()
    }, [])

    useEffect(() => {
        if (isLoggedIn) {
            getBookmarkedId()
            fetchProfileDataRequest()
        }
    }, [])

    // useEffect(() => {
    //     const subscription = AppState.addEventListener("change", () => {
    //         if (AppState.currentState.match(/inactive|background/)) {
    //             TrackPlayer.pause();
    //         }
    //     });
    //     return () => {
    //         subscription.remove();
    //     };
    // }, []);

    const updateAppThemeState = () => {
        if (isFirstSession) { // Listen OS theme only first time
            dispatch(storeAppFirstSession())
            updateColorScheme()
        }
    }

    const updateColorScheme = () => {
        dispatch(storeAppTheme(isDarkMode ? Theme.DARK : Theme.LIGHT))
    }

    useEffect(() => {
        I18nManager.forceRTL(true)
        SplashScreen.hide()
    }, [])

    return <AppStackContainer />
}

export default SplashNavigation
