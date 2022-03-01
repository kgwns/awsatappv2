import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import {
  FetchAllWritersListSuccessPayloadType,
  FetchAllWritersType,
  SendSelectedAuthorType,
} from './types';
import { fetchAllWritersFailed, fetchAllWritersSuccess, sendSelectedAuthorFailed, sendSelectedAuthorSuccess } from './action';
import { FETCH_ALL_WRITERS, SEND_SELECTED_AUTHOR } from './actionTypes';
import { fetchAllWritersApi, sendSelectedWritersApi } from 'src/services/allWritersService';

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

export function* postSelectedWriters(action: SendSelectedAuthorType) {

  try {
    const payload: {message: any} = yield call(
      sendSelectedWritersApi,
      action.payload,
    );
    yield put(sendSelectedAuthorSuccess({ saveData: payload.message }));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(sendSelectedAuthorFailed({ error: errorMessage.message }));
    }
  }
}

function* allWritersSaga() {
  yield all([takeLatest(FETCH_ALL_WRITERS, fetchAllWriters)]);
  yield all([takeLatest(SEND_SELECTED_AUTHOR, postSelectedWriters)]);
}

export default allWritersSaga;