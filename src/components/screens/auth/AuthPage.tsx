import React, {FunctionComponent, useState, useEffect, useRef} from 'react';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {ScreenContainer} from '..';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {colors} from '../../../shared/styles/colors';
import {isObjectNonEmpty, isTab, normalize} from '../../../shared/utils';
import {Label} from '../../atoms';
import {AuthScreenInputSection} from '../../../components/organisms/';
import {
  ScreensConstants,
  TranslateConstants,
  TranslateKey,
} from 'src/constants/Constants';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {CustomThemeType} from 'src/shared/styles/colors';
import {emailValidation} from 'src/shared/validators';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEmailCheck, useRegister, useLogin, useBookmark} from 'src/hooks';
import {FetchEmailCheckPayloadType} from 'src/redux/auth/types';
import {TERMS_AND_CONDITION} from 'src/services/apiEndPoints';
import {AlertPayloadType} from 'src/components/screens/ScreenContainer/ScreenContainer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {getSvgImages} from 'src/shared/styles/svgImages';
import {ImagesName} from 'src/shared/styles/images';
import {fonts} from 'src/shared/styles/fonts';
import {Connection, LoginFactory} from 'src/shared/utils/loginFactory';
import {SocialProviders, onSuccessSocialLogin} from './SignInPage';

export enum NavigateTypes {
  google = 'GOOGLE',
  apple = 'APPLE',
  facebook = 'FACEBOOK',
  email = 'EMAIL',
  termsAndConditions = 'TERMSANDCONDITIONS',
  signinPage = 'SIGNINPAGE',
}

export const AuthPage: FunctionComponent = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const {themeData} = useTheme();
  const COMMON_ALERT = TranslateConstants({key:TranslateKey.COMMON_ALERT})
  const COMMON_NO_INTERNET_CONNECTION = TranslateConstants({key:TranslateKey.COMMON_NO_INTERNET_CONNECTION})
  const COMMON_OK = TranslateConstants({key:TranslateKey.COMMON_OK})
  const CONST_TERMS_AND_CONDITION = TranslateConstants({key:TranslateKey.TERMS_AND_CONDITION})
  const SIGNIN_SKIP = TranslateConstants({key:TranslateKey.SIGNIN_SKIP})
  const SIGNIN_AGREE_TO = TranslateConstants({key:TranslateKey.SIGNIN_AGREE_TO})
  const SIGNIN_TERMS_AND_CONDITION = TranslateConstants({key:TranslateKey.SIGNIN_TERMS_AND_CONDITION})
  const styles = useThemeAwareObject(createStyles);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const {
    registerUserInfo,
    isRegisterLoading,
    socialLoginInProgress,
    socialLoginStarted,
    socialLoginEnded,
    emptyUserInfo,
    createUserRequest,
  } = useRegister();

  const {loginSkipped, emptyforgotPassworResponseInfo} = useLogin();
  const isFocused = useIsFocused();
  const fbLoginRef = useRef(true);
  const {getBookmarkedId} = useBookmark();

  const HeaderLogo = () =>
    getSvgImages({
      name: ImagesName.headerLogo,
      width: styles.logo.width,
      height: styles.logo.height,
    });

  const {
    fetchEmailCheckRequest,
    isLoading,
    emailCheckData,
    emailCheckError,
    emptyEmailCheckInfo,
  } = useEmailCheck();

  const noInternetConnection: AlertPayloadType = {
    title: COMMON_ALERT,
    message: COMMON_NO_INTERNET_CONNECTION,
    buttonTitle: COMMON_OK,
  };

  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);
  const [alertPayload, setAlertPayload] =
    useState<AlertPayloadType>(noInternetConnection);

  useEffect(() => {
    emptyforgotPassworResponseInfo();
    emptyUserInfo();
  }, []);

  const onResult = async (
    userInfo: any,
    success: boolean,
    provider: SocialProviders,
    message?: string,
  ) => {
    if (success) {
      fbLoginRef.current = false;
      const payload = await onSuccessSocialLogin(userInfo, provider);
      createUserRequest(payload);
    }
  };

  const checkFacebookLogin = () => {
    const facebookSignIn = LoginFactory.getInstance(
      Connection.Facebook,
      onResult,
    );
    facebookSignIn?.initialLogin();
  };

  useEffect(() => {
    if (isFocused && fbLoginRef.current) {
      checkFacebookLogin();
    }
  }, [isFocused]);

  useEffect(() => {
    socialLoginEnded();
    if (
      isObjectNonEmpty(registerUserInfo) &&
      isObjectNonEmpty(registerUserInfo?.message) &&
      registerUserInfo?.message.code === 200
    ) {
      getBookmarkedId();
    }
  }, [registerUserInfo]);

  useEffect(() => {
    if (emailCheckError === 'Network Error') {
      setAlertPayload(noInternetConnection);
      setIsAlertVisible(true);
    }
  }, [emailCheckError]);

  useEffect(() => {
    const message = emailCheckData?.message;
    if (message) {
      if (message.code === 200) {
        navigation.navigate(ScreensConstants.SignInPage, {email});
      } else {
        navigation.navigate(ScreensConstants.SignUpPage, {email});
      }
    }
    emptyEmailCheckInfo();
  }, [emailCheckData]);

  const showAlertNoInternet = () => {
    setAlertPayload(noInternetConnection);
    setIsAlertVisible(true);
  };

  const navigateToSection = (type: string) => {
    switch (type) {
      case NavigateTypes.google:
        socialLoginStarted();
        return;
      case NavigateTypes.apple:
        return;
      case NavigateTypes.facebook:
        socialLoginStarted();
        return;
      case NavigateTypes.email:
        return;
      case NavigateTypes.termsAndConditions:
        navigation.navigate(ScreensConstants.TERMS_AND_ABOUT_US, {
          title: CONST_TERMS_AND_CONDITION,
          id: TERMS_AND_CONDITION,
        });
        return;
      case NavigateTypes.signinPage:
        return;
      default:
        loginSkipped();
        emptyEmailCheckInfo();
        navigation.reset({
          index: 0,
          routes: [{name: ScreensConstants.AppNavigator}],
        });
    }
  };

  const onPressSignup = () => {
    setEmailError(emailValidation(email));

    if (emailValidation(email) === '') {
      const payload: FetchEmailCheckPayloadType = {
       email,
      };
      Keyboard.dismiss();
      fetchEmailCheckRequest(payload);
    }
  };

  return (
    <ScreenContainer
      isOverlayLoading={isLoading || isRegisterLoading || socialLoginInProgress}
      isAlertVisible={isAlertVisible}
      alertPayload={alertPayload}
      alertOnPress={() => setIsAlertVisible(false)}
      setIsAlertVisible={setIsAlertVisible}
      backgroundColor={styles.screenBackgroundColor?.backgroundColor}>
      <KeyboardAwareScrollView
        bounces={false}
        extraScrollHeight={30}
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}
        scrollEnabled>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>
            <View style={styles.headerStyle}>
              <TouchableOpacity
                style={styles.headerContainerStyle}
                testID="signin_skip"
                accessibilityLabel="signin_skip"
                onPress={() => navigateToSection('')}>
                <Label children={SIGNIN_SKIP} style={styles.headerLabelStyle} />
              </TouchableOpacity>
            </View>

            <View style={styles.logoContainer}>
              {HeaderLogo()}
            </View>
            
            <View style={styles.containerStyle}>
              <AuthScreenInputSection
                emailTestID="signIn_email"
                emailError={emailError}
                email={email}
                setChangeText={setEmail}
                navigateToSection={navigateToSection}
                onPressSignup={onPressSignup}
                showAlertNoInternet={showAlertNoInternet}
                socialButtonBoldStyle={true}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>

      <View style={styles.footerStyle}>
        <View style={styles.footerLabelContainer}>
          <Label
            children={SIGNIN_AGREE_TO}
            labelType="p5"
            color={themeData.textColor}
          />
          <TouchableOpacity
            testID="terms_and_conditions"
            accessibilityLabel="terms_and_conditions"
            onPress={() => navigateToSection('TERMSANDCONDITIONS')}>
            <Label
              children={SIGNIN_TERMS_AND_CONDITION}
              labelType="p5"
              color={colors.greenishBlue}
              style={styles.spaceStyle}
            />
          </TouchableOpacity>
        </View>
        {/* <Label
          children={t('signIn.rights')}
          labelType="p5"
          color={themeData.textColor}
          style={styles.rightsStyle}
        /> */}
      </View>
    </ScreenContainer>
  );
};

const createStyles = (theme: CustomThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: isTab ? 20 : normalize(20),
      marginHorizontal: isTab ? 20 : normalize(20),
      justifyContent: 'space-between',
      backgroundColor: theme.onBoardBackground,
    },
    logoContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 0.09,
      marginBottom: isTab ? 35 : normalize(35),
      marginTop: isTab ? 20 : normalize(20),
    },
    headerStyle: {
      flex: 0.05,
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    headerLabelStyle: {
      fontFamily: fonts.AwsatDigital_Regular,
      fontSize: isTab ? 12 : normalize(12),
      color: theme.primary,
      lineHeight: isTab ? 16 : normalize(16),
    },
    containerStyle: {
      flex: 0.71,
      paddingHorizontal: isTab ? 30 : normalize(30),
      backgroundColor: theme.secondaryWhite,
    },
    footerStyle: {
      flex: 1,
      alignItems: 'center',
      position: 'absolute',
      bottom: isTab ? 20 : normalize(20),
      width: '100%',
      justifyContent: 'center',
    },
    footerLabelContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    logo: {
      width: isTab ? 150 : normalize(150),
      height: isTab ? 37 : normalize(37),
    },
    spaceStyle: {
      marginHorizontal: isTab ? 5 : normalize(5),
    },
    rightsStyle: {
      marginTop: 5,
    },
    screenBackgroundColor: {
      backgroundColor: theme.onBoardBackground,
    },
    headerContainerStyle: {
      borderBottomWidth: 1,
      borderBottomColor: colors.greenishBlue,
    },
  });
