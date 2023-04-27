import {all, call, put, takeLatest} from 'redux-saga/effects';
import {REGISTER_USER} from './actionTypes';
import { registerUser } from 'src/services/registerService';
import {registerSuccess, registerFailed} from './action';
import {RegisterSuccessPayloadType, UserRegisterType} from './types';
import {AxiosError} from 'axios';

export function* createUser(action: UserRegisterType) {
  try {
    const payload: RegisterSuccessPayloadType = yield call(
      registerUser,
      action.payload,
    );

    yield put(registerSuccess(payload));
  } catch (error) {
      const errorResponse: AxiosError = error as AxiosError;
      if (errorResponse.response) {
        // Request made and server responded
        const errorMessage: { message: string } = errorResponse.response.data;
        yield put(registerFailed({ error: errorMessage.message }));
      } else if (errorResponse.request && errorResponse.message) {
        // The request was made but no response was received
       yield put(registerFailed({ error: errorResponse.message }));
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log(errorResponse.message);
      }
  }
}


function* registerSaga() {
  yield all([takeLatest(REGISTER_USER, createUser)]);
}

export default registerSaga;
