import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScreensConstants } from '../constants/ScreenConstants';
import TabNavigator from './TabNavigator';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ScreensConstants.HOME_SCREEN}>
        <Stack.Screen
          name={ScreensConstants.HOME_SCREEN}
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;