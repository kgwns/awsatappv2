import {
  FetchSearchSuccessPayloadType,
  FetchSearchFailedPayloadtype,
  FetchSearchSuccessType,
  FetchSearchFailedType,
  FetchSearchRequestPayloadType,
  FetchSearchRequestType,
} from './types';
import {
  FETCH_SEARCH_SUCCESS,
  FETCH_SEARCH_ERROR,
  FETCH_SEARCH_REQUEST,
} from './actionTypes';

export const fetchSearchSuccess = (
  payload: FetchSearchSuccessPayloadType,
): FetchSearchSuccessType => {
  return {
    type: FETCH_SEARCH_SUCCESS,
    payload,
  };
};

export const fetchSearchRequest = (
  payload: FetchSearchRequestPayloadType,
): FetchSearchRequestType => ({
  type: FETCH_SEARCH_REQUEST,
  payload,
});

export const fetchSearchFailed = (
  payload: FetchSearchFailedPayloadtype,
): FetchSearchFailedType => {
  return {
    type: FETCH_SEARCH_ERROR,
    payload,
  };
};

export const searchActions = {
  fetchSearchSuccess,
  fetchSearchFailed,
  fetchSearchRequest,
};