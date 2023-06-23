import React, { useEffect, useRef, useState } from 'react'
import { I18nManager, Modal, NativeEventSubscription, Platform, View, StyleSheet, TouchableOpacity } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { useDispatch } from 'react-redux'
import { storeAppTheme, storeAppFirstSession } from 'src/redux/appCommon/action'
import { BaseUrlConfigType, Theme } from 'src/redux/appCommon/types'
import { useAppCommon, useBookmark, useLogin, useUserProfileData } from 'src/hooks'
import AppStackContainer from './AppStackContainer'
import { getCacheApiRequest } from 'src/services/api'
import { AAA_LIVE_BLOG_URL, AAA_PROFILE_IMAGE_URL, AAA_UMS_BASE_URL, BASE_URL_CONFIG, PROD_BASE_URL } from 'src/services/apiUrls'
import { isIOS, isNotEmpty, isObjectNonEmpty, screenWidth } from 'src/shared/utils'
import Video from 'react-native-video'
import { PodcastAnalyticsManager } from 'src/shared/utils/PodcastAnalyticsManager'
import { Label } from 'src/components/atoms'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { fonts } from 'src/shared/styles/fonts'
import { CustomThemeType, colors } from 'src/shared/styles/colors'
import VersionCheck from 'react-native-version-check'
import { APP_STORE_ID, openBrowserURL } from 'src/shared/utils/utilities'
import { TranslateConstants, TranslateKey } from 'src/constants/Constants'
import { GetFCMToken } from 'src/firebase/notification/notification'

const SplashNavigation = () => {
    const dispatch = useDispatch()
    const subscription = useRef<NativeEventSubscription>(null).current

    const[loading, setLoading] = useState(true)
    const[isLoaded, setIsLoaded] = useState(false)
    const[supportedVersions, setSuppoertedVersions] = useState<any>(null)
    const[showUpdate, setShowUpdate] = useState(false);
    const[storeURL, setStoreURL] = useState('');
    const styles = useThemeAwareObject(updateStyles);
    
    useEffect(() => {
        setTimeout(() => setLoading(false), 4000)
    }, []);

    const { getBookmarkedId } = useBookmark()
    const { isLoggedIn } = useLogin()
    const { fetchProfileDataRequest } = useUserProfileData();

    const { isFirstSession, baseUrlConfig, storeBaseUrlConfigInfo } = useAppCommon()

    const APP_UPDATE_TITLE = TranslateConstants({ key: TranslateKey.APP_UPDATE_TITLE });
    const APP_UPDATE_DESCRIPTION = TranslateConstants({ key: TranslateKey.APP_UPDATE_DESCRIPTION });
    const APP_UPDATE_BUTTON_LABEL = TranslateConstants({ key: TranslateKey.APP_UPDATE_BUTTON_LABEL });

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

    useEffect(() => {
        if (isObjectNonEmpty(supportedVersions)) {
          checkUpdate()
        }
      }, [supportedVersions]);

    const checkVersions = (currentVersion: string, minimumVersion: string) => {
        let currentVersionNumber = 0, minimumVersionNumber = 0;
        for (let i = 0, j = 0; (i < currentVersion.length || j < minimumVersion.length);) {
            while (i < currentVersion.length && currentVersion[i] != '.') {
                currentVersionNumber = currentVersionNumber * 10 + Number(currentVersion[i]);
                i++;
            }
            while (j < minimumVersion.length && minimumVersion[j] != '.') {
                minimumVersionNumber = minimumVersionNumber * 10 + Number(minimumVersion[j]);
                j++;
            }

            if (currentVersionNumber > minimumVersionNumber)
                return 1;
            if (minimumVersionNumber > currentVersionNumber)
                return -1;

            currentVersionNumber = minimumVersionNumber = 0;
            i++;
            j++;
        }
        return 0;
    }

    const getMinimumVersion = () => {
        if(supportedVersions){
            if(isIOS){
                return supportedVersions.ios
            }else{
                return supportedVersions.android
            }
        }  
    }

    const checkUpdate = async () => {
        try {
            const appInfo = {appID: APP_STORE_ID}
            const storeUrl = await VersionCheck.getStoreUrl(appInfo);
            const currentVersion = VersionCheck.getCurrentVersion();
            const minimumVersion = getMinimumVersion()
            setStoreURL(storeUrl)
            if(checkVersions(currentVersion,minimumVersion) == -1){
                setShowUpdate(true);
            }
            setIsLoaded(true);
        } catch (err: any) {
            setIsLoaded(true);
        }
    }
    
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
            if(isObjectNonEmpty(response.minimum_supported_version)){
                setSuppoertedVersions(response.minimum_supported_version);
            }
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

    const onPressUpdate = () => {
        if (isNotEmpty(storeURL)) {
            openBrowserURL(storeURL);
        }
    }

    const renderUpdateView = () => {
        return (
            <View style={{ flex: 1 }}>
                <Modal
                    transparent={true}
                    visible={showUpdate}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalView}>
                            <Label
                                children={APP_UPDATE_TITLE}
                                style={styles.titleStyle}
                            />
                            <Label
                                children={APP_UPDATE_DESCRIPTION}
                                style={styles.descriptionStyle}
                            />
                            <TouchableOpacity testID="updatePopupSplash" onPress={onPressUpdate}>
                                <View style={styles.buttonContainer}>
                                    <Label style={styles.buttonLabelStyle}
                                        children={APP_UPDATE_BUTTON_LABEL} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }

    const renderContent = () => {
        const checkLoaded = () => {
            if (isLoaded && showUpdate) {
                return renderUpdateView();
            } else if (isLoaded && isObjectNonEmpty(baseUrlConfig)) {
                return(
                    <>
                        <GetFCMToken/>
                        <PodcastAnalyticsManager />
                        <AppStackContainer />
                    </>
                )
            } else {
                return null
            }
        }
        if ((Platform.OS === 'android')) {
            return (
                <>
                    {(loading ?
                        <Video
                            source={require('../assets/video/splashscreen.mp4')}
                            resizeMode={'cover'}
                            controls={false}
                            style={{ width: "100%", height: '100%' }} />
                        :
                        checkLoaded())}

                </>
            )
        } else {
            return (
                <>
                    {checkLoaded()}
                </>
            )
        }
    }

    return renderContent();
}

export default SplashNavigation

const updateStyles = (theme: CustomThemeType) =>
    StyleSheet.create({
        modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.alertBackground
        },
        modalView: {
            alignItems: 'center',
            paddingVertical: 25,
            paddingHorizontal: 20,
            width: screenWidth * 0.8,
            backgroundColor: theme.secondaryWhite,
            borderRadius: 30,
        },
        titleStyle: {
            fontSize: 24,
            color: theme.primary,
            lineHeight: 42,
            fontFamily: fonts.AwsatDigital_Bold,
            justifyContent: 'center',
            textAlign: 'center',
        },
        descriptionStyle: {
            fontSize: 16,
            color: theme.secondaryDavyGrey,
            lineHeight: 28,
            textAlign: 'center',
            width: 278,
            fontFamily: fonts.IBMPlexSansArabic_Regular,
            paddingTop: 20,
        },
        buttonContainer: {
            height: 46,
            backgroundColor: theme.primary,
            borderRadius: 23,
            justifyContent: 'center',
            width: 172,
            alignSelf: 'center',
            marginTop: 25,
        },
        buttonLabelStyle: {
            paddingHorizontal: 10,
            fontSize: 16,
            fontFamily: fonts.AwsatDigital_Bold,
            color: colors.white,
            lineHeight: 26,
            textAlign: 'center',
        },
    })
