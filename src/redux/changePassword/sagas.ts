import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import {
  SendNewPasswordSuccessPayloadType,
  SendChangePasswordType
} from './types';
import {
  changePasswordSuccess,
  changePasswordFailed,
} from './action';
import { CHANGE_PASSWORD, EMPTY_PASSWORD_RESPONSE_INFO } from './actionTypes';
import { changePasswordApi  } from 'src/services/changePasswordService'

export function* postNewPassword(action: SendChangePasswordType) {
  try {
    const payload: SendNewPasswordSuccessPayloadType = yield call(
      changePasswordApi,
      action.payload,
    );
    yield put(changePasswordSuccess({ message: payload }));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(changePasswordFailed({ error: errorMessage.message }));
    }
  }
}

export function* emptyPasswordResponse() {
  emptyPasswordResponse();
}

function* newPasswordSaga() {
  yield all([takeLatest(CHANGE_PASSWORD, postNewPassword)]);
  yield all([takeLatest(EMPTY_PASSWORD_RESPONSE_INFO, emptyPasswordResponse)]);
}

export default newPasswordSaga;
