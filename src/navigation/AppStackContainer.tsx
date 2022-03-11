import React, {useEffect} from 'react';

import {NavigationContainer, NavigationContainerProps, NavigationContainerRef} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import analytics from '@react-native-firebase/analytics';
import {ScreenList, Routes} from 'src/navigation';
import { ScreensConstants } from 'src/constants';
import { useLogin } from 'src/hooks';
import { recordCurrentScreen } from 'src/shared/utils';

const Stack = createStackNavigator<ScreenList>();

const defaultScreenOptions: StackNavigationOptions = {
  gestureEnabled: false,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  headerShown: false,
};

const AppStackContainer = () => {

  const {isLoggedIn, loginData, isSkipped} = useLogin();

  const routeNameRef = React.useRef();
  const navigationRef = React.useRef<NavigationContainerRef<any>>();

  return (
    <NavigationContainer
    ref={navigationRef}
    onReady={() => {
      routeNameRef.current = navigationRef.current.getCurrentRoute().name;
    }}
    onStateChange={async () => {
      const previousRouteName = routeNameRef.current;
      const currentRouteName = navigationRef.current.getCurrentRoute().name;

      if (previousRouteName !== currentRouteName) {
        recordCurrentScreen(currentRouteName);
      }
      routeNameRef.current = currentRouteName;
    }}
    >
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
