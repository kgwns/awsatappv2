import React, {FunctionComponent, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ScreenContainer} from '..';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../../../shared/styles/colors';
import {normalize} from '../../../shared/utils';
import {Label} from '../../atoms';
import {SocialButtonSection} from '../../../components/organisms/';
import {ScreensConstants} from 'src/constants';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useTranslation} from 'react-i18next';
import HeaderIcon from 'src/assets/images/icons/header_icon.svg';
import { SocialLoginButton, TextInputField } from '../../atoms';
import EmailIcon from 'src/assets/images/icons/email_icon.svg';
import {emailValidation} from 'src/shared/validators';
import { StackNavigationProp } from '@react-navigation/stack';

export enum NavigateTypes {
  google = 'GOOGLE',
  apple = 'APPLE',
  facebook = 'FACEBOOK',
  email = 'EMAIL',
  termsAndConditions = 'TERMSANDCONDITIONS',
  signinPage = 'SIGNINPAGE',
}

export const AuthPage: FunctionComponent = () => {
  const navigation = useNavigation<StackNavigationProp<any>>()
  const {themeData} = useTheme();
  const [t] = useTranslation();
  const styles = useThemeAwareObject(createStyles);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const navigateToSection = (type: string) => {
    switch (type) {
      case NavigateTypes.google:
        return;
      case NavigateTypes.apple:
        return;
      case NavigateTypes.facebook:
        return;
      case NavigateTypes.email:
        return;
      case NavigateTypes.termsAndConditions:
        return;
      case NavigateTypes.signinPage:
        return;
      default:
        navigation.reset({
          index: 0,
          routes: [{name: ScreensConstants.OnBoardNavigator}],
        });
    }
  };

  const onPressSignup = () => {
    setEmailError(emailValidation(email));

    if (emailValidation(email) === ''){
      navigation.navigate(ScreensConstants.SignUpPage,{email:email})
    }
  };

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View style={styles.headerStyle}>
          <TouchableOpacity
            style={{
              borderBottomWidth: 1,
              borderBottomColor: colors.greenishBlue,
            }}
            testID="signin_skip"
            accessibilityLabel="signin_skip"
            onPress={() => navigateToSection('')}>
            <Label
              children={t('signIn.skip')}
              style={styles.headerLabelStyle}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.logoContainer}>
          <HeaderIcon style={styles.logo} fill={themeData.headerColor} />
        </View>

        <View style={styles.containerStyle}>
          <View style={styles.topContainerStyle}>
            <Label
              children={t('signIn.signUp')}
              labelType="h2"
              color={colors.greenishBlue}
            />
            <Label
              children={t('signIn.signUpReceive')}
              style={styles.textStyle}
            />
            <TextInputField placeholder={t('signIn.email')}
              testID={'signIn_email'}
              onChangeText={setEmail}
              value={email}
              error={emailError}
              style={styles.inputStyle}
              keyboardType={'email-address'}
              leftIcon={() => <EmailIcon fill={themeData.textColor}/>}
            />
            <SocialLoginButton testID="signin_signIn"
              onPress={onPressSignup}
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
          <View style={styles.bottomContainerStyle}>
            <SocialButtonSection
              onButtonPress={navigateToSection}
            />
          </View>
        </View>

        <View style={styles.footerStyle}>
          <View style={styles.footerLabelContainer}>
            <Label
              children={t('signIn.agreeTo')}
              labelType="p5"
              color={themeData.textColor}
            />
            <TouchableOpacity
              testID="terms_and_conditions"
              accessibilityLabel="terms_and_conditions"
              onPress={() => navigateToSection('TERMSANDCONDITIONS')}>
              <Label
                children={t('signIn.termsAndConditions')}
                labelType="p5"
                color={colors.greenishBlue}
                style={styles.spaceStyle}
              />
            </TouchableOpacity>
          </View>
          <Label
            children={t('signIn.rights')}
            labelType="p5"
            color={themeData.textColor}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

const createStyles = (theme: CustomThemeType) =>
StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: normalize(20),
    marginHorizontal: normalize(20),
    justifyContent: 'space-between',
    backgroundColor: theme.backgroundColor,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.1,
  },
  headerStyle: {
    flex: 0.05,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  headerLabelStyle: {
    fontSize: normalize(15),
    textDecorationLine: 'underline',
    color: theme.primary,
    lineHeight: normalize(16),
  },
  containerStyle: {
    flex: 0.7,
    paddingHorizontal: normalize(30),
    backgroundColor: theme.secondaryWhite,
  },
  topContainerStyle: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainerStyle: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerStyle: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: normalize(15),
  },
  logo: {
    width: normalize(150),
    height: normalize(30),
  },
  spaceStyle: {
    marginHorizontal: normalize(10),
  },
  textStyle: {
    fontSize: normalize(15),
    color: theme.textColor,
    lineHeight: normalize(16),
    fontWeight: '400',
    marginBottom: normalize(20),
  },
  textStyleBlack: {
    fontSize: normalize(15),
    color: theme.primaryBlack,
    lineHeight: normalize(16),
  },
  buttonStyle: {
    backgroundColor: theme.primary,
    borderWidth: 0,
    width: '50%',
  },
  labelStyle: {
    color: colors.white,
    fontWeight: 'bold',
    lineHeight: 22,
  },
  dividerContainber: {
    flex: 0.1,
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
  },
})
