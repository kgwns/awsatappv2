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
import { CHANGE_PASSWORD } from './actionTypes';
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


function* newPasswordSaga() {
  yield all([takeLatest(CHANGE_PASSWORD, postNewPassword)]);
}

export default newPasswordSaga;
