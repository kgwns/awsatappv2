import {
  SAVE_TOKEN_REQUEST,
  SAVE_TOKEN_SUCCESS,
  SAVE_TOKEN_FAILED,
  SAVE_TOKEN_AFTER_REGISTRATION_REQUEST,
  SAVE_TOKEN_AFTER_REGISTRATION_SUCCESS,
  SAVE_TOKEN_AFTER_REGISTRATION_FAILED,
} from './actionType';

export interface SaveTokenBodyType {
  fcm_token: string;
  platform: string;
  device_name: string;
}

export interface SaveTokenSuccessPayloadType {
    id: number;
    message: string;
}

export interface SaveTokenAfterRegistraionBodyType {
  id: string;
  uid: number;
}

export interface SaveTokenAfterRegistraionSuccessPayloadType {
    message: string;
    action?: string;
}

export interface SaveTokenState {
  SaveTokenInfo: SaveTokenSuccessPayloadType | null;
  SaveTokenAfterRegistraionInfo: SaveTokenAfterRegistraionSuccessPayloadType | null;
  error: string;
  isLoading: boolean;
}

export type SaveTokenType = {
  type: typeof SAVE_TOKEN_REQUEST;
  payload: SaveTokenBodyType;
};
export type SaveTokenSuccessType = {
  type: typeof SAVE_TOKEN_SUCCESS;
  payload: SaveTokenSuccessPayloadType;
};

export interface SaveTokenFailedPayloadType {
  error: string;
}

export type SaveTokenFailedType = {
  type: typeof SAVE_TOKEN_FAILED;
  payload: SaveTokenFailedPayloadType;
};

export type SaveTokenAfterRegistrationType = {
  type: typeof SAVE_TOKEN_AFTER_REGISTRATION_REQUEST;
  payload: SaveTokenAfterRegistraionBodyType;
};
export type SaveTokenAfterRegistrationSuccessType = {
  type: typeof SAVE_TOKEN_AFTER_REGISTRATION_SUCCESS;
  payload: SaveTokenAfterRegistraionSuccessPayloadType;
};

export interface SaveTokenAfterRegistrationFailedPayloadType {
  error: string;
}

export type SaveTokenAfterRegistrationFailedType = {
  type: typeof SAVE_TOKEN_AFTER_REGISTRATION_FAILED;
  payload: SaveTokenAfterRegistrationFailedPayloadType;
};

export type SaveTokenAction =
  | SaveTokenType
  | SaveTokenSuccessType
  | SaveTokenFailedType
  | SaveTokenAfterRegistrationType
  | SaveTokenAfterRegistrationSuccessType
  | SaveTokenAfterRegistrationFailedType;
