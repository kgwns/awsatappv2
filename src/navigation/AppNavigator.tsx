import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { RoutesName, Routes } from '../navigation/index'

const Stack = createStackNavigator();

const hideHeader = { headerShown: false }

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={RoutesName.LATEST_NEWS_TAB}>
        <Stack.Screen
          name={RoutesName.HOME}
          component={Routes.Home}
          options={{ ...hideHeader }}
        />
        <Stack.Screen
          name={RoutesName.LATEST_NEWS_TAB}
          component={Routes.LatestNewsTab}
          options={{ ...hideHeader }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
