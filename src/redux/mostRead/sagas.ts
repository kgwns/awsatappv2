import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import { FetchMostReadSuccessPayloadType } from './types';
import { fetchMostReadFailed, fetchMostReadSuccess } from './action';
import { FETCH_MOST_READ } from './actionTypes';
import { fetchMostReadApi } from 'src/services/mostReadService';

export function* fetchMostRead() {

  try {
    const payload: FetchMostReadSuccessPayloadType = yield call(
      fetchMostReadApi,
    );
    yield put(fetchMostReadSuccess({ mostReadData: payload }));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(fetchMostReadFailed({ error: errorMessage.message }));
    }
  }
}

function* mostReadSaga() {
  yield all([takeLatest(FETCH_MOST_READ, fetchMostRead)]);
}

export default mostReadSaga;