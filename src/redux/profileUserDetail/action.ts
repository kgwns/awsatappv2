import {
  FetchProfileUserDetailsFailedPayloadtype,
  FetchProfileUserDetailsFailedType,
  FetchProfileUserDetailsSuccessType,
  FetchProfileUserDetailsSuccessPayloadType,
  SendUserDataFailedType,
  SendUserDataSuccessType,
  SendUserDataFailedPayloadtype,
  SendUserDataSuccessPayloadType,
  SendUserData
} from 'src/redux/profileUserDetail/types';
import {
  FETCH_PROFILE_USER_DETAILS,
  FETCH_PROFILE_USER_DETAILS_ERROR,
  FETCH_PROFILE_USER_DETAILS_SUCCESS,
  SEND_USER_DETAILS,
  SEND_USER_DETAILS_SUCCESS,
  SEND_USER_DETAILS_ERROR
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

export const UserProfileDetailActions = {
  fetchUserProfileDetail,
  fetchUserProfileDetailsSuccess,
  fetchUserProfileDetailFailed,
  sendUserData,
  sendUserDataSuccess,
  sendUserDataFailed,
};
