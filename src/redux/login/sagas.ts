import {all, call, put, takeLatest} from 'redux-saga/effects';
import {AxiosError} from 'axios';
import {
  FetchLoginSuccessPayloadType,
  FetchLoginType,
  FetchLogoutSuccessPayloadType,
  FetchUserLogoutPayloadType,
} from './types';
import {fetchLoginFailed, fetchLoginSuccess, userLogoutSuccess} from './action';
import {FETCH_LOGIN, FETCH_USER_LOGOUT} from './actionTypes';
import {fetchLoginApi, fetchLogoutApi} from 'src/services/loginService';
import {Alert} from 'react-native';

export function* fetchLogin(action: FetchLoginType) {
  //console.log("saga fetchMostRead");

  try {
    const payload: FetchLoginSuccessPayloadType = yield call(
      fetchLoginApi,
      action.payload,
    );
    yield put(fetchLoginSuccess({loginData: payload}));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: {message: string} = errorResponse.response.data;
      Alert.alert(errorMessage.message);
      yield put(fetchLoginFailed({error: errorMessage.message}));
    }
  }
}

export function* fetchLogout() {
  try {
    const payload: FetchLogoutSuccessPayloadType = yield call(fetchLogoutApi);
    yield put(userLogoutSuccess());
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: {message: string} = errorResponse.response.data;
      //Alert.alert(errorMessage.message);
      //yield put(fetchLoginFailed({error: errorMessage.message}));
    }
  }
}

function* loginSaga() {
  yield all([
    takeLatest(FETCH_LOGIN, fetchLogin),
    takeLatest(FETCH_USER_LOGOUT, fetchLogout),
  ]);
}

export default loginSaga;
