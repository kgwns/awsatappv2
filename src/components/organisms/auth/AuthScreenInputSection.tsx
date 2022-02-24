import React, { FunctionComponent } from 'react';
import { View, StyleProp, ViewStyle, StyleSheet, TouchableOpacity } from 'react-native';
import { Label, SocialLoginButton, TextInputField } from '../../atoms';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {useTranslation} from 'react-i18next';
import {normalize} from '../../../shared/utils';
import { SocialButtonSection } from '..';
import {colors} from '../../../shared/styles/colors';
import EmailIcon from 'src/assets/images/icons/email_icon.svg';
import {CustomThemeType} from 'src/shared/styles/colors';

interface AuthScreenInputSectionProps {
  onPressSignup?: () => void;
  goToPasswordScreen?: () => void;
  setChangeText?: (text: string) => void;
  setChangePassword?: (text: string) => void;
  navigateToSection?: (type: string) => void;
  style?: StyleProp<ViewStyle>;
  emailTestID?: string;
  email?: string;
  emailError?: string;
  passwordTestID?: string;
  password?: string;
  passwordError?: string;
  rightIconTestID?: string;
  isPassword?: boolean,
  editableEmail?: boolean,
}

export const AuthScreenInputSection: FunctionComponent<AuthScreenInputSectionProps> =({
  onPressSignup,
  goToPasswordScreen,
  navigateToSection,
  setChangeText,
  setChangePassword,
  style,
  emailTestID,
  email,
  emailError,
  passwordTestID,
  rightIconTestID,
  password,
  passwordError,
  isPassword= false,
  editableEmail= true,
}) => {

  const [t] = useTranslation();
  const {themeData} = useTheme();
  const styles = useThemeAwareObject(createStyles);

  const onPress = () => {
    if (onPressSignup) {
      onPressSignup();
    }
  };
  const navigate = (type: string) => {
    if (navigateToSection) {
      navigateToSection(type);
    }
  };
  const goToPassword = () => {
    if (goToPasswordScreen) {
      goToPasswordScreen();
    }
  };
  const onChangeText = (text: string, type: string) => {
    switch (type) {
      case 'email':
        if(setChangeText){
          setChangeText(text);
        }
      case 'password':
        if(setChangePassword){
          setChangePassword(text);
        }
      default:
        return
    };
  };

  return (
        <View style={[styles.container, style]} >
          <View style={[styles.topContainerStyle,!isPassword&&{flex:0.5}]}>
            <Label
              children={isPassword?t('signIn.loginAccount'):t('signIn.signUp')}
              labelType="h2"
              color={colors.greenishBlue}
            />
            <Label
              children={t('signIn.signUpReceive')}
              style={styles.textStyle}
            />
            <TextInputField placeholder={t('signIn.email')}
              testID={emailTestID}
              onChangeText={(text)=>onChangeText(text,'email')}
              editable={editableEmail}
              value={email}
              error={emailError}
              style={styles.inputStyle}
              keyboardType={'email-address'}
              leftIcon={() => <EmailIcon fill={themeData.textColor}/>}
            />
            {isPassword&&
              <TextInputField placeholder={t('signIn.password')}
              testID={passwordTestID}
              rightIconTestID={rightIconTestID}
              onChangeText={(text)=>onChangeText(text,'password')}
              value={password}
              style={styles.inputStyle}
              error={passwordError}
              isPassword
              />
            }
            {isPassword&&
            <TouchableOpacity
                testID="signin_forget_password"
                accessibilityLabel="signin_forget_password"
                onPress={goToPassword}>
                  <Label
                      children={t('signIn.forgotPassword')}
                      style={styles.passwordLabel}
                    />
            </TouchableOpacity>
            }
            <SocialLoginButton testID="signin_signIn"
              onPress={onPress}
              label={t('signIn.signIn')}
              style={styles.buttonStyle}
              labelStyle={styles.labelStyle}
            />
          </View>
          <View style={styles.dividerContainber}>
            <View style={[styles.divider,styles.leftDivider]} />
            <Label
              children={t('signIn.or')}
              style={styles.textStyleBlack}
            />
            <View style={styles.divider} />
          </View>
          <View style={[styles.bottomContainerStyle,!isPassword&&{flex:0.4}]}>
            <SocialButtonSection
              onButtonPress={navigate}
            />
          </View>
        </View>
  );
};

const createStyles = (theme: CustomThemeType) =>
StyleSheet.create({
  container:{
    flex: 1,
  },
  spaceStyle: {
    marginHorizontal: normalize(10),
  },
  textStyle: {
    fontSize: normalize(15),
    color: theme.textColor,
    lineHeight: normalize(22),
    fontWeight: '400',
    marginBottom: normalize(20),
  },
  textStyleBlack: {
    fontSize: normalize(15),
    color: theme.primaryBlack,
    lineHeight: normalize(22),
  },
  buttonStyle: {
    backgroundColor: theme.primary,
    borderWidth: 0,
    width: '50%',
  },
  topContainerStyle: {
    flex: 0.55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainerStyle: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelStyle: {
    color: theme.secondaryWhite,
    fontWeight: 'bold',
    lineHeight: normalize(22),
  },
  dividerContainber: {
    flex: 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    flex: 1,
    marginLeft: normalize(15),
    width: '100%',
    backgroundColor: theme.textColor,
  },
  leftDivider: {
    marginRight: normalize(20),
    marginLeft: 0,
  },
  inputStyle: {
    width: '100%',
    color: theme.primaryLightGray,
  },
  passwordLabel: {
    fontSize: normalize(15),
    textDecorationLine: 'underline',
    color: theme.primary,
    lineHeight: normalize(22),
    marginBottom: normalize(15),
  }
})


