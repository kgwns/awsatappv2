import { UMS_BASE_URL } from 'src/services/apiUrls';
import { postApiRequest } from 'src/services/api';
import { SAVE_FCM_TOKEN_ENDPOINT } from './apiEndPoints';
import { SaveTokenAfterRegistraionBodyType, 
  SaveTokenAfterRegistraionSuccessPayloadType, 
  SaveTokenBodyType, 
  SaveTokenSuccessPayloadType } from 'src/redux/notificationSaveToken/types';

export const notificationSaveTokenRequest = async (body: SaveTokenBodyType) => {
  try {
    const response: SaveTokenSuccessPayloadType = await postApiRequest(
      `${UMS_BASE_URL}${SAVE_FCM_TOKEN_ENDPOINT}`,
      body
    );
    return response;
  } catch (error) {
    console.log('notificationSaveTokenService - notificationSaveTokenRequest - error', error)
    throw error;
  }
};

export const notificationSaveTokenAfterRegistrationRequest = async (body: SaveTokenAfterRegistraionBodyType) => {
  try {
    const response: SaveTokenAfterRegistraionSuccessPayloadType = await postApiRequest(
      `${UMS_BASE_URL}${SAVE_FCM_TOKEN_ENDPOINT}`,
      body
    );
    return response;
  } catch (error) {
    console.log('notificationSaveTokenService - notificationSaveTokenAfterRegistrationRequest - error', error)
    throw error;
  }
};
