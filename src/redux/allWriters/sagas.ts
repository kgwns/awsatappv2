import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import {
  FetchAllWritersListSuccessPayloadType,
  FetchAllWritersType,
  SendSelectedAuthorType,
  GetSelectedAuthorSuccessPayloadType,
  GetSelectedAuthorType,
} from './types';
import { fetchAllWritersFailed, fetchAllWritersSuccess, sendSelectedAuthorFailed, sendSelectedAuthorSuccess,getSelectedAuthorsFailed, getSelectedAuthorsSuccess } from './action';
import { FETCH_ALL_WRITERS, SEND_SELECTED_AUTHOR,GET_SELECTED_AUTHOR,EMPTY_SELECTED_AUTHORS_INFO } from './actionTypes';
import { fetchAllWritersApi, sendSelectedWritersApi,getSelectedAuthorsApi } from 'src/services/allWritersService';

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

export function* getSelectedtAuthors(action:GetSelectedAuthorType) {
  try {
    const payload: GetSelectedAuthorSuccessPayloadType = yield call(
      getSelectedAuthorsApi,
    );
    yield put(getSelectedAuthorsSuccess({ selectedAuthorsData: payload }));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(getSelectedAuthorsFailed({ error: errorMessage.message }));
    }
  }
}

export function* emptySelectedAuthorInfo() {
  emptySelectedAuthorInfo();
}

function* allWritersSaga() {
  yield all([takeLatest(FETCH_ALL_WRITERS, fetchAllWriters)]);
  yield all([takeLatest(SEND_SELECTED_AUTHOR, postSelectedWriters)]);
  yield all([takeLatest(GET_SELECTED_AUTHOR, getSelectedtAuthors)]);
  yield all([takeLatest(EMPTY_SELECTED_AUTHORS_INFO, emptySelectedAuthorInfo)]);
}

export default allWritersSaga;