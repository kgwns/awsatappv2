import React, { useEffect, useRef, useState } from 'react'
import { I18nManager, NativeEventSubscription, useColorScheme, AppState, Platform } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { useDispatch } from 'react-redux'
import { storeAppTheme, storeAppFirstSession } from 'src/redux/appCommon/action'
import { Theme } from 'src/redux/appCommon/types'
import { useAppCommon, useBookmark, useLogin, useUserProfileData } from 'src/hooks'
import AppStackContainer from './AppStackContainer'

const SplashNavigation = () => {
    const dispatch = useDispatch()
    const subscription = useRef<NativeEventSubscription>(null).current
    const[loading, setLoading] = useState(true)

    useEffect(() => {setTimeout(()=>setLoading(false),4000)}, []);

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
    
    // Enable the background mode for the trackplayer. if don't we can use this lines in future. 
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
        dispatch(storeAppTheme(Theme.LIGHT))
    }

    useEffect(() => {
        I18nManager.forceRTL(true)
        SplashScreen.hide()
    }, [])

    return (
    // Commented for AMAR-1145
    //     Platform.OS === 'android' ?
    //     (loading ?
    //     <Video 
    //         source={require('../assets/video/splashscreen.mp4')}
    //         resizeMode={'cover'}
    //         controls={false}
    //         style={{width: "100%", height: '100%'}} />
    //    : <AppStackContainer />)
    //    : 
       <AppStackContainer />
    );
}

export default SplashNavigation
