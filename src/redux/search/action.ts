import {
  FetchSearchSuccessPayloadType,
  FetchSearchFailedPayloadtype,
  FetchSearchSuccessType,
  FetchSearchFailedType,
  FetchSearchRequestPayloadType,
  FetchSearchRequestType,
  UpdateSearchHistory,
  ClearSearchHistory,
} from './types';
import {
  FETCH_SEARCH_SUCCESS,
  FETCH_SEARCH_ERROR,
  FETCH_SEARCH_REQUEST,
  UPDATE_SEARCH_HISTORY,
  CLEAR_SEARCH_HISTORY,
} from './actionTypes';

export const fetchSearchSuccess = (
  payload: FetchSearchSuccessPayloadType,
): FetchSearchSuccessType => {
  return {
    type: FETCH_SEARCH_SUCCESS,
    payload,
  };
};

export const updateSearchHistory = (
  payload: string[]): 
  UpdateSearchHistory => {
    return {
      type: UPDATE_SEARCH_HISTORY,
      payload
    }
}

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

export const clearSearchHistory = (): ClearSearchHistory => {
  return {
    type: CLEAR_SEARCH_HISTORY
  }
}

export const searchActions = {
  fetchSearchSuccess,
  fetchSearchFailed,
  fetchSearchRequest,
  updateSearchHistory,
  clearSearchHistory
};
