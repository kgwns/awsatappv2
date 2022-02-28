import {
  FetchAllWritersListSuccessPayloadType,
  FetchAllWritersListFailedPayloadtype,
  FetchAllWritersSuccessType,
  FetchAllWritersFailedType,
  AllWritersBodyGet,
  SendSelectedAuthorBody,
  SendSelectedAuthorSuccessType,
  SendSelectedAuthorFailedType,
  SendSelectedAuthorSuccessPayloadType,
  SendSelectedAuthorFailedPayloadtype,
} from 'src/redux/allWriters/types';
import {
  FETCH_ALL_WRITERS,
  FETCH_ALL_WRITERS_SUCCESS,
  FETCH_ALL_WRITERS_ERROR,
  SEND_SELECTED_AUTHOR,
  SEND_SELECTED_AUTHOR_SUCCESS,
  SEND_SELECTED_AUTHOR_ERROR,
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


export const sendSelectedAuthor = (payload: SendSelectedAuthorBody) => {
  return {
    type: SEND_SELECTED_AUTHOR,
    payload,
  };
};

export const sendSelectedAuthorSuccess = (
  payload: SendSelectedAuthorSuccessPayloadType,
): SendSelectedAuthorSuccessType => {
  return {
    type: SEND_SELECTED_AUTHOR_SUCCESS,
    payload,
  };
};

export const sendSelectedAuthorFailed = (
  payload: SendSelectedAuthorFailedPayloadtype,
): SendSelectedAuthorFailedType => {
  return {
    type: SEND_SELECTED_AUTHOR_ERROR,
    payload,
  };
};

export const allWritersActions = {
  fetchAllWriters,
  fetchAllWritersSuccess,
  fetchAllWritersFailed,
  sendSelectedAuthor,
  sendSelectedAuthorSuccess,
  sendSelectedAuthorFailed
};