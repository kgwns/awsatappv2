import { BASE_URL } from 'src/services/apiUrls';
import { getApiRequest } from 'src/services/api';
import { SEARCH_ENDPOINT } from './apiEndPoints';
import { FetchSearchRequestPayloadType } from 'src/redux/search/types';

export const fetchSearchApi = async (
  requestObject: FetchSearchRequestPayloadType,
) => {
  try {
    return await getApiRequest(
      `${BASE_URL}${SEARCH_ENDPOINT}`,
      {
        params: {
          'title': requestObject.searchText,
        },
      },
    );
  } catch (error) {
    console.log('searchService - fetchSearchApi - error', error)
    throw error;
  }
};
