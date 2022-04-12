import { FetchWriterDetailFailedPayloadType, FetchWriterDetailFailedType, FetchWriterDetailSuccessPayloadType, FetchWriterDetailSuccessType } from 'src/redux/writersDetail/types';
import {
  FETCH_WRITER_DETAIL,
  FETCH_WRITER_DETAIL_SUCCESS,
  FETCH_WRITER_DETAIL_ERROR,
  EMPTY_WRITER_DETAIL
} from 'src/redux/writersDetail/actionTypes';
import { WritersDetailBodyGet } from '../writersDetail/types';

export const fetchWriterDetail = (payload: WritersDetailBodyGet) => {
  return {
    type: FETCH_WRITER_DETAIL,
    payload,
  };
};

export const fetchWriterDetailSuccess = (
  payload: FetchWriterDetailSuccessPayloadType,
): FetchWriterDetailSuccessType => {
  return {
    type: FETCH_WRITER_DETAIL_SUCCESS,
    payload,
  };
};

export const fetchWriterDetailFailed = (
  payload: FetchWriterDetailFailedPayloadType,
): FetchWriterDetailFailedType => {
  return {
    type: FETCH_WRITER_DETAIL_ERROR,
    payload,
  };
};

export const emptyWriterDataAction = () => {
  return {
    type: EMPTY_WRITER_DETAIL
  }
}

export const writerDetailActions = {
  fetchWriterDetail,
  fetchWriterDetailSuccess,
  fetchWriterDetailFailed,
  emptyWriterDataAction,
};
