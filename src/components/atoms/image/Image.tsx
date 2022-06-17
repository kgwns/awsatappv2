import React, {FunctionComponent, useState} from 'react';
import { ImageStyle, StyleSheet } from 'react-native';

import FastImage, { ResizeMode } from 'react-native-fast-image';

import {ImagesName, Styles} from 'src/shared/styles';
import { isDarkTheme, isAndroid, isNotEmpty } from 'src/shared/utils';
import { useAppCommon } from 'src/hooks';
import {PlaceholderImage} from '../'

const DEFAULT_IMAGE_SIZE = 24;
const DEFAULT_RADIUS_DIVIDER = 2;

export type ImageName = keyof typeof Styles.image;

export interface ImageProps extends Omit<ImageStyle, 'source'> {
  style?: ImageStyle;
  name?: ImageName;
  url?: string;
  size?: number;
  backgroundColor?: ImageStyle['backgroundColor'];
  type?: 'round' | 'standard';
  fallback?: boolean;
  fallbackContent?:any
  fallbackName:ImageName;
  resizeMode?: ResizeMode;
}


export const Image: FunctionComponent<ImageProps> = ({
  name,
  size = DEFAULT_IMAGE_SIZE,
  style,
  backgroundColor = 'transparent',
  type = 'standard',
  resizeMode = 'contain',
  url,
  fallback=false,
  fallbackContent=<PlaceholderImage name={'placeholderImg'}/>,
  fallbackName,
  ...props
}) => {
  const { theme } = useAppCommon()
  const isDarkMode = isDarkTheme(theme)
  const [showPlaceholder, setShowPlaceholder] = useState(false);

  const isRounded = type === 'round';

  const imageStyle: ImageStyle = {
    height: size,
    width: size,
  };

  const borderStyle: ImageStyle = {
    borderRadius: isRounded ? size / DEFAULT_RADIUS_DIVIDER : 0,
    backgroundColor,
  };


  if(isAndroid && !isNotEmpty(name) && !isNotEmpty(url)) {
    name = ImagesName.placeholderImg
  }

  return (
    <>
      <FastImage
        style={StyleSheet.flatten([imageStyle, borderStyle, style])}
        source={name ? (isDarkMode ? Styles.darkImage[name] : Styles.image[name]) : (showPlaceholder ? Styles.image[fallbackName] : { uri: url })}
        onError={() => !name && setShowPlaceholder(true)}
        resizeMode={resizeMode}
        {...props}
      />
    </>
  );
};
