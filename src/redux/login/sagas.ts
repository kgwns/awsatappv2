import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import { FetchLoginSuccessPayloadType } from './types';
import { fetchLoginFailed, fetchLoginSuccess } from './action';
import { FETCH_LOGIN } from './actionTypes';
import { fetchLoginApi } from 'src/services/loginService';

export function* fetchLogin() {
  //console.log("saga fetchMostRead");

  try {
    const payload: FetchLoginSuccessPayloadType = yield call(
        fetchLoginApi,
    );
    yield put(fetchLoginSuccess({ loginData: payload }));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(fetchLoginFailed({ error: errorMessage.message }));
    }
  }
}

function* loginSaga() {
  yield all([takeLatest(FETCH_LOGIN, fetchLogin)]);
}

export default loginSaga;