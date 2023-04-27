import {all, call, put, takeLatest} from 'redux-saga/effects';
import {SAVE_TOKEN_REQUEST, SAVE_TOKEN_AFTER_REGISTRATION_REQUEST} from './actionType';
import {notificationSaveTokenRequest, notificationSaveTokenAfterRegistrationRequest} from '../../services/notificationSaveTokenService';
import {SaveTokenSuccess, SaveTokenFailed, SaveTokenAfterRegistrationSuccess, SaveTokenAfterRegistrationFailed} from './action';
import {
  SaveTokenAfterRegistraionSuccessPayloadType,
  SaveTokenAfterRegistrationType,
  SaveTokenSuccessPayloadType,
  SaveTokenType,
} from './types';
import { AxiosError } from 'axios';

export function* saveFCMtoken(action: SaveTokenType) {
  try {
    const payload: SaveTokenSuccessPayloadType = yield call(
      notificationSaveTokenRequest,
      action.payload,
    );
    yield put(SaveTokenSuccess(payload));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: {message: string} = errorResponse.response.data;
      yield put(
        SaveTokenFailed({error: errorMessage.message}),
      );
    }
  }
}

export function* saveFCMtokenAfterRegistration(action: SaveTokenAfterRegistrationType) {
  try {
    const payload: SaveTokenAfterRegistraionSuccessPayloadType = yield call(
      notificationSaveTokenAfterRegistrationRequest,
      action.payload,
    );
    yield put(SaveTokenAfterRegistrationSuccess(payload));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: {message: string} = errorResponse.response.data;
      yield put(
        SaveTokenAfterRegistrationFailed({error: errorMessage.message}),
      );
    }
  }
}

function* SaveTokenSaga() {
  yield all([
    takeLatest(SAVE_TOKEN_REQUEST, saveFCMtoken),
    takeLatest(SAVE_TOKEN_AFTER_REGISTRATION_REQUEST, saveFCMtokenAfterRegistration),
  ]);
}

export default SaveTokenSaga;
