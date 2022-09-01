import {
  FetchAlbumListSuccessPayloadType,
  FetchAlbumListFailedPayloadtype,
  FetchAlbumListSuccessType,
  FetchAlbumListFailedType,
  AlbumListBodyGet,
  AlbumDetailBodyGet,
  FetchAlbumDetailSuccessType,
  FetchAlbumDetailFailedType,
  FetchAlbumDetailSuccessPayloadType,
  FetchAlbumDetailFailedPayloadtype,
} from './types';
import {
  FETCH_ALBUM_LIST,
  FETCH_ALBUM_LIST_SUCCESS,
  FETCH_ALBUM_LIST_ERROR,
  EMPTY_ALL_DATA,
  FETCH_ALBUM_DETAIL,
  FETCH_ALBUM_DETAIL_SUCCESS,
  FETCH_ALBUM_DETAIL_FAILED,
} from './actionTypes';

export const fetchAlbumList = (payload: AlbumListBodyGet) => {
  return {
    type: FETCH_ALBUM_LIST,
    payload,
  };
};

export const fetchAlbumListSuccess = (
  payload: FetchAlbumListSuccessPayloadType,
): FetchAlbumListSuccessType => {
  return {
    type: FETCH_ALBUM_LIST_SUCCESS,
    payload,
  };
};

export const fetchAlbumListFailed = (
  payload: FetchAlbumListFailedPayloadtype,
): FetchAlbumListFailedType => {
  return {
    type: FETCH_ALBUM_LIST_ERROR,
    payload,
  };
};

export const fetchAlbumDetail = (payload: AlbumDetailBodyGet) => {
  return {
    type: FETCH_ALBUM_DETAIL,
    payload,
  };
};

export const fetchAlbumDetailuccess = (
  payload: FetchAlbumDetailSuccessPayloadType,
): FetchAlbumDetailSuccessType => {
  return {
    type: FETCH_ALBUM_DETAIL_SUCCESS,
    payload,
  };
};

export const fetchAlbumDetailFailed = (
  payload: FetchAlbumDetailFailedPayloadtype,
): FetchAlbumDetailFailedType => {
  return {
    type: FETCH_ALBUM_DETAIL_FAILED,
    payload,
  };
};

export const emptyData = () => {
  return {
    type: EMPTY_ALL_DATA,
  };
};

export const albumListActions = {
  fetchAlbumList,
  fetchAlbumListSuccess,
  fetchAlbumListFailed,
  fetchAlbumDetail,
  fetchAlbumDetailuccess,
  fetchAlbumDetailFailed,
  emptyData,
};
