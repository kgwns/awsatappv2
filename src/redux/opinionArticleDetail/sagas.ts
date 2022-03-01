import {all, call, put, takeLatest} from 'redux-saga/effects';
import {AxiosError} from 'axios';
import {
  OpinionArticleDetailSuccessPayload,
  RequestOpinionArticleDetailType,
} from './types';
import {
  requestOpinionArticleDetailFailed,
  requestOpinionArticleDetailSuccess,
} from './action';
import {requestOpinionArticleDetailAPI} from 'src/services/opinionArticleDetailService';
import {OPINION_ARTICLE_DETAIL} from 'src/services/apiEndPoints';
import { REQUEST_OPINION_ARTICLE_DETAIL } from './actionTypes';

export function* fetchOpinionArticleDetail(
  action: RequestOpinionArticleDetailType,
) {
    console.log('saga')
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

function* opinionArticleDetailSaga() {
  yield all([takeLatest(REQUEST_OPINION_ARTICLE_DETAIL, fetchOpinionArticleDetail)]);
}

export default opinionArticleDetailSaga;
