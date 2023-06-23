import React, {useEffect, useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import {ScreenList, Routes} from 'src/navigation';
import { ScreensConstants } from 'src/constants/Constants';
import { useAppPlayer, useLogin } from 'src/hooks';
import { isNotEmpty, isObjectNonEmpty, recordCurrentScreen } from 'src/shared/utils';
import TrackPlayer from 'react-native-track-player';
import { navigationDeferred, navigationReference } from './NavigationUtils';
const Stack = createStackNavigator<ScreenList>();

const defaultScreenOptions: StackNavigationOptions = {
  gestureEnabled: false,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  headerShown: false,
};

const AppStackContainer = () => {

  const {isLoggedIn, loginData, isSkipped} = useLogin();
  const { selectedTrack, showMiniPlayer, setShowMiniPlayer, setPlayerTrack } = useAppPlayer()
  const [previousTrack, setPreviousTrack] = useState<any>(null)

  const routeNameRef = React.useRef();

  useEffect(() => {
    if(showMiniPlayer &&  isNotEmpty(selectedTrack) && selectedTrack !== previousTrack){
        setPreviousTrack(selectedTrack);
        resetAndPlay();
    }
  }, [showMiniPlayer]);

  useEffect(() => {
    return(() => {
      setShowMiniPlayer(false);
      setPlayerTrack(null);
    })
  }, []);

  useEffect(() => {
    if(showMiniPlayer && selectedTrack !== previousTrack){
      setPreviousTrack(selectedTrack);
      resetAndPlay();
    }
  }, [selectedTrack]);

  const resetAndPlay = async () => { 
      await TrackPlayer.stop();
      await TrackPlayer.reset();
      if(isObjectNonEmpty(selectedTrack)){
          await TrackPlayer.add(selectedTrack);
          await TrackPlayer.play();
      }
  };
  
  return (
    <NavigationContainer
    ref={navigationReference}

    onReady={() => {
      routeNameRef.current = navigationReference.current.getCurrentRoute().name;
      navigationDeferred.resolve()
    }}
    onStateChange={async () => {
      const previousRouteName = routeNameRef.current;
      const currentRouteName = navigationReference.current.getCurrentRoute().name;

      if (previousRouteName !== currentRouteName) {
        recordCurrentScreen(currentRouteName);
      }
      routeNameRef.current = currentRouteName;
    }}
    >
      <Stack.Navigator
        screenOptions={defaultScreenOptions}
        initialRouteName={isLoggedIn ? 
          (loginData.message.newUser === 1 ? 
          ScreensConstants.OnBoardNavigator : ScreensConstants.AppNavigator) : 
          (isSkipped ? ScreensConstants.AppNavigator : ScreensConstants.AuthNavigator)}
      >
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
