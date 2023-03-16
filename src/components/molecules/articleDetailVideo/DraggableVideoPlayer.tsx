import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';
import {colors, CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import VideoPlayerControl from 'src/components/molecules/articleDetailVideo/VideoPlayerControl';
import {isIOS, isTab, screenHeight, screenWidth} from 'src/shared/utils';

export interface DraggableVideoPlayerProps {
  url?: string;
  currentTime?: any;
  paused: boolean;
  playerVisible?: boolean;
  setPlayerDetails?: (time: any, paused: any) => void;
  setScroll?: (scrollEnabled: boolean) => void;
  setMiniPlayerVisible?: (visible: boolean) => void;
  setReset?: (show: boolean) => void;
  videoRefs?: any;
}

const DraggableVideoPlayer = ({url, ...props}: DraggableVideoPlayerProps) => {
  const styles = useThemeAwareObject(customStyle);
  const animate = useRef(new Animated.ValueXY()).current;
  const [orientation, setOrientation] = useState('PORTRAIT');

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({window: {width, height}}) => {
        if (width < height) {
          setOrientation('PORTRAIT');
        } else {
          setOrientation('LANDSCAPE');
        }
      },
    );
    return () => subscription?.remove();
  }, []);

  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        const {dx, dy} = gestureState;
        return dx > 2 || dx < -2 || dy > 2 || dy < -2;
      },

      onMoveShouldSetPanResponderCapture: (_, gestureState) => {
        const {dx, dy} = gestureState;
        return dx > 2 || dx < -2 || dy > 2 || dy < -2;
      },

      onPanResponderGrant: (_, gesture) => {
        props.setScroll && props.setScroll(false);

        animate.setOffset({
          x: animate.x._value,
          y: animate.y._value,
        });
        animate.setValue({x: 0, y: 0});
      },

      onPanResponderMove: (e, gesture) => {
        animate.setValue({
          x: gesture.dx,
          y: gesture.dy,
        });
      },

      onPanResponderRelease: () => {
        animate.flattenOffset();
        props.setScroll && props.setScroll(true);
      },

      onPanResponderTerminate: () => {
        props.setScroll && props.setScroll(true);
      },

      onShouldBlockNativeResponder: () => true,
    }),
  ).current;

  const boundX = () => {
    if (orientation === 'PORTRAIT') {
      return animate.x.interpolate({
        inputRange: [-0.25 * screenWidth, 0],
        outputRange: [-0.25 * screenWidth, 0],
        extrapolate: 'clamp',
      });
    } else {
      if (isIOS) {
        if (isTab) {
          return animate.x.interpolate({
            inputRange: [-0.6 * screenWidth, 0],
            outputRange: [-0.6 * screenWidth, 0],
            extrapolate: 'clamp',
          });
        } else {
          return animate.x.interpolate({
            inputRange: [-1.32 * screenWidth, 0],
            outputRange: [-1.32 * screenWidth, 0],
            extrapolate: 'clamp',
          });
        }
      } else {
        return animate.x.interpolate({
          inputRange: [-1.08 * screenWidth, 0],
          outputRange: [-1.08 * screenWidth, 0],
          extrapolate: 'clamp',
        });
      }
    }
  };
  const boundY = () => {
    if (orientation === 'PORTRAIT') {
      if (isIOS) {
        return animate.y.interpolate({
          inputRange: [-(screenHeight - screenWidth * 0.45), 0],
          outputRange: [-(screenHeight - (screenWidth * 0.45 + 170)), 0],
          extrapolate: 'clamp',
        });
      } else {
        return animate.y.interpolate({
          inputRange: [-(screenHeight - screenWidth * 0.45), 0],
          outputRange: [-(screenHeight - (screenWidth * 0.45 + 140)), 0],
          extrapolate: 'clamp',
        });
      }
    } else {
      if (isTab) {
        return animate.y.interpolate({
          inputRange: [-(screenHeight - screenWidth), 0],
          outputRange: [-(screenHeight - screenWidth), 0],
          extrapolate: 'clamp',
        });
      } else {
        return animate.y.interpolate({
          inputRange: [-30, 0],
          outputRange: [-30, 0],
          extrapolate: 'clamp',
        });
      }
    }
  };

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        {
          transform: [
            {
              translateX: boundX(),
            },
            {
              translateY: boundY(),
            },
          ],
        },
      ]}>
      <View
        style={[
          styles.container,
          {display: props.playerVisible ? 'flex' : 'none'},
        ]}>
        {url && (
          <VideoPlayerControl
            url={url}
            isMiniPlayer
            setPlayerDetails={props?.setPlayerDetails}
            currentTime={props?.currentTime}
            paused={props?.paused}
            playerVisible={props?.playerVisible}
            setMiniPlayerVisible={props?.setMiniPlayerVisible}
            videoRefs={props?.videoRefs}
            setReset={props?.setReset}
          />
        )}
      </View>
    </Animated.View>
  );
};

export default DraggableVideoPlayer;

const customStyle = (theme: CustomThemeType) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 30,
      left: 10,
      height: screenWidth * 0.45,
      width: screenWidth * 0.7,
      aspectRatio: 1.62,
      backgroundColor: colors.black,
    },
    initialContainer: {
      width: 0,
      height: 0,
    },
  });
