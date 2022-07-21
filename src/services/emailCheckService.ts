import { UMS_BASE_URL } from 'src/services/apiUrls';
import { postApiRequest } from 'src/services/api';
import { CHECK_EMAIL } from './apiEndPoints';
import { FetchEmailCheckPayloadType, FetchEmailCheckSuccessPayloadType } from 'src/redux/auth/types';

export const fetchEmailCheckApi = async (body: FetchEmailCheckPayloadType) => {
  try {
    const response: FetchEmailCheckSuccessPayloadType = await postApiRequest(
      `${UMS_BASE_URL}${CHECK_EMAIL}`,
      body,
    );
    return response;
  } catch (error) {
    throw error;
  }
};