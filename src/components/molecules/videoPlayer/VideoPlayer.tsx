import React, {FunctionComponent, useState, useEffect} from 'react';
import {View, StyleSheet, BackHandler, StatusBar} from 'react-native';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {colors} from 'src/shared/styles/colors';
import Orientation, {OrientationType} from 'react-native-orientation-locker';
import {Edge} from 'react-native-safe-area-context';
import {horizontalEdge, isNotEmpty} from 'src/shared/utils';
import {ScreenContainer} from 'src/components/screens';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import VideoPlayerFullScreen from './VideoPlayerFullScreen';
import {removeWhiteSpace} from 'src/shared/utils/utilities';

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
          Orientation.lockToLandscape();
          setFullScreen(true);
        } else if (deviceOrientation === OrientationType['PORTRAIT']) {
          Orientation.lockToPortrait();
          setFullScreen(false);
        }
      }
    });
  };

  const goBackToScreen = () => {
    if (goBack) {
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
    SystemNavigationBar.navigationHide();
    StatusBar.setHidden(true);
    Orientation.addDeviceOrientationListener(changeOrientation);
    return () => {
      Orientation.removeDeviceOrientationListener(changeOrientation);
      Orientation.lockToPortrait();
      StatusBar.setHidden(false);
      SystemNavigationBar.navigationShow();
    };
  }, []);

  const changeFullScreen = () => {
    fullScreen ? Orientation.lockToPortrait() : Orientation.lockToLandscape();
    setFullScreen(!fullScreen);
  };

  return (
    <ScreenContainer
      barStyle={'light-content'}
      statusbarColor={colors.black}
      edge={edge}
      showPlayer={false}>
      <View style={styles.videoStyles}>
        <VideoPlayerFullScreen
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
