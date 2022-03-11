import {
  CHANGE_PASSWORD, CHANGE_PASSWORD_ERROR, CHANGE_PASSWORD_SUCCESS, EMPTY_PASSWORD_RESPONSE_INFO
} from './actionTypes';

export interface messageDataType {
  code?: number;
  message?: string;
}

export interface SendNewPasswordSuccessPayloadType {
  message: any;
}

export interface SendNewPasswordFailedPayloadtype {
  error: string;
}

export interface SendNewPassword {
  password: string
}

export type ChangePasswordState = {
  response: messageDataType;
  error: string;
  isLoading: boolean;
};

export type SendChangePasswordType = {
  type: typeof CHANGE_PASSWORD;
  payload: SendNewPassword;
};

export type SendChangePasswordSuccessType = {
  type: typeof CHANGE_PASSWORD_SUCCESS;
  payload: SendNewPasswordSuccessPayloadType;
};

export type SendChangePasswordFailedType = {
  type: typeof CHANGE_PASSWORD_ERROR;
  payload: SendNewPasswordFailedPayloadtype;
};

export type EmptyPasswordResponseInfo = {
  type: typeof EMPTY_PASSWORD_RESPONSE_INFO;
};

export type ChangePasswordActions =
  | SendChangePasswordType
  | SendChangePasswordSuccessType
  | SendChangePasswordFailedType
  | EmptyPasswordResponseInfo
