import React, { FunctionComponent } from 'react';
import { View, StyleProp, ViewStyle, useColorScheme } from 'react-native';
import { SocialLoginButton } from '../../atoms';
import { ImagesName } from '../../../shared/styles/images';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { getSvgImages } from 'src/shared/styles/svgImages';
import { normalize } from 'src/shared/utils'
import { isDarkTheme } from 'src/shared/utils'

interface SocialButtonSectionProps {
  onButtonPress?: (type: string) => void;
  style?: StyleProp<ViewStyle>;
}

export const SocialButtonSection: FunctionComponent<SocialButtonSectionProps> = ({ onButtonPress, style }) => {
  const { themeData } = useTheme()
  const theme = useColorScheme()
    let isDarkMode = isDarkTheme(theme)
  const buttonPressAction = (type: string) => {
    if (onButtonPress) {
      onButtonPress(type);
    }
  };
  console.log(isDarkMode)
  return (
    <View {...style}>
      <SocialLoginButton testID="signin_google"
        onPress={() => { buttonPressAction('GOOGLE') }}
        label={'الإشتراك عن طريق جوجل'}
        icon={() => {
          return getSvgImages({
            name: ImagesName.googleIcon,
            size: normalize(16),
          });
        }}
        color={themeData.primaryBlack} />
      <SocialLoginButton testID="signin_apple"
        onPress={() => { buttonPressAction('APPLE') }}
        label={'الإشتراك عن طريق أبل'}
        icon={() => {
          return getSvgImages({
            name: ImagesName.appleIcon,
            size: normalize(16),
            fill: themeData.primaryBlack,
          });
        }}
        color={themeData.primaryBlack} />
      <SocialLoginButton testID="signin_facebook"
        onPress={() => { buttonPressAction('FACEBOOK') }}
        label={'الإشتراك عن طريق فيسبوك'}
        icon={() => {
          return getSvgImages({
            name: ImagesName.facebookIcon,
            size: normalize(16),
          });
        }}
        color={themeData.primaryBlack} />
      <SocialLoginButton testID="signin_email"
        onPress={() => { buttonPressAction('EMAIL') }}
        label={'الإشتراك عن طريق الايميل'}
        icon={() => {
          return getSvgImages({
            name: ImagesName.mailIcon,
            size: normalize(16),
          });
        }}
        color={themeData.primaryBlack} />
    </View>
  );
};



