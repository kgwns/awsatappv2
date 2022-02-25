import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import { FetchEmailCheckSuccessPayloadType, FetchEmailCheckType } from './types';
import { fetchEmailCheckFailed, fetchEmailCheckSuccess } from './action';
import { FETCH_EMAIL_CHECK } from './actionTypes';
import { fetchEmailCheckApi } from 'src/services/emailCheckService';

export function* fetchEmailCheck(action: FetchEmailCheckType) {
  //console.log("saga fetchMostRead");

  try {
    const payload: FetchEmailCheckSuccessPayloadType = yield call(
        fetchEmailCheckApi, action.payload
    );
    yield put(fetchEmailCheckSuccess({ emailCheckData: payload }));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(fetchEmailCheckFailed({ error: errorMessage.message }));
    }
  }
}

function* emailCheckSaga() {
  yield all([takeLatest(FETCH_EMAIL_CHECK, fetchEmailCheck)]);
}

export default emailCheckSaga;