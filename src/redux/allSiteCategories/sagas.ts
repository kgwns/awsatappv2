import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import {
  FetchAllSiteCategoriesListSuccessPayloadType,
  FetchAllSiteCategoriesType,
} from './types';
import { fetchAllSiteCategoriesFailed, fetchAllSiteCategoriesSuccess } from './action';
import { FETCH_ALL_SITE_CATEGORIES } from './actionTypes';
import { fetchAllSiteCategoriesApi } from 'src/services/allSiteCategoriesService';

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

function* allSiteCategoriesSaga() {
  yield all([takeLatest(FETCH_ALL_SITE_CATEGORIES, fetchAllSiteCategories)]);
}

export default allSiteCategoriesSaga;