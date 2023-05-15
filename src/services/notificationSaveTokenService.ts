import { UMS_BASE_URL } from 'src/services/apiUrls';
import { postApiRequest } from 'src/services/api';
import { SAVE_FCM_TOKEN_ENDPOINT } from './apiEndPoints';
import {
  SaveTokenAfterRegistraionBodyType, 
  SaveTokenBodyType
} from 'src/redux/notificationSaveToken/types';

export const notificationSaveTokenRequest = async (body: SaveTokenBodyType) => {
  try {
    return await postApiRequest(
      `${UMS_BASE_URL}${SAVE_FCM_TOKEN_ENDPOINT}`,
      body
    );
  } catch (error) {
    console.log('notificationSaveTokenService - notificationSaveTokenRequest - error', error)
    throw error;
  }
};

export const notificationSaveTokenAfterRegistrationRequest = async (body: SaveTokenAfterRegistraionBodyType) => {
  try {
    return await postApiRequest(
      `${UMS_BASE_URL}${SAVE_FCM_TOKEN_ENDPOINT}`,
      body
    );
  } catch (error) {
    console.log('notificationSaveTokenService - notificationSaveTokenAfterRegistrationRequest - error', error)
    throw error;
  }
};
