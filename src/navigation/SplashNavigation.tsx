import React, { useEffect, useRef, useState } from 'react'
import { I18nManager, NativeEventSubscription } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { useDispatch } from 'react-redux'
import { storeAppTheme, storeAppFirstSession } from 'src/redux/appCommon/action'
import { BaseUrlConfigType, Theme } from 'src/redux/appCommon/types'
import { useAppCommon, useBookmark, useLogin, useUserProfileData } from 'src/hooks'
import AppStackContainer from './AppStackContainer'
import { getCacheApiRequest } from 'src/services/api'
import { AAA_LIVE_BLOG_URL, AAA_PROFILE_IMAGE_URL, AAA_UMS_BASE_URL, BASE_URL_CONFIG, PROD_BASE_URL } from 'src/services/apiUrls'
import { isNotEmpty, isObjectNonEmpty } from 'src/shared/utils'

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
        if (isLoggedIn && isObjectNonEmpty(baseUrlConfig)) {
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

            const validBaseUrlConfig: BaseUrlConfigType = {
                baseUrl: isNotEmpty((response.base_url)) ? getValidUrl(response.base_url) : PROD_BASE_URL,
                umsUrl: isNotEmpty(response.ums_base_url) ? getValidUrl(response.ums_base_url) : AAA_UMS_BASE_URL,
                imageUrl: getValidUrl(response.image_url),
                profileImageUrl: isNotEmpty(response.profile_image_url) ? getValidUrl(response.profile_image_url) : AAA_PROFILE_IMAGE_URL,
                liveBlogUrl: isNotEmpty(response.live_blog_url) ? getValidUrl(response.live_blog_url) : AAA_LIVE_BLOG_URL,
            }
            storeBaseUrlConfigInfo(validBaseUrlConfig);
        } catch (error) {
            console.log('getBaseURL - Error', error)
            throw error;
        }
    }

    const getValidUrl = (url: string) => {
        return url.charAt(url.length - 1) === '/' ? url : `${url}/`
    };

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
            {isObjectNonEmpty(baseUrlConfig) && <AppStackContainer />}
        </>
    );
}

export default SplashNavigation
