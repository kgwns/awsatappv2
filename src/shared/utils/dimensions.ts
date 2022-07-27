import { Dimensions, Platform, PixelRatio } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const { width, height } = Dimensions.get('window');
const screenWidth = Math.min(width, height);
const screenHeight = Math.max(width, height);

const isIOS = Platform.OS === 'ios';
const isAndroid = Platform.OS === 'android'
const isNotchDevice = DeviceInfo.hasNotch();

export const isTab = DeviceInfo.isTablet();

const scale = isTab ? screenWidth / 768 : screenWidth / 375;
const scaleHeight = isTab ? screenHeight / 1024 : screenHeight / 667;

type sizeProp = number;
const normalize = (size: sizeProp, based = 'width') => {
  const newSize = based === 'height' ? size * scaleHeight : size * scale;
  if (isIOS) {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
};

const normalizeBy320 = (size: sizeProp, based = 'width') => {
  return size / 320 * (based === 'height' ? scaleHeight : screenWidth)
}

export { screenWidth, screenHeight, isIOS, isAndroid, isNotchDevice, normalize, normalizeBy320 };