import {
  FetchProfileUserDetailsFailedPayloadtype,
  FetchProfileUserDetailsFailedType,
  FetchProfileUserDetailsSuccessType,
  FetchProfileUserDetailsSuccessPayloadType,
  SendUserDataFailedType,
  SendUserDataSuccessType,
  SendUserDataFailedPayloadtype,
  SendUserDataSuccessPayloadType,
  SendUserData,
  UpdateUserImageBodyType,
  UpdateUserImageType,
  UpdateUserImageFailedType,
  UpdateUserImageSuccessPayloadType,
  UpdateUserImageFailedPayloadType,
  UpdateUserprofileImageSuccessType,
} from 'src/redux/profileUserDetail/types';
import {
  FETCH_PROFILE_USER_DETAILS,
  FETCH_PROFILE_USER_DETAILS_ERROR,
  FETCH_PROFILE_USER_DETAILS_SUCCESS,
  SEND_USER_DETAILS,
  SEND_USER_DETAILS_SUCCESS,
  SEND_USER_DETAILS_ERROR,
  UPDATE_PROFILE_USER_IMAGE, UPDATE_USER_IMAGE_SUCCESS, UPDATE_USER_IMAGE_FAILED,EMPTY_USER_PROFILE_DATA
} from 'src/redux/profileUserDetail/actionTypes';

export const fetchUserProfileDetail = () => {
  return {
    type: FETCH_PROFILE_USER_DETAILS,
  };
};

export const fetchUserProfileDetailsSuccess = (
  payload: FetchProfileUserDetailsSuccessPayloadType,
): FetchProfileUserDetailsSuccessType => {
  return {
    type: FETCH_PROFILE_USER_DETAILS_SUCCESS,
    payload,
  };
};

export const fetchUserProfileDetailFailed = (
  payload: FetchProfileUserDetailsFailedPayloadtype,
): FetchProfileUserDetailsFailedType => {
  return {
    type: FETCH_PROFILE_USER_DETAILS_ERROR,
    payload,
  };
};

export const sendUserData = (payload: SendUserData) => {
  return {
    type: SEND_USER_DETAILS,
    payload,
  };
};

export const sendUserDataSuccess = (
  payload: SendUserDataSuccessPayloadType,
): SendUserDataSuccessType => {
  return {
    type: SEND_USER_DETAILS_SUCCESS,
    payload,
  };
};

export const sendUserDataFailed = (
  payload: SendUserDataFailedPayloadtype,
): SendUserDataFailedType => {
  return {
    type: SEND_USER_DETAILS_ERROR,
    payload,
  };
};

export const updateUserImage = (payload: UpdateUserImageBodyType): UpdateUserImageType => {
  return {
    type: UPDATE_PROFILE_USER_IMAGE,
    payload,
  };
};

export const updateUserImageSuccess = (
  payload: UpdateUserImageSuccessPayloadType,
): UpdateUserprofileImageSuccessType => {
  return {
    type: UPDATE_USER_IMAGE_SUCCESS,
    payload,
  };
};

export const updateUserImageFailed = (
  payload: UpdateUserImageFailedPayloadType,
): UpdateUserImageFailedType => {
  return {
    type: UPDATE_USER_IMAGE_FAILED,
    payload,
  };
};

export const emptyUserProfileData = () => {
  return {
    type: EMPTY_USER_PROFILE_DATA,
  };
};

export const UserProfileDetailActions = {
  fetchUserProfileDetail,
  fetchUserProfileDetailsSuccess,
  fetchUserProfileDetailFailed,
  sendUserData,
  sendUserDataSuccess,
  sendUserDataFailed,
  updateUserImage,
  updateUserImageSuccess,
  updateUserImageFailed,
  emptyUserProfileData,
};
