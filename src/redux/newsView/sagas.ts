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
  EMPTY_ALL_LIST,
} from './actionTypes';
import {fetchNewsViewApi} from 'src/services/newsViewService';
import { isNonEmptyArray } from 'src/shared/utils';
import { getImageUrl } from 'src/shared/utils/utilities';
import { LatestArticleDataType } from '../latestNews/types';

const formatTopListToLatestArticleType = (response: any): LatestArticleDataType[] => {
  let formattedData: LatestArticleDataType[] = []
  if (response) {
    if (isNonEmptyArray(response.rows)) {
      const rows = response.rows
      formattedData = rows.map(
        ({ title, body, nid, field_image, field_news_categories_export,author_resource,created_export }: any) => ({
          body,
          title,
          nid,
          image: getImageUrl(field_image),
          news_categories: field_news_categories_export,
          author: author_resource,
          created: created_export,
          isBookmarked: false
        })
      );
    }
  }
  return formattedData
}

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
    const response = formatTopListToLatestArticleType(payload)
    yield put(fetchTopListSuccess({topListData: response}));
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

export function* emptyAllList() {
  emptyAllList();
}

function* newsViewSaga() {
  yield all([takeLatest(REQUEST_HERO_LIST_DATA, fetchHeroList)]);
  yield all([takeLatest(REQUEST_TOP_LIST_DATA, fetchTopList)]);
  yield all([takeLatest(REQUEST_BOTTOM_LIST_DATA, fetchBottomList)]);
  yield all([takeLatest(EMPTY_ALL_LIST, emptyAllList)]);
}

export default newsViewSaga;
