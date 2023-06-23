import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {Routes, ScreenList} from './index';
import {colors, CustomThemeType} from 'src/shared/styles/colors';
import {isIOS, isTab, normalize, recordLogEvent, screenWidth} from 'src/shared/utils';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Label} from 'src/components/atoms';
import {ImagesName} from 'src/shared/styles';
import {useNavigation} from '@react-navigation/native';
import {ScreensConstants, TranslateConstants, TranslateKey} from 'src/constants/Constants';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {getSvgImages} from 'src/shared/styles/svgImages';
import { fonts } from 'src/shared/styles/fonts';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import BackIcon from 'src/assets/images/icons/back_icon.svg';
import { AnalyticsEvents } from 'src/shared/utils/analytics';

const Stack = createStackNavigator<ScreenList>();

const defaultScreenOptions: StackNavigationOptions = {
  gestureEnabled: false,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  headerShown: true,
};

const OnBoardNavigator = () => {
  const navigation = useNavigation();
  const ON_BOARD_COMMON_SKIP = TranslateConstants({key:TranslateKey.ON_BOARD_COMMON_SKIP})
  const ON_BOARD_COMMON_RETURN = TranslateConstants({key:TranslateKey.ON_BOARD_COMMON_RETURN})

  const {themeData} = useTheme();
  const style = useThemeAwareObject(customStyle);
  const previousIconStyle = isTab ? style.tabletOnBoardPrevIcon : style.onBoardPrevIcon;
  const headerStyles = isTab ? style.tabletContainer : style.container;
  const headerLogoStyle = isTab ? style.tabletLogo : style.logo;
  const skipButtonStyle = isTab ? style.tabletOnBoardSkip : style.onBoardSkip;
  const previousButtonStyle =isTab ? style.tabletOnBoardPrevTitle : style.onBoardPrevTitle;

  const HeaderLogo = () =>
    getSvgImages({
      name: ImagesName.headerLogo,
      width: headerLogoStyle.width,
      height: headerLogoStyle.height,
      style: headerLogoStyle,
    });

  const onBoardSkip = (routesName: any) => (
    <TouchableOpacity
      testID='skipId'
      style={style.skipContainer}
      onPress={() => {
        switch (routesName) {
          case ScreensConstants.KEEP_NOTIFIED_ONBOARD_SCREEN:
            navigation.navigate(ScreensConstants.KEEP_NOTIFIED_ONBOARD_SCREEN);
            return;
          case ScreensConstants.FOLLOW_FAVORITE_AUTHOR_SCREEN:
            recordLogEvent(AnalyticsEvents.REGISTRATION_SKIP_CLICK, {step_name: AnalyticsEvents.PERSONALIZED_SECTIONS});
            navigation.navigate(ScreensConstants.FOLLOW_FAVORITE_AUTHOR_SCREEN);
            return;
          case ScreensConstants.NEWS_LETTER_SCREEN:
            recordLogEvent(AnalyticsEvents.REGISTRATION_SKIP_CLICK,{step_name: AnalyticsEvents.PERSONALIZED_AUTHORS});
            navigation.navigate(ScreensConstants.NEWS_LETTER_SCREEN);
            return;
          case ScreensConstants.SUCCESS_SCREEN:
            recordLogEvent(AnalyticsEvents.REGISTRATION_SKIP_CLICK,{step_name: AnalyticsEvents.PERSONALIZED_NEWSLETTERS});
            navigation.navigate(ScreensConstants.SUCCESS_SCREEN);
            return;
          case ScreensConstants.AppNavigator:
            navigation.reset({
              index: 0,
              routes: [{name: ScreensConstants.AppNavigator}],
            });
            return;
          default:
            navigation.reset({
              index: 0,
              routes: [{name: ScreensConstants.AppNavigator}],
            });
        }
      }}>
      <Label style={skipButtonStyle}>{ON_BOARD_COMMON_SKIP}</Label>
    </TouchableOpacity>
  );
  const onBoardReturn = () => (
    <TouchableOpacity
      style={style.onBoardReturn}
      onPress={() => navigation.goBack()}>
      <Label style={previousButtonStyle}>{ON_BOARD_COMMON_RETURN}</Label>
      <BackIcon fill={themeData.backIconColor} style={previousIconStyle} />
    </TouchableOpacity>
  );

  return (
    <Stack.Navigator screenOptions={{...defaultScreenOptions, headerShadowVisible: false}}>
      <Stack.Screen
        name={ScreensConstants.SELECT_TOPICS_SCREEN}
        component={Routes.SelectTopicsScreen}
        options={{
          headerStyle: headerStyles,
          headerTitle: HeaderLogo,
          headerTitleAlign: 'center',
          headerRight: () =>
            onBoardSkip(ScreensConstants.FOLLOW_FAVORITE_AUTHOR_SCREEN),
        }}
      />
      <Stack.Screen
        name={ScreensConstants.FOLLOW_FAVORITE_AUTHOR_SCREEN}
        component={Routes.FollowFavoriteAuthorScreen}
        options={{
          headerStyle: headerStyles,
          headerLeft: () => onBoardReturn(),
          headerTitle: HeaderLogo,
          headerTitleAlign: 'center',
          headerRight: () => onBoardSkip(ScreensConstants.NEWS_LETTER_SCREEN),
        }}
      />
      <Stack.Screen
        name={ScreensConstants.NEWS_LETTER_SCREEN}
        component={Routes.NewsLetterScreen}
        options={{
          headerStyle: headerStyles,
          headerLeft: () => onBoardReturn(),
          headerTitle: HeaderLogo,
          headerTitleAlign: 'center',
          headerRight: () =>
            onBoardSkip(ScreensConstants.KEEP_NOTIFIED_ONBOARD_SCREEN),
        }}
      />
      <Stack.Screen
        name={ScreensConstants.KEEP_NOTIFIED_ONBOARD_SCREEN}
        component={Routes.KeepNotifiedScreen}
        options={{
          headerStyle: headerStyles,
          headerLeft: () => onBoardReturn(),
          headerTitle: HeaderLogo,
          headerTitleAlign: 'center',
          headerRight: () => onBoardSkip(ScreensConstants.SUCCESS_SCREEN),
        }}
      />
      <Stack.Screen
        name={ScreensConstants.SUCCESS_SCREEN}
        component={Routes.SuccessScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const customStyle = (theme: CustomThemeType) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.onBoardBackground,
      shadowColor: colors.transparent,
    },
    tabletContainer: {
      height:83,
      backgroundColor: theme.tabOnBoardHeaderBackground,
      shadowColor: colors.transparent,
    },
    search: {
      height: 19,
      width: 18,
      marginHorizontal: 20,
    },
    logo: {
      height: 32,
      width: 135,
      alignItems: 'center',
    },
    tabletLogo: {
      height: 41,
      width: 160,
      alignItems: 'center',
    },
    menu: {
      height: 16,
      width: 19,
      marginHorizontal: 20,
    },
    onBoardReturn: {
      flexDirection: 'row-reverse',
      alignItems: 'center',
      marginEnd: normalize(0.04 * screenWidth),
    },
    tabletOnBoardReturn: {
      flexDirection: 'row-reverse',
      alignItems: 'center',
      marginEnd: normalize(0.04 * screenWidth),
    },
    onBoardPrevTitle: {
      fontFamily: fonts.AwsatDigital_Regular,
      color: theme.backIconColor,
      fontSize: normalize(12),
      lineHeight: normalize(20),
      marginBottom: isIOS ? 0 : 4,
    },
    tabletOnBoardPrevTitle: {
      fontFamily: fonts.AwsatDigital_Regular,
      color: theme.backIconColor,
      fontSize: 18,
      lineHeight: 28,
      marginBottom: isIOS ? 0 : 4,
    },
    onBoardPrevIcon: {
      width: normalize(12),
      height: normalize(8.8),
      marginEnd: 5,
    },
    tabletOnBoardPrevIcon: {
      width: 17,
      height: 12,
      marginEnd: 5,
      marginBottom: 2
    },
    onBoardSkip: {
      fontFamily: fonts.AwsatDigital_Regular,
      alignItems: 'center',
      color: theme.primary,
      fontSize: normalize(12),
      lineHeight: normalize(20),
    },
    tabletOnBoardSkip: {
      fontFamily: fonts.AwsatDigital_Regular,
      alignItems: 'center',
      color: theme.primary,
      fontSize: 18,
      lineHeight: 28,
    },
    skipContainer: {
      marginEnd: normalize(0.04 * screenWidth),
      borderBottomColor: colors.greenishBlue,
      borderBottomWidth: isTab ? 0 : 1,
    },
  });
};

export default OnBoardNavigator;
