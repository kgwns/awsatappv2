import React, { FunctionComponent } from 'react';
import { View, StyleProp, ViewStyle, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Label } from 'src/components/atoms/label/Label';
import { SocialLoginButton } from 'src/components/atoms/social-login-button/SocialLoginButton';
import { TextInputField } from 'src/components/atoms/text-input-field/TextInputField';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { isIOS, isTab, normalize } from 'src/shared/utils';
import { SocialButtonSection } from '..';
import { colors } from '../../../shared/styles/colors';
import EmailIcon from 'src/assets/images/icons/email_icon.svg';
import { CustomThemeType } from 'src/shared/styles/colors';
import { fonts } from 'src/shared/styles/fonts';
import { TranslateConstants, TranslateKey } from '../../../constants/Constants';

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
  isPassword?: boolean;
  editableEmail?: boolean;
  showAlertNoInternet?: () => void;
  socialButtonBoldStyle?: boolean;
  isSignInScreen?: boolean;
}

export const AuthScreenInputSection: FunctionComponent<AuthScreenInputSectionProps> = ({
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
  isPassword = false,
  editableEmail = true,
  showAlertNoInternet,
  socialButtonBoldStyle = false,
  isSignInScreen = false,
}) => {

  const SIGNIN_LOGIN_ACCOUNT = TranslateConstants({ key: TranslateKey.SIGNIN_LOGIN_ACCOUNT })
  const SIGNIN_SIGNUP = TranslateConstants({ key: TranslateKey.SIGNIN_SIGNUP })
  const SIGNIN_INFO = TranslateConstants({ key: TranslateKey.SIGNIN_INFO })
  const SIGNIN_SIGNUP_RECEIVE = TranslateConstants({ key: TranslateKey.SIGNIN_SIGNUP_RECEIVE })
  const SIGNIN_EMAIL = TranslateConstants({ key: TranslateKey.SIGNIN_EMAIL })
  const SIGNIN_PASSWORD = TranslateConstants({ key: TranslateKey.SIGNIN_PASSWORD })
  const SIGNIN_FORGOT_PASSWORD = TranslateConstants({ key: TranslateKey.SIGNIN_FORGOT_PASSWORD })
  const SIGNIN = TranslateConstants({ key: TranslateKey.SIGNIN })
  const SIGNIN_OR = TranslateConstants({ key: TranslateKey.SIGNIN_OR })

  const { themeData } = useTheme();
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
        if (setChangeText) {
          setChangeText(text);
        }
        break;
      case 'password':
        if (setChangePassword) {
          setChangePassword(text);
        }
        break;
      default:
        return
    }
  };

  return (
    <View style={[styles.container, style]} >
      <View style={[styles.topContainerStyle, isPassword && { flex: 0.6 }]}>
        <Label
          children={isPassword ? SIGNIN_LOGIN_ACCOUNT : SIGNIN_SIGNUP}
          labelType="h2"
          color={colors.greenishBlue}
          style={styles.loginStyle}
        />
        <Label
          children={isPassword ? SIGNIN_INFO : SIGNIN_SIGNUP_RECEIVE}
          style={styles.textStyle}
        />
        <TextInputField placeholder={SIGNIN_EMAIL}
          testID={emailTestID}
          onChangeText={(text) => onChangeText(text, 'email')}
          editable={editableEmail}
          value={email}
          error={emailError}
          style={styles.inputStyle}
          keyboardType={'email-address'}
          leftIcon={() => <EmailIcon width={18} height={14} fill={themeData.textColor} />}
          isMandatory
        />
        {isPassword &&
          <TextInputField placeholder={SIGNIN_PASSWORD}
            testID={passwordTestID}
            rightIconTestID={rightIconTestID}
            onChangeText={(text) => onChangeText(text, 'password')}
            value={password}
            style={styles.inputStyle}
            error={passwordError}
            isPassword
            isMandatory
            maxLength={20}
          />
        }
        {isPassword &&
          <TouchableOpacity
            testID="signin_forget_password"
            accessibilityLabel="signin_forget_password"
            style={styles.passwordContainer}
            onPress={goToPassword}>
            <Label
              children={SIGNIN_FORGOT_PASSWORD}
              style={styles.passwordLabel}
            />
            <View style={styles.passwordLabelUnderline} />
          </TouchableOpacity>
        }
        <SocialLoginButton testID="signin_signIn"
          onPress={onPress}
          label={SIGNIN}
          style={styles.buttonStyle}
          labelStyle={styles.signInLabelStyle}
        />
      </View>
      <View style={styles.dividerContainber}>
        <View style={[styles.divider, styles.leftDivider]} />
        <Label
          children={SIGNIN_OR}
          style={styles.textStyleBlack}
        />
        <View style={styles.divider} />
      </View>
      <View style={[styles.bottomContainerStyle, isPassword && { flex: 0.35 }]}>
        <SocialButtonSection
          onButtonPress={navigate}
          showAlertNoInternet={showAlertNoInternet}
          socialButtonBoldStyle={socialButtonBoldStyle}
        />
      </View>
    </View>
  );
};

const createStyles = (theme: CustomThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    loginStyle: {
      fontSize: normalize(20),
      marginTop: normalize(20)
    },
    spaceStyle: {
      marginHorizontal: normalize(10),
    },
    textStyle: {
      fontFamily: fonts.IBMPlexSansArabic_Regular,
      fontSize: normalize(13),
      color: theme.signInTextColor,
      lineHeight: normalize(22),
      marginBottom: normalize(25),
    },
    textStyleBlack: {
      fontFamily: fonts.AwsatDigital_Bold,
      fontSize: normalize(18),
      color: theme.primaryBlack,
      lineHeight: normalize(42),
    },
    buttonStyle: {
      backgroundColor: theme.primary,
      borderWidth: 0,
      width: '60%',
      marginBottom: normalize(30),
      marginVertical: 0,
    },
    topContainerStyle: {
      flex: 0.5,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: normalize(8)
    },
    bottomContainerStyle: {
      flex: 0.45,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: normalize(25)
    },
    signInLabelStyle: {
      color: colors.white,
      lineHeight: isTab ? 35 : 28,
    },
    dividerContainber: {
      flex: 0.05,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: normalize(25)
    },
    divider: {
      height: 1,
      flex: 1,
      marginLeft: normalize(15),
      width: '100%',
      backgroundColor: theme.signInSeparator,
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
      fontFamily: fonts.Effra_Arbc_Regular,
      fontSize: normalize(14),
      color: theme.primary,
      lineHeight: normalize(25),
    },
    passwordLabelUnderline: {
      height: isIOS ? 1 : 2,
      backgroundColor: theme.primary,
      opacity: .3,
      marginBottom: normalize(10),
    },
    passwordContainer: {
      marginBottom: 10
    }
  })


