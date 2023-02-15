import {
  FETCH_PROFILE_USER_DETAILS,
  FETCH_PROFILE_USER_DETAILS_ERROR,
  FETCH_PROFILE_USER_DETAILS_SUCCESS,
  SEND_USER_DETAILS,
  SEND_USER_DETAILS_SUCCESS,
  SEND_USER_DETAILS_ERROR,
  UPDATE_PROFILE_USER_IMAGE, UPDATE_USER_IMAGE_SUCCESS, UPDATE_USER_IMAGE_FAILED,EMPTY_USER_PROFILE_DATA
} from './actionTypes';

export type payloadType = { rows: any[]; pager: object };

export interface ProfileUserDataType {
  user?: UserDataType;
  message?: MessageDataType
}

export interface UserDataType {
  id: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  mobile?: string;
  email: string;
  provider?: string;
  provider_id?: string;
  email_verified_at?: string;
  image?: string;
  profile_url?: string | null;
  birthday?: string | null;
  country?: string | null;
  gender?: string | null;
  registered_by?: string | null;
  device_name?: string;
  occupation?: string;
  created_at?: string;
  updated_at?: string;
  display_name?: any;
}

export interface MessageDataType {
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
  display_name?: string,
  birthday?: string,
  occupation?: string,
  email: string
}

export interface UpdateUserImageBodyType {
  image: string;
}

export interface UpdateUserImageSuccessPayloadType {
  user: UserDataType | null,
  message: MessageDataType,
}

export interface UserState {
  userDetail: UpdateUserImageSuccessPayloadType | null;
  error: string;
  isLoading: boolean;
}

export interface UpdateUserprofileImageSuccessType {
  type: typeof UPDATE_USER_IMAGE_SUCCESS,
  payload: UpdateUserImageSuccessPayloadType,
}

export type UpdateUserImageType = {
  type: typeof UPDATE_PROFILE_USER_IMAGE;
  payload: UpdateUserImageBodyType;
};
export type UpdateProfileUserImageSuccessType = {
  type: typeof UPDATE_USER_IMAGE_SUCCESS;
  payload: UpdateUserImageSuccessPayloadType;
};

export interface UpdateUserImageFailedPayloadType {
  error: string;
}

export type UpdateUserImageFailedType = {
  type: typeof UPDATE_USER_IMAGE_FAILED;
  payload: UpdateUserImageFailedPayloadType;
};

export type ProfileUserDetailsState = {
  userProfileData: ProfileUserDataType;
  error: string;
  isLoading: boolean;
  sendUserInfo: ProfileUserDataType
  userDetail: UpdateUserImageSuccessPayloadType | null;
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

export type EmptyUserProfileData = {
  type: typeof EMPTY_USER_PROFILE_DATA;
};

export type UserProfileActions =
  | FetchProfileUserDetailsType
  | FetchProfileUserDetailsSuccessType
  | FetchProfileUserDetailsFailedType
  | SendUserDataType
  | SendUserDataSuccessType
  | SendUserDataFailedType
  | UpdateUserImageType
  | UpdateProfileUserImageSuccessType
  | UpdateUserImageFailedType
  | EmptyUserProfileData;
