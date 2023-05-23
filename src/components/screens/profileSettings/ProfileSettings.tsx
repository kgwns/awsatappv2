import {
  View,
  StyleSheet,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { ImagesName, Styles } from 'src/shared/styles';
import { ScreensConstants, TranslateConstants, TranslateKey } from 'src/constants/Constants';
import { getSvgImages } from 'src/shared/styles/svgImages';
import { horizontalEdge, isDarkTheme, isNotEmpty, isObjectNonEmpty, isTab, normalize, screenWidth } from 'src/shared/utils';
import { ButtonOutline, Divider, Label, LabelTypeProp } from 'src/components/atoms';
import { ScreenContainer } from '..';
import { CustomThemeType } from 'src/shared/styles/colors';
import { ToggleWithLabel } from 'src/components/molecules';
import { useDispatch } from 'react-redux';
import { storeAppTheme } from 'src/redux/appCommon/action';
import { ServerEnvironment, Theme } from 'src/redux/appCommon/types';
import { useAppCommon, useLogin, useUserProfileData } from 'src/hooks';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AlertPayloadType } from 'src/components/screens/ScreenContainer/ScreenContainer';
import RNRestart from 'react-native-restart'
import { fonts } from 'src/shared/styles/fonts';

export type SettingDataType = {
  iconName: ImagesName,
  title: string,
  screenName: string,
}

export const ProfileSettings = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation<StackNavigationProp<any>>();

  const style = useThemeAwareObject(customStyle);

    const { theme, serverEnvironment, storeServerEnvironmentInfo } = useAppCommon();
    const { makeUserLogout, isLoggedIn } = useLogin();
    const { userProfileData } = useUserProfileData();

  const isDark = isDarkTheme(theme);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(isDark);
  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);
  const themToggleReference = useRef<any>(null)

  const CONST_MANAGE_NOTIFICATION = TranslateConstants({key:TranslateKey.PROFILE_SETTING_MANAGE_MY_NOTIFICATION});
  const CONST_MANAGE_NEWS =  TranslateConstants({key:TranslateKey.PROFILE_SETTING_MANAGE_MY_NEWS});
  const CONST_MY_NEWS_LETTER =  TranslateConstants({key:TranslateKey.PROFILE_SETTING_MY_NEWS_LETTER});
  const CONST_MY_ACCOUNT_DETAILS =  TranslateConstants({key:TranslateKey.PROFILE_SETTING_MY_ACCOUNT_DETAILS});
  const CONST_APP_APPEARANCE =  TranslateConstants({key:TranslateKey.PROFILE_SETTING_APP_APPEARANCE});
  const CONST_EXIT =  TranslateConstants({key:TranslateKey.PROFILE_SETTING_EXIT});
  const CONST_DARK_MODE =  TranslateConstants({key:TranslateKey.PROFILE_SETTING_DARK_MODE});
  const CONST_LIGHT_MODE =  TranslateConstants({key:TranslateKey.PROFILE_SETTING_LIGHT_MODE});
  const CONST_WELCOME =  TranslateConstants({key:TranslateKey.PROFILE_SETTING_WELCOME});
  const CONST_CHANGE_ENVIRONMENT =  TranslateConstants({key:TranslateKey.PROFILE_SETTING_CHANGE_ENVIRONMENT});
  const CONST_NOT_SUBSCRIBE =  TranslateConstants({key:TranslateKey.PROFILE_SETTING_NOT_SUBSCRIBED});
  const CONST_LOGIN_FEATURE =  TranslateConstants({key:TranslateKey.PROFILE_SETTING_LOGIN_FEATURE});
  const CONST_SIGN_UP =  TranslateConstants({key:TranslateKey.PROFILE_SETTING_SIGN_UP});
  const PROFILE_SETTING_ALERT =  TranslateConstants({key:TranslateKey.PROFILE_SETTING_ALERT});
  const PROFILE_SETTING_LOG_OUT_ALERT_MESSAGE =  TranslateConstants({key:TranslateKey.PROFILE_SETTING_LOG_OUT_ALERT_MESSAGE});
  const PROFILE_SETTING_DEBUG =  TranslateConstants({key:TranslateKey.PROFILE_SETTING_DEBUG});
  const PROFILE_SETTING_PRODUCTION =  TranslateConstants({key:TranslateKey.PROFILE_SETTING_PRODUCTION});
  const CONST_DELETE_MY_ACCOUNT = TranslateConstants({key:TranslateKey.PROFILE_SETTING_DELETE_MY_ACCOUNT});
  const CONST_HUAWEI_MAIL_EXTENSION = TranslateConstants({ key: TranslateKey.HUAWEI_EXTENSION });

  const signOutAlertPayload : AlertPayloadType = {
    title : PROFILE_SETTING_ALERT,
    message: PROFILE_SETTING_LOG_OUT_ALERT_MESSAGE,
    buttonTitle: CONST_EXIT
  }

  const nonRegisteredData: SettingDataType[] = [
    // {
    //     iconName: ImagesName.notificationGrey,
    //     title: CONST_MANAGE_NOTIFICATION,
    //     screenName: ''
    // }, 
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
    // To Enable Change Environment   { 
    //       iconName: ImagesName.Image,
    //       title: CONST_CHANGE_ENVIRONMENT,
    //       screenName: ''
    //   },
      {
          iconName: ImagesName.deleteUserIcon,
          title: CONST_DELETE_MY_ACCOUNT,
          screenName: ScreensConstants.DMA_INTRODUCTION_SCREEN
      },
      {
          iconName: ImagesName.exit,
          title: CONST_EXIT,
          screenName: ''
      }
  ]

    const onPressToggle = (isOn: boolean) => {
        requestAnimationFrame(() => {
            setIsDarkMode(!isOn);
            clearTimeout(themToggleReference.current)
            themToggleReference.current = setTimeout(() => {
                makeStoreTheme(isOn);
            }, 500);
        });
    };

    const makeStoreTheme = (isOn: boolean) => {
        const themeData = isOn ? Theme.LIGHT : Theme.DARK;
        dispatch(storeAppTheme(themeData));
    };

    const onPressToggleServer = () => {
        const newServerType = serverEnvironment === ServerEnvironment.DEBUG ? ServerEnvironment.PRODUCTION : ServerEnvironment.DEBUG
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

  const logout = () => {
    makeUserLogout();
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
      if (item.title === CONST_APP_APPEARANCE) {
          return (
              <ToggleWithLabel
                  title={isDarkMode ? CONST_DARK_MODE : CONST_LIGHT_MODE}
                  isActive={!isDarkMode}
                  onPress={onPressToggle}
              />
          );
      } else if (item.title === CONST_CHANGE_ENVIRONMENT) {
          return (
              <ToggleWithLabel
                  title={serverEnvironment === ServerEnvironment.DEBUG ? PROFILE_SETTING_DEBUG: PROFILE_SETTING_PRODUCTION}
                  isActive={serverEnvironment === ServerEnvironment.DEBUG ? true : false}
                  onPress={onPressToggleServer}
              />
          );
      } else if (item.title === CONST_EXIT) {
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

  const _email = isObjectNonEmpty(userProfileData) && isObjectNonEmpty(userProfileData.user) && isNotEmpty(userProfileData.user?.email) ? userProfileData.user?.email : ''
  const email = _email !== undefined ? _email : '';
  const usernameStyle = isNotEmpty(email) && email.length > 24 && {width: '100%'}  
    
    const renderEmail = (emailInfo: string | undefined): string => {
        let emailText = '';
        if (isNotEmpty(emailInfo) && !emailInfo?.includes(CONST_HUAWEI_MAIL_EXTENSION)) {
            emailText = emailInfo as string;
        }
        return emailText;
    }

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
                  : renderEmail(userProfileData.user?.email))}
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
    if(isLoggedIn) {
        return null;
    }
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
          setIsAlertVisible={setIsAlertVisible}
          backgroundColor={style.screenBackgroundColor?.backgroundColor}>
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
        flex: 1,
        marginTop:normalize(25),
        paddingLeft: normalize(5)
      },
      listContainer: {
          marginHorizontal: isTab? normalize(0.02 * screenWidth) : normalize(0.04 * screenWidth),
          paddingTop: normalize(20),
      },
      titleDivider: {
          backgroundColor: Styles.color.greenishBlue,
          width: '100%',
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
          fontFamily: fonts.AwsatDigital_Regular,
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
          fontFamily: fonts.AwsatDigital_Bold,
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
          fontFamily: fonts.AwsatDigital_Bold,
      },
      screenBackgroundColor: {
        backgroundColor: theme.profileBackground
      }
  });
