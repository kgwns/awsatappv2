import { UserLogoutType } from '../login/types';
import {
    FETCH_EMAIL_CHECK,
    FETCH_EMAIL_CHECK_ERROR,
    FETCH_EMAIL_CHECK_SUCCESS,
  } from './actionTypes';
  
  export interface FieldEmailCheckExportType {
    id: string;
    name: string;
  }
  

  export interface FetchEmailCheckSuccessPayloadType {
    emailCheckData: any;
  }
  
  export interface FetchEmailCheckFailedPayloadType {
    error: string;
  }

  export interface FetchEmailCheckPayloadType {
    email: string;
  }
  
  export type EmailCheckState = {
    emailCheckData: any;
    error: string;
    isLoading: boolean;
    actionType: string;
  }
  
  export type FetchEmailCheckType = {
    type: typeof FETCH_EMAIL_CHECK;
    payload: FetchEmailCheckPayloadType;
  };
  
  export type FetchEmailCheckSuccessType = {
    type: typeof FETCH_EMAIL_CHECK_SUCCESS;
    payload: FetchEmailCheckSuccessPayloadType;
  };
  
  export type FetchEmailCheckFailedType = {
    type: typeof FETCH_EMAIL_CHECK_ERROR;
    payload: FetchEmailCheckFailedPayloadType;
  };
  
  export type EmailCheckActions =
    | FetchEmailCheckType
    | FetchEmailCheckSuccessType
    | FetchEmailCheckFailedType
    | UserLogoutType;