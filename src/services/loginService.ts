import { UMS_BASE_URL } from 'src/services/apiUrls';
import { postApiRequest } from 'src/services/api';
import { FORGOT_PASSWORD_ENDPOINT, LOGIN_ENDPOINT, LOGOUT_ENDPOINT } from './apiEndPoints';
import { FetchLoginPayloadType, FetchLoginSuccessPayloadType, ForgotPasswordRequestPayloadType } from 'src/redux/login/types';

export const fetchLoginApi = async (body: FetchLoginPayloadType) => {
  try {
    const response: FetchLoginSuccessPayloadType = await postApiRequest(
      `${UMS_BASE_URL}${LOGIN_ENDPOINT}`,
      body,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchLogoutApi = async () => {
  try {
    const response: FetchLoginSuccessPayloadType = await postApiRequest(
      `${UMS_BASE_URL}${LOGOUT_ENDPOINT}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const forgotPasswordApi = async (body: ForgotPasswordRequestPayloadType) => {
  try {
    const response: FetchLoginSuccessPayloadType = await postApiRequest(
      `${UMS_BASE_URL}${FORGOT_PASSWORD_ENDPOINT}?email=${body.email}`,undefined,undefined,undefined

    );
    return response;
  } catch (error) {
    throw error;
  }
};