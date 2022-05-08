import React, { FunctionComponent } from 'react';
import { View, StyleProp, ViewStyle, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Label, SocialLoginButton, TextInputField } from '../../atoms';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {useTranslation} from 'react-i18next';
import {normalize} from '../../../shared/utils';
import { SocialButtonSection } from '..';
import {colors} from '../../../shared/styles/colors';
import EmailIcon from 'src/assets/images/icons/email_icon.svg';
import {CustomThemeType} from 'src/shared/styles/colors';
import { fonts } from 'src/shared/styles/fonts';

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
  showAlertNoInternet,
  socialButtonBoldStyle= false,
  isSignInScreen= false,
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
          <View style={[styles.topContainerStyle,isPassword&&{flex:0.6}]}>
            <Label
              children={isPassword?t('signIn.loginAccount'):t('signIn.signUp')}
              labelType="h2"
              color={colors.greenishBlue}
              style={styles.loginStyle}
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
              leftIcon={() => <EmailIcon width={18} height={14} fill={themeData.textColor}/>}
              isMandatory
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
              isMandatory
              maxLength={20}
              />
            }
            {isPassword&&
            <TouchableOpacity
                testID="signin_forget_password"
                accessibilityLabel="signin_forget_password"
                style={{marginVertical:0}}
                onPress={goToPassword}>
                  <Label
                      children={t('signIn.forgotPassword')}
                      style={styles.passwordLabel}
                    />
                    <View style={styles.passwordLabelUnderline}/>
            </TouchableOpacity>
            }
            <SocialLoginButton testID="signin_signIn"
              onPress={onPress}
              label={t('signIn.signIn')}
              style={styles.buttonStyle}
              labelStyle={styles.signInLabelStyle}
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
          <View style={[styles.bottomContainerStyle,isPassword&&{flex:0.35}]}>
            <SocialButtonSection
              onButtonPress={navigate}
              showAlertNoInternet={showAlertNoInternet}
              socialButtonBoldStyle = {socialButtonBoldStyle}
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
    fontFamily: fonts.Almaria_ExtraBold,
    fontSize: normalize(18),
    color: theme.primaryBlack,
    lineHeight: normalize(22),
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
    marginHorizontal:normalize(8)
  },
  bottomContainerStyle: {
    flex: 0.45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: normalize(25)
  },
  signInLabelStyle: {
    color: theme.secondaryWhite,
    lineHeight: 25,
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
    fontFamily: fonts.IBMPlexSansArabic_Regular,
    fontSize: normalize(14),
    color: theme.primary,
    lineHeight: normalize(22),
  },
  passwordLabelUnderline: {
    height: 1, 
    backgroundColor: theme.primary, 
    opacity: .3,
    marginBottom: normalize(10),
  }
})


