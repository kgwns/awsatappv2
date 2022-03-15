import React, {useState,useEffect,useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ScreenContainer} from '..';
import {View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {colors} from '../../../shared/styles/colors';
import {normalize, recordLogEvent} from 'src/shared/utils';
import {Label} from '../../atoms';
import {ScreensConstants} from 'src/constants';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useTranslation} from 'react-i18next';
import HeaderIcon from 'src/assets/images/icons/header_icon.svg';
import { SocialLoginButton, TextInputField } from '../../atoms';
import EmailIcon from 'src/assets/images/icons/email_icon.svg';
import BackIcon from 'src/assets/images/icons/back_icon.svg';
import {loginPasswordValidation, reTypePasswordValidation} from 'src/shared/validators';
import {useRegister, useUserProfileData} from 'src/hooks';
import {RegisterBodyType} from 'src/redux/register/types';
import DeviceInfo from 'react-native-device-info';
import { fetchLoginSuccess } from 'src/redux/login/action';
import { useDispatch } from 'react-redux';
import AdjustAnalyticsManager, { AdjustEventID } from 'src/shared/utils/AdjustAnalyticsManager';

export interface SignUpPageProps {
  route: any
}

export const SignUpPage = ({
  route
}: SignUpPageProps) => {
  const navigation = useNavigation();
  const {themeData} = useTheme();
  const [t] = useTranslation();
  const styles = useThemeAwareObject(createStyles);
  const [email, setEmail] = useState(route.params.email);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setonfirmPasswordError] = useState('');
  const [deviceName, setDeviceName] = useState('');
  const {createUserRequest, registerUserInfo, isRegisterLoading} = useRegister();
  const initialRender = useRef(true);

  const dispatch = useDispatch();
  const { fetchProfileDataRequest } = useUserProfileData();

  useEffect(() => {
    getDeviceName();
  }, []);

  useEffect(() => {
    const message = registerUserInfo?.message;
    if (message) {
      if (message.code === 200) {
        recordLogEvent('Completed_Registration');
        dispatch(fetchLoginSuccess({ loginData: registerUserInfo }));
        fetchProfileDataRequest()
        AdjustAnalyticsManager.trackEvent(AdjustEventID.REGISTRATION)
        navigation.reset({
          index: 0,
          routes: [{name: message.newUser === 1 ? ScreensConstants.OnBoardNavigator : ScreensConstants.AppNavigator}],
        });
      }else{
        Alert.alert(message.message);
      }
    }
  }, [registerUserInfo]);

  const getDeviceName = async () => {
    const deviceName = await DeviceInfo.getDeviceName();
    setDeviceName(deviceName);
  };

  const onPressSignIn = () => {
    setPasswordError(loginPasswordValidation(password));
    setonfirmPasswordError(reTypePasswordValidation(password,confirmPassword));

    if (loginPasswordValidation(password) === ''&& reTypePasswordValidation(password,confirmPassword) === ''){
      const payload: RegisterBodyType = {
        name:'',
        email,
        password,
        device_name:deviceName,
      };
      createUserRequest(payload);
    }
  };

  return (
    <ScreenContainer isOverlayLoading={isRegisterLoading}>
      <View style={styles.container}>
        <View style={styles.headerStyle}>
          <TouchableOpacity
            testID="signUp_back"
            accessibilityLabel="signUp_back"
            onPress={() =>{navigation.goBack()}}>
            <View style={styles.headerContainer}>
              <BackIcon fill={themeData.textColor} />
              <Label
                children={t('signUp.return')}
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
              children={t('signUp.createAccount')}
              labelType="h2"
              color={colors.greenishBlue}
            />
            <Label
              children={t('signUp.accountDescription')}
              style={styles.textStyle}
            />
            <TextInputField placeholder={t('signUp.email')}
              testID={'signUp_email'}
              onChangeText={setEmail}
              editable={false}
              value={email}
              style={styles.inputStyle}
              leftIcon={() => <EmailIcon fill={themeData.textColor} />}
              isMandatory
            />
            <TextInputField placeholder={t('signUp.password')}
              testID={'signUp_password'}
              rightIconTestID={'signUp_password_icon'}
              onChangeText={setPassword}
              value={password}
              style={styles.inputStyle}
              error={passwordError}
              isPassword
              isMandatory
              maxLength={20}
            />
            <TextInputField placeholder={t('signUp.confirmPassword')}
              testID={'signUp_confirm_password'}
              rightIconTestID={'signUp_confirm_password_icon'}
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              style={styles.inputStyle}
              error={confirmPasswordError}
              isPassword
              isMandatory
              maxLength={20}
            />
            <SocialLoginButton testID="signUp_signUp"
              onPress={onPressSignIn}
              label={t('signUp.signUp')}
              style={styles.buttonStyle}
              labelStyle={styles.labelStyle}
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
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: normalize(25),
  },
  bottomContainerStyle: {
    flex: 0.3,
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
    fontSize: normalize(13),
    color: theme.textColor,
    lineHeight: normalize(16),
    fontWeight: '400',
    marginBottom: normalize(20),
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
