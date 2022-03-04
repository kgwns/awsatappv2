import { UPDATE_PROFILE_USER_IMAGE, UPDATE_USER_IMAGE_SUCCESS, UPDATE_USER_IMAGE_FAILED } from './actionTypes';
import {
  UpdateUserImageBodyType,
  UpdateUserImageType,
  UpdateUserImageSuccessType,
  UpdateUserImageFailedType,
  UpdateUserImageSuccessPayloadType,
  UpdateUserImageFailedPayloadType,
  UpdateUserprofileImageSuccessType,
} from './types';
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
