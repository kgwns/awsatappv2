import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScreenContainer } from '..';
import { View, StyleSheet, TouchableOpacity, AppState } from 'react-native';
import { colors } from '../../../shared/styles/colors';
import { CustomAlert, isIOS, isTab, normalize, screenWidth } from '../../../shared/utils';
import { Label } from '../../atoms';
import { ScreensConstants, TranslateConstants, TranslateKey } from 'src/constants';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useTranslation } from 'react-i18next';
import { StackNavigationProp } from '@react-navigation/stack';
import MailAnimation from '../../../assets/lottie-animation/mail.json';
import LottieView from 'lottie-react-native';
import { NavigateTypes } from '../auth/AuthPage';
import { useLogin } from 'src/hooks';
import { openInbox } from "react-native-email-link";
import { TERMS_AND_CONDITION } from 'src/services/apiEndPoints';
import BackIcon from 'src/assets/images/icons/back_icon.svg';
import {getSvgImages} from 'src/shared/styles/svgImages';
import { ImagesName } from 'src/shared/styles/images';
import { fonts } from 'src/shared/styles/fonts';


export const ForgotPassword: FunctionComponent = () => {
  const navigation = useNavigation<StackNavigationProp<any>>()
  const { themeData } = useTheme();
  const [t] = useTranslation();
  const styles = useThemeAwareObject(createStyles);
  const appState = useRef(AppState.currentState);
  const [animationRef,setAnimationRef] = useState<LottieView>()
  const {emptyforgotPassworResponseInfo} = useLogin();
  const HeaderLogo = () => getSvgImages({ name: ImagesName.headerLogo, width: styles.logo.width, height: styles.logo.height });
  const CONST_RETURN = TranslateConstants({ key: TranslateKey.RETURN })
  
  useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      if (appState.current.match(/inactive|background/) && nextAppState === "active") {
        if (animationRef) {
          animationRef?.resume();
        }
      }
      appState.current = nextAppState;
    });
    return () => { subscription.remove(); };
  }, [animationRef]);

  useEffect(() => {
    emptyforgotPassworResponseInfo()
    return () => {
      emptyforgotPassworResponseInfo()
    }
  }, [])

  const navigateToSection = (type: string) => {
    switch (type) {
      case NavigateTypes.termsAndConditions:
        navigation.navigate(ScreensConstants.TERMS_AND_ABOUT_US,
          { title: t('terms_and_condition'), id: TERMS_AND_CONDITION });
        return;
      default:
        navigation.reset({
          index: 0,
          routes: [{ name: ScreensConstants.OnBoardNavigator }],
        });
    }
  };
  const onPressBack = () => {
    navigation.goBack();
  }
  const onPressGoToMail = async () => {
    try {
      await openInbox();
    } catch (error) {
      CustomAlert({ message: JSON.stringify(error) })
    }
  }
  
  const onPressSkip = () => {
    navigation.goBack()
  }

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View style={styles.backContainer}>
          <TouchableOpacity
            testID="signin_skip"
            accessibilityLabel="signin_skip"
            onPress={onPressBack}>
            <View style={styles.returnStyle}>
              <BackIcon fill={themeData.backIconColor} style={styles.backIconStyle} />
              <Label
                children={CONST_RETURN}
                style={styles.prevTitleStyle}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.logoContainer}>
          {HeaderLogo()}
        </View>
        <View style={styles.containerStyle}>
          <View style={styles.topContainerStyle}>
            <LottieView source={MailAnimation} autoPlay style={styles.tickContainer} 
            ref={ref=>setAnimationRef(ref)}
            />
            <Label
              children={t('ForgotPassword.checkYourMail')}
              style={styles.checkMailTextStyle}
            />
            <Label
              children={t('ForgotPassword.instruction')}
              style={styles.instructionTextStyle}
              numberOfLines={2}
            />
            <TouchableOpacity style={styles.buttonBackgroundStyle} onPress={onPressGoToMail}>
                <Label style={styles.buttonLabelStyle}
                  children={t('ForgotPassword.openMailApp')} />
            </TouchableOpacity>

            <View style={styles.skipViewStyle}>
              <TouchableOpacity onPress={onPressSkip}>
                <Label
                  children={t('ForgotPassword.skipOption')}
                  style={styles.skipTextStyle}
                />
              </TouchableOpacity>
            </View>
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
                children={t('terms_and_condition')}
                labelType="p5"
                color={colors.greenishBlue}
                style={styles.spaceStyle}
              />
            </TouchableOpacity>
          </View>
          <Label
            children={t('signIn.rights')}
            labelType="p5"
            color={themeData.signinRightsColor}
            style={styles.rightsStyle}
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
      paddingVertical: isTab ? normalize(2) : normalize(10),
      marginHorizontal: normalize(20),
      justifyContent: 'space-between',
      backgroundColor: theme.backgroundColor,
    },
    logoContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 0.1,
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
    footerStyle: {
      flex: 0.15,
      justifyContent: 'center',
      alignItems: 'center',
    },
    footerLabelContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    logo: {
      width: normalize(150),
      height: normalize(37),
    },
    spaceStyle: {
      marginHorizontal: normalize(10),
    },
    skipTextStyle: {
      fontSize: normalize(14),
      color: theme.primary,
      lineHeight: normalize(22),
      fontFamily: fonts.IBMPlexSansArabic_Regular,
    },
    checkMailTextStyle: {
      fontSize: normalize(20),
      color: theme.primary,
      lineHeight: normalize(30),
      fontFamily: fonts.AwsatDigitalBetav10_Bold,
    },
    instructionTextStyle: {
      fontSize: normalize(15),
      color: theme.secondaryDavyGrey,
      lineHeight: normalize(25),
      textAlign: 'center',
      top: normalize(10),
      width: normalize(302),
      fontFamily: fonts.IBMPlexSansArabic_Regular,
    },
    returnStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    prevIconStyle: {
      width: normalize(12),
      height: normalize(8.8),
      marginEnd: normalize(1),
      alignItems: 'center',
      color: colors.spanishGray,
      paddingHorizontal: normalize(10)
    },
    prevTitleStyle: {
      fontFamily: fonts.AwsatDigitalBetav10_Regular,
      fontSize: normalize(12),
      color: theme.backIconColor,
      lineHeight: normalize(16),
      marginLeft: normalize(5),
    },
    buttonLabelStyle: {
      paddingHorizontal: normalize(30),
      fontSize: 16,
      fontFamily: fonts.AwsatDigitalBetav10_Bold,
      color: colors.white,
      lineHeight: 26,
      textAlign: 'center',
    },
    buttonBackgroundStyle: {
      height: normalize(48),
      backgroundColor: theme.primary,
      borderRadius: normalize(24),
      top: normalize(60),
      justifyContent: 'center',
      textAlign: 'center',
    },
    skipViewStyle: {
      borderBottomWidth: 1,
      borderBottomColor: colors.greenishBlue,
      top: normalize(80)
    
    },
    tickContainer: {
      width: normalize(200),
      height: normalize(200),
      marginVertical: '10%',
      alignSelf: 'center'
    },
    rightsStyle: {
      fontSize: normalize(12),
    },
    backContainer: {
      flex: 0.05,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    backIconStyle: {
      marginBottom: isIOS ? 5 : 0
    }
  })
