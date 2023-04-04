import { BASE_URL } from 'src/services/apiUrls';
import { getCacheApiRequest } from 'src/services/api';
import { VIDEO_LIST_ENDPOINT } from './apiEndPoints';
import { FetchVideoSuccessPayloadType } from 'src/redux/videoList/types';

export const fetchVideoListApi = async () => {
  try {
    const response: FetchVideoSuccessPayloadType = await getCacheApiRequest(
      `${BASE_URL}${VIDEO_LIST_ENDPOINT}`
    );
    return response;
  } catch (error) {
    console.log('videoListService - fetchVideoListApi - error', error)
    throw error;
  }
};
