import {
  FETCH_DMA_INTRODUCTION,
  FETCH_DMA_INTRODUCTION_SUCCESS,
  FETCH_DMA_INTRODUCTION_ERROR
} from './actionTypes';

export interface DMAIntroductionItemType {
  title: string;
  body_export: string;
}

export type DeleteMyAccountState = {
  dmaIntroductionData: DMAIntroductionItemType[];
  error: string;
  isLoading: boolean;
}

export interface FetchDMAIntroductionSuccessPayloadType {
  dmaIntroductionData: any;
}

export interface FetchDMAIntroductionFailedPayloadtype {
  error: string;
}

export type FetchDMAIntroductionType = {
  type: typeof FETCH_DMA_INTRODUCTION;
};

export type FetchDMAIntroductionSuccessType = {
  type: typeof FETCH_DMA_INTRODUCTION_SUCCESS;
  payload: FetchDMAIntroductionSuccessPayloadType;
};

export type FetchDMAIntroductionFailedType = {
  type: typeof FETCH_DMA_INTRODUCTION_ERROR;
  payload: FetchDMAIntroductionFailedPayloadtype;
};

export type DeleteMyAccountActions =
  | FetchDMAIntroductionType
  | FetchDMAIntroductionSuccessType
  | FetchDMAIntroductionFailedType
