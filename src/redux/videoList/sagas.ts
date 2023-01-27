import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import { FetchVideoSuccessPayloadType, VideoItemType } from './types';
import { fetchVideoListFailed, fetchVideoListSuccess } from './action';
import { FETCH_VIDEO } from './actionTypes';
import { fetchVideoListApi } from 'src/services/videoListService';
import { isNonEmptyArray, isNotEmpty } from 'src/shared/utils';
import { decode } from 'html-entities';

export const formatVideoData = (response: any): VideoItemType[] => {
  let formattedData: VideoItemType[] = []
  if (response) {
    if (isNonEmptyArray(response.rows)) {
      const rows = response.rows
      formattedData = rows.map(
        ({ nid,title,created_export,field_image_upload_export,
          field_mp4_link_export,
          field_multimedia_section_export,
          field_thumbnil_multimedia_export,description,
          field_jwplayerinfo_export,body_export, 
          field_video_media_id_export }: any) => ({
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
          mediaId: field_video_media_id_export
        })
      );
    }
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

export function* fetchVideoList() {

  try {
    const payload: FetchVideoSuccessPayloadType = yield call(
      fetchVideoListApi,
    );
    const response = parseVideosList(payload)
    yield put(fetchVideoListSuccess(response));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    yield put(fetchVideoListFailed({ error: errorResponse.message }));
  }
}

function* videoListSaga() {
  yield all([takeLatest(FETCH_VIDEO, fetchVideoList)]);
}

export default videoListSaga;