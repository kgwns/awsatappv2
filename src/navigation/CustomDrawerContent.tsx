import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Linking, Text } from 'react-native';
import { ImagesName } from '../shared/styles/images';
import { ButtonImage, ButtonOutline, Label, LabelTypeProp } from '../components/atoms';
import { ButtonList, Divider } from 'src/components/atoms';
import { isIOS, normalize, isTab, isAndroid, recordLogEvent } from 'src/shared/utils';
import FacebookIcon from 'src/assets/images/icons/facebook.svg';
import InstagramIcon from 'src/assets/images/icons/instagram.svg';
import TwitterIcon from 'src/assets/images/icons/twitter.svg';
import LinkedinIcon from 'src/assets/images/icons/linkedin.svg';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { useLogin, useSideMenu, useWeatherDetails } from 'src/hooks';
import { StackNavigationProp } from '@react-navigation/stack';
import { ABOUT_US, PRIVACY_POLICY_ID, TERMS_AND_CONDITION } from 'src/services/apiEndPoints';
import { getSvgImages } from 'src/shared/styles/svgImages';
import { colors } from '../shared/styles/colors';
import { useUserProfileData } from 'src/hooks/useUserProfileData';
import { getProfileImageUrl, isNonEmptyArray, isObjectNonEmpty, isStringIncludes } from 'src/shared/utils/utilities';
import {
  ScreensConstants,
  FACEBOOK_APP_URL,
  INSTAGRAM_APP_URL,
  LINKEDIN_APP_URL,
  TWITTER_APP_URL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  TWITTER_URL,
  TranslateConstants,
  TranslateKey,
} from 'src/constants/Constants';
import { ScreenContainer } from 'src/components/screens';
import { fonts } from 'src/shared/styles/fonts';
import { checkPermission } from 'src/shared/utils/LocationPermission';
import Geolocation from 'react-native-geolocation-service';
import CelsiusIcon from 'src/assets/images/icons/weather/Celsius.svg'
import CloudsIcon from 'src/assets/images/icons/weather/clouds.svg'
import RainIcon from 'src/assets/images/icons/weather/Rain.svg'
import SunIcon from 'src/assets/images/icons/weather/sun.svg'
import { weatherType } from 'src/components/screens/weatherDetail/WeatherDetailScreen';
import { openSettings } from 'react-native-permissions';
import DeviceInfo from 'react-native-device-info';
import { AnalyticsEvents } from 'src/shared/utils/analytics';

export enum SocialMediaType {
  instagram = 'Instagram',
  facebook = 'Facebook',
  twitter = 'Twitter',
  linkedIn = 'LinkedIn',
}

const JUSTIFY_CONTENT = 'space-between';
const CustomDrawerContent = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const WEATHER_DETAILS_ENABLE_LOCATION = TranslateConstants({key:TranslateKey.WEATHER_DETAILS_ENABLE_LOCATION})

  const styles = useThemeAwareObject(createStyles);

  const { sideMenuData, fetchSideMenuRequest } = useSideMenu();
  const { userProfileData } = useUserProfileData()
  const { fetchWeatherDetailsInfo, fetchWeatherDetailsSuccessInfo,
    fetchWeatherDetailsVisibilityInfo } = useWeatherDetails();
  
  const [sideMenuDataInfo, setSideMenuDataInfo] = useState<any>([])

  const ADVERTISE_WITH_US = TranslateConstants({key: TranslateKey.ADVERTISE_WITH_US});
  const ABOUT_THE_MIDDLE_EAST = TranslateConstants({key: TranslateKey.ABOUT_THE_MIDDLE_EAST});
  const TERMS_OF_USE = TranslateConstants({key: TranslateKey.TERMS_OF_USE});
  const PRIVACY_POLICY = TranslateConstants({key: TranslateKey.PRIVACY_POLICY});
  const CALL_US = TranslateConstants({key: TranslateKey.DRAWER_CALL_US});
  const CARICATURE = TranslateConstants({key: TranslateKey.CARICATURE});
  
  const [latitude, setLatitude] = useState<number>();
  const [longitude, setLongitude] = useState<number>();
  const [locationEnabled, setLocationEnabled] = useState<boolean>(false);
  const [deviceLocationEnabled, setDeviceLocationEnabled] = useState<boolean>(false);

  useEffect(() => {
    fetchSideMenuRequest();
  }, []);

  useEffect(() => {
    DeviceInfo.isLocationEnabled().then((enabled) => {
      setDeviceLocationEnabled(enabled)
    });
  }, [DeviceInfo.isLocationEnabled()])

  useEffect(() => {
    getLocationDetails();
  }, [deviceLocationEnabled])

  useEffect(() => {
    if (latitude && longitude) {
      const body = {
        lat: latitude,
        lon: longitude
      }
      fetchWeatherDetailsInfo(body)
      fetchWeatherDetailsVisibilityInfo(body)
    }
  }, [latitude, longitude])

  useEffect(() => {
    if (isNonEmptyArray(sideMenuData)) {
      const data = formateChildMenuData(sideMenuData)
      setSideMenuDataInfo(data);
    }
  }, [sideMenuData])

  const getMainData = (fetchWeatherDetailsSuccessInfoProps: any): string => {
    let mainData = ''
    if (isObjectNonEmpty(fetchWeatherDetailsSuccessInfoProps) && isNonEmptyArray(fetchWeatherDetailsSuccessInfoProps?.list[0].weather)) {
      mainData = fetchWeatherDetailsSuccessInfoProps?.list[0].weather[0].main.toLowerCase();
    }
    return mainData
  }

  const getWeatherIcon = () => {
    const mainData = getMainData(fetchWeatherDetailsSuccessInfo);
    const width = 16;
    const height = 16;
    if (isStringIncludes(mainData, weatherType.rain)) {
      return <RainIcon width={width} height={height} style={styles.weatherIcon} />
    } else if (isStringIncludes(mainData, weatherType.clouds)) {
      return <CloudsIcon width={width} height={height} style={styles.weatherIcon} />
    } else if (isStringIncludes(mainData, weatherType.sun)) {
      return <SunIcon width={width} height={height} style={styles.weatherIcon} />
    } else {
      return <SunIcon width={width} height={height} style={styles.weatherIcon} />
    }
  };

  const getWeatherDetail = () => {
    return <View style={styles.menuWeatherContainer}>
      <Divider style={styles.divider} />
      <TouchableOpacity testID='weatherId' onPress={() => navigation.navigate(ScreensConstants.WEATHER_DETAIL_SCREEN)} style={styles.weather}>
        <Text style={styles.weatherTitle}>
        {fetchWeatherDetailsSuccessInfo?.city.name}
        {' :'}
        </Text>
        {fetchWeatherDetailsSuccessInfo?.list[0].temp.day &&
          <View style={styles.weatherTempContainer}>
            <CelsiusIcon style={styles.weatherCelsiusIcon} height={isAndroid? 16 : 17} width={isAndroid? 16 : 17}/>
            <Text style={styles.weatherTemp}>
              {'  '}
              {Math.round(fetchWeatherDetailsSuccessInfo?.list[0].temp.day)}
            </Text>
           </View>
        }
        {getWeatherIcon()}
        {fetchWeatherDetailsSuccessInfo?.list[0].weather[0].description &&
          <Text style={styles.weatherType}>
            {'  '}
            {fetchWeatherDetailsSuccessInfo?.list[0].weather[0].description}
          </Text>
        }
      </TouchableOpacity>
    </View>
  };

  const getLocationDetails = () => {
    if (checkPermission() && !latitude && !longitude) {
      Geolocation.getCurrentPosition(
        (position) => {
          setLocationEnabled(true);
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 25000, maximumAge: 3600000 }
      );
    } else {
      !latitude && !longitude && setLocationEnabled(false)
    }
  };

  const getLocationPermission = () => {
    if (isIOS) {
      openSettings().then(() => {
        checkAndGetLocation()
      });
    } else {
      checkAndGetLocation()
    }
  };

  const checkAndGetLocation = () => {
    checkPermission();
    setTimeout(() => {
      getLocationDetails();
    }, 1000)
  }

  const getLocationAccess = () => {
    return <View style={styles.menuWeatherContainer}>
      <Divider style={styles.divider}/>
      <Label children={'--'} style={styles.emptyWeather}/>
      <ButtonOutline 
        title={WEATHER_DETAILS_ENABLE_LOCATION}
        style={styles.enableLocationButton}
        labelStyle={styles.EnableLocationButtonLabel}
        titleType={LabelTypeProp.h1}
        onPress={getLocationPermission}
      />
    </View>
  };

  const formateChildMenuData = (menuData: any[], parentId: null | string = null) => {
    const allMenuData = []
    let filterMenuData = []
    if (parentId == null) {
      filterMenuData = menuData.reduce((data, item) => {
        if (item.parent_export == null) {
          const updatedData = item
          updatedData.showDropdown = false
          data.push(updatedData)
        }
        return data
      }, [])
    } else {
      filterMenuData = menuData.filter((item) => item.parent_export && item.parent_export.includes(parentId))
    }

    for(const item of filterMenuData) {
      const newParentId = item.uuid_export ?? null
      const customData: any = {
        ...item,
      }

      customData.child = newParentId ? formateChildMenuData(menuData, newParentId) : null
      allMenuData.push(customData)
    }

    return allMenuData
  }

  const onPressDropDownIcon = (parentIndex: number, childIndex: number, isChild: boolean) => {
    const menuData = [...sideMenuDataInfo]
    if (isChild) {
      menuData[parentIndex].child[childIndex].showDropDown = !menuData[parentIndex].child[childIndex].showDropDown ?? true
    } else {
      menuData[parentIndex].showDropDown = !menuData[parentIndex].showDropDown ?? true
    }
    setSideMenuDataInfo(menuData)
  }

  const onPressNavigation = (screen: string, params: object) => {
    navigation.dispatch(DrawerActions.closeDrawer());
    navigation.navigate(screen, params);
  }

  const UserIcon = () => (
    <>
      {getSvgImages({ name: ImagesName.userDefaultIcon, width: styles.user.width, height: styles.user.height, style: styles.user })}
    </>
  )

  const CloseIcon = () => (
    <>
      {getSvgImages({ name: ImagesName.menuCloseIcon, width: styles.close.width, height: styles.close.height, style: styles.close })}
    </>
  )

  const header = () => (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.headerLeft} testID = "profileId" onPress={() => {
        navigation.navigate(ScreensConstants.PROFILE_SETTING)
      }}>
        {useLogin().isLoggedIn && userProfileData.user?.image ?
          <Image style={styles.user} source={{ uri: getProfileImageUrl(userProfileData.user?.image) }} />
          : userProfileData.user?.profile_url
            ? <Image style={styles.user} source={{ uri: getProfileImageUrl(userProfileData.user?.profile_url) }} />
            : <UserIcon />}
      </TouchableOpacity>
      <View style={styles.logoContainer}>
        {getSvgImages({ name: ImagesName.headerLogo, width: styles.logo.width, height: styles.logo.height, style: styles.logo })}
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity
          testID='drawerToggleId'
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
          <CloseIcon />
        </TouchableOpacity>
      </View>
    </View>
  );

  const buttonListItem = ({
     isChild, item, index, icon, isSubChild = false, parentIndex,
  }: { isChild: boolean, item: any, index: number, icon?: ImagesName | null, isSubChild: boolean, parentIndex: number }) => {
    const hipSlopValue = normalize(12)
    return (
      <ButtonList
        showIcon={icon ? true : false}
        iconName={icon}
        hitSlop={{ top: hipSlopValue, bottom: hipSlopValue, left: hipSlopValue, right: hipSlopValue }}
        key={index}
        title={item.title}
        onPress={() => {
          onPressNavigationDynamicMenu(isChild, item)
        }}
        onPressIcon={() => onPressDropDownIcon(parentIndex, index, isChild)}
        containerStyle={isSubChild ? styles.subChildItemStyle : isChild && styles.childItemStyle}
        titleStyle={isSubChild ? styles.subChildTitleStyle : isChild ? styles.childTitleStyle : styles.parentTitleStyle}
      />
    )
  }

  const onPressNavigationDynamicMenu = (isChild: boolean, menuInfo: any) => {
    if(menuInfo.field_app_key_name_export === CARICATURE){
      onPressNavigation(ScreensConstants.CartoonListScreen, {title: menuInfo.title});
      return;
    }
    const screenName = isChild ? ScreensConstants.SectionArticlesScreen : ScreensConstants.SectionArticlesParentScreen
    const defaultParams = { sectionId: menuInfo.field_sections, title: menuInfo.title }
    const params = isChild ? defaultParams : { ...defaultParams, keyName: menuInfo.field_app_key_name_export }
    onPressNavigation(screenName, params)
  }

  const openSocialMedia = (type: string) => {
    switch (type) {
      case SocialMediaType.facebook:
        recordLogEvent(AnalyticsEvents.PRESSED_ON_SOCIAL_MEDIA_EXTENSIONS, { socialMedia: SocialMediaType.facebook });
        Linking.openURL(FACEBOOK_APP_URL).catch(() => {
          Linking.openURL(FACEBOOK_URL)
        });
        return;
      case SocialMediaType.instagram:
        recordLogEvent(AnalyticsEvents.PRESSED_ON_SOCIAL_MEDIA_EXTENSIONS, { socialMedia: SocialMediaType.instagram });
        Linking.openURL(INSTAGRAM_APP_URL).catch(() => {
          Linking.openURL(INSTAGRAM_URL)
        });
        return;
      case SocialMediaType.linkedIn:
        recordLogEvent(AnalyticsEvents.PRESSED_ON_SOCIAL_MEDIA_EXTENSIONS, { socialMedia: SocialMediaType.linkedIn });
        Linking.openURL(LINKEDIN_APP_URL).catch(() => {
          Linking.openURL(LINKEDIN_URL)
        });
        return;
      case SocialMediaType.twitter:
        recordLogEvent(AnalyticsEvents.PRESSED_ON_SOCIAL_MEDIA_EXTENSIONS, { socialMedia: SocialMediaType.twitter });
        Linking.openURL(TWITTER_APP_URL).catch(() => {
          Linking.openURL(TWITTER_URL)
        });
        return;
      default:
        return;
    }
  }

  const renderChildMenuData = (item: any, index: number, parentIndex: number) => {
    const icon = isNonEmptyArray(item.child) ? ImagesName.downArrowIcon : null

    return (
      <View>
        {buttonListItem({ isChild: true, item, index, icon, isSubChild: false, parentIndex })}
        {isNonEmptyArray(item.child) && item.showDropDown && <View>
          {item.child.map((subChildItem: any, subChildIndex: number) => {
            return buttonListItem({ isChild: false, item: subChildItem, index: subChildIndex, icon: null, isSubChild: true, parentIndex })
          })}
        </View>
        }
      </View>
    )
  }

  const socialIconSize = isTab ? 33 : 23;
  const contactUsTitleStyle = isTab ? styles.tabletTitleStyle : styles.nonBoldTitle; 

  return (
    <ScreenContainer showPlayer={false} backgroundColor={styles.screenBackgroundColor?.backgroundColor}>
      {header()}
      <ScrollView bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {locationEnabled ?
            isNonEmptyArray(fetchWeatherDetailsSuccessInfo?.list) && getWeatherDetail()
          :
            getLocationAccess()
        }

        <View style={styles.menuContainer}>
          {sideMenuDataInfo.length > 0 &&
            sideMenuDataInfo.map((item: any, index: number) => {
              const icon = isNonEmptyArray(item.child) ? isTab ? ImagesName.tabletDownArrowIcon : ImagesName.downArrowIcon : null
              return (
                <View key={index}>
                  {buttonListItem({isChild: false, item, index, icon, isSubChild: false, parentIndex: index})}
                  {isNonEmptyArray(item.child) && item.showDropDown && <View>
                    {item.child.map((childItem: any, childIndex: number) => {
                      return renderChildMenuData(childItem, childIndex, index)
                    })}
                  </View>
                  }
                </View>
              );
            })}
          <Divider style={styles.divider} />
          {/* <ButtonList //Removed for AMAR-1284 & AMAR-1277 and enable it when required.
            title={ADVERTISE_WITH_US}
            onPress={() => onPressNavigation(
              ScreensConstants.TERMS_AND_ABOUT_US,
              { title: ADVERTISE_WITH_US, id: ADVERTISE_INFO_ID }
            )}
            titleStyle={contactUsTitleStyle}
          /> */}
          {/* <ButtonList
            title={t('drawer.aboutTheEast')}
            onPress={() => onPressNavigation(
              ScreensConstants.TERMS_AND_ABOUT_US,
              { title: t('drawer.aboutTheEast'), id: AWSATT_HISTORY_INFO_ID }
            )}
            titleStyle={contactUsTitleStyle}
          /> */}
          <ButtonList
            title={ABOUT_THE_MIDDLE_EAST}
            onPress={() => onPressNavigation(
              ScreensConstants.TERMS_AND_ABOUT_US,
              { title: ABOUT_THE_MIDDLE_EAST, id: ABOUT_US }
            )}
            titleStyle={contactUsTitleStyle}
          />
          <ButtonList
            title={CALL_US}
            onPress={() => onPressNavigation(
              ScreensConstants.CONTACT_US_SCREEN, {}

            )}
            titleStyle={contactUsTitleStyle}
          />
          <ButtonList
            title={TERMS_OF_USE}
            onPress={() => onPressNavigation(
              ScreensConstants.TERMS_AND_ABOUT_US,
              { title: TERMS_OF_USE, id: TERMS_AND_CONDITION }
            )}
            titleStyle={contactUsTitleStyle}
          />

          <ButtonList
            title={PRIVACY_POLICY}
            onPress={() => onPressNavigation(
              ScreensConstants.TERMS_AND_ABOUT_US,
              { title: PRIVACY_POLICY, id: PRIVACY_POLICY_ID }
            )}
            titleStyle={contactUsTitleStyle}
          />

          <View style={styles.socialContainer}>
            <ButtonImage
              icon={() => <LinkedinIcon width={socialIconSize} height={socialIconSize} />}
              onPress={() => openSocialMedia(SocialMediaType.linkedIn)}
            />
            <ButtonImage
              icon={() => <TwitterIcon width={socialIconSize} height={socialIconSize} />}
              onPress={() => openSocialMedia(SocialMediaType.twitter)}
            />
            <ButtonImage
              icon={() => <FacebookIcon width={socialIconSize} height={socialIconSize} />}
              onPress={() => openSocialMedia(SocialMediaType.facebook)}
            />
            <ButtonImage
              icon={() => <InstagramIcon width={socialIconSize} height={socialIconSize} />}
              onPress={() => openSocialMedia(SocialMediaType.instagram)}
            />
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default CustomDrawerContent;
const createStyles = (theme: CustomThemeType) =>
  StyleSheet.create({
    headerContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: isIOS ? normalize(5) : normalize(15)
    },
    socialContainer: {
      flexDirection: 'row',
      justifyContent: JUSTIFY_CONTENT,
      marginVertical: normalize(30),
      marginHorizontal: 4
    },
    headerRight: {
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      left: normalize(20),
    },
    headerLeft: {
      zIndex: 1,
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      right: normalize(35),
      bottom: 1,
    },
    user: {
      width: 27,
      height: 27,
      borderRadius: 27 / 2,
      borderWidth: isIOS ? normalize(2) : normalize(3),
      borderColor: colors.lightGreenishBlue,
    },
    menuContainer: {
      marginHorizontal: normalize(35),
      marginTop: normalize(20),
    },
    menuWeatherContainer: {
      marginHorizontal: normalize(35),
      marginTop: normalize(3),
    },
    drawerItemStyle: {
      left: 0,
      width: '100%',
    },
    logo: {
      height: 32,
      width: 135,
      alignItems: 'center',
    },
    logoContainer: {
      alignItems: 'center',
    },
    weather: {
      marginTop: normalize(9),
      alignSelf: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      height: 35,
    },
    enableLocationButton: {
      marginTop: normalize(9),
      alignSelf: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      height: 35,
      backgroundColor: colors.greenishBlue,
      borderColor: colors.transparent,
      width: 220,
    },
    weatherTempContainer: {
      flexDirection: 'row',
      justifyContent: JUSTIFY_CONTENT,
    },
    weatherCelsiusIcon: {
      marginTop: isAndroid ? normalize(9) : normalize(8),
    },
    weatherType: {
      fontFamily: fonts.Effra_Regular,
      fontSize: isAndroid ? normalize(16) : normalize(12.5),
      color: colors.lightGrey,
      marginTop: isAndroid ? normalize(2) : normalize(6)
    },
    weatherTemp: {
      fontFamily: fonts.Effra_Arbc_Medium,
      fontSize: isAndroid ? normalize(18) : normalize(17),
      color: colors.greenishBlue,
      marginTop: isAndroid ? normalize(0) : normalize(3),
    },
    weatherIcon: {
      marginTop: normalize(7),
      marginLeft: isAndroid ? normalize(10) : normalize(0),
    },
    EnableLocationButtonLabel: {
      color: colors.white,
      fontSize: normalize(12),
      lineHeight: normalize(20),
      fontFamily: fonts.AwsatDigital_Bold,
    },
    weatherTitle: {
      fontFamily: fonts.AwsatDigital_Regular,
      fontSize: isAndroid ? normalize(16) : normalize(14),
      color: theme.primaryBlack,
      marginRight: normalize(5),
      marginTop: normalize(2),
    },
    nonBoldTitle: {
      fontFamily: fonts.AwsatDigital_Regular,
    },
    divider: {
      height: 1,
      backgroundColor: theme.dividerColor
    },
    childItemStyle: {
      marginLeft: 20,
    },
    subChildItemStyle: {
      marginLeft: 40
    },
    childTitleStyle:{
      fontFamily: fonts.AwsatDigital_Regular,
    },
    subChildTitleStyle: {
      fontFamily: fonts.AwsatDigital_Regular,
    },
    parentTitleStyle: {
      fontFamily: fonts.AwsatDigital_Bold,
    },
    itemContainer: {
      flexDirection: 'row',
      justifyContent: JUSTIFY_CONTENT,
      alignItems: 'center',
      paddingVertical: normalize(15),
    },
    itemLeftContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    appearanceLabel: {
      marginLeft: normalize(20),
      color: theme.secondaryMediumGrey,
    },
    close: {
      width: 15,
      height: 15
    },
    emptyWeather: {
      alignSelf: 'center',
      fontSize: 20,
      color: theme.primaryBlack,
      marginTop: 20,
      lineHeight: 22
    },
    screenBackgroundColor: {
      backgroundColor: theme.profileBackground
    },
    tabletTitleStyle: {
      fontFamily: fonts.Effra_Arbc_Regular,
      fontSize: 20,
      lineHeight: 35,
      fontWeight:"400",
      color: theme.contactUsTitleColor,
    },
  });
