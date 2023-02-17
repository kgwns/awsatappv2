import {all, call, put, takeLatest} from 'redux-saga/effects';
import {AxiosError} from 'axios';
import {
  FetchNarratedOpinionSuccessPayloadType,
  FetchNarratedOpinionType,
  FetchRelatedOpinionSuccessPayloadType,
  FetchRelatedOpinionType,
  OpinionArticleDetailSuccessPayload,
  RequestOpinionArticleDetailType,
} from './types';
import {
  fetchNarratedOpinionFailed,
  fetchNarratedOpinionSuccess,
  fetchRelatedOpinionFailed,
  fetchRelatedOpinionSuccess,
  requestOpinionArticleDetailFailed,
  requestOpinionArticleDetailSuccess,
} from './action';
import {requestOpinionArticleDetailAPI,fetchRelatedOpinionAPI} from 'src/services/opinionArticleDetailService';
import { REQUEST_NARRATED_OPINION_ARTICLE, REQUEST_OPINION_ARTICLE_DETAIL,REQUEST_RELATED_OPINION } from './actionTypes';
import { fetchNarratedOpinionArticleApi } from 'src/services/narratedOpinionArticleService';

export function* fetchOpinionArticleDetail(
  action: RequestOpinionArticleDetailType,
) {
  try {
    const payload: OpinionArticleDetailSuccessPayload = yield call(
      requestOpinionArticleDetailAPI,
      action.payload,
    );

    yield put(
      requestOpinionArticleDetailSuccess({opinionArticleDetailData: payload}),
    );
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: {message: string} = errorResponse.response.data;
      yield put(
        requestOpinionArticleDetailFailed({error: errorMessage.message}),
      );
    }
  }
}

export function* fetchRelatedOpinion(
  action: FetchRelatedOpinionType,
) {
  try {
    const payload: FetchRelatedOpinionSuccessPayloadType = yield call(
      fetchRelatedOpinionAPI,
      action.payload,
    );

    yield put(
      fetchRelatedOpinionSuccess({relatedOpinionListData: payload}),
    );
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: {message: string} = errorResponse.response.data;
      yield put(
        fetchRelatedOpinionFailed({error: errorMessage.message}),
      );
    }
  }
}

export function* fetchNarratedOpinion(
  action: FetchNarratedOpinionType,
) {
  try {
    const payload: FetchNarratedOpinionSuccessPayloadType = yield call(
      fetchNarratedOpinionArticleApi,
      action.payload,
    );

    yield put(
      fetchNarratedOpinionSuccess({mediaData: payload}),
    );
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: {message: string} = errorResponse.response.data;
      yield put(
        fetchNarratedOpinionFailed({error: errorMessage.message}),
      );
    }
  }
}

function* opinionArticleDetailSaga() {
  yield all([takeLatest(REQUEST_OPINION_ARTICLE_DETAIL, fetchOpinionArticleDetail)]);
  yield all([takeLatest(REQUEST_RELATED_OPINION, fetchRelatedOpinion)]);
  yield all([takeLatest(REQUEST_NARRATED_OPINION_ARTICLE, fetchNarratedOpinion)]);
}

export default opinionArticleDetailSaga;
