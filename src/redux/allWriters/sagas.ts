import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import {
  FetchAllWritersListSuccessPayloadType,
  FetchAllWritersType,
} from './types';
import { fetchAllWritersFailed, fetchAllWritersSuccess } from './action';
import { FETCH_ALL_WRITERS } from './actionTypes';
import { fetchAllWritersApi } from 'src/services/allWritersService';

export function* fetchAllWriters(action: FetchAllWritersType) {

  try {
    const payload: FetchAllWritersListSuccessPayloadType = yield call(
      fetchAllWritersApi,
      action.payload,
    );
    yield put(fetchAllWritersSuccess({ allWritersListData: payload }));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(fetchAllWritersFailed({ error: errorMessage.message }));
    }
  }
}

function* allWritersSaga() {
  yield all([takeLatest(FETCH_ALL_WRITERS, fetchAllWriters)]);
}

export default allWritersSaga;