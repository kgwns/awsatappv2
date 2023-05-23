import { UMS_BASE_URL } from 'src/services/apiUrls';
import { postApiRequest } from 'src/services/api';
import { FORGOT_PASSWORD_ENDPOINT, LOGIN_ENDPOINT, LOGOUT_ENDPOINT } from './apiEndPoints';
import { FetchLoginPayloadType, ForgotPasswordRequestPayloadType } from 'src/redux/login/types';

export const fetchLoginApi = async (body: FetchLoginPayloadType) => {
  try {
    return await postApiRequest(
      `${UMS_BASE_URL}${LOGIN_ENDPOINT}`,
      body,
    );
  } catch (error) {
    console.log('loginService - fetchLoginApi - error', error)
    throw error;
  }
};

export const fetchLogoutApi = async () => {
  try {
    return await postApiRequest(
      `${UMS_BASE_URL}${LOGOUT_ENDPOINT}`
    );
  } catch (error) {
    console.log('loginService - fetchLogoutApi - error', error)
    throw error;
  }
};

export const forgotPasswordApi = async (body: ForgotPasswordRequestPayloadType) => {
  try {
    return await postApiRequest(
      `${UMS_BASE_URL}${FORGOT_PASSWORD_ENDPOINT}?email=${body.email}`,
    );
  } catch (error) {
    console.log('loginService - forgotPasswordApi - error', error)
    throw error;
  }
};
