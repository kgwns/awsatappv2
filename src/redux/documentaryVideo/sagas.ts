import {all, call, put, takeLatest} from 'redux-saga/effects';
import {AxiosError} from 'axios';
import {
  FetchDocumentaryVideoSuccessPayloadType,
  VideoItemType,
  FetchDocumentaryVideoType,
} from './types';
import {
  fetchDocumentaryVideoFailed,
  fetchDocumentaryVideoSuccess,
} from './action';
import {FETCH_DOCUMENTARY_VIDEO} from './actionTypes';
import {fetchDocumentaryVideo} from 'src/services/videoDocumentaryService';
import {isNonEmptyArray} from 'src/shared/utils';

export const formatDocumentaryVideo = (response: any): VideoItemType[] => {
  let formattedData: VideoItemType[] = [];
    if (response && isNonEmptyArray(response.rows)) {
      const rows = response.rows;
      formattedData = rows.map(
        ({
          nid,
          title,
          created_export,
          field_image_upload_export,
          field_mp4_link_export,
          field_multimedia_section_export,
          field_thumbnil_multimedia_export,
          body_export,
          field_jwplayerinfo_export,
        }: any) => ({
          nid,
          title,
          created_export,
          field_image_upload_export,
          field_mp4_link_export,
          field_multimedia_section_export,
          field_thumbnil_multimedia_export,
          body_export,
          field_jwplayerinfo_export,
        }),
      );
    }
  return formattedData;
};

const parseDocumentaryVideo = (
  response: any,
): FetchDocumentaryVideoSuccessPayloadType => {
  const responseData: FetchDocumentaryVideoSuccessPayloadType = {
    videoDocumentaryData: [],
  };
  responseData.videoDocumentaryData = formatDocumentaryVideo(response);
  return responseData;
};

export function* fetchVideoDocumentary(action: FetchDocumentaryVideoType) {
  try {
    const payload: FetchDocumentaryVideoSuccessPayloadType = yield call(
      fetchDocumentaryVideo,
      action.payload,
    );
    const response = parseDocumentaryVideo(payload);
    yield put(fetchDocumentaryVideoSuccess(response));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    yield put(fetchDocumentaryVideoFailed({videoDocumentaryError: errorResponse.message}));
  }
}

function* documentaryVideoSaga() {
  yield all([takeLatest(FETCH_DOCUMENTARY_VIDEO, fetchVideoDocumentary)]);
}

export default documentaryVideoSaga;
