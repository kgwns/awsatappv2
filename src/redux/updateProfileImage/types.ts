import { UPDATE_PROFILE_USER_IMAGE, UPDATE_USER_IMAGE_SUCCESS, UPDATE_USER_IMAGE_FAILED } from './actionTypes';

export interface UpdateUserImageSuccessType {
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
}

export interface UpdateUserImageMessageType {
  code?: number;
  message: string;
}

export interface UpdateUserImageBodyType {
  image: string;
}


export interface UpdateUserImageSuccessPayloadType {
  user: UpdateUserImageSuccessType | null,
  message: UpdateUserImageMessageType,
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

export type UpdateUserImageAction =
  | UpdateUserImageType
  | UpdateProfileUserImageSuccessType
  | UpdateUserImageFailedType;
