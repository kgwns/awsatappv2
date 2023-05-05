import React, {FunctionComponent, useState, useEffect} from 'react';
import {View, StyleSheet, BackHandler, StatusBar} from 'react-native';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {colors} from 'src/shared/styles/colors';
import Orientation, {OrientationType} from 'react-native-orientation-locker';
import {Edge} from 'react-native-safe-area-context';
import {horizontalEdge, isAndroid, isNotEmpty, isTab} from 'src/shared/utils';
import {ScreenContainer} from 'src/components/screens';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import VideoPlayerFullScreen from './VideoPlayerFullScreen';
import {removeWhiteSpace} from 'src/shared/utils/utilities';

export interface VideoPlayerProps {
  goBack?: () => void;
  testID?: string;
  url: string;
  title: string;
}
export const VideoPlayerComponent: FunctionComponent<VideoPlayerProps> = ({
  goBack,
  testID,
  url,
  title,
}) => {
  const styles = useThemeAwareObject(createStyles);
  const [isPaused, setIsPaused] = useState(false);
  const [videoUrl, setvideoUrl] = useState(url);
  const [fullScreen, setFullScreen] = useState(false);
  const [edge, setEdge] = useState<Edge[]>(horizontalEdge);

  const changeOrientation = (deviceOrientation: OrientationType) => {
    Orientation.getAutoRotateState(rotationLock => {
      if (rotationLock) {
        if (
          deviceOrientation === OrientationType['LANDSCAPE-LEFT'] ||
          deviceOrientation === OrientationType['LANDSCAPE-RIGHT']
        ) {
          if(!isTab) {
            Orientation.lockToPortrait();
          }
          setFullScreen(true);
        } else if (deviceOrientation === OrientationType['PORTRAIT']) {
          if(!isTab) {
            Orientation.lockToPortrait();
          }
          setFullScreen(false);
        }
      }
    });
  };

  const goBackToScreen = () => {
    if (goBack) {
      if(fullScreen){
        if(!isTab) {
          Orientation.lockToPortrait();
        }
        setFullScreen(false);
      }
      setIsPaused(true);
      goBack();
    }
  };

  useEffect(() => {
    isNotEmpty(videoUrl) && setvideoUrl(removeWhiteSpace(videoUrl));

  }, []);

  useEffect(() => {
    const backAction = () => {
      setIsPaused(true);
      return false;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    isAndroid && SystemNavigationBar.navigationHide();
    StatusBar.setHidden(true);
    Orientation.addDeviceOrientationListener(changeOrientation);
    return () => {
      Orientation.removeDeviceOrientationListener(changeOrientation);
      if(!isTab) {
        Orientation.lockToPortrait();
      }
      StatusBar.setHidden(false);
      isAndroid && SystemNavigationBar.navigationShow();
    };
  }, []);

  const changeFullScreen = () => {
    fullScreen ? isTab ? Orientation.unlockAllOrientations() : Orientation.lockToPortrait() : Orientation.lockToLandscape();
    setFullScreen(!fullScreen);
  };

  return (
    <ScreenContainer
      barStyle={'light-content'}
      statusbarColor={colors.black}
      edge={edge}
      showPlayer={false}
      isLandscape >
      <View style={styles.videoStyles}>
        <VideoPlayerFullScreen
          title={title}
          url={videoUrl}
          isPaused={isPaused}
          isFullScreen={fullScreen}
          onChangeFullScreen={changeFullScreen}
          onClose={goBackToScreen}
          testID={testID}
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
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
  });
