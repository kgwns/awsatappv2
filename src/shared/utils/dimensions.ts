import {Dimensions, Platform, PixelRatio} from 'react-native';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const isIOS = Platform.OS === 'ios';

const scale = screenWidth / 375;
const scaleHeight = screenHeight / 667;

type sizeProp = number;
const normalize = (size: sizeProp, based = 'width') => {
  const newSize = based === 'height' ? size * scaleHeight : size * scale;
  if (isIOS) {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
};

export {screenWidth, screenHeight, isIOS, normalize};
