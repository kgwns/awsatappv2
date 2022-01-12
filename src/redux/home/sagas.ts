import {all, call, put, takeLatest} from 'redux-saga/effects';
import {AxiosError} from 'axios';
import {HomeSuccessPayloadType, RequestHomeType} from './types';
import {requestHomeFailed, requestHomeSuccess} from './action';
import {REQUEST_HOME} from './actionType';
import { requestHomeApi } from 'src/services/homeService';

export function* fetchHome(action: RequestHomeType) {
  console.log(`saga fetchHome ${JSON.stringify(action.payload)}`);
  
  try {
    const payload: HomeSuccessPayloadType = yield call(
      requestHomeApi,
      action.payload,
    );
    yield put(requestHomeSuccess({homeData: payload}));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: {message: string} = errorResponse.response.data;
      yield put(requestHomeFailed({error: errorMessage.message}));
    }
  }
}

function* homeSaga() {
  yield all([takeLatest(REQUEST_HOME, fetchHome)]);
}

export default homeSaga;
