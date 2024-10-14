import {
  FetchVideoSuccessPayloadType,
  FetchVideoFailedPayloadtype,
  FetchVideoSuccessType,
  FetchVideoFailedType,
  VideoListBodyGet,
  FetchVideoPaginationSuccessType,
  FetchVideoPaginationFailedType,
  FetchVideoByIdSuccessType,
  FetchVideoByIdFailedType,
} from './types';
import {
  FETCH_VIDEO,
  FETCH_VIDEO_SUCCESS,
  FETCH_VIDEO_FAILED,
  FETCH_VIDEO_PAGINATION,
  FETCH_VIDEO_PAGINATION_SUCCESS,
  FETCH_VIDEO_PAGINATION_FAILED,
  FETCH_VIDEO_BY_ID,
  FETCH_VIDEO_BY_ID_SUCCESS,
  FETCH_VIDEO_BY_ID_FAILED,
} from './actionTypes';

export const fetchVideoList = (payload: VideoListBodyGet) => {
  return {
    type: FETCH_VIDEO,
    payload
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

export const fetchVideoListById = (payload: VideoListBodyGet) => {
  return {
    type: FETCH_VIDEO_BY_ID,
    payload
  };
};

export const fetchVideoListByIdSuccess = (
  payload: FetchVideoSuccessPayloadType,
): FetchVideoByIdSuccessType => {
  return {
    type: FETCH_VIDEO_BY_ID_SUCCESS,
    payload,
  };
};

export const fetchVideoListByIdFailed = (
  payload: FetchVideoFailedPayloadtype,
): FetchVideoByIdFailedType => {
  return {
    type: FETCH_VIDEO_BY_ID_FAILED,
    payload,
  };
};

export const fetchVideoListWithPagination = (payload: VideoListBodyGet) => {
  return {
    type: FETCH_VIDEO_PAGINATION,
    payload
  };
};

export const fetchVideoListWithPaginationSuccess = (
  payload: FetchVideoSuccessPayloadType,
): FetchVideoPaginationSuccessType => {
  return {
    type: FETCH_VIDEO_PAGINATION_SUCCESS,
    payload,
  };
};

export const fetchVideoListWithPaginationFailed = (
  payload: FetchVideoFailedPayloadtype,
): FetchVideoPaginationFailedType => {
  return {
    type: FETCH_VIDEO_PAGINATION_FAILED,
    payload,
  };
};

export const videoActions = {
  fetchVideoList,
  fetchVideoListSuccess,
  fetchVideoListFailed,
  fetchVideoListWithPagination,
  fetchVideoListWithPaginationSuccess,
  fetchVideoListWithPaginationFailed,
};
