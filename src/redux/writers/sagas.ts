import {all, call, put, takeLatest} from 'redux-saga/effects';
import {AxiosError} from 'axios';
import {
  FetchOpinionWriterListSuccessPayloadType,
  FetchOpinionWrtiterType,
} from './types';
import {fetchOpinionWriterFailed, fetchOpinionWriterSuccess} from './action';
import {FETCH_OPINION_WRITER} from './actionTypes';
import {fetchOpinionWriterApi} from 'src/services/opinionWriterService';

export function* fetchOpinionWriter(action: FetchOpinionWrtiterType) {

  try {
    const payload: FetchOpinionWriterListSuccessPayloadType = yield call(
      fetchOpinionWriterApi,
      action.payload,
    );
    yield put(fetchOpinionWriterSuccess({opinionWriterListData: payload}));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: {message: string} = errorResponse.response.data;
      yield put(fetchOpinionWriterFailed({error: errorMessage.message}));
    }
  }
}

function* opinionWriterSaga() {
  yield all([takeLatest(FETCH_OPINION_WRITER, fetchOpinionWriter)]);
}

export default opinionWriterSaga;
