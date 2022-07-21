import { BASE_URL } from 'src/services/apiUrls';
import { getApiRequest } from 'src/services/api';
import { SEARCH_ENDPOINT } from './apiEndPoints';
import { FetchSearchSuccessPayloadType, FetchSearchRequestPayloadType } from 'src/redux/search/types';

export const fetchSearchApi = async (
  requestObject: FetchSearchRequestPayloadType,
) => {
  try {
    const response: FetchSearchSuccessPayloadType = await getApiRequest(
      `${BASE_URL}${SEARCH_ENDPOINT}`,
      {
        params: {
          'title': requestObject.searchText,
        },
      },
    );
    console.log( `SearchService url: ${BASE_URL}${SEARCH_ENDPOINT} response: ${JSON.stringify(response)}`);
    return response;
  } catch (error) {
    throw error;
  }
};
