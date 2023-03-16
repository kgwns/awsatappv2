import {
  FetchMostReadSuccessPayloadType,
  FetchMostReadFailedPayloadtype,
  FetchMostReadSuccessType,
  FetchMostReadFailedType,
} from 'src/redux/mostRead/types';
import {
  FETCH_MOST_READ,
  FETCH_MOST_READ_SUCCESS,
  FETCH_MOST_READ_ERROR,
} from './actionTypes';

export const fetchMostRead = () => {
  return {
    type: FETCH_MOST_READ,
  };
};

export const fetchMostReadSuccess = (
  payload: FetchMostReadSuccessPayloadType,
): FetchMostReadSuccessType => {
  return {
    type: FETCH_MOST_READ_SUCCESS,
    payload,
  };
};

export const fetchMostReadFailed = (
  payload: FetchMostReadFailedPayloadtype,
): FetchMostReadFailedType => {
  return {
    type: FETCH_MOST_READ_ERROR,
    payload,
  };
};

export const mostReadActions = {
  fetchMostRead,
  fetchMostReadSuccess,
  fetchMostReadFailed,
};
