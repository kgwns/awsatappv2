import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import { FetchLoginSuccessPayloadType, FetchLoginType } from './types';
import { fetchLoginFailed, fetchLoginSuccess } from './action';
import { FETCH_LOGIN } from './actionTypes';
import { fetchLoginApi } from 'src/services/loginService';
import { Alert } from 'react-native';

export function* fetchLogin(action: FetchLoginType) {
  //console.log("saga fetchMostRead");

  try {
    const payload: FetchLoginSuccessPayloadType = yield call(
        fetchLoginApi, action.payload
    );
    yield put(fetchLoginSuccess({ loginData: payload }));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      Alert.alert(errorMessage.message);
      yield put(fetchLoginFailed({ error: errorMessage.message }));
    }
  }
}

function* loginSaga() {
  yield all([takeLatest(FETCH_LOGIN, fetchLogin)]);
}

export default loginSaga;