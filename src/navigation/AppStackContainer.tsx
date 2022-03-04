import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {ScreenList, Routes} from 'src/navigation';
import { ScreensConstants } from 'src/constants';
import { useLogin } from 'src/hooks';

const Stack = createStackNavigator<ScreenList>();

const defaultScreenOptions: StackNavigationOptions = {
  gestureEnabled: false,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  headerShown: false,
};

const AppStackContainer = () => {

  const {isLoggedIn, loginData, isSkipped} = useLogin();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={defaultScreenOptions}
        initialRouteName={isLoggedIn ? (loginData.message.newUser === 1 ? ScreensConstants.OnBoardNavigator : ScreensConstants.AppNavigator) : (isSkipped ? ScreensConstants.AppNavigator : ScreensConstants.AuthNavigator)}>
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
