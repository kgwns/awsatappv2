import {
    FetchEmailCheckSuccessPayloadType,
    FetchEmailCheckFailedPayloadType,
    FetchEmailCheckSuccessType,
    FetchEmailCheckFailedType,
    FetchEmailCheckPayloadType,
  } from './types';
  import {
    FETCH_EMAIL_CHECK,
    FETCH_EMAIL_CHECK_SUCCESS,
    FETCH_EMAIL_CHECK_ERROR,
    EMPTY_EMAIL_CHECK_DATA,
  } from './actionTypes';
  
  export const fetchEmailCheck = (payload: FetchEmailCheckPayloadType) => {
    return {
      type: FETCH_EMAIL_CHECK,
      payload,
    };
  };
  
  export const fetchEmailCheckSuccess = (
    payload: FetchEmailCheckSuccessPayloadType,
  ): FetchEmailCheckSuccessType => {
    return {
      type: FETCH_EMAIL_CHECK_SUCCESS,
      payload,
    };
  };
  
  export const fetchEmailCheckFailed = (
    payload: FetchEmailCheckFailedPayloadType,
  ): FetchEmailCheckFailedType => {
    return {
      type: FETCH_EMAIL_CHECK_ERROR,
      payload,
    };
  };

export const emptyEmailCheckAction = () => {
  return {
    type: EMPTY_EMAIL_CHECK_DATA
  }
}
  
  export const emailCheckAction = {
    fetchEmailCheck,
    fetchEmailCheckSuccess,
    fetchEmailCheckFailed,
    emptyEmailCheckAction,
  };
