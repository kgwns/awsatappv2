import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import { FetchSearchSuccessPayloadType, FetchSearchRequestType } from './types';
import { fetchSearchFailed, fetchSearchSuccess } from './action';
import { FETCH_SEARCH_REQUEST } from './actionTypes';
import { fetchSearchApi } from 'src/services/searchService';

export function* fetchSearch(action: FetchSearchRequestType) {
  //console.log("saga fetchSearch");

  try {
    const payload: FetchSearchSuccessPayloadType = yield call(
      fetchSearchApi,
      action.payload,
    );
    yield put(fetchSearchSuccess({ searchData: payload }));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    yield put(fetchSearchFailed({ error: errorResponse.message }));
  }
}

function* searchSaga() {
  yield all([takeLatest(FETCH_SEARCH_REQUEST, fetchSearch)]);
}

export default searchSaga;