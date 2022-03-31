import React, { FunctionComponent, useEffect, useState } from 'react';
import { View, StyleProp, ViewStyle, StyleSheet, Alert, Platform } from 'react-native';
import { SocialLoginButton } from '../../atoms';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import DeviceInfo from 'react-native-device-info';

import {useTranslation} from 'react-i18next';
import FaceBookIcon from 'src/assets/images/icons/facebook_icon.svg';
import GoogleIcon from 'src/assets/images/icons/google_icon.svg';
import AppleIcon from 'src/assets/images/icons/apple_icon.svg';
import { isIOS, normalize, recordLogEvent } from 'src/shared/utils';
import {LoginFactory,Connection}  from 'src/shared/utils/loginFactory';
import {NavigateTypes} from 'src/components/screens';
import {RegisterBodyType} from 'src/redux/register/types';
import { useRegister } from 'src/hooks';
import { useDispatch } from 'react-redux';
import { fetchLoginSuccess } from 'src/redux/login/action';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScreensConstants } from 'src/constants';
import { appleSignin } from 'src/shared/utils/appleSignin';
import moment from 'moment';

interface SocialButtonSectionProps {
  onButtonPress?: (type: string) => void;
  style?: StyleProp<ViewStyle>;
  showAlertNoInternet?: () => void;
}

export const SocialButtonSection: FunctionComponent<SocialButtonSectionProps> =({ onButtonPress, style, showAlertNoInternet }) => {

  const [t] = useTranslation();
  const {themeData} = useTheme();
  const [deviceName, setDeviceName] = useState('');
  const {createUserRequest, registerUserInfo} = useRegister();

  const {socialLoginEnded} = useRegister();

  const onSuccessSocialLogin = (userInfo:any,provider='google')=>{
    const userDetails = userInfo.user
    const payload: RegisterBodyType = {
      email: userDetails.email,
      device_name:deviceName,
      first_name:userDetails.givenName,
      last_name:userDetails.familyName,
      provider: provider,
      provider_id:userDetails.id,
    };
    if(provider === 'facebook' && userDetails.birthday){
      payload.birthday = moment(userDetails.birthday).locale('en').format('YYYY-MM-DD')
    }
    if(provider === 'facebook' && userDetails.profile_url){
      payload.profile_url = userDetails.profile_url
    }
    
    if (provider === 'google' && userInfo) {
      payload.profile_url = userInfo.user.photo
    }
    console.log(payload, userInfo);
    createUserRequest(payload);
  }

  const onResult = (userInfo:any,success:boolean, provider:string, message?:String)=>{
    if(success){
      onSuccessSocialLogin(userInfo,provider)
    }else{
      socialLoginEnded();
      if(message){
        if(message === 'ErrorOccured'){
          //show Alert
          showAlertNoInternet && showAlertNoInternet()
        }
      }
    }
  }

  const onPressButton = (type: string) =>{
    if(onButtonPress){
      onButtonPress(type)
    }
  }

  useEffect(() => {
    getDeviceName();
  }, []);

  const navigation = useNavigation<StackNavigationProp<any>>();

  //--AppleSignin---------

  const getDeviceName = async () => {
    const deviceName = await DeviceInfo.getDeviceName();
    setDeviceName(deviceName);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const message = registerUserInfo?.message;
    if (message) {
      if (message.code === 200) {
        dispatch(fetchLoginSuccess({ loginData: registerUserInfo }));
        navigation.reset({
          index: 0,
          routes: [{name: message.newUser === 1 ? ScreensConstants.OnBoardNavigator : ScreensConstants.AppNavigator}],
        });
      }else{
        Alert.alert(message.message);
      }
    }
  }, [registerUserInfo]);

  const appleSigninApi = (response: any) => {
    const {
      user,
      email,
      nonce,
      identityToken,
      realUserStatus,
      fullName,
    } = response;
    const payload: RegisterBodyType = {
      email: email ,
      provider_id: user,
      provider: 'apple',
      device_name: deviceName,
      first_name: fullName.givenName,
      last_name: fullName.familyName,
    };
    createUserRequest(payload);
  };

  //-------end AppleSignin--

  const buttonPressAction = (type: string) => {
    recordLogEvent('Login');
    switch (type) {
      case NavigateTypes.google:
        let googleSignIn = LoginFactory.getInstance(Connection.Google,onResult);
        googleSignIn?.login();
        onPressButton(type);
      case NavigateTypes.apple:
        onPressButton(type);
        return;
      case NavigateTypes.facebook:
        let facebookSignIn = LoginFactory.getInstance(Connection.Facebook,onResult);
        facebookSignIn?.login();
        onPressButton(type);
    }
  };
  return (
        <View {...style}>
          <SocialLoginButton testID="signin_facebook"
            onPress={() => {buttonPressAction('FACEBOOK')}}
            label={t('signIn.loginFacebook')}
            labelStyle={styles.labelStyle}
            style={styles.labelContainer}
            labelContainer={styles.textContainer}
            icon={() => <View style={styles.container}><FaceBookIcon /></View>}
          />
          <SocialLoginButton testID="signin_google"
            onPress={() => {buttonPressAction('GOOGLE')}}
            label={t('signIn.loginGoogle')}
            labelStyle={styles.labelStyle}
            style={styles.labelContainer}
            labelContainer={styles.textContainer}
            icon={() => <View style={styles.container}><GoogleIcon /></View>}
          />
          {(isIOS && appleAuth.isSupported) &&  <SocialLoginButton testID="signin_apple"
            onPress={() => {
              buttonPressAction('APPLE')
              appleSignin().then(response => {
                appleSigninApi(response);
              })
            }}
            labelStyle={styles.labelStyle}
            style={styles.labelContainer}
            label={t('signIn.loginApple')}
            labelContainer={styles.textContainer}
            icon={() => <View style={styles.container}><AppleIcon fill={themeData.primaryBlack} /></View>}
          /> }

        </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelStyle: {
    fontSize: normalize(18)
  },
  labelContainer: {
    justifyContent:'flex-start',
  },
  textContainer:{
    alignItems:'flex-start',
  }
});
