import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import { ImagesName } from '../shared/styles/images';
import { Image, ImageName } from '../components/atoms';
import { colors } from '../shared/styles/colors';
import CustomDrawerContent from './CustomDrawerContent';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { CustomThemeType } from 'src/shared/styles/colors'
import {ScreensConstants} from '../constants/ScreenConstants';



const DrawerNavigator = () => {
  const navigation = useNavigation();
  const style = useThemeAwareObject(customStyle)

  const buildTabIcon = (name: ImageName, style: object, screenName: string) => (
    <TouchableOpacity
      onPress={() => {
        if(screenName==ScreensConstants.SearchScreen){
          return navigation.navigate(ScreensConstants.SearchScreen);
        }
        navigation.dispatch(DrawerActions.toggleDrawer());
      }}>
      <Image style={style} name={name} />
    </TouchableOpacity>
  );

  const Search = () => buildTabIcon(ImagesName.searchIcon, style.search, ScreensConstants.SearchScreen);
  const HeaderLogo = () => (
    <Image style={style.logo} name={ImagesName.headerLogo} />
  );
  const Menu = () => buildTabIcon(ImagesName.menuIcon, style.menu,'')
  
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
          width: '100%'
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
  });
  return headerStyles
}
