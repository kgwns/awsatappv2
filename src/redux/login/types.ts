import {
    FETCH_LOGIN,
    FETCH_LOGIN_ERROR,
    FETCH_LOGIN_SUCCESS,
    FETCH_USER_LOGOUT,
    FETCH_USER_LOGOUT_SUCCESS,
    LOGIN_SKIPPED
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
  
  export type LoginState = {
    loginData: any;
    error: string;
    isLoading: boolean;
    isSkipped: boolean;
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
  
  export type LoginActions =
    | FetchLoginType
    | FetchLoginSuccessType
    | FetchLoginFailedType
    | UserLogoutType
    | UserLogoutSuccessType
    | LoginSkippedType;