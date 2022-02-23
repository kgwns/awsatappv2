import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {Routes, ScreenList} from './index';
import {colors, CustomThemeType} from 'src/shared/styles/colors';
import {normalize} from 'src/shared/utils';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Image, Label} from 'src/components/atoms';
import {ImagesName} from 'src/shared/styles';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {ScreensConstants} from 'src/constants';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';

const Stack = createStackNavigator<ScreenList>();

const defaultScreenOptions: StackNavigationOptions = {
  gestureEnabled: false,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  headerShown: true,
};

const OnBoardNavigator = () => {
  const navigation = useNavigation();
  const [t] = useTranslation();
  const style = useThemeAwareObject(customStyle);

  const HeaderLogo = () => (
    <Image style={style.logo} name={ImagesName.headerLogo} />
  );
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
      <Image name="arrowPrev" style={style.onBoardPrevIcon} />
    </TouchableOpacity>
  );

  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen
        name={ScreensConstants.SELECT_INTEREST_SCREEN}
        component={Routes.SelectInterestScreen}
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
          headerRight: () => onBoardSkip(ScreensConstants.AppNavigator),
        }}
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
      height: 20,
      width: 20,
      marginHorizontal: 20,
    },
    logo: {
      height: 30,
      width: 140,
      alignItems: 'center',
    },
    menu: {
      height: 22,
      width: 22,
      marginHorizontal: 20,
    },
    onBoardReturn: {
      flexDirection: 'row-reverse',
      alignItems: 'center',
      marginEnd: normalize(10),
    },
    onBoardPrevTitle: {
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
      alignItems: 'center',
      color: theme.primary,
      fontSize: normalize(12),
      lineHeight: normalize(20),
    },
    skipContainer: {
      marginEnd: normalize(10),
      borderBottomColor: colors.greenishBlue,
      borderBottomWidth: 1,
    }
  });
  return headerStyles;
};

export default OnBoardNavigator;
