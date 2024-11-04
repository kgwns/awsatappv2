import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import { FetchVideoByIdType, FetchVideoSuccessPayloadType, FetchVideoType, VideoItemType } from './types';
import { fetchVideoListByIdFailed, fetchVideoListByIdSuccess, fetchVideoListFailed, fetchVideoListSuccess, fetchVideoListWithPaginationFailed, fetchVideoListWithPaginationSuccess } from './action';
import { FETCH_VIDEO, FETCH_VIDEO_BY_ID, FETCH_VIDEO_PAGINATION } from './actionTypes';
import { fetchVideoListApi, fetchVideoListByIdApi } from 'src/services/videoListService';
import { isNonEmptyArray, isNotEmpty } from 'src/shared/utils';
import { decode } from 'html-entities';

export const formatVideoData = (response: any): VideoItemType[] => {
  let formattedData: VideoItemType[] = []
    if (response && isNonEmptyArray(response.rows)) {
      const rows = response.rows
      formattedData = rows.map(
        ({ nid,title,created_export,field_image_upload_export,
          field_mp4_link_export,
          field_multimedia_section_export,
          field_thumbnil_multimedia_export,description,
          field_jwplayerinfo_export,body_export, 
          field_video_media_id_export, link_node }: any) => ({
          nid,
          title: isNotEmpty(title) ? decode(title) : '',
          created_export,
          field_image_upload_export,
          field_mp4_link_export,
          field_multimedia_section_export,
          field_thumbnil_multimedia_export,
          description,
          field_jwplayerinfo_export,
          body_export,
          mediaId: field_video_media_id_export,
          link_node
        })
      );
    }
  return formattedData
}


const parseVideosList = (response: any): FetchVideoSuccessPayloadType => {
  const responseData: FetchVideoSuccessPayloadType = {
    videoData: []
  }
  responseData.videoData = formatVideoData(response)
  return responseData
}

export function* fetchVideoList(action: FetchVideoType) {

  try {
    const payload: FetchVideoSuccessPayloadType = yield call(
      fetchVideoListApi,
      action.payload
    );
    const response = parseVideosList(payload)
    yield put(fetchVideoListSuccess(response));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    yield put(fetchVideoListFailed({ error: errorResponse.message }));
  }
}

export function* fetchVideoListById(action: FetchVideoByIdType) {

  try {
    const payload: FetchVideoSuccessPayloadType = yield call(
      fetchVideoListByIdApi,
      action.payload
    );
    const response = parseVideosList(payload)
    yield put(fetchVideoListByIdSuccess(response));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    yield put(fetchVideoListByIdFailed({ error: errorResponse.message }));
  }
}

export function* fetchVideoListPagination(action: FetchVideoType) {

  try {
    const payload: FetchVideoSuccessPayloadType = yield call(
      fetchVideoListApi,
      action.payload
    );
    const response = parseVideosList(payload)
    yield put(fetchVideoListWithPaginationSuccess(response));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    yield put(fetchVideoListWithPaginationFailed({ error: errorResponse.message }));
  }
}

function* videoListSaga() {
  yield all([takeLatest(FETCH_VIDEO, fetchVideoList)]);
  yield all([takeLatest(FETCH_VIDEO_BY_ID, fetchVideoListById)]);
  yield all([takeLatest(FETCH_VIDEO_PAGINATION, fetchVideoListPagination)]);
}

export default videoListSaga;
