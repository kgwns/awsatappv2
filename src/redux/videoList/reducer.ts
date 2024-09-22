import { FETCH_VIDEO, FETCH_VIDEO_SUCCESS, FETCH_VIDEO_FAILED, FETCH_VIDEO_PAGINATION_SUCCESS, FETCH_VIDEO_PAGINATION, FETCH_VIDEO_PAGINATION_FAILED, FETCH_VIDEO_BY_ID_SUCCESS, FETCH_VIDEO_BY_ID_FAILED, FETCH_VIDEO_BY_ID } from './actionTypes';
import { VideoActions, VideoState } from './types';
const initialAuthState: VideoState = {
  videoData: [],
  error: '',
  isLoading: false,
  isVideoLoading: false,
  videoPaginationData: [],
  videoByIdData: [],
  videoError: ''
};

export default (state = initialAuthState, action: VideoActions) => {
  switch (action.type) {
    case FETCH_VIDEO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        videoData: action.payload.videoData,
        error: '',
      };
    case FETCH_VIDEO_FAILED:
      return { ...state, error: action.payload.error, isLoading: false };
    case FETCH_VIDEO:
      return { ...state, isLoading: true, error: '' };
    case FETCH_VIDEO_PAGINATION_SUCCESS:
      return {
        ...state,
        isVideoLoading: false,
        videoPaginationData: action.payload.videoData,
        videoError: '',
      };
    case FETCH_VIDEO_PAGINATION_FAILED:
      return { ...state, videoError: action.payload.error, isVideoLoading: false };
    case FETCH_VIDEO_PAGINATION:
      return { ...state, isVideoLoading: true, videoError: '' };
    case FETCH_VIDEO_BY_ID_SUCCESS:
      return {
        ...state,
        isVideoLoading: false,
        videoByIdData: action.payload.videoData,
        videoError: '',
      };
    case FETCH_VIDEO_BY_ID_FAILED:
      return { ...state, videoError: action.payload.error, isVideoLoading: false };
    case FETCH_VIDEO_BY_ID:
      return { ...state, isVideoLoading: true, videoError: '' };
    default:
      return { ...state };
  }
};
