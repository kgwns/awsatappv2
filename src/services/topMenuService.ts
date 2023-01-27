import { BASE_URL } from 'src/services/apiUrls';
import { getCacheApiRequest } from 'src/services/api';
import { TOP_MENU_ENDPOINT } from './apiEndPoints';
import { FetchTopMenuSuccessPayloadType } from 'src/redux/topMenu/types';

export const fetchTopMenuApi = async () => {
  try {
    const response: FetchTopMenuSuccessPayloadType = await getCacheApiRequest(
      `${BASE_URL}${TOP_MENU_ENDPOINT}`,
    );
    return response;
  } catch (error) {
    throw error;
  }
};