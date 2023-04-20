import React, { FunctionComponent, useEffect, useState } from 'react';
import { View, StyleProp, ViewStyle, StyleSheet, Alert, } from 'react-native';
import { SocialLoginButton } from '../../atoms/social-login-button/SocialLoginButton';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import DeviceInfo from 'react-native-device-info';
import FaceBookIcon from 'src/assets/images/icons/facebook_icon.svg';
import GoogleIcon from 'src/assets/images/icons/google_icon.svg';
import AppleIcon from 'src/assets/images/icons/apple_icon.svg';
import { isIOS, isTab, normalize, recordLogEvent, recordLogLogin, recordLogSignUp, recordUserId } from 'src/shared/utils';
import {LoginFactory,Connection}  from 'src/shared/utils/loginFactory';
import {NavigateTypes} from 'src/components/screens';
import {RegisterBodyType} from 'src/redux/register/types';
import { useLogin, useNotificationSaveToken, useRegister, useSearch } from 'src/hooks';
import { useDispatch } from 'react-redux';
import { fetchLoginSuccess } from 'src/redux/login/action';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScreensConstants, TranslateConstants, TranslateKey } from 'src/constants/Constants';
import { appleSignin } from 'src/shared/utils/appleSignin';
import { fonts } from 'src/shared/styles/fonts';
import { SaveTokenAfterRegistraionBodyType } from 'src/redux/notificationSaveToken/types';
import { AnalyticsEvents } from 'src/shared/utils/analytics';

interface SocialButtonSectionProps {
  onButtonPress?: (type: string) => void;
  style?: StyleProp<ViewStyle>;
  showAlertNoInternet?: () => void;
  socialButtonBoldStyle?: boolean;
}

export const SocialButtonSection: FunctionComponent<SocialButtonSectionProps> =({ onButtonPress, style, showAlertNoInternet, socialButtonBoldStyle }) => {

  const {themeData} = useTheme();
  const [deviceName, setDeviceName] = useState('');
  const {createUserRequest, registerUserInfo} = useRegister();

  const {socialLoginEnded} = useRegister();
  const { loginData } = useLogin();
  const { saveTokenAfterRegistrationRequest, saveTokenData } = useNotificationSaveToken();
  
  const OK = TranslateConstants({key:TranslateKey.COMMON_OK});
  const SIGNIN_LOGIN_FACEBOOK = TranslateConstants({key:TranslateKey.SIGNIN_LOGIN_FACEBOOK})
  const SIGNIN_LOGIN_GOOGLE = TranslateConstants({key:TranslateKey.SIGNIN_LOGIN_GOOGLE})
  const SIGNIN_LOGIN_APPLE = TranslateConstants({key:TranslateKey.SIGNIN_LOGIN_APPLE})

  const { emptySearchHistory } = useSearch();

  const onSuccessSocialLogin = (userInfo:any,loginProvider='google')=>{
    const userDetails = userInfo.user
    const payload: RegisterBodyType = {
      email: userDetails.email,
      device_name:deviceName,
      first_name:userDetails.givenName,
      last_name:userDetails.familyName,
      provider: loginProvider,
      provider_id:userDetails.id,
    };
    if(loginProvider === 'facebook' && userDetails.profile_url){
      payload.profile_url = userDetails.profile_url
    }   
    if (loginProvider === 'google' && userInfo) {
      payload.profile_url = userInfo.user.photo
    }
    recordLogSignUp({method: payload.provider})
    createUserRequest(payload);
  }

  const onResult = (userInfo:any,success:boolean, provider:string, message?:string)=>{
    if(success){
      onSuccessSocialLogin(userInfo,provider)
    }else{
      socialLoginEnded();
      if(message && message === 'ErrorOccured'){
        //show Alert
        showAlertNoInternet && showAlertNoInternet()
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

  useEffect(() => {
    if((loginData?.user?.id) && saveTokenData?.id){
      const payload: SaveTokenAfterRegistraionBodyType = {
        id: (saveTokenData?.id).toString(),
        uid: (loginData?.user?.id),
      };
      saveTokenAfterRegistrationRequest(payload)
    }
  }, [loginData]);
  

  const navigation = useNavigation<StackNavigationProp<any>>();

  //--AppleSignin---------

  const getDeviceName = async () => {
    const deviceNameInfo = await DeviceInfo.getDeviceName();
    setDeviceName(deviceNameInfo);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const message = registerUserInfo?.message;
    if (message) {
      if (message.code === 200) {
        const userId = registerUserInfo?.user?.id?.toString();
        recordUserId(userId);
        emptySearchHistory();
        dispatch(fetchLoginSuccess({ loginData: registerUserInfo }));
        navigation.reset({
          index: 0,
          routes: [{name: message.newUser === 1 ? ScreensConstants.OnBoardNavigator : ScreensConstants.AppNavigator}],
        });
      }else{
        Alert.alert(message.message, undefined, [{ text: OK }]);
      }
    }
  }, [registerUserInfo]);

  const appleSigninApi = (response: any) => {
    const {
      user,
      email,
      fullName,
    } = response;
    const payload: RegisterBodyType = {
      email,
      provider_id: user,
      provider: 'apple',
      device_name: deviceName,
      first_name: fullName.givenName,
      last_name: fullName.familyName,
    };
    recordLogSignUp({method: payload.provider});
    createUserRequest(payload);
  };

  //-------end AppleSignin--

  const buttonPressAction = (type: string) => {
    recordLogEvent(AnalyticsEvents.LOGIN);
    recordLogLogin({method: type});
    switch (type) {
      case NavigateTypes.google:
        const googleSignIn = LoginFactory.getInstance(Connection.Google,onResult);
        googleSignIn?.login();
        onPressButton(type);
        break;
      case NavigateTypes.apple:
        onPressButton(type);
        return;
      case NavigateTypes.facebook:
        const facebookSignIn = LoginFactory.getInstance(Connection.Facebook,onResult);
        facebookSignIn?.login();
        onPressButton(type);
        break;
    }
  };
  const socialButtonLabelStyle = socialButtonBoldStyle ? styles.socialLoginButtonBoldLabel : styles.socialLoginButtonLabel
  return (
        <View {...style}>
          <SocialLoginButton testID="signin_facebook"
            onPress={() => {buttonPressAction('FACEBOOK')}}
            label={SIGNIN_LOGIN_FACEBOOK}
            labelStyle={socialButtonLabelStyle}
            style={styles.labelContainer}
            labelContainer={styles.textContainer}
            icon={() => <View style={styles.container}><FaceBookIcon /></View>}
          />
          <SocialLoginButton testID="signin_google"
            onPress={() => {buttonPressAction('GOOGLE')}}
            label={SIGNIN_LOGIN_GOOGLE}
            labelStyle={socialButtonLabelStyle}
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
            labelStyle={socialButtonLabelStyle}
            style={styles.labelContainer}
            label={SIGNIN_LOGIN_APPLE}
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
    fontSize: isTab ? 16 : normalize(16)
  },
  labelContainer: {
    justifyContent:'flex-start',
    height: isIOS ? 48 : 45,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginVertical: 7
  },
  textContainer:{
    alignItems:'flex-start',
  },
  socialLoginButtonLabel: {
    fontFamily: fonts.AwsatDigital_Regular,
    fontSize: 14,
    lineHeight: isIOS ? 25 : 20,
  },
  socialLoginButtonBoldLabel: {
    fontSize: 14,
    lineHeight: isIOS ? 25 : 20,
  }
});
