import React, {FunctionComponent, useState, useEffect} from 'react';
import {Animated, Easing} from 'react-native';

import {horizontalProgressStyle} from 'src/components/atoms/horizontal-progress/HorizontalProgress.style';
import {Styles} from 'src/shared/styles';

const {container, progressBarStyle} = horizontalProgressStyle;
export interface HorizontalProgressProps {
  color?: string;
  initialProgress?: number;
  progress?: number;
  duration?: number;
}
export const HorizontalProgress: FunctionComponent<HorizontalProgressProps> = ({
  color = Styles.color.blue,
  initialProgress = 0,
  progress = 0,
  duration = 2000,
}) => {
  const [progressState, setProgressState] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      animateProgress();
    }, 300);
  }, [initialProgress]);

  const progAnimation = new Animated.Value(initialProgress);
  const animateProgress = () => {
    progAnimation.addListener(({value}) => {
      setProgressState(value);
    });
    Animated.timing(progAnimation, {
      toValue: progress,
      duration,
      easing: Easing.quad,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View testID={'progress'} style={container}>
      <Animated.View
        style={[
          progressBarStyle,
          {backgroundColor: color, width: `${progressState}%`},
        ]}
      />
    </Animated.View>
  );
};
