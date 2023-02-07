import { FETCH_VIDEO, FETCH_VIDEO_SUCCESS, FETCH_VIDEO_FAILED } from './actionTypes';
import { VideoActions, VideoState } from './types';
const initialAuthState: VideoState = {
  videoData: [],
  error: '',
  isLoading: false,
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
    default:
      return { ...state };
  }
};
