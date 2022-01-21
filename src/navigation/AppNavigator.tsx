import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScreensConstants } from '../constants/ScreenConstants';
import TabNavigator from './TabNavigator';
import { RoutesName } from './index'

const Stack = createStackNavigator();

const hideHeader = { headerShown: false }

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={RoutesName.latestNewsScreen}>
        <Stack.Screen
          name={ScreensConstants.HOME_SCREEN}
          component={TabNavigator}
          options={{ ...hideHeader }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;