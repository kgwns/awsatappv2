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
import {
  isIOS,
  isTab,
  normalize,
  screenHeight,
  screenWidth,
} from 'src/shared/utils';

export interface DraggableVideoPlayerProps {
  url?: string;
  currentTime?: any;
  paused: boolean;
  playerVisible?: boolean;
  setPlayerDetails?: (time: any, paused: any) => void;
  setScroll?: (scrollEnabled: boolean) => void;
}

const DraggableVideoPlayer = ({url, ...props}: DraggableVideoPlayerProps) => {
  const styles = useThemeAwareObject(customStyle);
  const animate = useRef(new Animated.ValueXY()).current;

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

      // onMoveShouldSetPanResponder: (evt, gestureState) => {
      //   //return true if user is swiping, return false if it's a single click
      //   return !(gestureState.dx === 0 && gestureState.dy === 0)
      // },

      onPanResponderGrant: () => {
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
      // onPanResponderMove: Animated.event([null, { dx: animate.x, dy: animate.y}], {useNativeDriver: false}),

      onPanResponderRelease: () => {
        animate.flattenOffset();
        props.setScroll && props.setScroll(true);
      },

      // onPanResponderTerminate: () => {
      //   props.setScroll && props.setScroll(true);
      // },

      onShouldBlockNativeResponder: () => true,
    }),
  ).current;

  let boundX = animate.x.interpolate({
    inputRange: [-10, screenWidth - 100],
    outputRange: [-10, screenWidth - 100],
    extrapolate: 'clamp',
  });
  let boundY = animate.y.interpolate({
    inputRange: [-10, screenHeight - 90],
    outputRange: [-10, screenHeight - 90],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        {transform:  [{
          translateX: animate.x
        },
        {
          translateY: animate.y
        },]},
      ]}>
      <View
        style={[
          props.playerVisible ? styles.container : styles.initialContainer,
        ]}>
        {url && (
          <VideoPlayerControl
            url={url}
            isMiniPlayer
            setPlayerDetails={props?.setPlayerDetails}
            currentTime={props?.currentTime}
            paused={props?.paused}
            playerVisible={props?.playerVisible}
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
      bottom: isIOS ? normalize(80) : normalize(70),
      right: (isTab ? 0.02 : 0.04) * screenWidth,
      left: (isTab ? 0.02 : 0.04) * screenWidth,
      height: 'auto',
      aspectRatio: 1.62,
      backgroundColor: colors.black,
      // zIndex: 9999,
    },
    initialContainer: {
      width: 0,
      height: 0,
      // position: 'absolute',
      // top: normalize(55),
      // right: 0,
      // left: 0,
      // height: 'auto',
      // aspectRatio: 1.62,
      // backgroundColor: colors.black,
      // zIndex: 99,
    },
  });
