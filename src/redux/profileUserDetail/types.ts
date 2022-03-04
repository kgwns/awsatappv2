import {
  FETCH_PROFILE_USER_DETAILS,
  FETCH_PROFILE_USER_DETAILS_ERROR,
  FETCH_PROFILE_USER_DETAILS_SUCCESS,
  SEND_USER_DETAILS,
  SEND_USER_DETAILS_SUCCESS,
  SEND_USER_DETAILS_ERROR
} from './actionTypes';

export type payloadType = { rows: any[]; pager: object };

export interface ProfileUserDataType {
  user?: UserDataType;
  message?: messageDataType
}
export interface UserDataType {
  id?: number;
  name?: string;
  first_name?: string;
  last_name?: string;
  mobile?: string;
  email?: string;
  provider?: string;
  provider_id?: string;
  email_verified_at?: string;
  image?: string;
  profile_url?: string;
  birthday?: string;
  country?: string;
  gender?: string;
  registered_by?: string;
  device_name?: string;
  occupation?: string;
}
export interface messageDataType {
  code?: number;
  message?: string;
}

export interface FetchProfileUserDetailsSuccessPayloadType {
  userProfileData: any;
}

export interface FetchProfileUserDetailsFailedPayloadtype {
  error: string;
}

export interface SendUserDataSuccessPayloadType {
  saveData: any;
}

export interface SendUserDataFailedPayloadtype {
  error: string;
}

export interface SendUserData {
  first_name?: string,
  birthday?: string,
  occupation?: string,
  email: string
}

export type ProfileUserDetailsState = {
  userProfileData: ProfileUserDataType;
  error: string;
  isLoading: boolean;
  sendUserInfo: ProfileUserDataType
};

export type FetchProfileUserDetailsType = {
  type: typeof FETCH_PROFILE_USER_DETAILS;
};

export type FetchProfileUserDetailsSuccessType = {
  type: typeof FETCH_PROFILE_USER_DETAILS_SUCCESS;
  payload: FetchProfileUserDetailsSuccessPayloadType;
};

export type FetchProfileUserDetailsFailedType = {
  type: typeof FETCH_PROFILE_USER_DETAILS_ERROR;
  payload: FetchProfileUserDetailsFailedPayloadtype;
};
export type SendUserDataType = {
  type: typeof SEND_USER_DETAILS;
  payload: SendUserData;
};

export type SendUserDataSuccessType = {
  type: typeof SEND_USER_DETAILS_SUCCESS;
  payload: SendUserDataSuccessPayloadType;
};

export type SendUserDataFailedType = {
  type: typeof SEND_USER_DETAILS_ERROR;
  payload: SendUserDataFailedPayloadtype;
};

export type UserProfileActions =
  | FetchProfileUserDetailsType
  | FetchProfileUserDetailsSuccessType
  | FetchProfileUserDetailsFailedType
  | SendUserDataType
  | SendUserDataSuccessType
  | SendUserDataFailedType
