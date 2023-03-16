import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import { RequestStaticDetailType, StaticDetailDataType, StaticDetailSuccessPayload } from './types';
import { requestStaticDetail } from 'src/services/termsAndAboutUsService';
import { REQUEST_STATIC_DETAIL } from './actionType';
import { requestStaticDetailFailed, requestStaticDetailSuccess } from './action';
import { isNonEmptyArray } from 'src/shared/utils';

const formatData = (response: any): StaticDetailDataType[] => {
  let formattedData: StaticDetailDataType[] = []
    if (response && isNonEmptyArray(response.rows)) {
      const rows = response.rows
      formattedData = rows.map(
        ({ title, body_export }: any) => ({
          body: body_export,
          title
        })
      );
  }
  return formattedData
}


const parseRelatedArticleSuccess = (response: any): StaticDetailSuccessPayload => {
  const responseData: StaticDetailSuccessPayload = {
    data: []
  }
  responseData.data = formatData(response)
  return responseData
}


export function* fetchStaticDetail(action: RequestStaticDetailType) {
  try {
    const payload: { rows: any[], pager: object } = yield call(
      requestStaticDetail,
      action.payload
    );
    const response = parseRelatedArticleSuccess(payload)
    yield put(requestStaticDetailSuccess(response));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(requestStaticDetailFailed({ error: errorMessage.message }));
    }
  }
}

export function* termsAndAboutUsSaga() {
  yield all([
    takeLatest(REQUEST_STATIC_DETAIL, fetchStaticDetail),
  ]);
}

export default termsAndAboutUsSaga;
