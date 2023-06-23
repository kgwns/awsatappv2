import { UMS_BASE_URL } from 'src/services/apiUrls';
import { getApiRequest, postApiRequest } from 'src/services/api';
import { GET_LIST_OF_NOTIFICATION_END_POINT, GET_SELECTED_NOTIFICATION_END_POINT, SEND_SELECTED_NOTIFICATION_END_POINT } from './apiEndPoints';
import { SendSelectedNotificationBody } from 'src/redux/keepNotified/types';

export const sendSelectedNotificationService = async (body: SendSelectedNotificationBody) => {
  try {
    return await postApiRequest(
      `${UMS_BASE_URL}${SEND_SELECTED_NOTIFICATION_END_POINT}`, body
    );
  } catch (error) {
    console.log('keepNotificationService - sendSelectedNotificationService - error', error)
    throw error;
  }
};

export const getSelectedNotificationService = async () => {
  try {
    return await postApiRequest(
      `${UMS_BASE_URL}${GET_SELECTED_NOTIFICATION_END_POINT}`,
    );
  } catch (error) {
    console.log('keepNotificationService - getSelectedNotificationService - error', error)
    throw error;
  }
};

export const getListOfNotificationService = async () => {
  try {
    return await getApiRequest(
      `${UMS_BASE_URL}${GET_LIST_OF_NOTIFICATION_END_POINT}`,
    );
  } catch (error) {
    console.log('keepNotificationService - getListOfNotificationService - error', error)
    throw error;
  }
};
