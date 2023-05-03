import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import {
  FetchDMAIntroductionSuccessPayloadType,
  FetchDMAOptionsListSuccessPayloadType
} from './types';
import {
  fetchDMAIntroductionSuccess,
  fetchDMAIntroductionFailed,
  fetchDMAOptionsListSuccess,
  fetchDMAOptionsListFailed,
} from './action';
import { FETCH_DMA_INTRODUCTION, FETCH_DMA_OPTIONS_LIST } from './actionTypes';
import {
  fetchDMAIntroductionApi,
  fetchDMAOptionsListApi,
} from 'src/services/deleteMyAccountService';

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

export function* fetchDMAOptionsList() {
  try {
    const payload: FetchDMAOptionsListSuccessPayloadType = yield call(
      fetchDMAOptionsListApi,
    );
    yield put(fetchDMAOptionsListSuccess({ dmaOptionsListData: payload }));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(fetchDMAOptionsListFailed({ error: errorMessage.message }));
    }
  }
}

function* deleteMyAccountSaga() {
  yield all([takeLatest(FETCH_DMA_INTRODUCTION, fetchDMAIntroduction)]);
  yield all([takeLatest(FETCH_DMA_OPTIONS_LIST, fetchDMAOptionsList)]);
}

export default deleteMyAccountSaga;
