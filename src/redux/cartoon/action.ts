import {
  CartoonListBodyType,
  FetchCartoonListSuccessPayloadType,
  FetchCartoonListSuccessType,
  FetchCartoonDetailFailedType,
  FetchCartoonListFailedPayloadType,
} from './types';
import {
  FETCH_CARTOON_LIST,
  FETCH_CARTOON_LIST_SUCCESS,
  FETCH_CARTOON_LIST_FAILED,
} from './actionTypes';

export const fetchCartoonList = (payload: CartoonListBodyType) => {
  return {
    type: FETCH_CARTOON_LIST,
    payload,
  };
};

export const fetchCartoonListSuccess = (
  payload: FetchCartoonListSuccessPayloadType,
): FetchCartoonListSuccessType => {
  return {
    type: FETCH_CARTOON_LIST_SUCCESS,
    payload,
  };
};

export const fetchCartoonListFailed = (
  payload: FetchCartoonListFailedPayloadType,
): FetchCartoonDetailFailedType => {
  return {
    type: FETCH_CARTOON_LIST_FAILED,
    payload,
  };
};

export const CartoonListActions = {
  fetchCartoonList,
  fetchCartoonListSuccess,
  fetchCartoonListFailed,
};
