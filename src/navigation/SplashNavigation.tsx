import React, { useEffect, useRef, useState } from 'react'
import { I18nManager, NativeEventSubscription, useColorScheme, AppState, Platform } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { useDispatch } from 'react-redux'
import { storeAppTheme, storeAppFirstSession } from 'src/redux/appCommon/action'
import { Theme } from 'src/redux/appCommon/types'
import { useAppCommon, useBookmark, useLogin, useUserProfileData } from 'src/hooks'
import AppStackContainer from './AppStackContainer'
import { getCacheApiRequest } from 'src/services/api'
import { BASE_URL, BASE_URL_CONFIG } from 'src/services/apiUrls'
import { isNotEmpty } from 'src/shared/utils'

const SplashNavigation = () => {
    const dispatch = useDispatch()
    const subscription = useRef<NativeEventSubscription>(null).current

    // Commented for AMAR-1145 (Enable when video splash required)
    // const[loading, setLoading] = useState(true)
    // useEffect(() => {
    //     setTimeout(() => setLoading(false), 4000)
    // }, []);

    const { getBookmarkedId } = useBookmark()
    const { isLoggedIn } = useLogin()
    const { fetchProfileDataRequest } = useUserProfileData();

    const { isFirstSession, baseUrlConfig, storeBaseUrlConfigInfo } = useAppCommon()

    useEffect(() => {
        getBaseURL();
    }, [])

    useEffect(() => {
        updateAppThemeState()
        return () => subscription?.remove()
    }, [])

    useEffect(() => {
        if (isLoggedIn && isNotEmpty(baseUrlConfig)) {
            getBookmarkedId()
            fetchProfileDataRequest()
        }
    }, [baseUrlConfig])
    
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

    const getBaseURL = async () => {
        try {
            const response = await getCacheApiRequest(
                `${BASE_URL_CONFIG}`,
            );
            const url = isNotEmpty(response.baseurl) ? response.baseurl : BASE_URL
            const validUrl = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
            storeBaseUrlConfigInfo(validUrl);
            return response;
        } catch (error) {
            throw error;
        }
    }

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
        <>
            {isNotEmpty(baseUrlConfig) && <AppStackContainer />}
        </>
    );
}

export default SplashNavigation
