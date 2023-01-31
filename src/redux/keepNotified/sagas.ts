import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import { GetListOfNotificationSuccessPayload, GetSelectedNotificationSuccessPayload, SendSelectedNotificationSuccessPayload, SendSelectedNotificationType } from './types';
import { GET_LIST_OF_NOTIFICATION, GET_SELECTED_NOTIFICATION, SEND_SELECTED_NOTIFICATION } from './actionType';
import { getListOfNotificationFailed, 
  getListOfNotificationSuccess, 
  getSelectedNotificationFailed, 
  getSelectedNotificationSuccess, 
  sendSelectedNotificationFailed, 
  sendSelectedNotificationSuccess } from './action';
import { getSelectedNotificationService, sendSelectedNotificationService, getListOfNotificationService } from 'src/services';


export function* sendSelectedNotificationRequest(action: SendSelectedNotificationType) {
  try {
    const payload: SendSelectedNotificationSuccessPayload = yield call(
      sendSelectedNotificationService,
      action.payload
    );
    yield put(sendSelectedNotificationSuccess(payload));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(sendSelectedNotificationFailed({ error: errorMessage.message }));
    }
  }
}

export function* getSelectedNotificationRequest() {
  try {
    const payload: GetSelectedNotificationSuccessPayload = yield call(
      getSelectedNotificationService
    );
    yield put(getSelectedNotificationSuccess(payload));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(getSelectedNotificationFailed({ error: errorMessage.message }));
    }
  }
}

export function* getListOfNotificationOption() {
  try {
    const payload: GetListOfNotificationSuccessPayload = yield call(
      getListOfNotificationService
    );
    yield put(getListOfNotificationSuccess(payload));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(getListOfNotificationFailed({ error: errorMessage.message }));
    }
  }
}

export function* keepNotifiedSaga() {
  yield all([
    takeLatest(SEND_SELECTED_NOTIFICATION, sendSelectedNotificationRequest),
    takeLatest(GET_SELECTED_NOTIFICATION, getSelectedNotificationRequest),
    takeLatest(GET_LIST_OF_NOTIFICATION, getListOfNotificationOption)
  ]);
}

export default keepNotifiedSaga;
