import {
  SAVE_TOKEN_REQUEST,
  SAVE_TOKEN_SUCCESS,
  SAVE_TOKEN_FAILED,
  SAVE_TOKEN_AFTER_REGISTRATION_REQUEST,
  SAVE_TOKEN_AFTER_REGISTRATION_SUCCESS,
  SAVE_TOKEN_AFTER_REGISTRATION_FAILED,
} from './actionType';
import {
  SaveTokenBodyType,
  SaveTokenType,
  SaveTokenSuccessType,
  SaveTokenFailedType,
  SaveTokenSuccessPayloadType,
  SaveTokenFailedPayloadType,
  SaveTokenAfterRegistraionBodyType,
  SaveTokenAfterRegistrationType,
  SaveTokenAfterRegistrationSuccessType,
  SaveTokenAfterRegistraionSuccessPayloadType,
  SaveTokenAfterRegistrationFailedType,
  SaveTokenAfterRegistrationFailedPayloadType,
} from './types';

export const SaveToken = (payload: SaveTokenBodyType): SaveTokenType => {
  return {
    type: SAVE_TOKEN_REQUEST,
    payload,
  };
};

export const SaveTokenSuccess = (
  payload: SaveTokenSuccessPayloadType,
): SaveTokenSuccessType => {
  return {
    type: SAVE_TOKEN_SUCCESS,
    payload,
  };
};

export const SaveTokenFailed = (
  payload: SaveTokenFailedPayloadType,
): SaveTokenFailedType => {
  return {
    type: SAVE_TOKEN_FAILED,
    payload,
  };
};

export const SaveTokenAfterRegistration = (payload: SaveTokenAfterRegistraionBodyType): SaveTokenAfterRegistrationType => {
  return {
    type: SAVE_TOKEN_AFTER_REGISTRATION_REQUEST,
    payload,
  };
};

export const SaveTokenAfterRegistrationSuccess = (
  payload: SaveTokenAfterRegistraionSuccessPayloadType,
): SaveTokenAfterRegistrationSuccessType => {
  return {
    type: SAVE_TOKEN_AFTER_REGISTRATION_SUCCESS,
    payload,
  };
};

export const SaveTokenAfterRegistrationFailed = (
  payload: SaveTokenAfterRegistrationFailedPayloadType,
): SaveTokenAfterRegistrationFailedType => {
  return {
    type: SAVE_TOKEN_AFTER_REGISTRATION_FAILED,
    payload,
  };
};
