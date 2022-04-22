import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import { ImagesName } from '../shared/styles/images';
import { colors } from '../shared/styles/colors';
import CustomDrawerContent from './CustomDrawerContent';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { CustomThemeType } from 'src/shared/styles/colors'
import {ScreensConstants} from '../constants/ScreenConstants';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import { getSvgImages } from 'src/shared/styles/svgImages';
import TrackPlayer from 'react-native-track-player';
import { screenWidth } from 'src/shared/utils';

const DrawerNavigator = () => {
  const navigation = useNavigation();
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
        TrackPlayer.stop();
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
        headerStyle: style.container,
        headerLeft: Menu,
        headerTitle: HeaderLogo,
        headerTitleAlign: 'center',
        headerRight: Search,
        drawerStyle: {
          width: '100%',
          backgroundColor: themeData.backgroundColor
        }
      }}>
      <Drawer.Screen name={'drawerRoot'} component={TabNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const customStyle = (theme: CustomThemeType) => {
  const headerStyles = StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundColor,
      shadowColor: colors.transparent,
    },
    search: {
      height: 20,
      width: 20,
      marginHorizontal: 0.04 * screenWidth,
    },
    logo: {
      height: 30,
      width: 140,
      alignItems: 'center',
    },
    menu: {
      height: 22,
      width: 22,
      marginHorizontal: 0.04 * screenWidth,
    },
  });
  return headerStyles
}
