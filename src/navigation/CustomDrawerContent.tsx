import React, {useEffect, useState} from 'react';
import {View, StyleSheet, SafeAreaView, TouchableOpacity, Image, Linking} from 'react-native';
import {ImagesName} from '../shared/styles/images';
import {ButtonImage, Label, LabelTypeProp} from '../components/atoms';
import {ButtonList, Divider} from 'src/components/atoms';
import {useTranslation} from 'react-i18next';
import {isIOS, normalize, isDarkTheme} from 'src/shared/utils';
// import CloseIcon from 'src/assets/images/icons/close.svg';
import FacebookIcon from 'src/assets/images/icons/facebook.svg';
import InstagramIcon from 'src/assets/images/icons/instagram.svg';
import TwitterIcon from 'src/assets/images/icons/twitter.svg';
import LinkedinIcon from 'src/assets/images/icons/linkedin.svg';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {ScreensConstants} from 'src/constants';
import {useLogin, useSideMenu} from 'src/hooks';
import { StackNavigationProp } from '@react-navigation/stack';
import { ABOUT_US, ADVERTISE_INFO_ID, AWSATT_HISTORY_INFO_ID, TERMS_AND_CONDITION } from 'src/services/apiEndPoints';
import { getSvgImages } from 'src/shared/styles/svgImages';
import { colors } from '../shared/styles/colors';
import { useUserProfileData } from 'src/hooks/useUserProfileData';
import { getProfileImageUrl, isNonEmptyArray } from 'src/shared/utils/utilities';
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

export enum SocialMediaType {
  instagram = 'Instagram',
  facebook = 'Facebook',
  twitter = 'Twitter',
  linkedIn = 'LinkedIn',
}

interface CustomDrawerContentProps {}

const CustomDrawerContent = (props: CustomDrawerContentProps) => {
  const [t] = useTranslation();
  const navigation = useNavigation<StackNavigationProp<any>>();

  const {themeData} = useTheme();
  const styles = useThemeAwareObject(createStyles);

  const {isLoading, sideMenuData, fetchSideMenuRequest} = useSideMenu();
  const {isLoggedIn} = useLogin();
  const {userProfileData} = useUserProfileData()

  const [sideMenuDataInfo, setSideMenuDataInfo] = useState<any>([])
  
  useEffect(() => {
    fetchSideMenuRequest();
  }, []);

  useEffect(() => {
    if (isNonEmptyArray(sideMenuData)) {
      const data = formateChildMenuData(sideMenuData)
      setSideMenuDataInfo(data);
    }
  }, [sideMenuData])

  const formateChildMenuData = (menuData: any[], parentId: null | string = null) => {
    let allMenuData = []
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
      let customData: any = {
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

  const onPressNavigation = (screen: string,params: object) => {
    navigation.dispatch(DrawerActions.closeDrawer());
    navigation.navigate(screen,params);
  }

  // useEffect(() => {
  //   //console.log('News Categories data', newsCategoriesData);
  // }, [newsCategoriesData]);

  const UserIcon = () => (
    <>
      {getSvgImages({ name: ImagesName.userDefaultIcon, width: styles.user.width, height: styles.user.height, style: styles.user })}
    </>
  )

  const CloseIcon = () => (
    <>
      {getSvgImages({ name: ImagesName.menuCloseIcon, width: styles.close.width, height: styles.close.height, style: styles.close})}
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
          : <UserIcon />  }  
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
        hitSlop={{top: hipSlopValue,bottom: hipSlopValue,left: hipSlopValue,right: hipSlopValue}}
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
    const params = isChild ? defaultParams : {...defaultParams, keyName: menuInfo.field_app_key_name_export}
    onPressNavigation(screenName, params)
  }

  const openSocialMedia = (type: string) =>{
    switch (type) {
      case SocialMediaType.facebook:
        recordLogEvent('Pressed_on_social_media_extensions', {socialMedia: SocialMediaType.facebook});
        Linking.openURL(FACEBOOK_APP_URL).catch(() => {
          Linking.openURL(FACEBOOK_URL)
        });
        return;
      case SocialMediaType.instagram:
        recordLogEvent('Pressed_on_social_media_extensions', {socialMedia: SocialMediaType.instagram});
        Linking.openURL(INSTAGRAM_APP_URL).catch(() => {
          Linking.openURL(INSTAGRAM_URL)
        });
        return;
      case SocialMediaType.linkedIn:
        recordLogEvent('Pressed_on_social_media_extensions', {socialMedia: SocialMediaType.linkedIn});
        Linking.openURL(LINKEDIN_APP_URL).catch(() => {
          Linking.openURL(LINKEDIN_URL)
        });
        return;
      case SocialMediaType.twitter:
        recordLogEvent('Pressed_on_social_media_extensions', {socialMedia: SocialMediaType.twitter});
        Linking.openURL(TWITTER_APP_URL).catch(() => {
          Linking.openURL(TWITTER_URL)
        });
        return;
      default:
        return;
    }
  }
  
  return (
    <ScreenContainer>
      {header()}
      <ScrollView bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.menuContainer}>
          {sideMenuDataInfo.length > 0 &&
            sideMenuDataInfo.map((item:any, index:number) => {
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
          <Divider style={styles.divider}/>
          <ButtonList
            title={t('drawer.advertiseWithUs')}
            onPress={() => onPressNavigation(
              ScreensConstants.TERMS_AND_ABOUT_US,
              { title: t('drawer.advertiseWithUs'), id: ADVERTISE_INFO_ID }
            )}
            titleStyle={styles.nonBoldTitle}
          />
          <ButtonList
            title={t('drawer.aboutTheEast')}
            onPress={() => onPressNavigation(
              ScreensConstants.TERMS_AND_ABOUT_US,
              { title: t('drawer.aboutTheEast'), id: AWSATT_HISTORY_INFO_ID }
            )}
            titleStyle={styles.nonBoldTitle}
          />
          <ButtonList
            title={t('drawer.callUs')}
            onPress={() => onPressNavigation(
              ScreensConstants.TERMS_AND_ABOUT_US,
              { title: t('about_the_news_paper'), id: ABOUT_US }
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
              icon={() => <LinkedinIcon />}
              onPress={() => openSocialMedia(SocialMediaType.linkedIn)}
            />
            <ButtonImage
              icon={() => <TwitterIcon />}
              onPress={() => openSocialMedia(SocialMediaType.twitter)}
            />
            <ButtonImage
              icon={() => <FacebookIcon />}
              onPress={() => openSocialMedia(SocialMediaType.facebook)}
            />
            <ButtonImage
              icon={() => <InstagramIcon />}
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
      bottom : 1,
    },
    user: {
      width: 27,
      height: 27,
      borderRadius: 27/2,
      borderWidth: isIOS? normalize(2): normalize(3),
      borderColor: colors.lightGreenishBlue,
    },
    menuContainer: {
      marginHorizontal: normalize(35),
      marginTop: normalize(20),
    },
    drawerItemStyle: {
      left: 0,
      width: '100%',
    },
    logo: {
      height: 25,
      width: 135,
      alignItems: 'center',
    },
    logoContainer: {
      alignItems: 'center',
    },
    nonBoldTitle: {
      fontFamily: fonts.Almaria_Regular,
    },
    divider: {
      height: 1,
      backgroundColor: theme.dividerColor
  },
    childItemStyle:{
      marginLeft: 20
    },
    childTitleStyle:{
      fontFamily: fonts.Almaria_Regular,
    },
    parentTitleStyle: {
      fontFamily: fonts.Almarai_Bold,
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
