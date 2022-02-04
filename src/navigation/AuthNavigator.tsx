import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {RoutesName, Routes, ScreenList} from './index';

const Stack = createStackNavigator<ScreenList>();
const defaultScreenOptions: StackNavigationOptions = {
  gestureEnabled: false,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  headerShown: false,
};

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen name={RoutesName.authPage} component={Routes.AuthPage} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
