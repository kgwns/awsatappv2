import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation, DrawerActions, useNavigationState } from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import { ImagesName } from '../shared/styles/images';
import { colors } from '../shared/styles/colors';
import CustomDrawerContent from './CustomDrawerContent';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { CustomThemeType } from 'src/shared/styles/colors'
import {ScreensConstants} from '../constants/Constants';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import { getSvgImages } from 'src/shared/styles/svgImages';
import { isNonEmptyArray, isTab, screenWidth } from 'src/shared/utils';

const DrawerNavigator = () => {
  const navigation = useNavigation();
  const routes = useNavigationState((state) => state.routes)
  const params = isNonEmptyArray(routes) && routes[0].params ? routes[0].params : {}
  const style = useThemeAwareObject(customStyle)
  const {themeData} = useTheme();

  const Search = () => (
    <TouchableOpacity onPress={() => navigation.navigate(ScreensConstants.SearchScreen)}>
      {getSvgImages({ name: ImagesName.searchIcon, width: style.search.width, height: style.search.height, style: style.search })}
    </TouchableOpacity>
  )

  const HeaderLogo = () => getSvgImages({ name: ImagesName.headerLogo, width: style.logo.width, height: style.logo.height, style: style.logo });

  const Menu = () => (
    <TouchableOpacity onPress={
      () => {
        navigation.dispatch(DrawerActions.toggleDrawer());
      }
      }>
      {getSvgImages({ name: ImagesName.menuIcon, width: style.menu.width, height: style.menu.height, style: style.menu })}
    </TouchableOpacity>
  )
  
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        headerStyle: style.container,
        headerLeft: Menu,
        headerTitle: HeaderLogo,
        headerTitleAlign: 'center',
        headerRight: Search,
        drawerStyle: {
          width: isTab ? '50%' :'100%',
          backgroundColor: themeData.backgroundColor
        }
      }}>
      <Drawer.Screen name={'drawerRoot'} component={TabNavigator} initialParams={params}/>
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const customStyle = (theme: CustomThemeType) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.tabBarBackground,
      shadowColor: colors.transparent,
    },
    search: {
      height: 19,
      width: 18,
      marginHorizontal: isTab ? 0.02 * screenWidth : 0.04 * screenWidth,
    },
    logo: {
      height: 32,
      width: 135,
      alignItems: 'center',
    },
    menu: {
      height: 16,
      width: 19,
      marginHorizontal: isTab ? 0.02 * screenWidth : 0.04 * screenWidth,
    },
  });
}
