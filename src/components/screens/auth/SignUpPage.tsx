import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ScreenContainer} from '..';
import {
  View,
  StyleSheet,
  Alert,
  Keyboard,
} from 'react-native';
import {colors} from '../../../shared/styles/colors';
import {isIOS, isTab, normalize, recordLogEvent, recordLogSignUp, recordUserId} from 'src/shared/utils';
import {ScreensConstants,TranslateConstants,TranslateKey} from 'src/constants/Constants';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {CustomThemeType} from 'src/shared/styles/colors';
import {SocialLoginButton, TextInputField, Label} from '../../atoms';
import EmailIcon from 'src/assets/images/icons/email_icon.svg';
import {
  loginPasswordValidation,
  reTypePasswordValidation,
} from 'src/shared/validators';
import {useLogin, useNotificationSaveToken, useRegister, useSearch, useUserProfileData} from 'src/hooks';
import {RegisterBodyType} from 'src/redux/register/types';
import DeviceInfo from 'react-native-device-info';
import {fetchLoginSuccess} from 'src/redux/login/action';
import {useDispatch} from 'react-redux';
import AdjustAnalyticsManager, {
  AdjustEventID,
} from 'src/shared/utils/AdjustAnalyticsManager';
import {AlertPayloadType} from '../ScreenContainer/ScreenContainer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { fonts } from 'src/shared/styles/fonts';
import { SaveTokenAfterRegistraionBodyType } from 'src/redux/notificationSaveToken/types';
import { AnalyticsEvents } from 'src/shared/utils/analytics';
import { AuthHeader } from 'src/components/molecules';
export interface SignUpPageProps {
  route: any;
}

export const SignUpPage = ({route}: SignUpPageProps) => {
  const {themeData} = useTheme();
  const navigation = useNavigation();
  const styles = useThemeAwareObject(signUpStyles);
  const [email, setEmail] = useState(route.params.email);
  const [passwordError, setPasswordError] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPasswordError, setonfirmPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);
  const [deviceName, setDeviceName] = useState('');
  const {
    createUserRequest,
    registerUserInfo,
    isRegisterLoading,
    registerError,
    emptyUserInfo,
  } = useRegister();

  const { loginData } = useLogin();
  const { saveTokenAfterRegistrationRequest, saveTokenData } = useNotificationSaveToken();
  

  const dispatch = useDispatch();
  const {fetchProfileDataRequest} = useUserProfileData();

  const { emptySearchHistory } = useSearch();

  const CONST_OK = TranslateConstants({key:TranslateKey.COMMON_OK});
  const CONST_ALERT = TranslateConstants({key:TranslateKey.COMMON_ALERT});
  const COMMON_NO_INTERNET_CONNECTION = TranslateConstants({key:TranslateKey.COMMON_NO_INTERNET_CONNECTION})
  const SIGNUP_RETURN = TranslateConstants({key:TranslateKey.SIGNUP_RETURN})
  const SIGNUP = TranslateConstants({key:TranslateKey.SIGNUP})
  const SIGNUP_CREATE_ACCOUNT = TranslateConstants({key:TranslateKey.SIGNUP_CREATE_ACCOUNT})
  const SIGNUP_ACCOUNT_DESCRIPTION = TranslateConstants({key:TranslateKey.SIGNUP_ACCOUNT_DESCRIPTION})
  const SIGNUP_EMAIL = TranslateConstants({key:TranslateKey.SIGNUP_EMAIL})
  const SIGNUP_PASSWORD = TranslateConstants({key:TranslateKey.SIGNUP_PASSWORD})
  const SIGNUP_CONFIRM_PASSWORD = TranslateConstants({key:TranslateKey.SIGNUP_CONFIRM_PASSWORD})

  const noInternetConnection: AlertPayloadType = {
    title: CONST_ALERT,
    message: COMMON_NO_INTERNET_CONNECTION,
    buttonTitle: CONST_OK,
  };

  const [alertPayload, setAlertPayload] =
    useState<AlertPayloadType>(noInternetConnection);
  const OK = CONST_OK;

  useEffect(() => {
    getDeviceName();
  }, []);

  useEffect(() => {
    emptyUserInfo();
    return () => {
      emptyUserInfo();
    };
  }, []);

  useEffect(() => {
    if (registerError === 'Network Error') {
      setAlertPayload(noInternetConnection);
      setIsAlertVisible(true);
    }
  }, [registerError]);

  useEffect(() => {
    if((loginData?.user?.id) && saveTokenData?.id){
      const payload: SaveTokenAfterRegistraionBodyType = {
        id: (saveTokenData?.id).toString(),
        uid: (loginData?.user?.id),
      };
      saveTokenAfterRegistrationRequest(payload)
    }
  }, [loginData]);

  useEffect(() => {
    const message = registerUserInfo?.message;
    if (message) {
      if (message.code === 200) {
        emptySearchHistory();
        recordLogEvent(AnalyticsEvents.COMPLETED_REGISTRATION);
        const userId =  registerUserInfo?.user?.id.toString();
        recordUserId(userId);
        dispatch(fetchLoginSuccess({loginData: registerUserInfo}));
        fetchProfileDataRequest();
        AdjustAnalyticsManager.trackEvent(AdjustEventID.REGISTRATION);
        navigation.reset({
          index: 0,
          routes: [
            {
              name:
                message.newUser === 1
                  ? ScreensConstants.OnBoardNavigator
                  : ScreensConstants.AppNavigator,
            },
          ],
        });
      } else {
        Alert.alert(message.message, undefined, [{ text: OK }]);
      }
    }
  }, [registerUserInfo]);

  const getDeviceName = async () => {
    const deviceNameInfo = await DeviceInfo.getDeviceName();
    setDeviceName(deviceNameInfo);
  };

  const onPressSignIn = () => {
    setPasswordError(loginPasswordValidation(password));
    setonfirmPasswordError(reTypePasswordValidation(password, confirmPassword));

    if (
      loginPasswordValidation(password) === '' &&
      reTypePasswordValidation(password, confirmPassword) === ''
    ) {
      const payload: RegisterBodyType = {
        name: '',
        email,
        password: password.trim(),
        device_name: deviceName,
      };
      Keyboard.dismiss();
      recordLogSignUp({method: AnalyticsEvents.EMAIL})
      createUserRequest(payload);
    }
  };

  return (
    <ScreenContainer
      isOverlayLoading={isRegisterLoading}
      isAlertVisible={isAlertVisible}
      setIsAlertVisible={setIsAlertVisible}
      alertPayload={alertPayload}
      alertOnPress={() => setIsAlertVisible(false)}
      backgroundColor={styles.screenBackgroundColor?.backgroundColor}>
      <KeyboardAwareScrollView
        bounces={false}
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}
        scrollEnabled>
        <View>
          <View style={styles.container}>
            <AuthHeader backTitle={SIGNUP_RETURN}
              onPressBack={() => navigation.goBack()}
              testId={'signUp_back'}
            />
            <View style={styles.containerStyle}>
              <View style={styles.topContainerStyle}>
                <Label
                  children={SIGNUP_CREATE_ACCOUNT}
                  labelType="h2"
                  style={styles.accountStyle}
                  color={colors.greenishBlue}
                />
                <Label
                  children={SIGNUP_ACCOUNT_DESCRIPTION}
                  style={styles.textStyle}
                />
                <TextInputField
                  placeholder={SIGNUP_EMAIL}
                  testID={'signUp_email'}
                  onChangeText={setEmail}
                  editable={false}
                  value={email}
                  style={isTab ? styles.tabInputStyle : styles.inputStyle}
                  leftIcon={() => <EmailIcon width={18} height={14} fill={themeData.textColor} />}
                  isMandatory
                  textInputStyle = {isTab && styles.tabTextInputStyle }
                  leftIconStyle = {isTab && styles.tabLeftIconStyle}
                  errorStyle = { isTab && styles.tabErrorContainerStyle}
                  tabErrorTextStyle = { isTab && styles.tabErrorTextStyle}
                  tabStarLabelStyle = { isTab && styles.tabStarLabelStyle }
                />
                <TextInputField
                  placeholder={SIGNUP_PASSWORD}
                  testID={'signUp_password'}
                  rightIconTestID={'signUp_password_icon'}
                  onChangeText={setPassword}
                  value={password}
                  style={isTab ? styles.tabInputStyle : styles.inputStyle}
                  error={passwordError}
                  isPassword
                  isMandatory
                  maxLength={20}
                  textInputStyle = {isTab && styles.tabTextInputStyle }
                  leftIconStyle = {isTab && styles.tabLeftIconStyle}
                  errorStyle = { isTab && styles.tabErrorContainerStyle}
                  tabErrorTextStyle = { isTab && styles.tabErrorTextStyle}
                  tabStarLabelStyle = { isTab && styles.tabStarLabelStyle }
                />
                <TextInputField
                  placeholder={SIGNUP_CONFIRM_PASSWORD}
                  testID={'signUp_confirm_password'}
                  rightIconTestID={'signUp_confirm_password_icon'}
                  onChangeText={setConfirmPassword}
                  value={confirmPassword}
                  style={isTab ? styles.tabInputStyle : styles.inputStyle}
                  error={confirmPasswordError}
                  isPassword
                  isMandatory
                  maxLength={20}
                  textInputStyle = {isTab && styles.tabTextInputStyle }
                  leftIconStyle = {isTab && styles.tabLeftIconStyle}
                  errorStyle = { isTab && styles.tabErrorContainerStyle}
                  tabErrorTextStyle = { isTab && styles.tabErrorTextStyle}
                  tabStarLabelStyle = { isTab && styles.tabStarLabelStyle }
                />
                <SocialLoginButton
                  testID="signUp_signUp"
                  onPress={onPressSignIn}
                  label={SIGNUP}
                  style={isTab ? styles.tabButtonStyle : styles.buttonStyle}
                  labelStyle={styles.labelStyle}
                />
              </View>
            </View>

            <View style={styles.footerStyle} />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ScreenContainer>
  );
};

const signUpStyles = (theme: CustomThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: isTab ? 20 : normalize(20),
      marginHorizontal: isTab ? 20 : normalize(20),
      justifyContent: 'space-between',
      backgroundColor: theme.onBoardBackground,
    },
    containerStyle: {
      flex: 0.8,
      paddingHorizontal: isTab ? 30 : normalize(30),
      backgroundColor: theme.secondaryWhite,
    },
    topContainerStyle: {
      flex: 0.6,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: isTab ? 25 : normalize(25),
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
    spaceStyle: {
      marginHorizontal: normalize(10),
    },
    textStyle: {
      fontSize: isTab ? 13 : normalize(13),
      color: theme.signInTextColor,
      lineHeight: isTab ? 22 : normalize(22),
      fontFamily: fonts.IBMPlexSansArabic_Regular,
      marginBottom: isTab ? 20 : normalize(20),
    },
    buttonStyle: {
      backgroundColor: theme.primary,
      borderWidth: 0,
      width: '60%',
    },
    labelStyle: {
      color: colors.white,
      fontSize: 16,
      lineHeight: 25,
    },
    accountStyle: {
      fontSize: isTab ? 20 : normalize(20),
      lineHeight: 22,
    },
    inputStyle: {
      width: '100%',
      color: theme.primaryLightGray,
    },
    passwordLabel: {
      fontSize: isTab ? 15 : normalize(15),
      textDecorationLine: 'underline',
      color: theme.primary,
      lineHeight: isTab ? 16 : normalize(16),
      marginBottom: isTab ? 15 : normalize(15),
    },
    screenBackgroundColor: {
      backgroundColor: theme.onBoardBackground
    },
    tabTextInputStyle: {
      fontSize: 14,
      paddingVertical: 5,
      paddingHorizontal: 0,
    },
    tabLeftIconStyle: {
      paddingHorizontal: 5,
    },
    tabErrorContainerStyle: {
      marginHorizontal: 5
    },
    tabErrorTextStyle: {
      paddingVertical: 5
    },
    tabStarLabelStyle: {
      lineHeight: 17,
      fontSize: 16
    },
    tabButtonStyle: {
      backgroundColor: theme.primary,
      borderWidth: 0,
      width: '60%',
      marginBottom: 30,
      marginVertical: 0,
      height: isIOS ? 42 : 45,
      borderRadius: 25,
      paddingHorizontal: 15,
      paddingVertical: 4,
    },
    tabInputStyle: {
      width: '100%',
      color: theme.primaryLightGray,
      height: 42,
      borderRadius: 25,
      paddingHorizontal: 10
    },
  });
