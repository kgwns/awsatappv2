import { BASE_URL } from 'src/services/apiUrls';
import { getApiRequest } from 'src/services/api';
import { VIDEO_LIST_ENDPOINT } from './apiEndPoints';
import { FetchVideoSuccessPayloadType } from 'src/redux/videoList/types';

export const fetchVideoListApi = async () => {
  try {
    const response: FetchVideoSuccessPayloadType = await getApiRequest(
      `${BASE_URL}${VIDEO_LIST_ENDPOINT}`
    );
    console.log( `VideoService url: ${BASE_URL}${VIDEO_LIST_ENDPOINT} response: ${JSON.stringify(response)}`);
    return response;
  } catch (error) {
    console.log(`error: ${error}`);
    throw error;
  }
};