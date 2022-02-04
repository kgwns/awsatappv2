import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {ScreenList, Routes, RoutesName} from 'src/navigation';

const Stack = createStackNavigator<ScreenList>();

const defaultScreenOptions: StackNavigationOptions = {
  gestureEnabled: false,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  headerShown: false,
};

const AppStackContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={defaultScreenOptions}
        initialRouteName={RoutesName.authNavigator}>
        <Stack.Screen
          name={RoutesName.authNavigator}
          component={Routes.AuthNavigator}
        />
        <Stack.Screen
          name={RoutesName.onBoardNavigator}
          component={Routes.OnBoardNavigator}
        />
        <Stack.Screen
          name={RoutesName.appNavigator}
          component={Routes.AppNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppStackContainer;
