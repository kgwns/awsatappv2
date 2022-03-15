import React, {FunctionComponent, useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ScreenContainer} from '..';
import {View, StyleSheet, TouchableOpacity, Alert, Platform} from 'react-native';
import {colors} from '../../../shared/styles/colors';
import {isIOS, normalize} from '../../../shared/utils';
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
import {useEmailCheck,useRegister} from 'src/hooks';
import {FetchEmailCheckPayloadType} from 'src/redux/auth/types';
import { fetchLoginSuccess } from 'src/redux/login/action';
import { useDispatch } from 'react-redux';
import { TERMS_AND_CONDITION } from 'src/services/apiEndPoints';
import {useLogin} from 'src/hooks';
import {appleAuth} from '@invertase/react-native-apple-authentication';

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
  const {registerUserInfo, isRegisterLoading} = useRegister();
  const dispatch = useDispatch();

  const {loginSkipped,emptyforgotPassworResponseInfo} = useLogin();

  const {fetchEmailCheckRequest, isLoading, emailCheckData } =
    useEmailCheck();

  useEffect(() => {
    emptyforgotPassworResponseInfo()
  }, [])

  useEffect(() => {
    const message = emailCheckData?.message;
    if (message) {
      if (message.code === 200) {
        navigation.navigate(ScreensConstants.SignInPage, {email: email});
      } else {
        navigation.navigate(ScreensConstants.SignUpPage, {email: email});
      }
    }
  }, [emailCheckData]);

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
        navigation.navigate(ScreensConstants.TERMS_AND_ABOUT_US, {
          title: t('terms_and_condition'),
          id: TERMS_AND_CONDITION,
        });
        return;
      case NavigateTypes.signinPage:
        return;
      default:
        loginSkipped();
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
      fetchEmailCheckRequest(payload);
    }
  };

  return (
    <ScreenContainer isOverlayLoading={isLoading || isRegisterLoading}>
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
          <AuthScreenInputSection
            emailTestID="signIn_email"
            emailError={emailError}
            email={email}
            setChangeText={setEmail}
            navigateToSection={navigateToSection}
            onPressSignup={onPressSignup}
          />
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
      flex: 0.09,
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
  });
