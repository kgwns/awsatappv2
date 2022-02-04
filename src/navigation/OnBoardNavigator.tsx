import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {RoutesName, Routes, ScreenList} from './index';
import {colors} from 'src/shared/styles/colors';
import {normalize} from 'src/shared/utils';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Image, Label} from 'src/components/atoms';
import {ImagesName} from 'src/shared/styles';
import {useTranslation} from 'react-i18next';

const Stack = createStackNavigator<ScreenList>();

const defaultScreenOptions: StackNavigationOptions = {
  gestureEnabled: false,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  headerShown: true,
};
const HeaderLogo = () => (
  <Image style={headerStyles.logo} name={ImagesName.headerLogo} />
);
const onBoardSkip = () => (
  <TouchableOpacity onPress={() => console.log('skip')}>
    <Label style={headerStyles.onBoardSkip}>تخطي</Label>
  </TouchableOpacity>
);
const onBoardReturn = () => (
  <TouchableOpacity
    style={headerStyles.onBoardReturn}
    onPress={() => console.log('return')}>
    <Label style={headerStyles.onBoardPrevTitle}>الرجوع</Label>
    <Image name="arrowPrev" style={headerStyles.onBoardPrevIcon} />
  </TouchableOpacity>
);

const OnBoardNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen
        name={RoutesName.followFavoriteAuthorScreen}
        component={Routes.FollowFavoriteAuthorScreen}
        options={{
          headerStyle: headerStyles.container,
          headerLeft: onBoardReturn,
          headerTitle: HeaderLogo,
          headerTitleAlign: 'center',
          headerRight: onBoardSkip,
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
