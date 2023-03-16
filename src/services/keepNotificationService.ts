import { UMS_BASE_URL } from 'src/services/apiUrls';
import { getApiRequest, postApiRequest } from 'src/services/api';
import { GET_LIST_OF_NOTIFICATION_END_POINT, GET_SELECTED_NOTIFICATION_END_POINT, SEND_SELECTED_NOTIFICATION_END_POINT } from './apiEndPoints';
import { SendSelectedNotificationBody, SendSelectedNotificationSuccessPayload } from 'src/redux/keepNotified/types';

export const sendSelectedNotificationService = async (body: SendSelectedNotificationBody) => {
  try {
    const response: SendSelectedNotificationSuccessPayload = await postApiRequest(
      `${UMS_BASE_URL}${SEND_SELECTED_NOTIFICATION_END_POINT}`, body
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getSelectedNotificationService = async () => {
  try {
    const response = await postApiRequest(
      `${UMS_BASE_URL}${GET_SELECTED_NOTIFICATION_END_POINT}`,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getListOfNotificationService = async () => {
  try {
    const response = await getApiRequest(
      `${UMS_BASE_URL}${GET_LIST_OF_NOTIFICATION_END_POINT}`,
    );
    return response;
  } catch (error) {
    throw error;
  }
};
