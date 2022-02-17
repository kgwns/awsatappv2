import {
  FetchAllWritersListSuccessPayloadType,
  FetchAllWritersListFailedPayloadtype,
  FetchAllWritersSuccessType,
  FetchAllWritersFailedType,
  AllWritersBodyGet,
} from 'src/redux/allWriters/types';
import {
  FETCH_ALL_WRITERS,
  FETCH_ALL_WRITERS_SUCCESS,
  FETCH_ALL_WRITERS_ERROR,
} from 'src/redux/allWriters/actionTypes';

export const fetchAllWriters = (payload: AllWritersBodyGet) => {
  return {
    type: FETCH_ALL_WRITERS,
    payload,
  };
};

export const fetchAllWritersSuccess = (
  payload: FetchAllWritersListSuccessPayloadType,
): FetchAllWritersSuccessType => {
  return {
    type: FETCH_ALL_WRITERS_SUCCESS,
    payload,
  };
};

export const fetchAllWritersFailed = (
  payload: FetchAllWritersListFailedPayloadtype,
): FetchAllWritersFailedType => {
  return {
    type: FETCH_ALL_WRITERS_ERROR,
    payload,
  };
};

export const allWritersActions = {
  fetchAllWriters,
  fetchAllWritersSuccess,
  fetchAllWritersFailed,
};