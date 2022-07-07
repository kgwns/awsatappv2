import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {Routes, ScreenList} from './index';
import {colors, CustomThemeType} from 'src/shared/styles/colors';
import {isTab, normalize, screenWidth} from 'src/shared/utils';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Label} from 'src/components/atoms';
import {ImagesName} from 'src/shared/styles';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {ScreensConstants} from 'src/constants';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {getSvgImages} from 'src/shared/styles/svgImages';
import { fonts } from 'src/shared/styles/fonts';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<ScreenList>();

const defaultScreenOptions: StackNavigationOptions = {
  gestureEnabled: false,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  headerShown: true,
};

const OnBoardNavigator = () => {
  const navigation = useNavigation();
  const [t] = useTranslation();
  const style = useThemeAwareObject(customStyle);
  const previousIconStyle = style.onBoardPrevIcon;

  const HeaderLogo = () =>
    getSvgImages({
      name: ImagesName.headerLogo,
      width: style.logo.width,
      height: style.logo.height,
      style: style.logo,
    });

  const onBoardSkip = (routesName: any) => (
    <TouchableOpacity
      style={style.skipContainer}
      onPress={() => {
        switch (routesName) {
          case ScreensConstants.KEEP_NOTIFIED_ONBOARD_SCREEN:
            navigation.navigate(ScreensConstants.KEEP_NOTIFIED_ONBOARD_SCREEN);
            return;
          case ScreensConstants.FOLLOW_FAVORITE_AUTHOR_SCREEN:
            navigation.navigate(ScreensConstants.FOLLOW_FAVORITE_AUTHOR_SCREEN);
            return;
          case ScreensConstants.NEWS_LETTER_SCREEN:
            navigation.navigate(ScreensConstants.NEWS_LETTER_SCREEN);
            return;
          case ScreensConstants.SUCCESS_SCREEN:
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
      <Label style={style.onBoardSkip}>{t('onBoard.common.skip')}</Label>
    </TouchableOpacity>
  );
  const onBoardReturn = () => (
    <TouchableOpacity
      style={style.onBoardReturn}
      onPress={() => navigation.goBack()}>
      <Label style={style.onBoardPrevTitle}>{t('onBoard.common.return')}</Label>
      {getSvgImages({
        name: ImagesName.arrowPrev,
        width: previousIconStyle.width,
        height: previousIconStyle.height,
        style: previousIconStyle,
      })}
    </TouchableOpacity>
  );

  return (
    <Stack.Navigator screenOptions={{...defaultScreenOptions, orientation: 'portrait_up', headerBackVisible: false, headerShadowVisible: false}}>
      <Stack.Screen
        name={ScreensConstants.SELECT_TOPICS_SCREEN}
        component={Routes.SelectTopicsScreen}
        options={{
          headerStyle: style.container,
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
          headerStyle: style.container,
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
          headerStyle: style.container,
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
          headerStyle: style.container,
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
  const headerStyles = StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundColor,
      shadowColor: colors.transparent,
    },
    search: {
      height: 19,
      width: 18,
      marginHorizontal: 20,
    },
    logo: {
      height: 25,
      width: 135,
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
      marginEnd: isTab ? normalize(0.02 * screenWidth) : normalize(0.04 * screenWidth),
    },
    onBoardPrevTitle: {
      fontFamily: fonts.AwsatDigitalBetav10_Regular,
      color: colors.spanishGray,
      fontSize: normalize(12),
      lineHeight: normalize(16),
    },
    onBoardPrevIcon: {
      width: normalize(12),
      height: normalize(8.8),
      marginEnd: normalize(5),
    },
    onBoardSkip: {
      fontFamily: fonts.AwsatDigitalBetav10_Regular,
      alignItems: 'center',
      color: theme.primary,
      fontSize: normalize(12),
      lineHeight: normalize(20),
    },
    skipContainer: {
      marginEnd: isTab ? normalize(0.02 * screenWidth) : normalize(0.04 * screenWidth),
      borderBottomColor: colors.greenishBlue,
      borderBottomWidth: 1,
    },
  });
  return headerStyles;
};

export default OnBoardNavigator;
