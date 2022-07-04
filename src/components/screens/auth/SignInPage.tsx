import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ScreenContainer} from '..';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Keyboard,
} from 'react-native';
import {isIOS, isObjectNonEmpty, normalize, recordLogEvent} from 'src/shared/utils';
import {Label} from '../../atoms';
import {AuthScreenInputSection} from 'src/components/organisms/';
import {ScreensConstants} from 'src/constants';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useTranslation} from 'react-i18next';
import HeaderIcon from 'src/assets/images/icons/header_icon.svg';
import BackIcon from 'src/assets/images/icons/back_icon.svg';
import {
  useBookmark,
  useLogin,
  useRegister,
  useSearch,
  useUserProfileData,
} from 'src/hooks';
import {emptyPasswordValidation} from 'src/shared/validators';
import {FetchLoginPayloadType} from 'src/redux/login/types';
import DeviceInfo from 'react-native-device-info';
import {fetchLoginSuccess} from 'src/redux/login/action';
import {useDispatch} from 'react-redux';
import AdjustAnalyticsManager, {
  AdjustEventID,
} from 'src/shared/utils/AdjustAnalyticsManager';
import {AlertPayloadType} from '../ScreenContainer/ScreenContainer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {getSvgImages} from 'src/shared/styles/svgImages';
import { ImagesName } from 'src/shared/styles/images';
import { fonts } from 'src/shared/styles/fonts';


export enum SocialNavigate {
  google = 'GOOGLE',
  apple = 'APPLE',
  facebook = 'FACEBOOK',
}
export interface SignInPageProps {
  route: any;
}

export const SignInPage = ({route}: SignInPageProps) => {
  const navigation = useNavigation();
  const {themeData} = useTheme();
  const [t] = useTranslation();
  const styles = useThemeAwareObject(createStyles);
  const [email, setEmail] = useState(route.params.email);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [deviceName, setDeviceName] = useState('');
  const {
    registerUserInfo,
    isRegisterLoading,
    socialLoginEnded,
    socialLoginInProgress,
    socialLoginStarted,
    emptyUserInfo,
  } = useRegister();
  const { emptySearchHistory } = useSearch();
  const dispatch = useDispatch();
  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);
  const credentialsAreIncorrect = t('signIn.credentialsAreIncorrect');
  const verifyMailAndPasswordAndTryAgain = t(
    'signIn.verifyMailAndPasswordAndTryAgain',
  );
  const CONST_OK = t('common.ok');
  const CONST_ALERT = t('common.alert');

  const noInternetConnection: AlertPayloadType = {
    title: CONST_ALERT,
    message: t('common.noInternetConnection'),
    buttonTitle: CONST_OK,
  };
  const somthingWentWrong: AlertPayloadType = {
    title: CONST_ALERT,
    message: t('common.somthingWentWrong'),
    buttonTitle: CONST_OK,
  };

  const incorrectCredentialPayload: AlertPayloadType = {
    title: credentialsAreIncorrect,
    message: verifyMailAndPasswordAndTryAgain,
    buttonTitle: CONST_OK,
  };

  const [alertPayload, setAlertPayload] = useState<AlertPayloadType>(
    incorrectCredentialPayload,
  );

  const HeaderLogo = () => getSvgImages({ name: ImagesName.headerLogo, width: styles.logo.width, height: styles.logo.height });

  const {
    fetchLoginRequest,
    isLoading,
    loginData,
    loginError,
    forgotPassworRequest,
    forgotPassswordResponse,
    emptyforgotPassworResponseInfo,
    emptyLoginDataInfo,
  } = useLogin();

  useEffect(() => {
    socialLoginEnded();
  }, [registerUserInfo]);

  useEffect(() => {
    getDeviceName();
  }, []);

  useEffect(() => {
    if (loginError === 'Network Error') {
      setAlertPayload(noInternetConnection);
      setIsAlertVisible(true);
    }
  }, [loginError]);

  const getDeviceName = async () => {
    const deviceName = await DeviceInfo.getDeviceName();
    setDeviceName(deviceName);
  };

  const {getBookmarkedId} = useBookmark();
  const {fetchProfileDataRequest} = useUserProfileData();

  useEffect(() => {
    const message = loginData?.message;
    if (message) {
      if (message.code === 200) {
        emptySearchHistory();
        getBookmarkedId();
        AdjustAnalyticsManager.trackEvent(AdjustEventID.LOGIN);
        fetchProfileDataRequest();
        navigation.reset({
          index: 0,
          routes: [
            {
              name:
                loginData.message.newUser === 1
                  ? ScreensConstants.OnBoardNavigator
                  : ScreensConstants.AppNavigator,
            },
          ],
        });
      } else {
        if (message.code === 0) {
          setAlertPayload(incorrectCredentialPayload);
          setIsAlertVisible(true);
          emptyLoginDataInfo();
        } else {
          Alert.alert(message.message, undefined, [{ text: CONST_OK }]);
        }
      }
    }
  }, [loginData]);

  useEffect(() => {
    const message = registerUserInfo?.message;
    if (message) {
      if (message.code === 200) {
        emptySearchHistory();
        dispatch(fetchLoginSuccess({loginData: registerUserInfo}));
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
        Alert.alert(message.message, undefined, [{ text: CONST_OK }]);
      }
    }
  }, [registerUserInfo]);

  useEffect(() => {
    const message = forgotPassswordResponse?.message;
    if (isObjectNonEmpty(message)) {
      if (message.code === 200) {
        navigation.navigate(ScreensConstants.FORGOT_PASSWORD);
      } else {
        setAlertPayload({
          title: CONST_ALERT,
          message: message.message,
          buttonTitle: CONST_OK,
        });
        setIsAlertVisible(true);
      }
    }
  }, [forgotPassswordResponse]);

  useEffect(() => {
    emptyforgotPassworResponseInfo();
    emptyUserInfo();
    return () => {
      emptyforgotPassworResponseInfo();
      emptyUserInfo();
    };
  }, []);

  const navigateToSection = (type: string) => {
    switch (type) {
      case SocialNavigate.google:
        return;
      case SocialNavigate.apple:
        return;
      case SocialNavigate.facebook:
        socialLoginStarted();
        return;
      default:
        navigation.goBack();
    }
  };

  const onPressSignIn = () => {
    setPasswordError(emptyPasswordValidation(password));

    recordLogEvent('Login');

    const payload: FetchLoginPayloadType = {
      email: email,
      password: password,
      device_name: deviceName,
    };

    if (emptyPasswordValidation(password) === '') {
      Keyboard.dismiss();
      fetchLoginRequest(payload);
    }
  };

  return (
    <ScreenContainer
      isOverlayLoading={isLoading || isRegisterLoading || socialLoginInProgress}
      isAlertVisible={isAlertVisible}
      setIsAlertVisible={setIsAlertVisible}
      alertPayload={alertPayload}
      alertOnPress={() => setIsAlertVisible(false)}>
      <KeyboardAwareScrollView
        bounces={false}
        enableOnAndroid={true}
        scrollEnabled>
       <View>
          <View style={styles.container}>
            <View style={styles.headerStyle}>
              <TouchableOpacity
                testID="signin_back"
                accessibilityLabel="signin_back"
                onPress={() => navigateToSection('')}>
                <View style={styles.headerContainer}>
                  <BackIcon fill={themeData.textColor} style={{marginBottom: isIOS ? 5 : 0}} />
                  <Label
                    children={t('signIn.return')}
                    style={styles.headerLabelStyle}
                  />
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.logoContainer}>
              {HeaderLogo()}
            </View>

          <View style={styles.containerStyle}>
            <AuthScreenInputSection
              emailTestID="signIn_email"
              email={email}
              editableEmail={false}
              isPassword
              password={password}
              passwordError={passwordError}
              passwordTestID={'logIn_password'}
              rightIconTestID={'logIn_password_icon'}
              setChangeText={setEmail}
              setChangePassword={setPassword}
              navigateToSection={navigateToSection}
              goToPasswordScreen={() => forgotPassworRequest({email: email})}
              onPressSignup={onPressSignIn}
              socialButtonBoldStyle={true}
              isSignInScreen={true}
            />
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
      color: theme.textColor,
      lineHeight: normalize(16),
      marginLeft: normalize(5),
    },
    containerStyle: {
      flex: 0.8,
      paddingHorizontal: normalize(30),
      backgroundColor: theme.secondaryWhite,
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
  });
