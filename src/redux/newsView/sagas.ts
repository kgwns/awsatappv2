import {all, call, put, takeLatest} from 'redux-saga/effects';
import {AxiosError} from 'axios';
import {
  FetchBottomListSuccessPayloadType,
  FetchBottomListType,
  FetchHeroListSuccessPayloadType,
  FetchHeroListType,
  FetchTopListSuccessPayloadType,
  FetchTopListType,
} from './types';
import {
  fetchHeroListFailed,
  fetchHeroListSuccess,
  fetchTopListSuccess,
  fetchTopListFailed,
  fetchBottomListSuccess,
  fetchBottomListFailed,
} from './action';
import {
  REQUEST_BOTTOM_LIST_DATA,
  REQUEST_HERO_LIST_DATA,
  REQUEST_TOP_LIST_DATA,
} from './actionTypes';
import {fetchNewsViewApi} from 'src/services/newsViewService';

export function* fetchHeroList(action: FetchHeroListType) {
  // console.log("saga fetchHeroList");
  try {
    const payload: FetchHeroListSuccessPayloadType = yield call(
      fetchNewsViewApi,
      action.payload,
    );
    yield put(fetchHeroListSuccess({heroListData: payload}));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: {message: string} = errorResponse.response.data;
      yield put(fetchHeroListFailed({error: errorMessage.message}));
    }
  }
}

export function* fetchTopList(action: FetchTopListType) {
  // console.log("saga fetchTopList");
  try {
    const payload: FetchTopListSuccessPayloadType = yield call(
      fetchNewsViewApi,
      action.payload,
    );
    yield put(fetchTopListSuccess({topListData: payload}));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: {message: string} = errorResponse.response.data;
      yield put(fetchTopListFailed({error: errorMessage.message}));
    }
  }
}

export function* fetchBottomList(action: FetchBottomListType) {
  // console.log('saga fetchBottomList');
  try {
    const payload: FetchBottomListSuccessPayloadType = yield call(
      fetchNewsViewApi,
      action.payload,
    );
    yield put(fetchBottomListSuccess({bottomListData: payload}));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: {message: string} = errorResponse.response.data;
      yield put(fetchBottomListFailed({error: errorMessage.message}));
    }
  }
}

function* newsViewSaga() {
  yield all([takeLatest(REQUEST_HERO_LIST_DATA, fetchHeroList)]);
  yield all([takeLatest(REQUEST_TOP_LIST_DATA, fetchTopList)]);
  yield all([takeLatest(REQUEST_BOTTOM_LIST_DATA, fetchBottomList)]);
}

export default newsViewSaga;
