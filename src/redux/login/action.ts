import {
    FetchLoginSuccessPayloadType,
    FetchLoginFailedPayloadType,
    FetchLoginSuccessType,
    FetchLoginFailedType,
    FetchLoginPayloadType,
    FetchUserLogoutPayloadType,
    UserLogoutType,
    UserLogoutSuccessType,
    LoginSkippedType,
    OnboardingSuccessType
  } from './types';
  import {
    FETCH_LOGIN,
    FETCH_LOGIN_SUCCESS,
    FETCH_LOGIN_ERROR,
    FETCH_USER_LOGOUT,
    FETCH_USER_LOGOUT_SUCCESS,
    LOGIN_SKIPPED,
    ONBOARDING_SUCCESS
  } from './actionTypes';
  
  export const fetchLogin = (payload: FetchLoginPayloadType) => {
    return {
      type: FETCH_LOGIN,
      payload,
    };
  };
  
  export const fetchLoginSuccess = (
    payload: FetchLoginSuccessPayloadType,
  ): FetchLoginSuccessType => {
    return {
      type: FETCH_LOGIN_SUCCESS,
      payload,
    };
  };
  
  export const fetchLoginFailed = (
    payload: FetchLoginFailedPayloadType,
  ): FetchLoginFailedType => {
    return {
      type: FETCH_LOGIN_ERROR,
      payload,
    };
  };

  export const userLogout = () : UserLogoutType => {
    return{
      type: FETCH_USER_LOGOUT,
    }
  }

  export const userLogoutSuccess = () : UserLogoutSuccessType => {
    return{
      type: FETCH_USER_LOGOUT_SUCCESS,
    }
  }

  export const userLoginSkipped = () : LoginSkippedType => {
    return {
      type: LOGIN_SKIPPED,
    }
  }

  export const onBoardingSuccess = () : OnboardingSuccessType => {
    return {
      type: ONBOARDING_SUCCESS,
    }
  }
  
  export const loginAction = {
    fetchLogin,
    fetchLoginSuccess,
    fetchLoginFailed,
  };