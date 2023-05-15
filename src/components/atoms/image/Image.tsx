import React, { FunctionComponent, useState } from 'react';
import { StyleSheet, Image as DefaultImage } from 'react-native';

import FastImage, { ImageStyle, ResizeMode } from 'react-native-fast-image';

import { ImagesName, Styles } from 'src/shared/styles';
import { isDarkTheme, isNotEmpty, isNonEmptyArray } from 'src/shared/utils';
import { useAppCommon } from 'src/hooks';
import { PlaceholderImage } from '../'
import { images } from 'src/shared/styles/images';

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
  fallbackContent?: any
  fallbackName?: ImageName;
  resizeMode?: ResizeMode;
  defaultImageStyle?: ImageStyle;
}


export const Image: FunctionComponent<ImageProps> = ({
  name,
  size = DEFAULT_IMAGE_SIZE,
  style,
  backgroundColor = 'transparent',
  type = 'standard',
  resizeMode = 'contain',
  url,
  fallback = false,
  fallbackContent = <PlaceholderImage name={'placeholderImg'} />,
  fallbackName = 'placeholderImg',
  defaultImageStyle,
  ...props
}) => {
  const { theme } = useAppCommon()
  const isDarkMode = isDarkTheme(theme)

  const [showPlaceholder, setShowPlaceholder] = useState(false);
  const [isLoadEnd, setIsLoadEnd] = useState(false);

  const isRounded = type === 'round';

  const imageStyle: ImageStyle | any = {
    height: size,
    width: size,
  };

  const borderStyle: ImageStyle = {
    borderRadius: isRounded ? size / DEFAULT_RADIUS_DIVIDER : 0,
    backgroundColor,
  };

  let isValidImageUrl = true
  const imageUrlPathArray: any = isNotEmpty(url) && url?.split('/')
  if (!imageUrlPathArray || !isNonEmptyArray(imageUrlPathArray)
    || imageUrlPathArray.length < 3 || !isNotEmpty(imageUrlPathArray[3])) {
    isValidImageUrl = false
  }

  if (!isNotEmpty(name) && !isValidImageUrl) {
    name = fallback && fallbackName ? fallbackName : ImagesName.placeholderImgName
  }

  const onLoadEnd = () => setIsLoadEnd(true)

  return (
    <>
      {!isLoadEnd && fallback && fallbackName === ImagesName.placeholderImgName && <DefaultImage
        source={images.placeholderImg}
        style={[imageStyle, borderStyle,styles.defaultImage, defaultImageStyle]}
      />}
      <FastImage
        style={StyleSheet.flatten([imageStyle, borderStyle, style])}
        source={name ? (isDarkMode ? Styles.darkImage[name] : Styles.image[name]) : (showPlaceholder ? Styles.image[fallbackName] : { uri: url })}
        onError={() => !name && setShowPlaceholder(true)}
        resizeMode={resizeMode}
        onLoadEnd={onLoadEnd}
        {...props}
      />
    </>
  );
};

const styles = StyleSheet.create({
  defaultImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    width: '100%',
    height: '100%',
  }
})
