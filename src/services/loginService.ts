import { UMS_BASE_URL } from 'src/services/apiUrls';
import { postApiRequest } from 'src/services/api';
import { LOGIN_ENDPOINT, LOGOUT_ENDPOINT } from './apiEndPoints';
import { FetchLoginPayloadType, FetchLoginSuccessPayloadType } from 'src/redux/login/types';

export const fetchLoginApi = async (body: FetchLoginPayloadType) => {
  try {
    const response: FetchLoginSuccessPayloadType = await postApiRequest(
      `${UMS_BASE_URL}${LOGIN_ENDPOINT}`,
      body,
    );
    return response;
  } catch (error) {
    console.log(`error: ${error}`);
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
    console.log(`error: ${error}`);
    throw error;
  }
};