import {
  FetchOpinionsSuccessPayloadType,
  FetchOpinionsFailedPayloadtype,
  FetchOpinionsSuccessType,
  FetchOpinionsFailedType,
  WriterOpinionsBodyGet,
  FetchWriterOpinionsFailedPayloadtype,
  FetchWriterOpinionsFailedType,
  FetchWriterOpinionsSuccessPayloadType,
  FetchWriterOpinionsSuccessType,
  EmptyWriterOpinionDataType,
  EmptyOpinionsDataType,
  StoreHomeOpinionNidPayload,
  OpinionsBodyGet,
} from 'src/redux/opinions/types';
import {
  EMPTY_OPINION_DATA,
  EMPTY_WRITER_OPINION_DATA,
  FETCH_OPINIONS,
  FETCH_OPINIONS_ERROR,
  FETCH_OPINIONS_SUCCESS,
  FETCH_WRITER_OPINIONS,
  FETCH_WRITER_OPINIONS_ERROR,
  FETCH_WRITER_OPINIONS_SUCCESS,
  STORE_HOME_OPINION_NID,
} from './actionTypes';

export const fetchOpinions = (payload: OpinionsBodyGet) => {
  return {
    type: FETCH_OPINIONS,
    payload,
  };
};

export const fetchOpinionsSuccess = (
  payload: FetchOpinionsSuccessPayloadType,
  byIdOpinions?: boolean
): FetchOpinionsSuccessType => {
  return {
    type: FETCH_OPINIONS_SUCCESS,
    byIdOpinions: byIdOpinions,
    payload,
  };
};

export const fetchOpinionsFailed = (
  payload: FetchOpinionsFailedPayloadtype,
): FetchOpinionsFailedType => {
  return {
    type: FETCH_OPINIONS_ERROR,
    payload,
  };
};

export const fetchWriterOpinions = (payload: WriterOpinionsBodyGet) => {
  return {
    type: FETCH_WRITER_OPINIONS,
    payload,
  };
};

export const fetchWriterOpinionsSuccess = (
  payload: FetchWriterOpinionsSuccessPayloadType,
): FetchWriterOpinionsSuccessType => {
  return {
    type: FETCH_WRITER_OPINIONS_SUCCESS,
    payload,
  };
};

export const fetchWriterOpinionsFailed = (
  payload: FetchWriterOpinionsFailedPayloadtype,
): FetchWriterOpinionsFailedType => {
  return {
    type: FETCH_WRITER_OPINIONS_ERROR,
    payload,
  };
};

export const emptyWriterOpinionAction = (
): EmptyWriterOpinionDataType => {
  return {
    type: EMPTY_WRITER_OPINION_DATA,
  };
};

export const emptyOpinionsAction = (
  ): EmptyOpinionsDataType => {
    return {
      type: EMPTY_OPINION_DATA,
    };
  };

export const storeHomeOpinionNid = (payload: StoreHomeOpinionNidPayload) => {
  return {
    type: STORE_HOME_OPINION_NID,
    payload,
  }
}

export const opinionsActions = {
  fetchOpinions,
  fetchOpinionsSuccess,
  fetchOpinionsFailed,
  emptyWriterOpinionAction,
  emptyOpinionsAction,
};
