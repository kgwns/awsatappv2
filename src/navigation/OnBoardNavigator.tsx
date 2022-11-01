import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {Routes, ScreenList} from './index';
import {colors, CustomThemeType} from 'src/shared/styles/colors';
import {isIOS, isTab, normalize, screenWidth} from 'src/shared/utils';
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
import {useTheme} from 'src/shared/styles/ThemeProvider';
import BackIcon from 'src/assets/images/icons/back_icon.svg';

const Stack = createStackNavigator<ScreenList>();

const defaultScreenOptions: StackNavigationOptions = {
  gestureEnabled: false,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  headerShown: true,
};

const OnBoardNavigator = () => {
  const navigation = useNavigation();
  const [t] = useTranslation();
  const {themeData} = useTheme();
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
      <BackIcon fill={themeData.backIconColor} style={previousIconStyle} />
    </TouchableOpacity>
  );

  return (
    <Stack.Navigator screenOptions={{...defaultScreenOptions, headerShadowVisible: false}}>
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
            onBoardSkip(ScreensConstants.SUCCESS_SCREEN), // will replace keep notified screen once notification part was done. 
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
      backgroundColor: theme.onBoardBackground,
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
      fontFamily: fonts.AwsatDigital_Regular,
      color: theme.backIconColor,
      fontSize: normalize(12),
      lineHeight: normalize(20),
      marginBottom: isIOS ? 0 : 4,
    },
    onBoardPrevIcon: {
      width: normalize(12),
      height: normalize(8.8),
      marginEnd: 5,
    },
    onBoardSkip: {
      fontFamily: fonts.AwsatDigital_Regular,
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
