import React, { FunctionComponent, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScreenContainer } from '..';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../../shared/styles/colors';
import { CustomAlert, isTab, normalize } from '../../../shared/utils';
import { Label } from '../../atoms';
import { ScreensConstants, TranslateConstants, TranslateKey } from 'src/constants/Constants';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { CustomThemeType } from 'src/shared/styles/colors';
import { StackNavigationProp } from '@react-navigation/stack';
import MailAnimation from '../../../assets/lottie-animation/mail.json';
import { NavigateTypes } from '../auth/AuthPage';
import { useLogin } from 'src/hooks';
import { openInbox } from "react-native-email-link";
import { TERMS_AND_CONDITION } from 'src/services/apiEndPoints';
import { fonts } from 'src/shared/styles/fonts';
import { LottieViewAnimation } from 'src/shared/utils/LottieViewAnimation'
import { AuthHeader } from 'src/components/molecules';


export const ForgotPassword: FunctionComponent = () => {
  const navigation = useNavigation<StackNavigationProp<any>>()
  const { themeData } = useTheme();
  const CONST_TERMS_AND_CONDITION = TranslateConstants({key:TranslateKey.TERMS_AND_CONDITION})
  const FORGOT_PASSWORD_CHECK_YOUR_MAIL = TranslateConstants({key:TranslateKey.FORGOT_PASSWORD_CHECK_YOUR_MAIL})
  const FORGOT_PASSWORD_INSTRUCTION = TranslateConstants({key:TranslateKey.FORGOT_PASSWORD_INSTRUCTION})
  const FORGOT_PASSWORD_OPEN_MAIL_APP = TranslateConstants({key:TranslateKey.FORGOT_PASSWORD_OPEN_MAIL_APP})
  const FORGOT_PASSWORD_SKIP_OPTION = TranslateConstants({key:TranslateKey.FORGOT_PASSWORD_SKIP_OPTION})
  const SIGNIN_AGREE_TO = TranslateConstants({key:TranslateKey.SIGNIN_AGREE_TO})
  const SIGNIN_RIGHTS = TranslateConstants({key:TranslateKey.SIGNIN_RIGHTS})
  const CONST_RETURN = TranslateConstants({ key: TranslateKey.RETURN })


  const styles = useThemeAwareObject(createStyles);
  const {emptyforgotPassworResponseInfo} = useLogin();

  useEffect(() => {
    emptyforgotPassworResponseInfo()
    return () => {
      emptyforgotPassworResponseInfo()
    }
  }, [])

  const navigateToSection = (type: string) => {
    if(type === NavigateTypes.termsAndConditions){
      navigation.navigate(ScreensConstants.TERMS_AND_ABOUT_US,
              { title: CONST_TERMS_AND_CONDITION, id: TERMS_AND_CONDITION });
    } else{
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
        <AuthHeader backTitle={CONST_RETURN}
          onPressBack={onPressBack}
          testId={'forgot_back'}
        />
        <View style={styles.containerStyle}>
          <View style={styles.topContainerStyle}>
            <LottieViewAnimation 
              source = {MailAnimation} 
              style={styles.tickContainer}/> 
            <Label
              children={FORGOT_PASSWORD_CHECK_YOUR_MAIL}
              style={styles.checkMailTextStyle}
            />
            <Label
              children={FORGOT_PASSWORD_INSTRUCTION}
              style={styles.instructionTextStyle}
              numberOfLines={2}
            />
            <TouchableOpacity style={styles.buttonBackgroundStyle} onPress={onPressGoToMail}>
                <Label style={styles.buttonLabelStyle}
                  children={FORGOT_PASSWORD_OPEN_MAIL_APP} />
            </TouchableOpacity>

            <View style={styles.skipViewStyle}>
              <TouchableOpacity onPress={onPressSkip}>
                <Label
                  children={FORGOT_PASSWORD_SKIP_OPTION}
                  style={styles.skipTextStyle}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

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
                children={CONST_TERMS_AND_CONDITION}
                labelType="p5"
                color={colors.greenishBlue}
                style={styles.spaceStyle}
              />
            </TouchableOpacity>
          </View>
          <Label
            children={SIGNIN_RIGHTS}
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
      fontFamily: fonts.AwsatDigital_Bold,
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
    buttonLabelStyle: {
      paddingHorizontal: normalize(30),
      fontSize: 16,
      fontFamily: fonts.AwsatDigital_Bold,
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
  })
