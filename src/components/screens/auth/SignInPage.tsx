import React, {useState, useEffect, useRef} from 'react';
import {useNavigation,useIsFocused} from '@react-navigation/native';
import {ScreenContainer} from '..';
import {
  View,
  StyleSheet,
  Alert,
  Keyboard,
} from 'react-native';
import {isObjectNonEmpty, isTab, normalize, recordLogEvent, recordLogLogin, recordUserId} from 'src/shared/utils';
import {AuthScreenInputSection} from 'src/components/organisms/';
import {ScreensConstants, TranslateConstants, TranslateKey} from 'src/constants/Constants';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {CustomThemeType} from 'src/shared/styles/colors';
import {
  useBookmark,
  useLogin,
  useNotificationSaveToken,
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
import { SaveTokenAfterRegistraionBodyType } from 'src/redux/notificationSaveToken/types';
import { Connection, LoginFactory } from 'src/shared/utils/loginFactory';
import { RegisterBodyType } from 'src/redux/register/types';
import { getDeviceName as getDeviceType } from 'src/shared/utils/utilities';
import { AnalyticsEvents } from 'src/shared/utils/analytics';
import { AuthHeader } from 'src/components/molecules';

export const onSuccessSocialLogin = async (
  userInfo: any,
  loginProvider = SocialProviders.facebook,
) => {
  const userDetails = userInfo.user;
  const deviceType = await getDeviceType();
  const payload: RegisterBodyType = {
    email: userDetails.email,
    device_name: deviceType,
    first_name: userDetails.givenName,
    last_name: userDetails.familyName,
    provider: loginProvider,
    provider_id: userDetails.id,
  };
  if (loginProvider === SocialProviders.facebook && userDetails.profile_url) {
    payload.profile_url = userDetails.profile_url;
  }
  if (loginProvider === SocialProviders.google && userInfo) {
    payload.profile_url = userInfo.user.photo;
  }
  return payload
};


export enum SocialNavigate {
  google = 'GOOGLE',
  apple = 'APPLE',
  facebook = 'FACEBOOK',
}

export enum SocialProviders {
  google = 'google',
  facebook = 'facebook',
}
export interface SignInPageProps {
  route: any;
}

export const SignInPage = ({route}: SignInPageProps) => {
  const navigation = useNavigation();
  const styles = useThemeAwareObject(signInStyles);
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
    createUserRequest
  } = useRegister();
  const { emptySearchHistory } = useSearch();
  const { saveTokenAfterRegistrationRequest, saveTokenData } = useNotificationSaveToken();
  const dispatch = useDispatch();
  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);
  const credentialsAreIncorrect = TranslateConstants({key:TranslateKey.CREDENTIALS_ARE_INCORRECT});
  const verifyMailAndPasswordAndTryAgain = TranslateConstants({key:TranslateKey.VERIFY_MAIL_AND_PASSWORD_AND_TRY_AGAIN});
  const CONST_OK = TranslateConstants({key:TranslateKey.COMMON_OK});
  const CONST_ALERT = TranslateConstants({key:TranslateKey.COMMON_ALERT});
  const COMMON_NO_INTERNET_CONNECTION = TranslateConstants({key:TranslateKey.COMMON_NO_INTERNET_CONNECTION})
  const SIGNIN_RETURN = TranslateConstants({key:TranslateKey.SIGNIN_RETURN})

  const noInternetConnection: AlertPayloadType = {
    title: CONST_ALERT,
    message: COMMON_NO_INTERNET_CONNECTION,
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

  const isFocused = useIsFocused()
  const fbLoginRef = useRef(true);


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
    const deviceNameInfo = await DeviceInfo.getDeviceName();
    setDeviceName(deviceNameInfo);
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
        const userId = loginData.user?.id.toString();
        recordUserId(userId);      
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

  const onResult = async (userInfo:any,success:boolean, provider: SocialProviders) => {
    if(success){
      fbLoginRef.current = false
      const payload = await onSuccessSocialLogin(userInfo,provider)
      createUserRequest(payload);
    }
  }

  const checkFacebookLogin = () => {
    const facebookSignIn = LoginFactory.getInstance(Connection.Facebook,onResult);
    facebookSignIn?.initialLogin();
  }

  useEffect(() => {
    if(isFocused && fbLoginRef.current){
      checkFacebookLogin()
    }
  }, [isFocused])

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

    recordLogEvent(AnalyticsEvents.LOGIN);
    recordLogLogin({method: AnalyticsEvents.EMAIL})

    const payload: FetchLoginPayloadType = {
      email,
      password,
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
        showsVerticalScrollIndicator={false}
        scrollEnabled>
       <View>
          <View style={styles.container}>
            <AuthHeader backTitle={SIGNIN_RETURN}
              onPressBack={() => navigateToSection('')}
              testId={'signin_back'}
            />
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
              goToPasswordScreen={() => forgotPassworRequest({email})}
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

const signInStyles = (theme: CustomThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: isTab ? 20 : normalize(20),
      marginHorizontal: isTab ? 20 : normalize(20),
      justifyContent: 'space-between',
      backgroundColor: theme.backgroundColor,
    },
    containerStyle: {
      flex: 0.8,
      paddingHorizontal: isTab ? 30 : normalize(30),
      backgroundColor: theme.secondaryWhite,
    },
    footerStyle: {
      flex: 0.05,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
