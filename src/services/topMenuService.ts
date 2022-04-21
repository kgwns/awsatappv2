import { BASE_URL } from 'src/services/apiUrls';
import { getCacheApiRequest } from 'src/services/api';
import { TOP_MENU_ENDPOINT } from './apiEndPoints';
import { FetchTopMenuSuccessPayloadType } from 'src/redux/topMenu/types';

export const fetchTopMenuApi = async () => {
  try {
    const response: FetchTopMenuSuccessPayloadType = await getCacheApiRequest(
      `${BASE_URL}${TOP_MENU_ENDPOINT}`,
    );
    //console.log( `MostReadService url: ${BASE_URL}${MOST_READ_ENDPOINT} response: ${JSON.stringify(response)}`, );
    return response;
  } catch (error) {
    console.log(`error: ${error}`);
    throw error;
  }
};