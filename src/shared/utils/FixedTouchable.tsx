// FixedTouchableHighlight.js
import React, { useRef } from 'react';
import { Pressable } from 'react-native';

export default function FixedTouchable({
  onPress,
  onPressIn,
  ...props
}: any) {
  const _touchActivatePositionRef = useRef<any>(null);

  function _onPressIn(e: any) {
    const { pageX, pageY } = e.nativeEvent;

    _touchActivatePositionRef.current = {
      pageX,
      pageY,
    };

    onPressIn?.(e);
  }

  function _onPress(e: any) {
    const { pageX, pageY } = e.nativeEvent;

    const absX = Math.abs(_touchActivatePositionRef.current.pageX - pageX);
    const absY = Math.abs(_touchActivatePositionRef.current.pageY - pageY);

    const dragged = absX > 2 || absY > 2;
    if (!dragged) {
      onPress?.(e);
    }
  }

  return (
    <Pressable testID='FixedTouchable01' onPressIn={_onPressIn} onPress={_onPress} {...props}>
      {props.children}
    </Pressable>
  );
}
