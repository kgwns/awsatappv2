import React, {FunctionComponent} from 'react';
import {TouchableOpacity, ViewStyle, StyleProp} from 'react-native';
import {Image, ImageName} from 'src/components/atoms';
import {normalize} from 'src/shared/utils';

interface ButtonImageProps {
  onPress: () => void;
  image?: ImageName;
  style?: StyleProp<ViewStyle>;
  icon?: () => void;
  size?: number;
  testId?: string;
}

export const ButtonImage: FunctionComponent<ButtonImageProps> = ({
  onPress,
  image,
  style,
  size = normalize(64),
  icon,
  testId,
}) => {
  return (
    <TouchableOpacity style={style} onPress={onPress} testID={testId}>
      {image && <Image name={image} size={size} />}
      {icon && icon()}
    </TouchableOpacity>
  );
};
