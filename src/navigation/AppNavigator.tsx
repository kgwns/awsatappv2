import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScreensConstants } from '../constants/ScreenConstants';
import TabNavigator from './TabNavigator';
import { StyleSheet } from 'react-native';
import { Image } from '../components/atoms';
import { colors } from '../shared/styles/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

const Search = () => {
  return (
    <TouchableOpacity>
      <Image resizeMode='contain' style={headerStyles.search} name={ScreensConstants.SEARCH_ICON} />
    </TouchableOpacity>
  )
}

const HeaderLogo = () => {
  return (
    <Image resizeMode='contain' style={headerStyles.logo} name={ScreensConstants.HEADER_LOGO} />
  )
}

const Menu = () => {
  return (
    <TouchableOpacity>
      <Image resizeMode='contain' style={headerStyles.menu} name={ScreensConstants.MENU_ICON} />
    </TouchableOpacity>
  )
}

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ScreensConstants.HOME_SCREEN}>
        <Stack.Screen
          name={ScreensConstants.HOME_SCREEN}
          component={TabNavigator}
          options={{
            headerStyle: headerStyles.container,
            headerLeft: Search,
            headerTitle: HeaderLogo,
            headerTitleAlign: 'center',
            headerRight: Menu,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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