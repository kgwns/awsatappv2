import {
  FetchOpinionsSuccessPayloadType,
  FetchOpinionsFailedPayloadtype,
  FetchOpinionsSuccessType,
  FetchOpinionsFailedType,
  OpinionsBodyGet,
} from 'src/redux/opinions/types';
import {
  FETCH_OPINIONS,
  FETCH_OPINIONS_ERROR,
  FETCH_OPINIONS_SUCCESS,
} from './actionTypes';

export const fetchOpinions = (payload: OpinionsBodyGet) => {
  return {
    type: FETCH_OPINIONS,
    payload,
  };
};

export const fetchOpinionsSuccess = (
  payload: FetchOpinionsSuccessPayloadType,
): FetchOpinionsSuccessType => {
  return {
    type: FETCH_OPINIONS_SUCCESS,
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

export const opinionsActions = {
  fetchOpinions,
  fetchOpinionsSuccess,
  fetchOpinionsFailed,
};
