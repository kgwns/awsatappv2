import {
  FETCH_PODCAST_LIST,
  FETCH_PODCAST_LIST_SUCCESS,
  FETCH_PODCAST_LIST_FAILED,
  FETCH_PODCAST_EPISODE,
  FETCH_PODCAST_EPISODE_SUCCESS,
  FETCH_PODCAST_EPISODE_FAILED,
} from './actionTypes';
import { PodcastListActions, PodcastState } from './types';
const initialAuthState: PodcastState = {
  podcastListData: [],
  podcastEpisodeData: [],
  error: '',
  isLoading: true,
};

export default (state = initialAuthState, action: PodcastListActions) => {
  switch (action.type) {
    case FETCH_PODCAST_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        podcastListData: action.payload.podcastListData,
        error: '',
      };
    case FETCH_PODCAST_LIST_FAILED:
      return { ...state, error: action.payload.error, isLoading: false };
    case FETCH_PODCAST_LIST:
      return { ...state, isLoading: true, error: '' };
    case FETCH_PODCAST_EPISODE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        podcastEpisodeData: action.payload.podcastEpisodeData,
        error: '',
      };
    case FETCH_PODCAST_EPISODE_FAILED:
      return { ...state, error: action.payload.error, isLoading: false };
    case FETCH_PODCAST_EPISODE:
      return { ...state, isLoading: true, error: '' };
    default:
      return { ...state };
  }
};
