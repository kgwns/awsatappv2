import { BASE_URL } from 'src/services/apiUrls';
import { getCacheApiRequest } from 'src/services/api';
import { MOST_READ_ENDPOINT } from './apiEndPoints';
import { FetchMostReadSuccessPayloadType } from 'src/redux/mostRead/types';

export const fetchMostReadApi = async () => {
  try {
    const response: FetchMostReadSuccessPayloadType = await getCacheApiRequest(
      `${BASE_URL}${MOST_READ_ENDPOINT}`,
    );
    //console.log( `MostReadService url: ${BASE_URL}${MOST_READ_ENDPOINT} response: ${JSON.stringify(response)}`, );
    return response;
  } catch (error) {
    throw error;
  }
};