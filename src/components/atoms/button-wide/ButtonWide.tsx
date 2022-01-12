import React, {FunctionComponent} from 'react';
import {TouchableOpacity, StyleProp, ViewStyle} from 'react-native';
import {Label} from 'src/components/atoms/label/Label';

import {buttonWideStyle} from './ButtonWide.style';

const {container, labelStyle, disableStyle} = buttonWideStyle;

interface ButtonWideProps {
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

export const ButtonWide: FunctionComponent<ButtonWideProps> = ({
  label,
  onPress,
  style,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[container, style, disabled && disableStyle]}
      onPress={onPress}
      disabled={disabled}
    >
      <Label style={labelStyle}>{label}</Label>
    </TouchableOpacity>
  );
};
