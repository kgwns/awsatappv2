import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {ScreenList, Routes} from 'src/navigation';
import { ScreensConstants } from 'src/constants';

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
        initialRouteName={ScreensConstants.AuthNavigator}>
        <Stack.Screen
          name={ScreensConstants.AuthNavigator}
          component={Routes.AuthNavigator}
        />
        <Stack.Screen
          name={ScreensConstants.OnBoardNavigator}
          component={Routes.OnBoardNavigator}
        />
        <Stack.Screen
          name={ScreensConstants.AppNavigator}
          component={Routes.AppNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppStackContainer;
