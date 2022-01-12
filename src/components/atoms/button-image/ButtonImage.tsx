import React, {FunctionComponent} from 'react';
import {TouchableOpacity, ViewStyle, StyleProp} from 'react-native';
import {Image, ImageName} from 'src/components/atoms';
import {normalize} from 'src/shared/utils';

interface ButtonImageProps {
  onPress: () => void;
  image: ImageName;
  style?: StyleProp<ViewStyle>;
  size?: number;
}

export const ButtonImage: FunctionComponent<ButtonImageProps> = ({
  onPress,
  image,
  style,
  size = normalize(64),
}) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Image name={image} size={size} />
    </TouchableOpacity>
  );
};
