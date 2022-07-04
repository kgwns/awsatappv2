import {all, call, put, takeLatest} from 'redux-saga/effects';
import {AxiosError} from 'axios';
import {FetchOpinionsSuccessPayloadType, FetchOpinionsType, FetchWriterOpinionsType} from './types';
import {fetchOpinionsFailed, fetchOpinionsSuccess, fetchWriterOpinionsFailed, fetchWriterOpinionsSuccess} from './action';
import {FETCH_OPINIONS, FETCH_WRITER_OPINIONS} from './actionTypes';
import {fetchOpinionsApi, fetchWriterOpinionsApi} from 'src/services/opinionsService';

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

export function* fetchWriterOpinions(action: FetchWriterOpinionsType) {
  try {
    const payload: FetchOpinionsSuccessPayloadType = yield call(
      fetchWriterOpinionsApi,
      action.payload,
    );
    yield put(fetchWriterOpinionsSuccess({ writerOpinionListData: payload }));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(fetchWriterOpinionsFailed({ error: errorMessage.message }));
    }
  }
}

function* opinionsSaga() {
  yield all([takeLatest(FETCH_OPINIONS, fetchOpinions)]);
  yield all([takeLatest(FETCH_WRITER_OPINIONS, fetchWriterOpinions)])
}

export default opinionsSaga;
