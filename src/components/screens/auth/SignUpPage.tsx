import React, {useState, useEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ScreenContainer} from '..';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {colors} from '../../../shared/styles/colors';
import {isIOS, normalize, recordLogEvent} from 'src/shared/utils';
import {Label} from '../../atoms';
import {ScreensConstants} from 'src/constants';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useTranslation} from 'react-i18next';
import {SocialLoginButton, TextInputField} from '../../atoms';
import EmailIcon from 'src/assets/images/icons/email_icon.svg';
import BackIcon from 'src/assets/images/icons/back_icon.svg';
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
import {getSvgImages} from 'src/shared/styles/svgImages';
import { ImagesName } from 'src/shared/styles/images';
import { fonts } from 'src/shared/styles/fonts';
import { SaveTokenAfterRegistraionBodyType } from 'src/redux/notificationSaveToken/types';

export interface SignUpPageProps {
  route: any;
}

export const SignUpPage = ({route}: SignUpPageProps) => {
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
  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);
  const {
    createUserRequest,
    registerUserInfo,
    isRegisterLoading,
    registerError,
    emptyUserInfo,
  } = useRegister();

  const { loginData } = useLogin();
  const { saveTokenAfterRegistrationRequest, saveTokenData } = useNotificationSaveToken();
  
  const initialRender = useRef(true);

  const dispatch = useDispatch();
  const {fetchProfileDataRequest} = useUserProfileData();

  const { emptySearchHistory } = useSearch();

  const HeaderLogo = () => getSvgImages({ name: ImagesName.headerLogo, width: styles.logo.width, height: styles.logo.height });

  const noInternetConnection: AlertPayloadType = {
    title: t('common.alert'),
    message: t('common.noInternetConnection'),
    buttonTitle: t('common.ok'),
  };
  const somthingWentWrong: AlertPayloadType = {
    title: t('common.alert'),
    message: t('common.somthingWentWrong'),
    buttonTitle: t('common.ok'),
  };

  const [alertPayload, setAlertPayload] =
    useState<AlertPayloadType>(noInternetConnection);
  const OK = t('common.ok');

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
        recordLogEvent('Completed_registration');
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
    const deviceName = await DeviceInfo.getDeviceName();
    setDeviceName(deviceName);
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
      createUserRequest(payload);
    }
  };

  return (
    <ScreenContainer
      isOverlayLoading={isRegisterLoading}
      isAlertVisible={isAlertVisible}
      setIsAlertVisible={setIsAlertVisible}
      alertPayload={alertPayload}
      alertOnPress={() => setIsAlertVisible(false)}>
      <KeyboardAwareScrollView
        bounces={false}
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}
        scrollEnabled>
        <View>
          <View style={styles.container}>
            <View style={styles.headerStyle}>
              <TouchableOpacity
                testID="signUp_back"
                accessibilityLabel="signUp_back"
                onPress={() => {
                  navigation.goBack();
                }}>
                <View style={styles.headerContainer}>
                  <BackIcon fill={themeData.backIconColor} style={{marginBottom: isIOS ? 5 : 0}}/>
                  <Label
                    children={t('signUp.return')}
                    style={styles.headerLabelStyle}
                  />
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.logoContainer}>
              {HeaderLogo()}
            </View>

            <View style={styles.containerStyle}>
              <View style={styles.topContainerStyle}>
                <Label
                  children={t('signUp.createAccount')}
                  labelType="h2"
                  style={styles.accountStyle}
                  color={colors.greenishBlue}
                />
                <Label
                  children={t('signUp.accountDescription')}
                  style={styles.textStyle}
                />
                <TextInputField
                  placeholder={t('signUp.email')}
                  testID={'signUp_email'}
                  onChangeText={setEmail}
                  editable={false}
                  value={email}
                  style={styles.inputStyle}
                  leftIcon={() => <EmailIcon width={18} height={14} fill={themeData.textColor} />}
                  isMandatory
                />
                <TextInputField
                  placeholder={t('signUp.password')}
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
                <TextInputField
                  placeholder={t('signUp.confirmPassword')}
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
                <SocialLoginButton
                  testID="signUp_signUp"
                  onPress={onPressSignIn}
                  label={t('signUp.signUp')}
                  style={styles.buttonStyle}
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
      marginBottom: normalize(35),
      marginTop: normalize(20)
    },
    headerStyle: {
      flex: 0.05,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    headerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    headerLabelStyle: {
      fontFamily: fonts.AwsatDigitalBetav10_Regular,
      fontSize: normalize(12),
      color: theme.backIconColor,
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
      height: normalize(37),
    },
    spaceStyle: {
      marginHorizontal: normalize(10),
    },
    textStyle: {
      fontSize: normalize(13),
      color: theme.signInTextColor,
      lineHeight: normalize(22),
      fontFamily: fonts.IBMPlexSansArabic_Regular,
      marginBottom: normalize(20),
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
      fontSize: normalize(20),
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
    },
  });
