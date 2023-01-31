import {
  FetchVideoSuccessPayloadType,
  FetchVideoFailedPayloadtype,
  FetchVideoSuccessType,
  FetchVideoFailedType,
} from './types';
import {
  FETCH_VIDEO,
  FETCH_VIDEO_SUCCESS,
  FETCH_VIDEO_FAILED,
} from './actionTypes';

export const fetchVideoList = () => {
  return {
    type: FETCH_VIDEO,
  };
};

export const fetchVideoListSuccess = (
  payload: FetchVideoSuccessPayloadType,
): FetchVideoSuccessType => {
  return {
    type: FETCH_VIDEO_SUCCESS,
    payload,
  };
};

export const fetchVideoListFailed = (
  payload: FetchVideoFailedPayloadtype,
): FetchVideoFailedType => {
  return {
    type: FETCH_VIDEO_FAILED,
    payload,
  };
};

export const videoActions = {
  fetchVideoList,
  fetchVideoListSuccess,
  fetchVideoListFailed,
};
