import { BASE_URL, PODCAST_SPREAKER_URL} from 'src/services/apiUrls';
import { getCacheApiRequest } from 'src/services/api';
import { PODCAST_LIST_ENDPOINT, PODCAST_NODE_ENDPOINT } from './apiEndPoints';
import { FetchPodcastEpisodeSuccessPayloadtype, PodcastListBodyGet, PodcastEpisodeBodyGet } from 'src/redux/podcast/types';

export const fetchPodcastListApi = async (body: PodcastListBodyGet) => {
  try {
    return await getCacheApiRequest(
      `${BASE_URL}${PODCAST_LIST_ENDPOINT}${body.tid}`,
    );
  } catch (error) {
    console.log('podcastService - fetchPodcastListApi - error', error)
    throw error;
  }
};

export const fetchPodcastEpisodeApi = async (body: PodcastEpisodeBodyGet) => {
  try {
    return await getCacheApiRequest(
      `${BASE_URL}${PODCAST_NODE_ENDPOINT}${body.nid}`,
    );
  } catch (error) {
    console.log('podcastService - fetchPodcastEpisodeApi - error', error)
    throw error;
  }
};

export const fetchSingleEpisodeSpreakerApi = async (body: any) => {
  try {
    const response: FetchPodcastEpisodeSuccessPayloadtype = await getCacheApiRequest(
      `${PODCAST_SPREAKER_URL}${body.episodeId}`,
    );
    return response;
  } catch (error) {
    console.log('podcastService - fetchSingleEpisodeSpreakerApi - error', error)
    throw error;
  }
};
