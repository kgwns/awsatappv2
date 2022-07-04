import { BASE_URL, PODCAST_SPREAKER_URL} from 'src/services/apiUrls';
import { getCacheApiRequest } from 'src/services/api';
import { PODCAST_LIST_ENDPOINT, PODCAST_NODE_ENDPOINT } from './apiEndPoints';
import { PodcastListBodyGet, PodcastEpisodeBodyGet } from 'src/redux/podcast/types';
import { FetchPodcastListSuccessPayloadtype, FetchPodcastEpisodeSuccessPayloadtype } from 'src/redux/podcast/types';

export const fetchPodcastListApi = async (body: PodcastListBodyGet) => {
  try {
    const response: FetchPodcastListSuccessPayloadtype = await getCacheApiRequest(
      `${BASE_URL}${PODCAST_LIST_ENDPOINT}${body.tid}`,
    );
    return response;
  } catch (error) {
    console.log(`error: ${error}`);
    throw error;
  }
};

export const fetchPodcastEpisodeApi = async (body: PodcastEpisodeBodyGet) => {
  try {
    const response: FetchPodcastEpisodeSuccessPayloadtype = await getCacheApiRequest(
      `${BASE_URL}${PODCAST_NODE_ENDPOINT}${body.nid}`,
    );
    return response;
  } catch (error) {
    console.log(`error: ${error}`);
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
    console.log(`error: ${error}`);
    throw error;
  }
};