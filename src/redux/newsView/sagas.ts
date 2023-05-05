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
import { isNonEmptyArray } from 'src/shared/utils';
import { getArticleImage } from 'src/shared/utils/utilities';
import { LatestArticleDataType } from '../latestNews/types';

export const formatTopListToLatestArticleType = (response: any): LatestArticleDataType[] => {
  let formattedData: LatestArticleDataType[] = []
    if (response && isNonEmptyArray(response.rows)) {
      const rows = response.rows
      formattedData = rows.map(
        ({ title, body, nid, field_image, field_news_categories_export,author_resource,created_export,
          field_new_photo, changed, field_display_export
        }: any) => ({
          body,
          title,
          nid,
          image: getArticleImage(field_image, field_new_photo),
          news_categories: isNonEmptyArray(field_news_categories_export) ? field_news_categories_export[0] : field_news_categories_export,
          author: author_resource,
          created: changed,
          isBookmarked: false,
          displayType: field_display_export,
        })
      );
    }
  return formattedData
}

export function* fetchHeroList(action: FetchHeroListType) {

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
