import {all, call, put, takeLatest} from 'redux-saga/effects';
import {AxiosError} from 'axios';
import {FetchAlbumDetailType, FetchAlbumDetailSuccessPayloadType, FetchAlbumListSuccessPayloadType, FetchAlbumListType} from './types';
import {fetchAlbumListSuccess, fetchAlbumListFailed, fetchAlbumDetailuccess, fetchAlbumDetailFailed} from './action';
import {FETCH_ALBUM_LIST, FETCH_ALBUM_DETAIL} from './actionTypes';
import {fetchAlbumListApi, fetchAlbumDetailApi} from 'src/services/photoGalleryService';

export function* fetchAlbumList(action: FetchAlbumListType) {
  try {
    const payload: FetchAlbumListSuccessPayloadType = yield call(
      fetchAlbumListApi,
      action.payload,
    );
    yield put(fetchAlbumListSuccess(payload));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: {message: string} = errorResponse.response.data;
      yield put(fetchAlbumListFailed({error: errorMessage.message}));
    }
  }
}

export function* fetchAlbumDetail(action: FetchAlbumDetailType) {
  try {
    const payload: FetchAlbumDetailSuccessPayloadType = yield call(
      fetchAlbumDetailApi,
      action.payload,
    );
    yield put(fetchAlbumDetailuccess(payload));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: {message: string} = errorResponse.response.data;
      yield put(fetchAlbumDetailFailed({error: errorMessage.message}));
    }
  }
}

function* albumListSaga() {
  yield all([takeLatest(FETCH_ALBUM_LIST, fetchAlbumList)]);
  yield all([takeLatest(FETCH_ALBUM_DETAIL, fetchAlbumDetail)]);
}

export default albumListSaga;
