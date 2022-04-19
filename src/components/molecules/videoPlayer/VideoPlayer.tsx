import React, {FunctionComponent, useRef, useState, useEffect} from 'react';
import {View, StyleSheet, BackHandler, StatusBar} from 'react-native';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {colors} from 'src/shared/styles/colors';
import Orientation, { OrientationType } from 'react-native-orientation-locker';
import { Edge } from 'react-native-safe-area-context';
import { horizontalEdge } from 'src/shared/utils';
import { ScreenContainer } from 'src/components/screens';
import VideoPlayer from 'react-native-video-controls';
import { useNavigation } from '@react-navigation/native';
import SystemNavigationBar from 'react-native-system-navigation-bar';
export interface VideoPlayerProps {
  goBack?: () => void;
  testID?: string;
  url: string;
}
export const VideoPlayerComponent: FunctionComponent<VideoPlayerProps> = ({
  goBack,
  testID,
  url,
}) => {

  const styles = useThemeAwareObject(createStyles);
  const videoPlayer = useRef(null);
  const [isPaused, setIsPaused] = useState(true)
  const [videoUrl, setvideoUrl] = useState(url)
  const [isLoading, setIsLoading] = useState(true);
  const [fullScreen, setFullScreen] = useState(false);
  const [edge, setEdge] = useState<Edge[]>(horizontalEdge)
  const navigation = useNavigation();
  
  const changeOrientation = (deviceOrientation: OrientationType) => {
    Orientation.unlockAllOrientations();
    if(deviceOrientation === 'LANDSCAPE-LEFT' || deviceOrientation === 'LANDSCAPE-RIGHT') {
      setFullScreen(true)
    }else if(deviceOrientation === 'PORTRAIT'){
      setFullScreen(false)
    }
  } 

  const goBackToScreen = () =>{
    if(goBack){
      setIsPaused(true)
      goBack()
    }
  }

  useEffect(() => {
    if(videoUrl&&typeof videoUrl==='string') setvideoUrl(videoUrl.trim())
  }, []);

  useEffect(() => {
    const backAction = () => {
      setIsPaused(true)
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    SystemNavigationBar.navigationHide();
    StatusBar.setHidden(true);
    Orientation.addDeviceOrientationListener(changeOrientation)
    return () => {
      Orientation.removeDeviceOrientationListener(changeOrientation)
      Orientation.lockToPortrait()
      StatusBar.setHidden(false)
      SystemNavigationBar.navigationShow()
    }
  }, [])

  const onLoadStart = () => {
    setIsPaused(false)
    setIsLoading(true);
  };
  const onLoad = () => {
    setIsLoading(false);
  };

  const onEnterFullscreen = () => {
    Orientation.lockToLandscape()
    setFullScreen(true)
  };

  const onExitFullscreen = () => {
    Orientation.lockToPortrait()
    setFullScreen(false)
  };

  return (
    <ScreenContainer barStyle={'light-content'} statusbarColor={colors.black} edge={edge} >
      <View style={styles.container} >
        <VideoPlayer source={{uri:videoUrl}}
          repeat={true}
          controls={false}
          testID={testID}
          tapAnywhereToPause={false}
          accessibilityLabel={testID}
          ref={videoPlayer}
          videoStyle={styles.videoStyles}
          onLoadStart={onLoadStart}
          onLoad={onLoad}
          onError={goBackToScreen}
          paused={isPaused}
          navigator={navigation}
          onBack={goBackToScreen}
          onEnterFullscreen={onEnterFullscreen}
          onExitFullscreen={onExitFullscreen}
          disableVolume={true}
          isFullscreen={fullScreen}
          fullscreenAutorotate={false}
        />
      </View>
    </ScreenContainer>
  );
};

const createStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.black,
    },
    videoStyles: {
      backgroundColor: colors.black,
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      direction:'ltr',
    }
  });
