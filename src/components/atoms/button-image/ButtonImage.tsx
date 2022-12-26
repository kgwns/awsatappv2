import React, {FunctionComponent} from 'react';
import {TouchableOpacity, ViewStyle, StyleProp, Insets} from 'react-native';
import {Image, ImageName} from 'src/components/atoms/image/Image';
import {DEFAULT_HIT_SLOP, normalize} from 'src/shared/utils';

interface ButtonImageProps {
  onPress: () => void;
  image?: ImageName;
  style?: StyleProp<ViewStyle>;
  icon?: () => void;
  size?: number;
  testId?: string;
  hitSlop?: Insets
}

export const ButtonImage: FunctionComponent<ButtonImageProps> = ({
  onPress,
  image,
  style,
  size = normalize(64),
  icon,
  testId,
  hitSlop = DEFAULT_HIT_SLOP,
}) => {
  return (
    <TouchableOpacity hitSlop={hitSlop} style={style} onPress={onPress} testID={testId}>
      {image && <Image name={image} size={size} />}
      {icon && icon()}
    </TouchableOpacity>
  );
};
