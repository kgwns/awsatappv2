import {all, call, put, takeLatest} from 'redux-saga/effects';
import {AxiosError} from 'axios';
import {
  FetchLoginSuccessPayloadType,
  FetchLoginType,
  FetchLogoutSuccessPayloadType,
  FetchUserLogoutPayloadType,
  ForgotPasswordRequestType,
  ForgotPasswordSuccessPayloadType,
} from './types';
import {fetchLoginFailed, fetchLoginSuccess, forgotPasswordFailed, forgotPasswordSuccess, userLogoutSuccess} from './action';
import {EMPTY_FORGOT_PASSWORD_RESPONSE, EMPTY_LOGIN_DATA, FETCH_LOGIN, FETCH_USER_LOGOUT, FORGOT_PASSWORD_REQUEST} from './actionTypes';
import {fetchLoginApi, fetchLogoutApi, forgotPasswordApi} from 'src/services/loginService';
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
      // Request made and server responded
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(fetchLoginFailed({ error: errorMessage.message }));
    } else if (errorResponse.request && errorResponse.message) {
      // The request was made but no response was received
     yield put(fetchLoginFailed({ error: errorResponse.message }));
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log(errorResponse.message);
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

export function* requestForgotPassword(action: ForgotPasswordRequestType) {
  try {
    const payload: ForgotPasswordSuccessPayloadType = yield call(
      forgotPasswordApi,
      action.payload,
    );
    yield put(forgotPasswordSuccess({response: payload}));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: {message: string} = errorResponse.response.data;
      Alert.alert(errorMessage.message);
      yield put(forgotPasswordFailed({error: errorMessage.message}));
    }
  }
}

export function* emptyForgotPasswordResponseInfo() {
  emptyForgotPasswordResponseInfo();
}

export function* emptyLoginDataInfo() {
  emptyLoginDataInfo();
}

function* loginSaga() {
  yield all([
    takeLatest(FETCH_LOGIN, fetchLogin),
    takeLatest(FETCH_USER_LOGOUT, fetchLogout),
    takeLatest(FORGOT_PASSWORD_REQUEST,requestForgotPassword),
    takeLatest(EMPTY_FORGOT_PASSWORD_RESPONSE,emptyForgotPasswordResponseInfo),
    takeLatest(EMPTY_LOGIN_DATA,emptyLoginDataInfo),
  ]);
}

export default loginSaga;
