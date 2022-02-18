import { BASE_URL } from 'src/services/apiUrls';
import { getApiRequest } from 'src/services/api';
import { SIDE_MENU_ENDPOINT } from './apiEndPoints';
import { FetchSideMenuSuccessPayloadType } from 'src/redux/sideMenu/types';

export const fetchSideMenuApi = async () => {
  try {
    const response: FetchSideMenuSuccessPayloadType = await getApiRequest(
      `${BASE_URL}${SIDE_MENU_ENDPOINT}`,
    );
    //console.log( `MostReadService url: ${BASE_URL}${MOST_READ_ENDPOINT} response: ${JSON.stringify(response)}`, );
    return response;
  } catch (error) {
    console.log(`error: ${error}`);
    throw error;
  }
};