import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import {
  FetchAllSiteCategoriesListSuccessPayloadType,
  FetchAllSiteCategoriesType,
  SendSelectedTopicType,
} from './types';
import { fetchAllSiteCategoriesFailed, fetchAllSiteCategoriesSuccess, sendSelectedTopicFailed, sendSelectedTopicSuccess } from './action';
import { FETCH_ALL_SITE_CATEGORIES, SEND_SELECTED_TOPIC } from './actionTypes';
import { fetchAllSiteCategoriesApi, sendSelectedTopicsApi } from 'src/services/allSiteCategoriesService';

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

function* allSiteCategoriesSaga() {
  yield all([takeLatest(FETCH_ALL_SITE_CATEGORIES, fetchAllSiteCategories)]);
  yield all([takeLatest(SEND_SELECTED_TOPIC, postSelectedTopics)]);
}

export default allSiteCategoriesSaga;