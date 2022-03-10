import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import { GetSelectedNotificationSuccessPayload, SendSelectedNotificationSuccessPayload, SendSelectedNotificationType } from './types';
import { GET_SELECTED_NOTIFICATION, SEND_SELECTED_NOTIFICATION } from './actionType';
import { getSelectedNotificationFailed, getSelectedNotificationSuccess, sendSelectedNotificationFailed, sendSelectedNotificationSuccess } from './action';
import { getSelectedNotificationService, sendSelectedNotificationService } from 'src/services';


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

export function* keepNotifiedSaga() {
  yield all([
    takeLatest(SEND_SELECTED_NOTIFICATION, sendSelectedNotificationRequest),
    takeLatest(GET_SELECTED_NOTIFICATION, getSelectedNotificationRequest)
  ]);
}

export default keepNotifiedSaga;