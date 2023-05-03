import {
  FETCH_DMA_INTRODUCTION,
  FETCH_DMA_INTRODUCTION_SUCCESS,
  FETCH_DMA_INTRODUCTION_ERROR,
  FETCH_DMA_OPTIONS_LIST,
  FETCH_DMA_OPTIONS_LIST_SUCCESS,
  FETCH_DMA_OPTIONS_LIST_ERROR,
} from './actionTypes';
import {
  FetchDMAIntroductionSuccessPayloadType,
  FetchDMAIntroductionFailedPayloadtype,
  FetchDMAIntroductionSuccessType,
  FetchDMAIntroductionFailedType,
  FetchDMAOptionsListSuccessPayloadType,
  FetchDMAOptionsListFailedPayloadtype,
  FetchDMAOptionsListSuccessType,
  FetchDMAOptionsListFailedType,
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

export const fetchDMAOptionsList = () => {
  return {
    type: FETCH_DMA_OPTIONS_LIST,
  };
};

export const fetchDMAOptionsListSuccess = (
  payload: FetchDMAOptionsListSuccessPayloadType,
): FetchDMAOptionsListSuccessType => {
  return {
    type: FETCH_DMA_OPTIONS_LIST_SUCCESS,
    payload,
  };
};

export const fetchDMAOptionsListFailed = (
  payload: FetchDMAOptionsListFailedPayloadtype,
): FetchDMAOptionsListFailedType => {
  return {
    type: FETCH_DMA_OPTIONS_LIST_ERROR,
    payload,
  };
};

export const deleteMyAccountActions = {
  fetchDMAIntroduction,
  fetchDMAIntroductionSuccess,
  fetchDMAIntroductionFailed,
  fetchDMAOptionsList,
  fetchDMAOptionsListSuccess,
  fetchDMAOptionsListFailed
};
