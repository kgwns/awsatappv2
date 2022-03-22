import {REGISTER_USER, REGISTER_SUCCESS, REGISTER_FAILED, SOCIAL_LOGIN_START, SOCIAL_LOGIN_END} from './actionTypes';
import {
  RegisterBodyType,
  UserRegisterType,
  RegisterSuccessType,
  RegisterFailedType,
  RegisterSuccessPayloadType,
  RegisterFailedPayloadType,
} from './types';
export const userRegister = (payload: RegisterBodyType): UserRegisterType => {
  return {
    type: REGISTER_USER,
    payload,
  };
};

export const registerSuccess = (
  payload: RegisterSuccessPayloadType,
): RegisterSuccessType => {
  return {
    type: REGISTER_SUCCESS,
    payload,
  };
};

export const registerFailed = (
  payload: RegisterFailedPayloadType,
): RegisterFailedType => {
  return {
    type: REGISTER_FAILED,
    payload,
  };
};

export const socialLoginStart = () => {
  return {
    type: SOCIAL_LOGIN_START
  }
}
export const socialLoginEnd = () => {
  return {
    type: SOCIAL_LOGIN_END
  }
}