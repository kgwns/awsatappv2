import {
    FetchLoginSuccessPayloadType,
    FetchLoginFailedPayloadType,
    FetchLoginSuccessType,
    FetchLoginFailedType,
    FetchLoginPayloadType,
    FetchUserLogoutPayloadType,
    UserLogoutType,
  } from './types';
  import {
    FETCH_LOGIN,
    FETCH_LOGIN_SUCCESS,
    FETCH_LOGIN_ERROR,
    FETCH_USER_LOGOUT,
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

  // export const userLogout = (
  //   payload: string
  // ) : UserLogoutType => {
  //   return{
  //     type: FETCH_USER_LOGOUT,
  //     payload,
  //   }
  // }
  
  export const loginAction = {
    fetchLogin,
    fetchLoginSuccess,
    fetchLoginFailed,
  };