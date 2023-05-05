import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import {
  FetchAllSiteCategoriesListSuccessPayloadType,
  FetchAllSiteCategoriesType,
  SendSelectedTopicType,
  GetSelectedTopicsSuccessPayloadType,
  GetSelectedTopicsType,
} from './types';
import { fetchAllSiteCategoriesFailed, 
  fetchAllSiteCategoriesSuccess, 
  sendSelectedTopicFailed, 
  sendSelectedTopicSuccess,
  getSelectedTopicsFailed, 
  getSelectedTopicsSuccess,  } from './action';
import { FETCH_ALL_SITE_CATEGORIES, SEND_SELECTED_TOPIC,GET_SELECTED_TOPICS } from './actionTypes';
import { fetchAllSiteCategoriesApi, sendSelectedTopicsApi,getSelectedTopicsApi } from 'src/services/allSiteCategoriesService';

export function* fetchAllSiteCategories(action: FetchAllSiteCategoriesType) {

  try {
    const payload: FetchAllSiteCategoriesListSuccessPayloadType = yield call(
      fetchAllSiteCategoriesApi,
      action.payload,
    );
    yield put(fetchAllSiteCategoriesSuccess({ allSiteCategoriesListData: payload }));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(fetchAllSiteCategoriesFailed({ error: errorMessage.message }));
    }
  }
}
export function* postSelectedTopics(action: SendSelectedTopicType) {

  try {
    const payload: {message: any} = yield call(
      sendSelectedTopicsApi,
      action.payload,
    );
    yield put(sendSelectedTopicSuccess({ saveData: payload.message }));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(sendSelectedTopicFailed({ error: errorMessage.message }));
    }
  }
}

export function* getSelectedtTopics(action:GetSelectedTopicsType) {
  try {
    const payload: GetSelectedTopicsSuccessPayloadType = yield call(
      getSelectedTopicsApi,
    );
    yield put(getSelectedTopicsSuccess({ selectedTopicsData: payload }));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(getSelectedTopicsFailed({ error: errorMessage.message }));
    }
  }
}


function* allSiteCategoriesSaga() {
  yield all([takeLatest(FETCH_ALL_SITE_CATEGORIES, fetchAllSiteCategories)]);
  yield all([takeLatest(SEND_SELECTED_TOPIC, postSelectedTopics)]);
  yield all([takeLatest(GET_SELECTED_TOPICS, getSelectedtTopics)]);
}

export default allSiteCategoriesSaga;
