import {
  FetchPodcastListSuccessPayloadtype,
  FetchPodcastListFailedPayloadtype,
  FetchPodcastListSuccessType,
  FetchPodcastListFailedType,
  PodcastListBodyGet,
  FetchPodcastEpisodeSuccessPayloadtype,
  FetchPodcastEpisodeFailedPayloadtype,
  FetchPodcastEpisodeSuccessType,
  FetchPodcastEpisodeFailedType,
  PodcastEpisodeBodyGet
} from './types';
import {
  FETCH_PODCAST_LIST,
  FETCH_PODCAST_LIST_SUCCESS,
  FETCH_PODCAST_LIST_FAILED,
  FETCH_PODCAST_EPISODE,
  FETCH_PODCAST_EPISODE_SUCCESS,
  FETCH_PODCAST_EPISODE_FAILED,
} from './actionTypes';

export const fetchPodcastList = (podcastListPayload: PodcastListBodyGet) => {
  return {
    type: FETCH_PODCAST_LIST,
    payload: podcastListPayload
  };
};

export const fetchPodcastListSuccess = (
  payload: FetchPodcastListSuccessPayloadtype,
): FetchPodcastListSuccessType => {
  return {
    type: FETCH_PODCAST_LIST_SUCCESS,
    payload,
  };
};

export const fetchPodcastListFailed = (
  payload: FetchPodcastListFailedPayloadtype,
): FetchPodcastListFailedType => {
  return {
    type: FETCH_PODCAST_LIST_FAILED,
    payload,
  };
};

export const fetchPodcastEpisode = (podcastEpisodePayload: PodcastEpisodeBodyGet) => {
  return {
    type: FETCH_PODCAST_EPISODE,
    payload: podcastEpisodePayload
  };
};

export const fetchPodcastEpisodeSuccess = (
  payload: FetchPodcastEpisodeSuccessPayloadtype,
): FetchPodcastEpisodeSuccessType => {
  return {
    type: FETCH_PODCAST_EPISODE_SUCCESS,
    payload,
  };
};

export const fetchPodcastEpisodeFailed = (
  payload: FetchPodcastEpisodeFailedPayloadtype,
): FetchPodcastEpisodeFailedType => {
  return {
    type: FETCH_PODCAST_EPISODE_FAILED,
    payload,
  };
};

export const podcastActions = {
  fetchPodcastList,
  fetchPodcastListSuccess,
  fetchPodcastListFailed,
  fetchPodcastEpisode,
  fetchPodcastEpisodeSuccess,
  fetchPodcastEpisodeFailed,
};
