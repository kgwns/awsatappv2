import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import { 
  FetchPodcastListSuccessPayloadtype,
  FetchPodcastListType,
  FetchPodcastEpisodeSuccessPayloadtype,
  FetchPodcastEpisodeType,
} from './types';
import { 
  fetchPodcastListFailed,
  fetchPodcastListSuccess,
  fetchPodcastEpisodeFailed,
  fetchPodcastEpisodeSuccess,
} from './action';
import { FETCH_PODCAST_EPISODE, FETCH_PODCAST_LIST } from './actionTypes';
import { fetchPodcastListApi, fetchPodcastEpisodeApi } from 'src/services/podcastService';
import { isNonEmptyArray, isNotEmpty } from 'src/shared/utils';
import { decode } from 'html-entities';

const formatData = (response: any): FetchPodcastEpisodeType[] => {
  let formattedData: FetchPodcastEpisodeType[] = []
    if (response && isNonEmptyArray(response.rows)) {
      const rows = response.rows
      formattedData = rows.map(
        ({ nid,
          type,
          view_node,
          field_new_sub_title_export,
          title,
          field_announcer_name_export,
          field_apple_podcast_export,
          body_export,
          field_total_duration_export,
          field_episode_export,
          field_google_podcast_export,
          field_podcast_image_export,
          field_podcast_sect_export,
          field_spotify_export,
          field_spreaker_episode_export,
          field_spreaker_show_export,
          created_export }: any) => ({
            nid,
            type,
            view_node,
            field_new_sub_title_export: isNotEmpty(field_new_sub_title_export) ? decode(field_new_sub_title_export) : '',
            title: isNotEmpty(title) ? decode(title) : '',
            field_announcer_name_export,
            field_apple_podcast_export,
            body_export,
            field_total_duration_export,
            field_episode_export,
            field_google_podcast_export,
            field_podcast_image_export,
            field_podcast_sect_export,
            field_spotify_export,
            field_spreaker_episode_export,
            field_spreaker_show_export,
            created_export,
          })
      );
    }
  return formattedData
}


const parsePodcastList = (response: any): FetchPodcastListSuccessPayloadtype => {
  const responseData: FetchPodcastListSuccessPayloadtype = {
    podcastListData: []
  }
  responseData.podcastListData = formatData(response)
  return responseData
}

const parsePodcastEpisode = (response: any): FetchPodcastEpisodeSuccessPayloadtype => {
  const responseData: FetchPodcastEpisodeSuccessPayloadtype = {
    podcastEpisodeData: []
  }
  responseData.podcastEpisodeData = formatData(response)
  return responseData
}

export function* fetchPodcastList(action: FetchPodcastListType) {
  try {
    const payload: FetchPodcastListSuccessPayloadtype = yield call(
      fetchPodcastListApi,
      action.payload
    );
    const response = parsePodcastList(payload)
    yield put(fetchPodcastListSuccess(response));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    yield put(fetchPodcastListFailed({ error: errorResponse.message }));
  }
}

export function* fetchPodcastEpisode(action: FetchPodcastEpisodeType) {
  try {
    const payload: FetchPodcastEpisodeSuccessPayloadtype = yield call(
      fetchPodcastEpisodeApi,
      action.payload
    );
    const response = parsePodcastEpisode(payload)
    yield put(fetchPodcastEpisodeSuccess(response));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    yield put(fetchPodcastEpisodeFailed({ error: errorResponse.message }));
  }
}

function* podcastSaga() {
  yield all([takeLatest(FETCH_PODCAST_LIST, fetchPodcastList)]);
  yield all([takeLatest(FETCH_PODCAST_EPISODE, fetchPodcastEpisode)]);
}

export default podcastSaga;
