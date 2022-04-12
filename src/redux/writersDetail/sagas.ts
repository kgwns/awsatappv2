import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import {
  FetchWriterDetailSuccessPayloadType,
  FetchWriterDetailType
} from './types';
import { fetchWriterDetailSuccess, fetchWriterDetailFailed } from './action';
import { fetchWriterDetailInfo } from 'src/services/writerDetailService';
import { FETCH_WRITER_DETAIL } from './actionTypes';
import { isNonEmptyArray } from 'src/shared/utils';

const parseWriterDetailSuccess = (response: any): any[] => {
  if (response && isNonEmptyArray(response.rows)) {
    return response.rows
  }
  return []
}

export function* fetchWriterDetails(action: FetchWriterDetailType) {
  try {
    const payload: FetchWriterDetailSuccessPayloadType = yield call(
      fetchWriterDetailInfo,
      action.payload,
    );
    const response = parseWriterDetailSuccess(payload)
    yield put(fetchWriterDetailSuccess({ writersDetail: response }));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(fetchWriterDetailFailed({ error: errorMessage.message }));
    }
  }
}

function* writerDetailSaga() {
  yield all([takeLatest(FETCH_WRITER_DETAIL, fetchWriterDetails)]);
}

export default writerDetailSaga;
