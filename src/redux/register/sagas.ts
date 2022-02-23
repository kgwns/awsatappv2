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
    const errorResponse = error as AxiosError;

    if (errorResponse.response) {
      const errorMessage: {message: string} = errorResponse.response.data;
      Alert.alert(errorMessage.message);
      yield put(registerFailed({error: errorMessage.message}));
    }
  }
}

function* registerSaga() {
  yield all([takeLatest(REGISTER_USER, createUser)]);
}

export default registerSaga;
