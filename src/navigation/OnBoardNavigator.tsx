import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { Routes, ScreenList} from './index';
import {colors} from 'src/shared/styles/colors';
import {normalize} from 'src/shared/utils';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Image, Label} from 'src/components/atoms';
import {ImagesName} from 'src/shared/styles';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {ScreensConstants} from 'src/constants';

const Stack = createStackNavigator<ScreenList>();

const defaultScreenOptions: StackNavigationOptions = {
  gestureEnabled: false,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  headerShown: true,
};
const HeaderLogo = () => (
  <Image style={headerStyles.logo} name={ImagesName.headerLogo} />
);
const onBoardSkip = (navigation: any, translation: any, routesName: any) => (
  <TouchableOpacity
    onPress={() => {
      switch (routesName) {
        case ScreensConstants.KEEP_NOTIFIED_ONBOARD_SCREEN:
          navigation.navigate(ScreensConstants.KEEP_NOTIFIED_ONBOARD_SCREEN);
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
    <Label style={headerStyles.onBoardSkip}>
      {translation('onBoard.common.skip')}
    </Label>
  </TouchableOpacity>
);
const onBoardReturn = (navigation: any, translation: any) => (
  <TouchableOpacity
    style={headerStyles.onBoardReturn}
    onPress={() => navigation.goBack()}>
    <Label style={headerStyles.onBoardPrevTitle}>
      {translation('onBoard.common.return')}
    </Label>
    <Image name="arrowPrev" style={headerStyles.onBoardPrevIcon} />
  </TouchableOpacity>
);

const OnBoardNavigator = () => {
  const navigation = useNavigation();
  const [t] = useTranslation();
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen
        name={ScreensConstants.FOLLOW_FAVORITE_AUTHOR_SCREEN}
        component={Routes.FollowFavoriteAuthorScreen}
        options={{
          headerStyle: headerStyles.container,
          headerLeft: () => onBoardReturn(navigation, t),
          headerTitle: HeaderLogo,
          headerTitleAlign: 'center',
          headerRight: () =>
            onBoardSkip(navigation, t, ScreensConstants.KEEP_NOTIFIED_ONBOARD_SCREEN),
        }}
      />
      <Stack.Screen
        name={ScreensConstants.KEEP_NOTIFIED_ONBOARD_SCREEN}
        component={Routes.KeepNotifiedScreen}
        options={{
          headerStyle: headerStyles.container,
          headerLeft: () => onBoardReturn(navigation, t),
          headerTitle: HeaderLogo,
          headerTitleAlign: 'center',
          headerRight: () =>
            onBoardSkip(navigation, t, ScreensConstants.AppNavigator),
        }}
      />
    </Stack.Navigator>
  );
};

const headerStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.aquaHaze,
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
    textDecorationLine: 'underline',
    color: colors.greenishBlue,
    fontSize: normalize(12),
    lineHeight: normalize(16),
    marginEnd: normalize(10),
  },
});

export default OnBoardNavigator;
