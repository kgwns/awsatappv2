import {all, call, put, takeLatest} from 'redux-saga/effects';
import {AxiosError} from 'axios';
import {
  FetchRelatedOpinionSuccessPayloadType,
  FetchRelatedOpinionType,
  OpinionArticleDetailSuccessPayload,
  RequestOpinionArticleDetailType,
} from './types';
import {
  fetchRelatedOpinionFailed,
  fetchRelatedOpinionSuccess,
  requestOpinionArticleDetailFailed,
  requestOpinionArticleDetailSuccess,
} from './action';
import {requestOpinionArticleDetailAPI,fetchRelatedOpinionAPI} from 'src/services/opinionArticleDetailService';
import { EMPTY_RELATED_OPINION_DATA, REQUEST_OPINION_ARTICLE_DETAIL,REQUEST_RELATED_OPINION } from './actionTypes';

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

export function* emptyRelatedOpinionDataList() {
  emptyRelatedOpinionDataList();
}

function* opinionArticleDetailSaga() {
  yield all([takeLatest(REQUEST_OPINION_ARTICLE_DETAIL, fetchOpinionArticleDetail)]);
  yield all([takeLatest(REQUEST_RELATED_OPINION, fetchRelatedOpinion)]);
  yield all([takeLatest(EMPTY_RELATED_OPINION_DATA, emptyRelatedOpinionDataList)]);
}

export default opinionArticleDetailSaga;
