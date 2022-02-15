import {all, call, put, takeLatest} from 'redux-saga/effects';
import {AxiosError} from 'axios';
import {FetchOpinionsSuccessPayloadType, FetchOpinionsType} from './types';
import {fetchOpinionsFailed, fetchOpinionsSuccess} from './action';
import {FETCH_OPINIONS} from './actionTypes';
import {fetchOpinionsApi} from 'src/services/opinionsService';

export function* fetchOpinions(action: FetchOpinionsType) {
  // console.log("saga fetchOpinionWriter");

  try {
    const payload: FetchOpinionsSuccessPayloadType = yield call(
      fetchOpinionsApi,
      action.payload,
    );
    yield put(fetchOpinionsSuccess({opinionListData: payload}));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: {message: string} = errorResponse.response.data;
      yield put(fetchOpinionsFailed({error: errorMessage.message}));
    }
  }
}

function* opinionsSaga() {
  yield all([takeLatest(FETCH_OPINIONS, fetchOpinions)]);
}

export default opinionsSaga;
