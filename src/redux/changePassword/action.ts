import {
  SendChangePasswordFailedType,
  SendChangePasswordSuccessType,
  SendNewPasswordFailedPayloadtype,
  SendNewPasswordSuccessPayloadType,
  SendNewPassword
} from 'src/redux/changePassword/types';
import {
  CHANGE_PASSWORD, CHANGE_PASSWORD_ERROR, CHANGE_PASSWORD_SUCCESS
} from 'src/redux/changePassword/actionTypes';

export const changePassword = (payload: SendNewPassword) => {
  return {
    type: CHANGE_PASSWORD,
    payload,
  };
};

export const changePasswordSuccess = (
  payload: SendNewPasswordSuccessPayloadType,
): SendChangePasswordSuccessType => {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
    payload,
  };
};

export const changePasswordFailed = (
  payload: SendNewPasswordFailedPayloadtype,
):   SendChangePasswordFailedType => {
  return {
    type: CHANGE_PASSWORD_ERROR,
    payload,
  };
};
export const UserProfileDetailActions = {
  changePassword,
  changePasswordSuccess,
  changePasswordFailed,
};
