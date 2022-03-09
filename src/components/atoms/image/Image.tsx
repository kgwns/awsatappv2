import React, {FunctionComponent} from 'react';
import { ImageStyle, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {
  Image as RNEImage,
  ImageProps as RNEImageProps,
} from 'react-native-elements';

import {ImagesName, Styles} from 'src/shared/styles';
import { isDarkTheme } from 'src/shared/utils';
import { useAppCommon } from 'src/hooks';
import {PlaceholderImage} from '../'

const DEFAULT_IMAGE_SIZE = 24;
const DEFAULT_RADIUS_DIVIDER = 2;

export type ImageName = keyof typeof Styles.image;

export interface ImageProps extends Omit<RNEImageProps, 'source'> {
  style?: StyleProp<ImageStyle>;
  name?: ImageName;
  url?: string;
  size?: number;
  backgroundColor?: ImageStyle['backgroundColor'];
  type?: 'round' | 'standard';
  fallback?: boolean;
}

export const Image: FunctionComponent<ImageProps> = ({
  containerStyle,
  name,
  size = DEFAULT_IMAGE_SIZE,
  style,
  backgroundColor = 'transparent',
  type = 'standard',
  resizeMode = 'contain',
  placeholderStyle,
  url,
  fallback=false,
  ...props
}) => {
  const { theme } = useAppCommon()
  const isDarkMode = isDarkTheme(theme)

  const isRounded = type === 'round';

  const imageStyle: ImageStyle = {
    height: size,
    width: size,
    resizeMode,
  };

  const borderStyle: ImageStyle = {
    borderRadius: isRounded ? size / DEFAULT_RADIUS_DIVIDER : 0,
    backgroundColor,
  };

  const placeholderStyleInternal: ViewStyle = {
    backgroundColor: 'transparent',
  };

  return (
    <>
      <RNEImage
        containerStyle={StyleSheet.flatten([containerStyle, borderStyle])}
        style={StyleSheet.flatten([imageStyle, style])}
        source={name ? (isDarkMode ? Styles.darkImage[name] : Styles.image[name]) : { uri: url }}
        placeholderStyle={StyleSheet.flatten([
          placeholderStyleInternal,
          placeholderStyle,
        ])}
        PlaceholderContent={fallback?<PlaceholderImage name={'placeholderImg'}/>:undefined}
        {...props}
      />
    </>
  );
};
