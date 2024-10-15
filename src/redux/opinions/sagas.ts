import {all, call, put, takeLatest} from 'redux-saga/effects';
import {AxiosError} from 'axios';
import {FetchOpinionsSuccessPayloadType, FetchOpinionsType, FetchWriterOpinionsType, payloadType} from './types';
import {fetchOpinionsFailed, fetchOpinionsSuccess, fetchWriterOpinionsFailed, fetchWriterOpinionsSuccess, storeHomeOpinionNid} from './action';
import {FETCH_OPINIONS, FETCH_WRITER_OPINIONS} from './actionTypes';
import {fetchHomeOpinionsListApi, fetchOpinionsApi, fetchOpinionsListApi, fetchWriterOpinionsApi} from 'src/services/opinionsService';
import { isNonEmptyArray, joinArray } from 'src/shared/utils';

const filterNidInfo = (data: any[]) => {
  return data.reduce((prevValue: string[], item: any) => {
    if (item.nid) {
      return prevValue.concat(item.nid)
    }
    return prevValue
  }, [])
}

export function* fetchOpinions(action: FetchOpinionsType) {

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

export function* fetchOpinionsList(action: FetchOpinionsType) {
  try {
    let nid = action.payload.nid
    const page = action.payload.page
    if (page === 0 && !action.payload.byIdOpinions) {
      const homeOpinionListPayload: payloadType = yield call(
        fetchHomeOpinionsListApi,
      );
      yield put(fetchOpinionsSuccess({ opinionListData: homeOpinionListPayload }));
      const nidArray = filterNidInfo(isNonEmptyArray(homeOpinionListPayload.rows) ? homeOpinionListPayload.rows : [])
      nid = joinArray(nidArray, '+')
      yield put(storeHomeOpinionNid({ nid }))
    }
    action.payload.nid = nid;
    const payload: FetchOpinionsSuccessPayloadType = yield call(
      fetchOpinionsListApi,
      action.payload,
    );
    yield put(fetchOpinionsSuccess({opinionListData: payload}, action.payload.byIdOpinions));
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
  yield all([takeLatest(FETCH_OPINIONS, fetchOpinionsList)]);
  yield all([takeLatest(FETCH_WRITER_OPINIONS, fetchWriterOpinions)])
}

export default opinionsSaga;
