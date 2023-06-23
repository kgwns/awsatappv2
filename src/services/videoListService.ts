import { BASE_URL } from 'src/services/apiUrls';
import { getCacheApiRequest } from 'src/services/api';
import { VIDEO_LIST_ENDPOINT } from './apiEndPoints';
import { VideoListBodyGet } from 'src/redux/videoList/types';

export const fetchVideoListApi = async (payload: VideoListBodyGet) => {
  const items_per_page = payload.items_per_page ? payload.items_per_page : 10;
  const page = payload.page ? payload.page : 0;
  try {
    return await getCacheApiRequest(
      `${BASE_URL}${VIDEO_LIST_ENDPOINT}?items_per_page=${items_per_page}&page=${page}`
    );
  } catch (error) {
    console.log('videoListService - fetchVideoListApi - error', error)
    throw error;
  }
};
