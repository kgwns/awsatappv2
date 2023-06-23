import { UMS_BASE_URL } from 'src/services/apiUrls';
import { postApiRequest } from 'src/services/api';
import { CHECK_EMAIL } from './apiEndPoints';
import { FetchEmailCheckPayloadType } from 'src/redux/auth/types';

export const fetchEmailCheckApi = async (body: FetchEmailCheckPayloadType) => {
  try {
    return await postApiRequest(
      `${UMS_BASE_URL}${CHECK_EMAIL}`,
      body,
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};
