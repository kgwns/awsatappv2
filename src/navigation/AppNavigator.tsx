import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ScreensConstants} from '../constants/ScreenConstants';
import {Routes} from './index';
import {StyleSheet} from 'react-native';
import {Image, ImageName, Label} from 'src/components/atoms';
import {colors} from 'src/shared/styles/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ImagesName} from 'src/shared/styles/images';
import {normalize} from 'src/shared/utils';
import DrawerNavigator from './DrawerNavigator';

const Stack = createStackNavigator();

const buildTabIcon = (name: ImageName, style: object) => (
  <TouchableOpacity>
    <Image style={style} name={name} />
  </TouchableOpacity>
);

const Search = () => buildTabIcon(ImagesName.searchIcon, headerStyles.search);
const HeaderLogo = () => (
  <Image style={headerStyles.logo} name={ImagesName.headerLogo} />
);
const Menu = () => buildTabIcon(ImagesName.menuIcon, headerStyles.menu);

const onBoardNext = () => (
  <TouchableOpacity onPress={() => console.log('Next')}>
    <Label style={headerStyles.onBoardNext}>تخطي</Label>
  </TouchableOpacity>
);
const onBoardPrev = () => (
  <TouchableOpacity
    style={headerStyles.onBoardPrev}
    onPress={() => console.log('Prev')}>
    <Label style={headerStyles.onBoardPrevTitle}>الرجوع</Label>
    <Image name="arrowPrev" style={headerStyles.onBoardPrevIcon} />
  </TouchableOpacity>
);


const hideHeader = {
  headerShown: false,
}

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={ScreensConstants.LatestNewsScreen}>
      <Stack.Screen
        name={ScreensConstants.HOME_SCREEN}
        component={DrawerNavigator}
        options={hideHeader}
      />
      <Stack.Screen
        name={ScreensConstants.SearchScreen}
        component={Routes.SearchScreen}
        options={hideHeader}
      />
      <Stack.Screen
        name={ScreensConstants.ARTICLE_DETAIL_SCREEN}
        component={Routes.ArticleDetailScreen}
        options={hideHeader}
      />
      <Stack.Screen
        name={ScreensConstants.StoryScreen}
        component={Routes.StoryScreen}
        options={hideHeader}
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
  onBoardPrev: {
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
  onBoardNext: {
    alignItems: 'center',
    textDecorationLine: 'underline',
    color: colors.greenishBlue,
    fontSize: normalize(12),
    lineHeight: normalize(16),
    marginEnd: normalize(10),
  },
});

export default AppNavigator;
