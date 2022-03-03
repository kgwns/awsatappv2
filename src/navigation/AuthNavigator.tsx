import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { Routes, ScreenList } from './index'
import { ScreensConstants } from 'src/constants';

const Stack = createStackNavigator<ScreenList>();
const defaultScreenOptions: StackNavigationOptions = {
  gestureEnabled: false,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  headerShown: false,
};

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen name={ScreensConstants.AuthPage} component={Routes.AuthPage} />
      <Stack.Screen name={ScreensConstants.SignInPage} component={Routes.SignInPage} />
      <Stack.Screen name={ScreensConstants.SignUpPage} component={Routes.SignUpPage} />
      <Stack.Screen name={ScreensConstants.FORGOT_PASSWORD} component={Routes.ForgotPassword} />
      <Stack.Screen name={ScreensConstants.NEW_PASSWORD} component={Routes.NewPassword} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
