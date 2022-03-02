import React, { FunctionComponent } from 'react';
import { View, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import { SocialLoginButton } from '../../atoms';
import { useTheme } from 'src/shared/styles/ThemeProvider';

import {useTranslation} from 'react-i18next';
import FaceBookIcon from 'src/assets/images/icons/facebook_icon.svg';
import GoogleIcon from 'src/assets/images/icons/google_icon.svg';
import AppleIcon from 'src/assets/images/icons/apple_icon.svg';
import { isIOS } from 'src/shared/utils';

interface SocialButtonSectionProps {
  onButtonPress?: (type: string) => void;
  style?: StyleProp<ViewStyle>;
}

export const SocialButtonSection: FunctionComponent<SocialButtonSectionProps> =({ onButtonPress, style }) => {

  const [t] = useTranslation();
  const {themeData} = useTheme();

  const buttonPressAction = (type: string) => {
    if (onButtonPress) {
      onButtonPress(type);
    }
  };
  return (
        <View {...style}>
          <SocialLoginButton testID="signin_facebook"
            onPress={() => {buttonPressAction('FACEBOOK')}}
            label={t('signIn.loginFacebook')}
            icon={() => <View style={styles.container}><FaceBookIcon /></View>}
          />
          <SocialLoginButton testID="signin_google"
            onPress={() => {buttonPressAction('GOOGLE')}}
            label={t('signIn.loginGoogle')}
            icon={() => <View style={styles.container}><GoogleIcon /></View>}
          />
          {isIOS &&  <SocialLoginButton testID="signin_apple"
            onPress={() => {buttonPressAction('APPLE')}}
            label={t('signIn.loginApple')}
            icon={() => <View style={styles.container}><AppleIcon fill={themeData.primaryBlack} /></View>}
          /> }
         
        </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});



