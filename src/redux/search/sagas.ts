import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import { FetchSearchSuccessPayloadType, FetchSearchRequestType } from './types';
import { fetchSearchFailed, fetchSearchSuccess } from './action';
import { FETCH_SEARCH_REQUEST } from './actionTypes';
import { fetchSearchApi } from 'src/services/searchService';
import {Alert} from 'react-native';

export function* fetchSearch(action: FetchSearchRequestType) {

  try {
    const payload: FetchSearchSuccessPayloadType = yield call(
      fetchSearchApi,
      action.payload,
    );
    yield put(fetchSearchSuccess({ searchData: payload }));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    Alert.alert(errorResponse.message);
    yield put(fetchSearchFailed({ error: errorResponse.message }));
  }
}

function* searchSaga() {
  yield all([takeLatest(FETCH_SEARCH_REQUEST, fetchSearch)]);
}

export default searchSaga;
