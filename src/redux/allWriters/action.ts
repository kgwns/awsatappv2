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
  GetSelectedAuthorSuccessType,
  GetSelectedAuthorFailedType,
  GetSelectedAuthorSuccessPayloadType,
  GetSelectedAuthorFailedPayloadtype,
  RemoveAuthorBody,
  RemoveAuthorSuccessPayloadType,
  RemoveAuthorFailedPayloadtype,
  RemoveAuthorSuccessType,
  RemoveAuthorFailedType,
  AllSelectedWritersDetailsBodyGet,
  FetchAllSelectedWritersDetailsFailedType,
  FetchAllSelectedWritersDetailsListFailedPayloadType,
  FetchAllSelectedWritersDetailsSuccessType,
  FetchAllSelectedWritersDetailsListSuccessPayloadType,
  SelectedDataFromOnboardPayload,
} from 'src/redux/allWriters/types';
import {
  FETCH_ALL_WRITERS,
  FETCH_ALL_WRITERS_SUCCESS,
  FETCH_ALL_WRITERS_ERROR,
  SEND_SELECTED_AUTHOR,
  SEND_SELECTED_AUTHOR_SUCCESS,
  SEND_SELECTED_AUTHOR_ERROR,
  GET_SELECTED_AUTHOR,
  GET_SELECTED_AUTHOR_SUCCESS,
  GET_SELECTED_AUTHOR_ERROR,
  EMPTY_SELECTED_AUTHORS_INFO,
  REMOVE_AUTHOR,
  REMOVE_AUTHOR_SUCCESS,
  REMOVE_AUTHOR_ERROR,
  FETCH_ALL_SELECTED_WRITERS_DETAILS,
  FETCH_ALL_SELECTED_WRITERS_DETAILS_SUCCESSS,
  FETCH_ALL_SELECTED_WRITERS_DETAILS_ERROR,
  EMPTY_SEND_AUTHOR_INFO,
  DESELECT_ALL_WRITERS,
  SELECTED_DATA_FROM_ONBOARD,
  EMPTY_SELECTED_WRITERS_DATA_FROM_ONBOARD,
  EMPTY_SELECTED_AUTHORS,
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

export const getSelectedAuthors = () => {
  return {
    type: GET_SELECTED_AUTHOR,
  };
};

export const getSelectedAuthorsSuccess = (
  payload: GetSelectedAuthorSuccessPayloadType,
): GetSelectedAuthorSuccessType => {
  return {
    type: GET_SELECTED_AUTHOR_SUCCESS,
    payload,
  };
};

export const getSelectedAuthorsFailed = (
  payload: GetSelectedAuthorFailedPayloadtype,
): GetSelectedAuthorFailedType => {
  return {
    type: GET_SELECTED_AUTHOR_ERROR,
    payload,
  };
};

export const emptySelectedAuthorsInfo = () => {
  return {
    type: EMPTY_SELECTED_AUTHORS_INFO,
  };
};

export const emptySelectedAuthors = () => {
  return {
    type: EMPTY_SELECTED_AUTHORS,
  };
};

export const removeAuthor = (payload: RemoveAuthorBody) => {
  return {
    type: REMOVE_AUTHOR,
    payload,
  };
};

export const removeAuthorSuccess = (
  payload: RemoveAuthorSuccessPayloadType,
): RemoveAuthorSuccessType => {
  return {
    type: REMOVE_AUTHOR_SUCCESS,
    payload,
  };
};

export const removeAuthorFailed = (
  payload: RemoveAuthorFailedPayloadtype,
): RemoveAuthorFailedType => {
  return {
    type: REMOVE_AUTHOR_ERROR,
    payload,
  };
};

export const fetchAllSelectedWritersDetails = (payload: AllSelectedWritersDetailsBodyGet) => {
  return {
    type: FETCH_ALL_SELECTED_WRITERS_DETAILS,
    payload,
  };
};

export const fetchAllSelectedWritersDetailsSuccess = (
  payload: FetchAllSelectedWritersDetailsListSuccessPayloadType,
): FetchAllSelectedWritersDetailsSuccessType => {
  return {
    type: FETCH_ALL_SELECTED_WRITERS_DETAILS_SUCCESSS,
    payload,
  };
};

export const fetchAllSelectedWritersDetailsFailed = (
  payload: FetchAllSelectedWritersDetailsListFailedPayloadType,
): FetchAllSelectedWritersDetailsFailedType => {
  return {
    type: FETCH_ALL_SELECTED_WRITERS_DETAILS_ERROR,
    payload,
  };
};

export const emptySendAuthorInfo = () => {
  return {
    type: EMPTY_SEND_AUTHOR_INFO
  }
}

export const deselectAllWriters = () => {
  return {
    type: DESELECT_ALL_WRITERS,
  };
}

export const setSelectedDataFromOnboard = (payload: SelectedDataFromOnboardPayload) => {
  return {
    type: SELECTED_DATA_FROM_ONBOARD,
    payload,
  };
};

export const emptySelectedWritersDataFromOnboard = () => {
  return {
    type: EMPTY_SELECTED_WRITERS_DATA_FROM_ONBOARD
  }
}

export const allWritersActions = {
  fetchAllWriters,
  fetchAllWritersSuccess,
  fetchAllWritersFailed,
  sendSelectedAuthor,
  sendSelectedAuthorSuccess,
  sendSelectedAuthorFailed,
  getSelectedAuthors,
  getSelectedAuthorsSuccess,
  getSelectedAuthorsFailed,
  emptySelectedAuthorsInfo,
  emptySelectedAuthors,
  removeAuthor,
  removeAuthorSuccess,
  removeAuthorFailed,
  fetchAllSelectedWritersDetails,
  fetchAllSelectedWritersDetailsFailed,
  fetchAllSelectedWritersDetailsSuccess,
  emptySendAuthorInfo,
  deselectAllWriters,
  setSelectedDataFromOnboard,
  emptySelectedWritersDataFromOnboard,
};
