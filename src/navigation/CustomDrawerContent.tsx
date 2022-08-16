import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Image, Linking, Text } from 'react-native';
import { ImagesName } from '../shared/styles/images';
import { ButtonImage, Label, LabelTypeProp } from '../components/atoms';
import { ButtonList, Divider } from 'src/components/atoms';
import { useTranslation } from 'react-i18next';
import { isIOS, normalize, isDarkTheme, isTab, isAndroid } from 'src/shared/utils';
// import CloseIcon from 'src/assets/images/icons/close.svg';
import FacebookIcon from 'src/assets/images/icons/facebook.svg';
import InstagramIcon from 'src/assets/images/icons/instagram.svg';
import TwitterIcon from 'src/assets/images/icons/twitter.svg';
import LinkedinIcon from 'src/assets/images/icons/linkedin.svg';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { ScreensConstants } from 'src/constants';
import { useLogin, useSideMenu, useWeatherDetails } from 'src/hooks';
import { StackNavigationProp } from '@react-navigation/stack';
import { ABOUT_US, ADVERTISE_INFO_ID, AWSATT_HISTORY_INFO_ID, TERMS_AND_CONDITION } from 'src/services/apiEndPoints';
import { getSvgImages } from 'src/shared/styles/svgImages';
import { colors } from '../shared/styles/colors';
import { useUserProfileData } from 'src/hooks/useUserProfileData';
import { getProfileImageUrl, isNonEmptyArray, isObjectNonEmpty, isStringIncludes } from 'src/shared/utils/utilities';
import {
  FACEBOOK_APP_URL,
  INSTAGRAM_APP_URL,
  LINKEDIN_APP_URL,
  TWITTER_APP_URL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  TWITTER_URL,
} from 'src/constants/SharedConstants';
import { recordLogEvent } from 'src/shared/utils';
import { ScreenContainer } from 'src/components/screens';
import { fonts } from 'src/shared/styles/fonts';
import { checkPermission } from 'src/shared/utils/LocationPermission';
import Geolocation from 'react-native-geolocation-service';
import CelsiusIcon from 'src/assets/images/icons/weather/Celsius.svg'
import CloudsIcon from 'src/assets/images/icons/weather/clouds.svg'
import RainIcon from 'src/assets/images/icons/weather/Rain.svg'
import SunIcon from 'src/assets/images/icons/weather/sun.svg'

export enum SocialMediaType {
  instagram = 'Instagram',
  facebook = 'Facebook',
  twitter = 'Twitter',
  linkedIn = 'LinkedIn',
}

interface CustomDrawerContentProps { }

const CustomDrawerContent = (props: CustomDrawerContentProps) => {
  const [t] = useTranslation();
  const navigation = useNavigation<StackNavigationProp<any>>();

  const { themeData } = useTheme();
  const styles = useThemeAwareObject(createStyles);

  const { isLoading, sideMenuData, fetchSideMenuRequest } = useSideMenu();
  const { isLoggedIn } = useLogin();
  const { userProfileData } = useUserProfileData()

  const [sideMenuDataInfo, setSideMenuDataInfo] = useState<any>([])

  const { fetchWeatherDetailsInfo, fetchWeatherDetailsSuccessInfo, fetchWeatherDetailsVisibilityInfo } = useWeatherDetails();
  const [latitude, setLatitude] = React.useState<number>();
  const [longitude, setLongitude] = React.useState<number>();

  useEffect(() => {
    fetchSideMenuRequest();
    if (checkPermission()) {
      Geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 25000, maximumAge: 3600000 }
      );
    }
  }, []);

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

  const getWeathericon = () => {
    if (isStringIncludes(fetchWeatherDetailsSuccessInfo?.list[0].weather[0].main.toLowerCase(), 'rain')) {
      return <RainIcon width={16} height={16} style={styles.weatherIcon} />
    } else if (isStringIncludes(fetchWeatherDetailsSuccessInfo?.list[0].weather[0].main.toLowerCase(), 'clouds')) {
      return <CloudsIcon width={16} height={16} style={styles.weatherIcon} />
    } else if (isStringIncludes(fetchWeatherDetailsSuccessInfo?.list[0].weather[0].main.toLowerCase(), 'sun')) {
      return <SunIcon width={16} height={16} style={styles.weatherIcon} />
    } else {
      return <SunIcon width={16} height={16} style={styles.weatherIcon} />
    }
  };

  const getWeatherDetail = () => {
    return <View style={styles.menuWeatherContainer}>
      <Divider style={styles.divider} />
      <TouchableOpacity onPress={() => navigation.navigate(ScreensConstants.WEATHER_DETAIL_SCREEN)} style={styles.weather}>
        <Text style={styles.weatherTitle}>
          {t('weatherDetail.sidebarTitle')}
        </Text>
        {fetchWeatherDetailsSuccessInfo?.list[0].temp.day &&
          <View style={styles.weatherTempContainer}>
            <CelsiusIcon style={styles.weatherCelciusIcon} height={isAndroid? 15 : 17} width={isAndroid? 15 : 17}/>
            <Text style={styles.weatherTemp}>
              {'  '}
              {Math.round(fetchWeatherDetailsSuccessInfo?.list[0].temp.day)}
            </Text>
           </View>
        }
        {getWeathericon()}
        {fetchWeatherDetailsSuccessInfo?.list[0].weather[0].description &&
          <Text style={styles.weatherType}>
            {'  '}
            {fetchWeatherDetailsSuccessInfo?.list[0].weather[0].description}
          </Text>
        }
      </TouchableOpacity>
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

    for (let i = 0; i < filterMenuData.length; i++) {
      const item = filterMenuData[i]
      const newParentId = item.uuid_export ?? null
      const customData: any = {
        ...item,
      }

      customData.child = newParentId ? formateChildMenuData(menuData, newParentId) : null
      allMenuData.push(customData)
    }

    return allMenuData
  }

  const onPressDropDownIcon = (index: number) => {
    const menuData = [...sideMenuDataInfo]
    menuData[index].showDropDown = !menuData[index].showDropDown ?? true
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
      <TouchableOpacity style={styles.headerLeft} onPress={() => {
        navigation.navigate(ScreensConstants.PROFILE_SETTING)
      }}>
        {useLogin().isLoggedIn && userProfileData.user?.image ?
          <Image style={styles.user} source={{ uri: getProfileImageUrl(userProfileData.user?.image as string) }} />
          : userProfileData.user?.profile_url
            ? <Image style={styles.user} source={{ uri: getProfileImageUrl(userProfileData.user?.profile_url as string) }} />
            : <UserIcon />}
        {/* {getSvgImages({ name: ImagesName.userDefaultIcon, width: styles.user.width, height: styles.user.height, style: styles.user })} */}
      </TouchableOpacity>
      <View style={styles.logoContainer}>
        {getSvgImages({ name: ImagesName.headerLogo, width: styles.logo.width, height: styles.logo.height, style: styles.logo })}
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
          <CloseIcon />
        </TouchableOpacity>
      </View>
    </View>
  );

  const buttonListItem = (isChild: boolean, item: any, index: number, icon?: ImagesName | null) => {
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
        onPressIcon={() => onPressDropDownIcon(index)}
        containerStyle={isChild && styles.childItemStyle}
        titleStyle={isChild ? styles.childTitleStyle : styles.parentTitleStyle}
      />
    )
  }

  const onPressNavigationDynamicMenu = (isChild: boolean, menuInfo: any) => {
    const screenName = isChild ? ScreensConstants.SectionArticlesScreen : ScreensConstants.SectionArticlesParentScreen
    const defaultParams = { sectionId: menuInfo.field_sectionid_export, title: menuInfo.title }
    const params = isChild ? defaultParams : { ...defaultParams, keyName: menuInfo.field_app_key_name_export }
    onPressNavigation(screenName, params)
  }

  const openSocialMedia = (type: string) => {
    switch (type) {
      case SocialMediaType.facebook:
        recordLogEvent('Pressed_on_social_media_extensions', { socialMedia: SocialMediaType.facebook });
        Linking.openURL(FACEBOOK_APP_URL).catch(() => {
          Linking.openURL(FACEBOOK_URL)
        });
        return;
      case SocialMediaType.instagram:
        recordLogEvent('Pressed_on_social_media_extensions', { socialMedia: SocialMediaType.instagram });
        Linking.openURL(INSTAGRAM_APP_URL).catch(() => {
          Linking.openURL(INSTAGRAM_URL)
        });
        return;
      case SocialMediaType.linkedIn:
        recordLogEvent('Pressed_on_social_media_extensions', { socialMedia: SocialMediaType.linkedIn });
        Linking.openURL(LINKEDIN_APP_URL).catch(() => {
          Linking.openURL(LINKEDIN_URL)
        });
        return;
      case SocialMediaType.twitter:
        recordLogEvent('Pressed_on_social_media_extensions', { socialMedia: SocialMediaType.twitter });
        Linking.openURL(TWITTER_APP_URL).catch(() => {
          Linking.openURL(TWITTER_URL)
        });
        return;
      default:
        return;
    }
  }

  const socialIconSize = isTab ? 33 : 23;

  return (
    <ScreenContainer showPlayer={false}>
      {header()}
      <ScrollView bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {isNonEmptyArray(fetchWeatherDetailsSuccessInfo?.list) &&
          getWeatherDetail()
        }

        <View style={styles.menuContainer}>
          {sideMenuDataInfo.length > 0 &&
            sideMenuDataInfo.map((item: any, index: number) => {
              const icon = isNonEmptyArray(item.child) ? ImagesName.downArrowIcon : null
              return (
                <View key={index}>
                  {buttonListItem(false, item, index, icon)}
                  {isNonEmptyArray(item.child) && item.showDropDown && <View>
                    {item.child.map((childItem: any, childIndex: number) => {
                      return buttonListItem(true, childItem, childIndex)
                    })}
                  </View>
                  }
                </View>
              );
            })}
          <Divider style={styles.divider} />
          <ButtonList
            title={t('drawer.advertiseWithUs')}
            onPress={() => onPressNavigation(
              ScreensConstants.TERMS_AND_ABOUT_US,
              { title: t('drawer.advertiseWithUs'), id: ADVERTISE_INFO_ID }
            )}
            titleStyle={styles.nonBoldTitle}
          />
          {/* <ButtonList
            title={t('drawer.aboutTheEast')}
            onPress={() => onPressNavigation(
              ScreensConstants.TERMS_AND_ABOUT_US,
              { title: t('drawer.aboutTheEast'), id: AWSATT_HISTORY_INFO_ID }
            )}
            titleStyle={styles.nonBoldTitle}
          /> */}
          <ButtonList
            title={t('drawer.aboutTheEast')}
            onPress={() => onPressNavigation(
              ScreensConstants.TERMS_AND_ABOUT_US,
              { title: t('about_the_news_paper'), id: ABOUT_US }
            )}
            titleStyle={styles.nonBoldTitle}
          />
          <ButtonList
            title={t('drawer.callUs')}
            onPress={() => onPressNavigation(
              ScreensConstants.CONTACT_US_SCREEN, {}

            )}
            titleStyle={styles.nonBoldTitle}
          />
          <ButtonList
            title={t('drawer.termsOfUse')}
            onPress={() => onPressNavigation(
              ScreensConstants.TERMS_AND_ABOUT_US,
              { title: t('drawer.termsOfUse'), id: TERMS_AND_CONDITION }
            )}
            titleStyle={styles.nonBoldTitle}
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
      justifyContent: 'space-between',
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
      marginTop: normalize(10),
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
      marginTop: normalize(16),
      alignSelf: 'center',
      justifyContent: 'center',
      flexDirection: 'row'
    },
    weatherTempContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    weatherCelciusIcon: {
      marginTop:normalize(9),
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
      marginTop: isAndroid ? normalize(2) : normalize(5),
    },
    weatherIcon: {
      marginTop: normalize(7),
      marginLeft: isAndroid ? normalize(10) : normalize(0),
    },
    weatherTitle: {
      fontFamily: fonts.AwsatDigitalBetav10_Regular,
      fontSize: isAndroid ? normalize(16) : normalize(14),
      color: colors.black,
      marginRight: normalize(5),
      marginTop: isAndroid ? normalize(2) : normalize(2)
    },
    nonBoldTitle: {
      fontFamily: fonts.AwsatDigital_Regular,
    },
    divider: {
      height: 1,
      backgroundColor: theme.dividerColor
    },
    childItemStyle: {
      marginLeft: 20
    },
    childTitleStyle:{
      fontFamily: fonts.AwsatDigitalBetav10_Regular,
    },
    parentTitleStyle: {
      fontFamily: fonts.AwsatDigital_Bold,
    },
    itemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
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
    }
  });
