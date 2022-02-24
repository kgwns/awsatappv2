import React, {FunctionComponent, useState, useEffect} from 'react';
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
import BackIcon from 'src/assets/images/icons/back_icon.svg';
import {loginPasswordValidation} from 'src/shared/validators';
import {useLogin} from 'src/hooks'; 
import { FetchLoginPayloadType } from '~/redux/login/types';
import DeviceInfo from 'react-native-device-info';

export enum SocialNavigate {
  google = 'GOOGLE',
  apple = 'APPLE',
  facebook = 'FACEBOOK',
}
export interface SignInPageProps {
  route: any
}

export const SignInPage = ({
  route
}: SignInPageProps) => {
  const navigation = useNavigation();
  const {themeData} = useTheme();
  const [t] = useTranslation();
  const styles = useThemeAwareObject(createStyles);
  const [email, setEmail] = useState(route.params.email);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [deviceName, setDeviceName] = useState('');

  useEffect(() => {
    getDeviceName();
  }, []);

  

  const getDeviceName = async () => {
    const deviceName = await DeviceInfo.getDeviceName();
    setDeviceName(deviceName);
  };

  const {fetchLoginRequest , isLoading, loginData, loginError} = useLogin();

  useEffect(() => {
    console.log('loginData', loginData);
  }, [loginData])

  const navigateToSection = (type: string) => {
    switch (type) {
      case SocialNavigate.google:
        return;
      case SocialNavigate.apple:
        return;
      case SocialNavigate.facebook:
        return;
      default:
        navigation.goBack()
    }
  };

  const onPressSignIn = () => {
    setPasswordError(loginPasswordValidation(password));

    console.log('deviceName', deviceName);

    const payload: FetchLoginPayloadType = {
      email: email,
      password: password,
      device_name: deviceName,
    };

    if (loginPasswordValidation(password) === ''){
      fetchLoginRequest(payload)
      // navigation.reset({
      //   index: 0,
      //   routes: [{name: ScreensConstants.OnBoardNavigator}],
      // });
    }
  };

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View style={styles.headerStyle}>
          <TouchableOpacity
            testID="signin_back"
            accessibilityLabel="signin_back"
            onPress={() => navigateToSection('')}>
            <View style={styles.headerContainer}>
              <BackIcon fill={themeData.textColor} />
              <Label
                children={t('signIn.return')}
                style={styles.headerLabelStyle}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.logoContainer}>
          <HeaderIcon style={styles.logo} fill={themeData.headerColor}/>
        </View>

        <View style={styles.containerStyle}>
          <View style={styles.topContainerStyle}>
            <Label
              children={t('signIn.loginAccount')}
              labelType="h2"
              color={colors.greenishBlue}
            />
            <Label
              children={t('signIn.signUpReceive')}
              style={styles.textStyle}
            />
            <TextInputField placeholder={t('signIn.email')}
              testID={'logIn_email'}
              onChangeText={setEmail}
              editable={false}
              value={email}
              style={styles.inputStyle}
              leftIcon={() => <EmailIcon fill={themeData.textColor} />}
            />
            <TextInputField placeholder={t('signIn.password')}
              testID={'logIn_password'}
              rightIconTestID={'logIn_password_icon'}
              onChangeText={setPassword}
              value={password}
              style={styles.inputStyle}
              error={passwordError}
              isPassword
            />
            <TouchableOpacity
            testID="signin_forget_password"
            accessibilityLabel="signin_forget_password"
            onPress={() => {}}>
              <Label
                  children={t('signIn.forgotPassword')}
                  style={styles.passwordLabel}
                />
            </TouchableOpacity>
            <SocialLoginButton testID="logIn_signIn"
              onPress={onPressSignIn}
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

        <View style={styles.footerStyle} />
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
    alignItems: 'flex-start',
  },
  headerContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerLabelStyle: {
    fontSize: normalize(15),
    color: theme.textColor,
    lineHeight: normalize(16),
    marginLeft: normalize(5),
  },
  containerStyle: {
    flex: 0.8,
    paddingHorizontal: normalize(30),
    backgroundColor: theme.secondaryWhite,
  },
  topContainerStyle: {
    flex: 0.55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainerStyle: {
    flex: 0.35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerStyle: {
    flex: 0.05,
    justifyContent: 'center',
    alignItems: 'center',
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
    color: theme.secondaryWhite,
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
    color: theme.primaryLightGray,
  },
  passwordLabel: {
    fontSize: normalize(15),
    textDecorationLine: 'underline',
    color: theme.primary,
    lineHeight: normalize(16),
    marginBottom: normalize(15),
  }
})
