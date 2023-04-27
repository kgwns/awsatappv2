import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import {
  FetchAllWritersListSuccessPayloadType,
  FetchAllWritersType,
  SendSelectedAuthorType,
  GetSelectedAuthorSuccessPayloadType,
  GetSelectedAuthorType,
  RemoveAuthorType,
  FetchAllSelectedWritersDetailsType,
  FetchAllSelectedWritersDetailsListSuccessPayloadType,
} from './types';
import { fetchAllWritersFailed, 
  fetchAllWritersSuccess, 
  sendSelectedAuthorFailed, 
  sendSelectedAuthorSuccess,
  getSelectedAuthorsFailed, 
  getSelectedAuthorsSuccess, 
  removeAuthorSuccess, 
  removeAuthorFailed,
  fetchAllSelectedWritersDetailsFailed,
  fetchAllSelectedWritersDetailsSuccess } from './action';
import { FETCH_ALL_WRITERS, SEND_SELECTED_AUTHOR,GET_SELECTED_AUTHOR, REMOVE_AUTHOR, FETCH_ALL_SELECTED_WRITERS_DETAILS, } from './actionTypes';
import { fetchAllWritersApi, sendSelectedWritersApi,getSelectedAuthorsApi,removeWritersApi, fetchAllSelectedWritersDataApi } from 'src/services/allWritersService';

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

export function* removeSelectedWriters(action: RemoveAuthorType) {

  try {
    const payload: {message: any} = yield call(
      removeWritersApi,
      action.payload,
    );
    yield put(removeAuthorSuccess({ removeData: payload.message }));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(removeAuthorFailed({ error: errorMessage.message }));
    }
  }
}


export function* fetchAllSelectedWritersDetailsData(action: FetchAllSelectedWritersDetailsType) {
  try {
    const payload: FetchAllSelectedWritersDetailsListSuccessPayloadType = yield call(
      fetchAllSelectedWritersDataApi,
      action.payload,
    );
    yield put(fetchAllSelectedWritersDetailsSuccess({ allSelectedWritersDetails: payload }));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(fetchAllSelectedWritersDetailsFailed({ error: errorMessage.message }));
    }
  }
}

function* allWritersSaga() {
  yield all([takeLatest(FETCH_ALL_WRITERS, fetchAllWriters)]);
  yield all([takeLatest(SEND_SELECTED_AUTHOR, postSelectedWriters)]);
  yield all([takeLatest(GET_SELECTED_AUTHOR, getSelectedtAuthors)]);
  yield all([takeLatest(REMOVE_AUTHOR, removeSelectedWriters)]);
  yield all([takeLatest(FETCH_ALL_SELECTED_WRITERS_DETAILS, fetchAllSelectedWritersDetailsData)]);
}

export default allWritersSaga;
