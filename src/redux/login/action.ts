import {
    FetchLoginSuccessPayloadType,
    FetchLoginFailedPayloadType,
    FetchLoginSuccessType,
    FetchLoginFailedType,
    FetchLoginPayloadType,
  } from './types';
  import {
    FETCH_LOGIN,
    FETCH_LOGIN_SUCCESS,
    FETCH_LOGIN_ERROR,
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
  
  export const loginAction = {
    fetchLogin,
    fetchLoginSuccess,
    fetchLoginFailed,
  };