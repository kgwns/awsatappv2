import { FETCH_DOCUMENTARY_VIDEO, FETCH_DOCUMENTARY_VIDEO_SUCCESS, FETCH_DOCUMENTARY_VIDEO_FAILED } from './actionTypes';
import { VideoActions, VideoDocumentaryState } from './types';
const initialAuthState: VideoDocumentaryState = {
  videoDocumentaryData: [],
  videoDocumentaryError: '',
  isVideoLoading: false,
};

export default (state = initialAuthState, action: VideoActions) => {
  switch (action.type) {
    case FETCH_DOCUMENTARY_VIDEO_SUCCESS:
      return {
        ...state,
        isVideoLoading: false,
        videoDocumentaryData: action.payload.videoDocumentaryData,
        videoDocumentaryError: '',
      };
    case FETCH_DOCUMENTARY_VIDEO_FAILED:
      return { ...state, videoDocumentaryError: action.payload.videoDocumentaryError, isVideoLoading: false };
    case FETCH_DOCUMENTARY_VIDEO:
      return { ...state, isVideoLoading: true, videoDocumentaryError: '' };
    default:
      return { ...state };
  }
};
