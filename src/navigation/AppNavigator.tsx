import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ScreensConstants } from '../constants/ScreenConstants';
import TabNavigator from './TabNavigator';
import { RoutesName } from './index'
import { StyleSheet } from 'react-native';
import { Image, ImageName } from '../components/atoms';
import { colors } from '../shared/styles/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ImagesName } from '../shared/styles/images';

const Stack = createStackNavigator();

const buildTabIcon = (name: ImageName, style: object) => (
  <TouchableOpacity>
    <Image style={style} name={name} />
  </TouchableOpacity>
)

const Search = () => buildTabIcon(ImagesName.searchIcon, headerStyles.search)
const HeaderLogo = () => <Image style={headerStyles.logo} name={ImagesName.headerLogo} />
const Menu = () => buildTabIcon(ImagesName.menuIcon, headerStyles.menu)

const AppNavigator = () => {
  return (
      <Stack.Navigator initialRouteName={RoutesName.latestNewsScreen}>
        <Stack.Screen
          name={ScreensConstants.HOME_SCREEN}
          component={TabNavigator}
          options={{
            headerStyle: headerStyles.container,
            headerLeft: Menu,
            headerTitle: HeaderLogo,
            headerTitleAlign: 'center',
            headerRight: Search,
          }}
        />
      </Stack.Navigator>
  );
};

const headerStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.aquaHaze,
    shadowColor: colors.transparent
  },
  search: {
    height: 20,
    width: 20,
    marginHorizontal: 20
  },
  logo: {
    height: 30,
    width: 140,
    alignItems: 'center'
  },
  menu: {
    height: 22,
    width: 22,
    marginHorizontal: 20
  }
});

export default AppNavigator;