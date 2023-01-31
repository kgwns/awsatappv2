import {
  FetchTopMenuSuccessPayloadType,
  FetchTopMenuFailedPayloadtype,
  FetchTopMenuSuccessType,
  FetchTopMenuFailedType,
} from './types';
import {
  FETCH_TOP_MENU,
  FETCH_TOP_MENU_SUCCESS,
  FETCH_TOP_MENU_ERROR,
} from './actionTypes';

export const fetchTopMenu = () => {
  return {
    type: FETCH_TOP_MENU,
  };
};

export const fetchTopMenuSuccess = (
  payload: FetchTopMenuSuccessPayloadType,
): FetchTopMenuSuccessType => {
  return {
    type: FETCH_TOP_MENU_SUCCESS,
    payload,
  };
};

export const fetchTopMenuFailed = (
  payload: FetchTopMenuFailedPayloadtype,
): FetchTopMenuFailedType => {
  return {
    type: FETCH_TOP_MENU_ERROR,
    payload,
  };
};

export const topMenuAction = {
  fetchTopMenu,
  fetchTopMenuSuccess,
  fetchTopMenuFailed,
};
