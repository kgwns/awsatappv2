import {
  FETCH_DMA_INTRODUCTION,
  FETCH_DMA_INTRODUCTION_SUCCESS,
  FETCH_DMA_INTRODUCTION_ERROR
} from './actionTypes';
import {
  FetchDMAIntroductionSuccessPayloadType,
  FetchDMAIntroductionFailedPayloadtype,
  FetchDMAIntroductionSuccessType,
  FetchDMAIntroductionFailedType,
} from './types';

export const fetchDMAIntroduction = () => {
  return {
    type: FETCH_DMA_INTRODUCTION,
  };
};

export const fetchDMAIntroductionSuccess = (
  payload: FetchDMAIntroductionSuccessPayloadType,
): FetchDMAIntroductionSuccessType => {
  return {
    type: FETCH_DMA_INTRODUCTION_SUCCESS,
    payload,
  };
};

export const fetchDMAIntroductionFailed = (
  payload: FetchDMAIntroductionFailedPayloadtype,
): FetchDMAIntroductionFailedType => {
  return {
    type: FETCH_DMA_INTRODUCTION_ERROR,
    payload,
  };
};

export const deleteMyAccountActions = {
  fetchDMAIntroduction,
  fetchDMAIntroductionSuccess,
  fetchDMAIntroductionFailed,
};
