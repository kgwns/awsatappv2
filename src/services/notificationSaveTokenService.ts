import { UMS_BASE_URL } from 'src/services/apiUrls';
import { postApiRequest } from 'src/services/api';
import { SAVE_FCM_TOKEN_ENDPOINT } from './apiEndPoints';
import { SaveTokenAfterRegistraionBodyType, 
  SaveTokenAfterRegistraionSuccessPayloadType, 
  SaveTokenBodyType, 
  SaveTokenSuccessPayloadType } from 'src/redux/notificationSaveToken/types';

export const notificationSaveTokenReuqest = async (body: SaveTokenBodyType) => {
  try {
    const response: SaveTokenSuccessPayloadType = await postApiRequest(
      `${UMS_BASE_URL}${SAVE_FCM_TOKEN_ENDPOINT}`,
      body
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const notificationSaveTokenAfterRegistraionReuqest = async (body: SaveTokenAfterRegistraionBodyType) => {
  try {
    const response: SaveTokenAfterRegistraionSuccessPayloadType = await postApiRequest(
      `${UMS_BASE_URL}${SAVE_FCM_TOKEN_ENDPOINT}`,
      body
    );
    return response;
  } catch (error) {
    throw error;
  }
};
