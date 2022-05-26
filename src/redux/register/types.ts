import { FETCH_USER_LOGOUT } from '../login/actionTypes';
import {REGISTER_USER, REGISTER_SUCCESS, REGISTER_FAILED, SOCIAL_LOGIN_START, SOCIAL_LOGIN_END, EMPTY_USER_INFO} from './actionTypes';

export interface RegisterUserSuccessType {
  name?: string;
  first_name?: string;
  last_name?: string;
  mobile?: string;
  gender?: string|null;
  birthday?: string|null;
  profile_url?: string|null;
  country?: string|null;
  registered_by?: string|null;
  email: string;
  id: string;
  device_name?: string;
  created_at?: string;
  updated_at?: string;
  provider?: string;
  provider_id?: string;
  display_name?: any;
}

export interface RegisterUserTokenType {
  access_token?: string;
  token_type?: string;
}

export interface RegisterUserMessageType {
  newUser?: number;
  code?: number;
  message: string;
}

export interface RegisterBodyType {
  name?: string;
  email?: string;
  password?: string;
  device_name: string;
  first_name?: string;
  last_name?: string;
  mobile?: string;
  profile_url?: string;
  registered_by?: string;
  provider?: string;
  provider_id?: string;
  birthday?: string;
  image?:any
}

export interface RegisterSuccessPayloadType {
  user: RegisterUserSuccessType|null,
  token: RegisterUserTokenType,
  message: RegisterUserMessageType,
}

export interface RegisterState {
  userInfo: RegisterSuccessPayloadType | null;
  error: string;
  isLoading: boolean;
  socialLoginInProgress: boolean;
}

export type UserRegisterType = {
  type: typeof REGISTER_USER;
  payload: RegisterBodyType;
};
export type RegisterSuccessType = {
  type: typeof REGISTER_SUCCESS;
  payload: RegisterSuccessPayloadType;
};

export interface RegisterFailedPayloadType {
  error: string;
}

export type RegisterFailedType = {
  type: typeof REGISTER_FAILED;
  payload: RegisterFailedPayloadType;
};

export type UserLogoutType = {
  type: typeof FETCH_USER_LOGOUT;
};

export type SocialLoginStartType = {
  type: typeof SOCIAL_LOGIN_START
}
export type SocialLoginEndType = {
  type: typeof SOCIAL_LOGIN_END
}

export type EmptyUserInfoData = {
  type: typeof EMPTY_USER_INFO;
};

export type RegisterAction =
  | UserRegisterType
  | RegisterSuccessType
  | RegisterFailedType
  | UserLogoutType
  | SocialLoginStartType
  | SocialLoginEndType
  | EmptyUserInfoData;
