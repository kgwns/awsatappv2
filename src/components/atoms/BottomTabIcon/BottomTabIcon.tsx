import React, {FunctionComponent} from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';
import {normalize} from 'src/shared/utils';
import {bottomTabIconStyle} from 'src/components/atoms/BottomTabIcon/BottomTabIcon.style';
import {Image, Label, ImageName} from 'src/components/atoms';

const {
  iconContainer,
  lableActiveStyle,
  iconStyle,
  iconActiveStyle,
  selectedIconContainer,
} = bottomTabIconStyle;

interface BottomTabIconProps {
  text: string;
  icon?: ImageName;
  active?: boolean;
  url?: string;
  iconSize?: number;
  onPress?: () => void;
}
export const BottomTabIcon: FunctionComponent<BottomTabIconProps> = ({
  text,
  icon,
  active,
  iconSize = normalize(24),
  onPress,
}) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={active ? selectedIconContainer : iconContainer}>
      <Image
        name={icon}
        style={active ? iconActiveStyle : iconStyle}
        size={iconSize}
      />
      {active && <Label style={lableActiveStyle}>{text}</Label>}
    </View>
  </TouchableWithoutFeedback>
);
