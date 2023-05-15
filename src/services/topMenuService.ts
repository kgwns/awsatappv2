import { BASE_URL } from 'src/services/apiUrls';
import { getCacheApiRequest } from 'src/services/api';
import { TOP_MENU_ENDPOINT } from './apiEndPoints';

export const fetchTopMenuApi = async () => {
  try {
    return await getCacheApiRequest(
      `${BASE_URL}${TOP_MENU_ENDPOINT}`,
    );
  } catch (error) {
    console.log('topMenuService - fetchTopMenuApi - error', error)
    throw error;
  }
};
