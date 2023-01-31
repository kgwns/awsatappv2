import {
    FetchLoginSuccessPayloadType,
    FetchLoginFailedPayloadType,
    FetchLoginSuccessType,
    FetchLoginFailedType,
    FetchLoginPayloadType,
    UserLogoutType,
    UserLogoutSuccessType,
    LoginSkippedType,
    OnboardingSuccessType,
    ForgotPasswordRequestPayloadType,
    ForgotPasswordSuccessPayloadType,
    ForgotPasswordSuccessType,
    ForgotPasswordFailedType,
    ForgotPasswordFailedPayloadType
  } from './types';
  import {
    FETCH_LOGIN,
    FETCH_LOGIN_SUCCESS,
    FETCH_LOGIN_ERROR,
    FETCH_USER_LOGOUT,
    FETCH_USER_LOGOUT_SUCCESS,
    LOGIN_SKIPPED,
    ONBOARDING_SUCCESS,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILED,
    EMPTY_FORGOT_PASSWORD_RESPONSE,
    EMPTY_LOGIN_DATA
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

    
  export const requestForgotPassword = (payload: ForgotPasswordRequestPayloadType) => {
    return {
      type: FORGOT_PASSWORD_REQUEST,
      payload,
    };
  };
  
  export const forgotPasswordSuccess = (
    payload: ForgotPasswordSuccessPayloadType,
  ): ForgotPasswordSuccessType => {
    return {
      type: FORGOT_PASSWORD_SUCCESS,
      payload,
    };
  };
  
  export const forgotPasswordFailed = (
    payload: ForgotPasswordFailedPayloadType,
  ): ForgotPasswordFailedType => {
    return {
      type: FORGOT_PASSWORD_FAILED,
      payload,
    };
  };

  export const emptyForgotPasswordResponse = () => {
    return {
      type: EMPTY_FORGOT_PASSWORD_RESPONSE,
    };
  };

  export const emptyLoginData = () => {
    return {
      type: EMPTY_LOGIN_DATA,
    };
  };
  
  export const loginAction = {
    fetchLogin,
    fetchLoginSuccess,
    fetchLoginFailed,
    forgotPasswordSuccess,
    forgotPasswordFailed,
    requestForgotPassword,
    emptyForgotPasswordResponse,
    emptyLoginData,
  };
