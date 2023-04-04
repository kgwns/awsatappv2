import {
  NewsViewBodyGet,
  FetchHeroListSuccessPayloadType,
  FetchHeroListSuccessType,
  FetchHeroListFailedPayloadtype,
  FetchHeroListFailedType,
  FetchTopListSuccessPayloadType,
  FetchTopListSuccessType,
  FetchTopListFailedPayloadtype,
  FetchTopListFailedType,
  FetchBottomListSuccessPayloadType,
  FetchBottomListSuccessType,
  FetchBottomListFailedPayloadtype,
  FetchBottomListFailedType,
} from 'src/redux/newsView/types';
import {
  REQUEST_HERO_LIST_DATA,
  REQUEST_HERO_LIST_SUCCESS,
  REQUEST_HERO_LIST_FAILED,
  REQUEST_TOP_LIST_DATA,
  REQUEST_TOP_LIST_SUCCESS,
  REQUEST_TOP_LIST_FAILED,
  REQUEST_BOTTOM_LIST_DATA,
  REQUEST_BOTTOM_LIST_SUCCESS,
  REQUEST_BOTTOM_LIST_FAILED,
  EMPTY_ALL_LIST,
} from './actionTypes';

export const fetchHeroList = (payload: NewsViewBodyGet) => {
  return {
    type: REQUEST_HERO_LIST_DATA,
    payload,
  };
};

export const fetchHeroListSuccess = (
  payload: FetchHeroListSuccessPayloadType,
): FetchHeroListSuccessType => {
  return {
    type: REQUEST_HERO_LIST_SUCCESS,
    payload,
  };
};

export const fetchHeroListFailed = (
  payload: FetchHeroListFailedPayloadtype,
): FetchHeroListFailedType => {
  return {
    type: REQUEST_HERO_LIST_FAILED,
    payload,
  };
};

export const fetchTopList = (payload: NewsViewBodyGet) => {
  return {
    type: REQUEST_TOP_LIST_DATA,
    payload,
  };
};

export const fetchTopListSuccess = (
  payload: FetchTopListSuccessPayloadType,
): FetchTopListSuccessType => {
  return {
    type: REQUEST_TOP_LIST_SUCCESS,
    payload,
  };
};

export const fetchTopListFailed = (
  payload: FetchTopListFailedPayloadtype,
): FetchTopListFailedType => {
  return {
    type: REQUEST_TOP_LIST_FAILED,
    payload,
  };
};

export const fetchBottomList = (payload: NewsViewBodyGet) => {
  return {
    type: REQUEST_BOTTOM_LIST_DATA,
    payload,
  };
};

export const fetchBottomListSuccess = (
  payload: FetchBottomListSuccessPayloadType,
): FetchBottomListSuccessType => {
  return {
    type: REQUEST_BOTTOM_LIST_SUCCESS,
    payload,
  };
};

export const fetchBottomListFailed = (
  payload: FetchBottomListFailedPayloadtype,
): FetchBottomListFailedType => {
  return {
    type: REQUEST_BOTTOM_LIST_FAILED,
    payload,
  };
};

export const emptyAllList = () => {
  return {
    type: EMPTY_ALL_LIST,
  };
};

export const newsViewActions = {
  fetchHeroList,
  fetchHeroListSuccess,
  fetchHeroListFailed,
  fetchTopList,
  fetchTopListSuccess,
  fetchTopListFailed,
  fetchBottomList,
  fetchBottomListSuccess,
  fetchBottomListFailed,
  emptyAllList,
};
