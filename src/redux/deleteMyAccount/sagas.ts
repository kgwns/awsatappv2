import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import { FetchDMAIntroductionSuccessPayloadType } from './types';
import {
  fetchDMAIntroductionSuccess,
  fetchDMAIntroductionFailed,
} from './action';
import { FETCH_DMA_INTRODUCTION } from './actionTypes';
import { fetchDMAIntroductionApi } from 'src/services/deleteMyAccountService';

export function* fetchDMAIntroduction() {

  try {
    const payload: FetchDMAIntroductionSuccessPayloadType = yield call(
      fetchDMAIntroductionApi,
    );
    yield put(fetchDMAIntroductionSuccess({ dmaIntroductionData: payload }));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(fetchDMAIntroductionFailed({ error: errorMessage.message }));
    }
  }
}

function* deleteMyAccountSaga() {
  yield all([takeLatest(FETCH_DMA_INTRODUCTION, fetchDMAIntroduction)]);
}

export default deleteMyAccountSaga;
