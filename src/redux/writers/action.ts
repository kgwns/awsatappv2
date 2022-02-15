import {
  FetchOpinionWriterListSuccessPayloadType,
  FetchOpinionWriterListFailedPayloadtype,
  FetchOpinionWriterSuccessType,
  FetchOpinionWriterFailedType,
  WritersBodyGet,
} from 'src/redux/writers/types';
import {
  FETCH_OPINION_WRITER,
  FETCH_OPINION_WRITER_SUCCESS,
  FETCH_OPINION_WRITER_ERROR,
} from 'src/redux/writers/actionTypes';

export const fetchOpinionWriter = (payload: WritersBodyGet) => {
  return {
    type: FETCH_OPINION_WRITER,
    payload,
  };
};

export const fetchOpinionWriterSuccess = (
  payload: FetchOpinionWriterListSuccessPayloadType,
): FetchOpinionWriterSuccessType => {
  return {
    type: FETCH_OPINION_WRITER_SUCCESS,
    payload,
  };
};

export const fetchOpinionWriterFailed = (
  payload: FetchOpinionWriterListFailedPayloadtype,
): FetchOpinionWriterFailedType => {
  return {
    type: FETCH_OPINION_WRITER_ERROR,
    payload,
  };
};

export const opinionWritersActions = {
  fetchOpinionWriter,
  fetchOpinionWriterSuccess,
  fetchOpinionWriterFailed,
};
