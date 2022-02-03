import React, {FunctionComponent} from 'react';
import {View, StyleProp, ViewStyle} from 'react-native';
import { SocialLoginButton } from '../../atoms';
import { ImagesName } from '../../../shared/styles/images';

interface SocialButtonSectionProps {
  onButtonPress?: (type: string) => void;
  style?: StyleProp<ViewStyle>;
}

export const SocialButtonSection: FunctionComponent<SocialButtonSectionProps> =({ onButtonPress, style }) => {

  const buttonPressAction = (type: string) => {
    if (onButtonPress) {
      onButtonPress(type);
    }
  };

  return (
        <View {...style}>
          <SocialLoginButton testID="signin_google" onPress={() => {buttonPressAction('GOOGLE')}} label={'الإشتراك عن طريق جوجل'} icon={ImagesName.googleIcon}/>
          <SocialLoginButton testID="signin_apple" onPress={() => {buttonPressAction('APPLE')}} label={'الإشتراك عن طريق أبل'} icon={ImagesName.appleIcon}/>
          <SocialLoginButton testID="signin_facebook" onPress={() => {buttonPressAction('FACEBOOK')}} label={'الإشتراك عن طريق فيسبوك'} icon={ImagesName.facebookIcon}/>
          <SocialLoginButton testID="signin_email" onPress={() => {buttonPressAction('EMAIL')}} label={'الإشتراك عن طريق الايميل'} icon={ImagesName.mailIcon}/>
        </View>
  );
};



