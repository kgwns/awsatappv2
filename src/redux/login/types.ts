import {
    FETCH_LOGIN,
    FETCH_LOGIN_ERROR,
    FETCH_LOGIN_SUCCESS,
    FETCH_USER_LOGOUT,
    FETCH_USER_LOGOUT_SUCCESS,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_FAILED,
    FORGOT_PASSWORD_SUCCESS,
    LOGIN_SKIPPED,
    ONBOARDING_SUCCESS,
    EMPTY_FORGOT_PASSWORD_RESPONSE,
    EMPTY_LOGIN_DATA
  } from './actionTypes';
  
  export interface FieldLoginExportType {
    id: string;
    name: string;
  }
  
  export interface LoginItemType {
    field_sectionid_export: string;
    title: string;
  }
  
  export interface FetchLoginSuccessPayloadType {
    loginData: any;
  }
  
  export interface FetchLoginFailedPayloadType {
    error: string;
  }

  export interface FetchUserLogoutPayloadType {
    token: string;
  }

  export interface FetchLoginPayloadType {
    email: string;
    password: string;
    device_name: string;
  }

  export interface SocialLoginPayloadType {
    email: string;
    device_name: string;
    provider_id: string;
    provider: string;
    first_name: string;
    last_name: string;
  }
  
  export type LoginState = {
    loginData: any;
    error: string;
    isLoading: boolean;
    isSkipped: boolean;
    forgotPasswordResponse: any;
  }
  export interface ForgotPasswordRequestPayloadType {
    email:string
  }
  export interface ForgotPasswordSuccessPayloadType {
    response:any
  }
  export interface ForgotPasswordFailedPayloadType {
    error: any;
  }
  
  export type FetchLoginType = {
    type: typeof FETCH_LOGIN;
    payload: FetchLoginPayloadType;
  };
  
  export type FetchLoginSuccessType = {
    type: typeof FETCH_LOGIN_SUCCESS;
    payload: FetchLoginSuccessPayloadType;
  };
  
  export type FetchLoginFailedType = {
    type: typeof FETCH_LOGIN_ERROR;
    payload: FetchLoginFailedPayloadType;
  };

  export interface FetchLogoutSuccessPayloadType {
    logoutData: any;
  }

  export type UserLogoutType = {
    type: typeof FETCH_USER_LOGOUT;
  };

  export type UserLogoutSuccessType = {
    type: typeof FETCH_USER_LOGOUT_SUCCESS;
  };

  export type LoginSkippedType = {
    type: typeof LOGIN_SKIPPED;
  }

  export type OnboardingSuccessType = {
    type: typeof ONBOARDING_SUCCESS;
  }

  export type ForgotPasswordRequestType = {
    type: typeof FORGOT_PASSWORD_REQUEST;
    payload: ForgotPasswordRequestPayloadType;
  };

  export type ForgotPasswordSuccessType = {
    type: typeof FORGOT_PASSWORD_SUCCESS;
    payload: ForgotPasswordSuccessPayloadType;
  };

  export type ForgotPasswordFailedType = {
    type: typeof FORGOT_PASSWORD_FAILED;
    payload: ForgotPasswordFailedPayloadType;
  };

  export type EmptyForgotPasswordResponse = {
    type: typeof EMPTY_FORGOT_PASSWORD_RESPONSE;
  };

  export type EmptyLoginData = {
    type: typeof EMPTY_LOGIN_DATA;
  };
  
  export type LoginActions =
    | FetchLoginType
    | FetchLoginSuccessType
    | FetchLoginFailedType
    | UserLogoutType
    | UserLogoutSuccessType
    | LoginSkippedType
    | OnboardingSuccessType
    | ForgotPasswordRequestType
    | ForgotPasswordSuccessType
    | ForgotPasswordFailedType
    | EmptyForgotPasswordResponse
    | EmptyLoginData;
