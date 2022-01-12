import React, {FunctionComponent} from 'react';
import {StyleProp, ViewStyle, TouchableOpacity, TextStyle} from 'react-native';
import {linkButtonStyle} from './LinkButton.style';
import {Image, ImageName, Label} from 'src/components/atoms';
import {LabelType} from 'src/components/atoms/label/Label';

const {container, textStyle} = linkButtonStyle;

interface LinkButtonProps {
  label: string;
  labelType?: LabelType;
  color?: string;
  onPress: () => void;
  icon?: ImageName;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  linkButtonTestId?: string;
}
export const LinkButton: FunctionComponent<LinkButtonProps> = ({
  label,
  labelType,
  color,
  icon,
  style,
  onPress,
  labelStyle,
  linkButtonTestId,
}) => (
  <TouchableOpacity
    testID={linkButtonTestId}
    onPress={onPress}
    style={[container, style]}
  >
    <Label color={color} style={[textStyle, labelStyle]} labelType={labelType}>
      {label}
    </Label>
    {icon && <Image name={icon} size={18} />}
  </TouchableOpacity>
);
