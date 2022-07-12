import {
  View,
  StyleSheet,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  Text,
  NativeModules
} from 'react-native';
import React, { useState } from 'react';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { useTranslation } from 'react-i18next';
import { ImagesName, Styles } from 'src/shared/styles';
import { ScreensConstants } from 'src/constants';
import { getSvgImages } from 'src/shared/styles/svgImages';
import { horizontalEdge, isDarkTheme, isNotEmpty, isObjectNonEmpty, isTab, normalize, recordLogEvent, screenWidth } from 'src/shared/utils';
import { ButtonImage, ButtonOutline, Divider, Label, LabelTypeProp } from 'src/components/atoms';
import { ScreenContainer } from '..';
import { CustomThemeType } from 'src/shared/styles/colors';
import { ToggleWithLabel } from 'src/components/molecules';
import { useDispatch } from 'react-redux';
import { storeAppTheme } from 'src/redux/appCommon/action';
import { ServerEnvironment, Theme } from 'src/redux/appCommon/types';
import { useAppCommon, useBookmark, useKeepNotified, useLogin, useUserProfileData, useAllSiteCategories, useAllWriters, useSearch  } from 'src/hooks';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AlertPayloadType } from 'src/components/screens/ScreenContainer/ScreenContainer';
import RNRestart from 'react-native-restart'
import { fonts } from 'src/shared/styles/fonts';
import { LoginManager } from "react-native-fbsdk-next";

type SettingDataType = {
  iconName: ImagesName,
  title: string,
  screenName: string,
}

const { ReactTheme } = NativeModules;
export const ProfileSettings = () => {
  const [t] = useTranslation()
  const dispatch = useDispatch()
  const navigation = useNavigation<StackNavigationProp<any>>();

  const style = useThemeAwareObject(customStyle);

    const { theme, serverEnvironment, storeServerEnvironmentInfo, resetFontSizeInfo  } = useAppCommon();
  const { removeBookmark } = useBookmark()
  const { removeKeepNotificationInfo } = useKeepNotified()
  const isDark = isDarkTheme(theme);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(isDark);
  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);

  const CONST_MANAGE_NOTIFICATION = t('profileSetting.manageMyNotification');
  const CONST_MANAGE_NEWS = t('profileSetting.manageMyNews');
  const CONST_MY_NEWS_LETTER = t('profileSetting.myNewsLetter');
  const CONST_MY_ACCOUNT_DETAILS = t('profileSetting.myAccountDetails');
  const CONST_APP_APPEARANCE = t('profileSetting.appAppearance');
  const CONST_EXIT = t('profileSetting.exit');
  const CONST_DARK_MODE = t('profileSetting.darkMode');
  const CONST_LIGHT_MODE = t('profileSetting.lightMode');
  const CONST_WELCOME = t('profileSetting.welcome');
  const CONST_CHANGE_ENVIRONMENT = t('profileSetting.changeEnvironment');
  const CONST_NOT_SUBSCRIBE = t('profileSetting.notSubscribed');
  const CONST_LOGIN_FEATURE = t('profileSetting.loginFeature');
  const CONST_SIGN_UP = t('profileSetting.signUp');

  const signOutAlertPayload : AlertPayloadType = {
    title : t('profileSetting.alert'),
    message: t('profileSetting.logoutAlertMessage'),
    buttonTitle: t('profileSetting.exit')
  }

  const nonRegisteredData: SettingDataType[] = [
    {
        iconName: ImagesName.notificationGrey,
        title: CONST_MANAGE_NOTIFICATION,
        screenName: ''
    }, 
    {
        iconName: ImagesName.themeChange,
        title: CONST_APP_APPEARANCE,
        screenName: ''
    }
  ]

  const data: SettingDataType[] = [
      {
          iconName: ImagesName.notificationGrey,
          title: CONST_MANAGE_NOTIFICATION,
          screenName: ScreensConstants.KEEP_NOTIFIED_ONBOARD_SCREEN
      },
      {
          iconName: ImagesName.manageNews,
          title: CONST_MANAGE_NEWS,
          screenName: ScreensConstants.MANAGE_MY_NEWS_SCREEN
      },
      {
          iconName: ImagesName.newsLetter,
          title: CONST_MY_NEWS_LETTER,
          screenName: ScreensConstants.NEWS_LETTER_SCREEN
      },
      {
          iconName: ImagesName.profile,
          title: CONST_MY_ACCOUNT_DETAILS,
          screenName: ScreensConstants.USER_DETAIL_SCREEN
      },
      {
        iconName: ImagesName.themeChange,
        title: CONST_APP_APPEARANCE,
        screenName: ''
      },
      {
          iconName: ImagesName.Image,
          title: CONST_CHANGE_ENVIRONMENT,
          screenName: ''
      },
      {
          iconName: ImagesName.exit,
          title: CONST_EXIT,
          screenName: ''
      }
  ]

  const { fetchLogoutRequest, isLoggedIn } = useLogin();
  const { emptySearchHistory } = useSearch();
  const { userProfileData,emptyUserProfileInfoData } = useUserProfileData();
  const { emptySelectedTopicsInfoData } = useAllSiteCategories();
  const { emptySelectedAuthorsInfoData } = useAllWriters();

  const onPressToggle = (isOn: boolean) => {
      const themeData = isOn ? Theme.LIGHT : Theme.DARK;
      dispatch(storeAppTheme(themeData));
      //ReactTheme.getReactTheme(themeData)
      setIsDarkMode(!isOn);
  };

    const onPressToggleServer = () => {
        const newServerType = serverEnvironment == ServerEnvironment.DEBUG ? ServerEnvironment.PRODUCTION : ServerEnvironment.DEBUG
        storeServerEnvironmentInfo(newServerType)
        setTimeout(() => {
            RNRestart.Restart()
        }, 1500);
    }

  const onPressGoNext = (item: SettingDataType) => {
      if (item.title === CONST_EXIT) {
        setIsAlertVisible(true);
      } else {
          const params = (item.title === CONST_MY_NEWS_LETTER || item.title === CONST_MANAGE_NOTIFICATION) ? {canGoBack: true} : {};
          item.screenName.length > 0 && navigation.navigate(item.screenName, params)
      }
  }

  const logoutFromfacebook = () => {
    try {
      if (userProfileData?.user?.provider == 'facebook') {
        LoginManager.logOut();
      }
    } catch {
      return;
    }
  };

  const logout = () => {
    logoutFromfacebook()
    recordLogEvent('Logout');
    fetchLogoutRequest();
    removeBookmark()
    removeKeepNotificationInfo()
    emptyUserProfileInfoData();
    emptySelectedTopicsInfoData()
    emptySelectedAuthorsInfoData()
    emptySearchHistory();
    resetFontSizeInfo();
    navigation.reset({
        index: 0,
        routes: [{ name: ScreensConstants.AuthNavigator }],
    });
  };

  const renderItem: ListRenderItem<SettingDataType> = ({ item, index }) => {
      const disableClick = item.title === CONST_APP_APPEARANCE
      return (
          <TouchableOpacity activeOpacity={0.8} disabled={disableClick} key={index} onPress={() => onPressGoNext(item)}>
              <View style={style.itemContainer}>
                  <View style={style.itemLeftContainer}>
                      <DynamicIcon iconName={item.iconName} />
                      <Label
                          children={item.title}
                          style={style.label}
                          labelType={LabelTypeProp.p4}
                      />
                  </View>
                  {renderRightElement(item)}
              </View>
          </TouchableOpacity>
      );
  };

  const itemSeparator = () => <Divider style={style.divider} />;

  const renderRightElement = (item: SettingDataType) => {
      if (item.title == CONST_APP_APPEARANCE) {
          return (
              <ToggleWithLabel
                  title={isDarkMode ? CONST_DARK_MODE : CONST_LIGHT_MODE}
                  isActive={!isDarkMode}
                  onPress={onPressToggle}
              />
          );
      } else if (item.title == CONST_CHANGE_ENVIRONMENT) {
          return (
              <ToggleWithLabel
                  title={serverEnvironment == ServerEnvironment.DEBUG ? t('profileSetting.debug') : t('profileSetting.production')}
                  isActive={serverEnvironment == ServerEnvironment.DEBUG ? true : false}
                  onPress={onPressToggleServer}
              />
          );
      } else if (item.title == CONST_EXIT) {
          return null;
      }

      return <ArrowIcon />
  };

    const ArrowIcon = () => (
        <>
            {getSvgImages({
                name: ImagesName.arrowLeftGrey,
                size: normalize(10),
            })}
        </>
    )

    const DynamicIcon = ({iconName}: {iconName: ImagesName}) => (
        <>
            {getSvgImages({
                name: iconName,
                size: normalize(18),
            })}
        </>
    )

  const email = isObjectNonEmpty(userProfileData) && isObjectNonEmpty(userProfileData.user) && isNotEmpty(userProfileData.user?.email) ? userProfileData.user?.email : ''
  const usernameStyle = isNotEmpty(email) && email!.length > 24 && {width: '100%'}  
  const welcomeView = () => (
      <View style={style.title}>
          <Label
              children={CONST_WELCOME}
              style={style.welcome}
              labelType={LabelTypeProp.h1}
          />
          { isLoggedIn && <Label
              children={isNotEmpty(userProfileData.user?.display_name) ? userProfileData.user?.display_name : (isNotEmpty(userProfileData.user?.first_name)
                  ? isNotEmpty(userProfileData.user?.last_name) ? `${userProfileData.user?.first_name} ${userProfileData.user?.last_name}` : userProfileData.user?.first_name
                  :userProfileData.user?.email)}
              style={[style.userName, usernameStyle ]}
              labelType={LabelTypeProp.h1}
          />}
      </View>
  );

  const goToSignUp = () => {
    navigation.reset({
        index: 0,
        routes: [{ name: ScreensConstants.AuthNavigator }],
    });
  }

  const renderFooterComponent = () =>{
    if(isLoggedIn) return null;
    return (
        <View style={style.footerStyle}>
            <Divider style={style.divider} />
            <Label
              children={CONST_NOT_SUBSCRIBE}
              style={style.subscribeStyle}
            />
            <Label
              children={CONST_LOGIN_FEATURE}
              style={style.loginTextStyle}
              labelType={LabelTypeProp.p2}
            />
            <ButtonOutline
                style={style.signUpButton}
                labelStyle={style.signUpButtonLabel}
                title={CONST_SIGN_UP}
                testID={'SettingSignup'}
                onPress={goToSignUp}
            />
        </View>
    )
    }


  return (
      <ScreenContainer edge={horizontalEdge} isAlertVisible={isAlertVisible}
          alertPayload={signOutAlertPayload} alertOnPress={logout}
          setIsAlertVisible={setIsAlertVisible}>
        <View style={style.container}>
          {welcomeView()}
          <View style={style.titleDivider} />
          <FlatList
              keyExtractor={(_, index) => index.toString()}
              style={style.listContainer}
              data={isLoggedIn ? data : nonRegisteredData}
              showsVerticalScrollIndicator={false}
              renderItem={renderItem}
              ItemSeparatorComponent={itemSeparator}
              ListFooterComponent={renderFooterComponent}
              bounces={false}
          />
        </View>
      </ScreenContainer>
  );
};

const customStyle = (theme: CustomThemeType) =>
  StyleSheet.create({
      container:{
        marginTop:normalize(25),
        paddingLeft: normalize(5)
      },
      listContainer: {
          marginHorizontal: isTab? normalize(0.02 * screenWidth) : normalize(0.04 * screenWidth),
          paddingTop: normalize(20),
      },
      titleDivider: {
          backgroundColor: Styles.color.greenishBlue,
          width: screenWidth,
          height: 1,
          marginStart: isTab ? normalize(0.02 * screenWidth) : normalize(0.04 * screenWidth),
      },
      itemContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: normalize(20),
      },
      itemLeftContainer: {
          flexDirection: 'row',
          alignItems: 'center',
      },
      label: {
          marginLeft: normalize(20),
          color: theme.secondaryMediumGrey,
          fontFamily: fonts.AwsatDigitalBetav10_Regular,
          lineHeight: normalize(30)
      },
      divider: {
          height: 1,
          backgroundColor: theme.dividerColor,
          marginTop: 0,
      },
      title: {
          alignItems: 'center',
          marginHorizontal: isTab ? normalize(0.02 * screenWidth) : normalize(0.04 * screenWidth),
          paddingBottom: normalize(10),
          fontFamily: fonts.IBMPlexSansArabic_Bold,
          flexDirection: 'row',
          flexWrap: 'wrap'
      },
      welcome: {
          color: Styles.color.greenishBlue,
          paddingRight: normalize(10),
      },
      userName: {
          color: theme.primaryBlack,
      },
      footerStyle: {
          alignItems: 'center',
          justifyContent: 'center',
      },
      subscribeStyle: {
          fontSize: normalize(24),
          fontFamily: fonts.AwsatDigitalBetav10_Bold,
          lineHeight: normalize(42),
          color: Styles.color.greenishBlue,
          marginTop: screenWidth * 0.1
      },
      loginTextStyle: {
          lineHeight: normalize(28),
          fontFamily: fonts.IBMPlexSansArabic_Regular,
          color: theme.secondaryDavyGrey,
          textAlign: 'center',
          marginTop: normalize(10),
      },
      signUpButton: {
          width: normalize(172),
          height: normalize(46),
          alignSelf: 'center',
          backgroundColor: Styles.color.greenishBlue,
          borderWidth: 0,
          marginTop: normalize(40),
      },
      signUpButtonLabel: {
          color: Styles.color.white,
          fontSize: normalize(16),
          lineHeight: normalize(25),
          fontFamily: fonts.AwsatDigitalBetav10_Bold,
      },
  });
