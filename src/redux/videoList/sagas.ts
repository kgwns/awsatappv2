import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import { FetchVideoSuccessPayloadType } from './types';
import { fetchVideoListFailed, fetchVideoListSuccess } from './action';
import { FETCH_VIDEO } from './actionTypes';
import { fetchVideoListApi } from 'src/services/videoListService';

export function* fetchVideoList() {
  //console.log("saga fetchVideoList");

  try {
    const payload: FetchVideoSuccessPayloadType = yield call(
      fetchVideoListApi,
    );
    yield put(fetchVideoListSuccess({ videoData: payload }));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    yield put(fetchVideoListFailed({ error: errorResponse.message }));
  }
}

function* videoListSaga() {
  yield all([takeLatest(FETCH_VIDEO, fetchVideoList)]);
}

export default videoListSaga;