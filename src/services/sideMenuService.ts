import { BASE_URL } from 'src/services/apiUrls';
import { getCacheApiRequest } from 'src/services/api';
import { SIDE_MENU_ENDPOINT } from './apiEndPoints';

export const fetchSideMenuApi = async () => {
  try {
    return await getCacheApiRequest(
      `${BASE_URL}${SIDE_MENU_ENDPOINT}`,
    );
  } catch (error) {
    console.log('sideMenuService - fetchSideMenuApi - error', error)
    throw error;
  }
};
