import {all, call, put, takeLatest} from 'redux-saga/effects';
import {REGISTER_USER} from './actionTypes';
import { registerUser } from 'src/services/registerService';
import {registerSuccess, registerFailed} from './action';
import {RegisterSuccessPayloadType, UserRegisterType} from './types';
import {AxiosError} from 'axios';
import {Alert} from 'react-native';

export function* createUser(action: UserRegisterType) {
  try {
    const payload: RegisterSuccessPayloadType = yield call(
      registerUser,
      action.payload,
    );
    yield put(registerSuccess(payload));
  } catch (error) {
      const errorResponse: AxiosError = error as AxiosError;
      Alert.alert(errorResponse.message);
      yield put(registerFailed({ error: errorResponse.message }));
  }
}

function* registerSaga() {
  yield all([takeLatest(REGISTER_USER, createUser)]);
}

export default registerSaga;
