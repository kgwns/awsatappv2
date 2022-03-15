import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScreenContainer } from '..';
import { View, StyleSheet, TouchableOpacity, AppState } from 'react-native';
import { colors } from '../../../shared/styles/colors';
import { normalize } from '../../../shared/utils';
import { Label } from '../../atoms';
import { ScreensConstants } from 'src/constants';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useTranslation } from 'react-i18next';
import HeaderIcon from 'src/assets/images/icons/header_icon.svg';
import { StackNavigationProp } from '@react-navigation/stack';
import ReturnArrow from 'src/assets/images/icons/returnArrow.svg'
import MailAnimation from '../../../assets/lottie-animation/mail.json';
import LottieView from 'lottie-react-native';
import { NavigateTypes } from '../auth/AuthPage';
import { TERMS_AND_CONDITION } from 'src/services/apiEndPoints';


export const ForgotPassword: FunctionComponent = () => {
  const navigation = useNavigation<StackNavigationProp<any>>()
  const { themeData } = useTheme();
  const [t] = useTranslation();
  const styles = useThemeAwareObject(createStyles);
  const appState = useRef(AppState.currentState);
  const [animationRef,setAnimationRef] = useState<LottieView>()

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

  const navigateToSection = (type: string) => {
    switch (type) {
      case NavigateTypes.termsAndConditions:
        navigation.navigate(ScreensConstants.TERMS_AND_ABOUT_US, {
          title: t('terms_and_condition'),
          id: TERMS_AND_CONDITION,
        });
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
    console.log('return button tapped')
  }
  const onPressGoToMail = () => {
    navigation.navigate(ScreensConstants.NEW_PASSWORD)
  }
  const onPressSkip = () => {
    console.log('skip button tapped')
  }

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.returnStyle}
          testID="signin_skip"
          accessibilityLabel="signin_skip"
          onPress={onPressBack}>
          <ReturnArrow style={styles.prevIconStyle} fill={colors.spanishGray} />
          <Label
            children={t('onBoard.common.return')}
            style={styles.prevTitleStyle}
          />
        </TouchableOpacity >
        <View style={styles.logoContainer}>
          <HeaderIcon style={styles.logo} fill={themeData.headerColor} />
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
            <TouchableOpacity onPress={onPressGoToMail}>
              <View style={styles.buttonBackgroundStyle}>
                <Label style={styles.buttonLabelStyle}
                  children={t('ForgotPassword.openMailApp')} />
              </View>
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
      marginTop: normalize(15),
    },
    logo: {
      width: normalize(150),
      height: normalize(30),
    },
    spaceStyle: {
      marginHorizontal: normalize(10),
    },
    skipTextStyle: {
      fontSize: normalize(14),
      color: theme.primary,
      lineHeight: normalize(16),
    },
    checkMailTextStyle: {
      fontSize: normalize(20),
      color: theme.primary,
      lineHeight: normalize(25),
      fontWeight: 'bold',
    },
    instructionTextStyle: {
      fontSize: normalize(15),
      color: theme.secondaryDavyGrey,
      lineHeight: normalize(25),
      textAlign: 'center',
      top: normalize(10),
      width: normalize(300)
    },
    returnStyle: {
      flexDirection: 'row',
      position: 'absolute',
      left: normalize(5),
      alignContent: 'center',
      flexWrap: 'wrap',
      color: colors.white,
      flex: 0.05,
      justifyContent: 'center',
      alignItems: 'center',
      top: normalize(10)
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
      fontSize: normalize(13),
      lineHeight: normalize(16),
      color: colors.spanishGray,
    },
    buttonLabelStyle: {
      paddingHorizontal: normalize(30),
      fontSize: normalize(16),
      fontWeight: 'bold',
      color: colors.white,
      lineHeight: normalize(20),
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
      borderBottomWidth: .4,
      borderBottomColor: colors.greenishBlue,
      top: normalize(80)
    
    },
    tickContainer: {
      width: normalize(200),
      height: normalize(200),
      marginVertical: '10%',
      alignSelf: 'center'
    }
  })
