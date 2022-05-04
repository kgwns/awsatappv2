import React, {FunctionComponent, useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ScreenContainer} from '..';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {colors} from '../../../shared/styles/colors';
import {normalize, } from '../../../shared/utils';
import {Label} from '../../atoms';
import {AuthScreenInputSection} from '../../../components/organisms/';
import {ScreensConstants} from 'src/constants';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useTranslation} from 'react-i18next';
import HeaderIcon from 'src/assets/images/icons/header_icon.svg';
import {emailValidation} from 'src/shared/validators';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEmailCheck, useRegister} from 'src/hooks';
import {FetchEmailCheckPayloadType} from 'src/redux/auth/types';
import {TERMS_AND_CONDITION} from 'src/services/apiEndPoints';
import {useLogin} from 'src/hooks';
import {AlertPayloadType} from 'src/components/screens/ScreenContainer/ScreenContainer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {getSvgImages} from 'src/shared/styles/svgImages';
import { ImagesName } from 'src/shared/styles/images';

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
  const [t] = useTranslation();
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
  } = useRegister();

  const {loginSkipped, emptyforgotPassworResponseInfo} = useLogin();

  const HeaderLogo = () => getSvgImages({ name: ImagesName.headerLogo, width: styles.logo.width, height: styles.logo.height });

  const { fetchEmailCheckRequest,
    isLoading, emailCheckData, emailCheckError,
    emptyEmailCheckInfo
  } = useEmailCheck();

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

  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);
  const [alertPayload, setAlertPayload] =
    useState<AlertPayloadType>(noInternetConnection);

  useEffect(() => {
    emptyforgotPassworResponseInfo();
    emptyUserInfo();
  }, []);

  useEffect(() => {
    socialLoginEnded();
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
        navigation.navigate(ScreensConstants.SignInPage, {email: email});
      } else {
        navigation.navigate(ScreensConstants.SignUpPage, {email: email});
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
          title: t('terms_and_condition'),
          id: TERMS_AND_CONDITION,
        });
        return;
      case NavigateTypes.signinPage:
        return;
      default:
        loginSkipped();
        emptyEmailCheckInfo()
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
        email: email,
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
      setIsAlertVisible={setIsAlertVisible}>
      <KeyboardAwareScrollView
        bounces={false}
        extraScrollHeight={30}
        enableOnAndroid={true}
        scrollEnabled>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
     
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
      flex: 0.09,
      marginBottom: normalize(35),
      marginTop: normalize(20),
    },
    headerStyle: {
      flex: 0.05,
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    headerLabelStyle: {
      fontSize: normalize(15),
      color: theme.primary,
      lineHeight: normalize(16),
    },
    containerStyle: {
      flex: 0.71,
      paddingHorizontal: normalize(30),
      backgroundColor: theme.secondaryWhite,
    },
    footerStyle: {
      flex: 1,
      alignItems: 'center',
      position: 'absolute',
      bottom: normalize(40),
      width: '100%',
      justifyContent: 'center',
    },
    footerLabelContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    logo: {
      width: normalize(150),
      height: normalize(30),
    },
    spaceStyle: {
      marginHorizontal: normalize(10),
    },
  });
