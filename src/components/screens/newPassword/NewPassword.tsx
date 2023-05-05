import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScreenContainer } from '..';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../../shared/styles/colors';
import { normalize } from '../../../shared/utils';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { CustomThemeType } from 'src/shared/styles/colors';
import HeaderIcon from 'src/assets/images/icons/header_icon.svg';
import { SocialLoginButton, TextInputField, Label } from '../../atoms';
import BackIcon from 'src/assets/images/icons/back_icon.svg';
import { NavigateTypes } from '../auth/AuthPage';
import { ScreensConstants, TranslateConstants, TranslateKey } from 'src/constants/Constants';
import {loginPasswordValidation, reTypePasswordValidation} from 'src/shared/validators';
import { StackNavigationProp } from '@react-navigation/stack';
import { TERMS_AND_CONDITION } from 'src/services/apiEndPoints';

export const NewPassword = () => {
    const navigation = useNavigation<StackNavigationProp<any>>();
    const { themeData } = useTheme();
    const NEW_PASSWORD_CREATE_NEW_PASSWORD = TranslateConstants({key:TranslateKey.NEW_PASSWORD_CREATE_NEW_PASSWORD})
    const NEW_PASSWORD_DESCRIPTION = TranslateConstants({key:TranslateKey.NEW_PASSWORD_DESCRIPTION})
    const NEW_PASSWORD_WARNING = TranslateConstants({key:TranslateKey.NEW_PASSWORD_WARNING})
    const NEW_PASSWORD_MATCH_WARNING = TranslateConstants({key:TranslateKey.NEW_PASSWORD_MATCH_WARNING})
    const NEW_PASSWORD_SET_NEW_PASSWORD = TranslateConstants({key:TranslateKey.NEW_PASSWORD_SET_NEW_PASSWORD})
    const SIGNUP_RETURN = TranslateConstants({key:TranslateKey.SIGNUP_RETURN})
    const SIGNUP_PASSWORD = TranslateConstants({key:TranslateKey.SIGNUP_PASSWORD})
    const SIGNUP_CONFIRM_PASSWORD = TranslateConstants({key:TranslateKey.SIGNUP_CONFIRM_PASSWORD})
    const SIGNIN_AGREE_TO = TranslateConstants({key:TranslateKey.SIGNIN_AGREE_TO})
    const CONST_TERMS_AND_CONDITION = TranslateConstants({key:TranslateKey.TERMS_AND_CONDITION})
    const SIGNIN_RIGHTS = TranslateConstants({key:TranslateKey.SIGNIN_RIGHTS})


    const styles = useThemeAwareObject(createStyles);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setonfirmPasswordError] = useState('');

    const navigateToSection = (type: string) => {
        if (type === NavigateTypes.termsAndConditions) {
            navigation.navigate(ScreensConstants.TERMS_AND_ABOUT_US, {
                title: CONST_TERMS_AND_CONDITION,
                id: TERMS_AND_CONDITION,
            });
        } else {
            navigation.reset({
                index: 0,
                routes: [{ name: ScreensConstants.OnBoardNavigator }],
            });
        }
      };

      const onPressSignIn = () => {
        setPasswordError(loginPasswordValidation(password));
        setonfirmPasswordError(reTypePasswordValidation(password,confirmPassword));
      };

    return (
        <ScreenContainer>
            <View style={styles.container}>
                <View style={styles.headerStyle}>
                    <TouchableOpacity
                        testID="signUp_back"
                        accessibilityLabel="signUp_back"
                        onPress={() => { navigation.goBack() }}>
                        <View style={styles.headerContainer}>
                            <BackIcon fill={themeData.textColor} />
                            <Label
                                children={SIGNUP_RETURN}
                                style={styles.headerLabelStyle}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.logoContainer}>
                    <HeaderIcon style={styles.logo} fill={themeData.headerColor} />
                </View>
                <View style={styles.containerStyle}>
                    <View style={styles.topContainerStyle}>
                        <Label
                            children={NEW_PASSWORD_CREATE_NEW_PASSWORD}
                            labelType="h2"
                            color={colors.greenishBlue}
                        />
                        <Label
                            children={NEW_PASSWORD_DESCRIPTION}
                            style={styles.textStyle}
                            numberOfLines={2}
                        />
                        <View style={styles.passwordViewStyle}>
                            <View style={styles.passwordContainer}>
                                <View style={styles.textInputContainer}>
                                    <TextInputField placeholder={SIGNUP_PASSWORD}
                                        testID={'signUp_password'}
                                        rightIconTestID={'signUp_password_icon'}
                                        onChangeText={setPassword}
                                        value={password}
                                        style={styles.inputStyle}
                                        error={passwordError}
                                        isPassword
                                        isMandatory={true}
                                        maxLength={20}
                                        errorStyle={passwordError? styles.errorStyle : null}
                                    />
                                </View>
                            </View>
                            {!passwordError && <View style={styles.warningContainer}>
                                <Label
                                    children={NEW_PASSWORD_WARNING}
                                    style={styles.warningStyle}
                                />
                            </View>}
                        </View>
                        <View style={styles.confirmPasswordContainer}>
                            <View style={styles.passwordContainer}>
                                <View style={styles.textInputContainer}>
                                    <TextInputField placeholder={SIGNUP_CONFIRM_PASSWORD}
                                        testID={'signUp_confirm_password'}
                                        rightIconTestID={'signUp_confirm_password_icon'}
                                        onChangeText={setConfirmPassword}
                                        value={confirmPassword}
                                        style={styles.inputStyle}
                                        error={confirmPasswordError}
                                        isPassword
                                        maxLength={20}
                                        isMandatory={true}
                                    />
                                </View>
                            </View>
                            { !confirmPasswordError && <View style={styles.warningContainer}>
                                <Label
                                    children={NEW_PASSWORD_MATCH_WARNING}
                                    style={styles.warningStyle}
                                />
                            </View>}
                        </View>
                        <SocialLoginButton testID="signUp_signUp"
                            onPress={onPressSignIn}
                            label={NEW_PASSWORD_SET_NEW_PASSWORD}
                            style={styles.buttonStyle}
                            labelStyle={styles.labelStyle}
                        />
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
            backgroundColor: theme.backgroundColor,
        },
        logoContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            flex: 0.1,
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
            fontSize: normalize(15),
            color: theme.textColor,
            lineHeight: normalize(16),
            marginLeft: normalize(5),
        },
        containerStyle: {
            flex: 0.7,
            paddingHorizontal: normalize(30),
            backgroundColor: theme.secondaryWhite,
            justifyContent: 'center'
        },
        topContainerStyle: {
            flex: 0.6,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: normalize(25),
        },
        footerStyle: {
            flex: 0.15,
            justifyContent: 'center',
            alignItems: 'center',
        },
        logo: {
            width: normalize(150),
            height: normalize(30),
        },
        spaceStyle: {
            marginHorizontal: normalize(10),
        },
        textStyle: {
            fontSize: normalize(13),
            color: theme.secondaryDavyGrey,
            lineHeight: normalize(16),
            fontWeight: '400',
            marginBottom: normalize(20),
            textAlign: 'center'
        },
        buttonStyle: {
            backgroundColor: theme.primary,
            borderWidth: 0,
            width: '50%',
            paddingHorizontal: normalize(20)
        },
        labelStyle: {
            color: colors.white,
            fontWeight: 'bold',
            lineHeight: 22,
        },
        inputStyle: {
            width: '100%',
            color: theme.primaryLightGray,
        },
        footerLabelContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: normalize(15),
        },
        passwordContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
        },
        warningStyle: {
            fontSize: normalize(10),
            color: theme.secondaryDavyGrey,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
        },
        passwordViewStyle: {
            paddingTop: normalize(20),
        },
        textInputContainer: {
            paddingRight: normalize(10)
        },
        warningContainer: {
            bottom: normalize(20), 
            alignSelf: 'flex-start', 
            paddingLeft: normalize(8),
        },
        confirmPasswordContainer: {
            paddingBottom: normalize(20)
        },
        errorStyle: {
            paddingBottom: normalize(13)
        }
    })
