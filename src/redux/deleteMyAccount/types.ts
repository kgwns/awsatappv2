import {
  FETCH_DMA_INTRODUCTION,
  FETCH_DMA_INTRODUCTION_SUCCESS,
  FETCH_DMA_INTRODUCTION_ERROR,
  FETCH_DMA_OPTIONS_LIST,
  FETCH_DMA_OPTIONS_LIST_SUCCESS,
  FETCH_DMA_OPTIONS_LIST_ERROR
} from './actionTypes';

export interface DMAIntroductionItemType {
  title: string;
  body_export: string;
}
export interface DMAOptionsListItemType {
  id: number;
  en_option: string;
  ar_option: string;
}

export type DeleteMyAccountState = {
  dmaIntroductionData: DMAIntroductionItemType[];
  dmaOptionsListData: DMAOptionsListItemType[];
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

export interface FetchDMAOptionsListSuccessPayloadType {
  dmaOptionsListData: any;
}

export interface FetchDMAOptionsListFailedPayloadtype {
  error: string;
}

export type FetchDMAOptionsListType = {
  type: typeof FETCH_DMA_OPTIONS_LIST;
};

export type FetchDMAOptionsListSuccessType = {
  type: typeof FETCH_DMA_OPTIONS_LIST_SUCCESS;
  payload: FetchDMAOptionsListSuccessPayloadType;
};

export type FetchDMAOptionsListFailedType = {
  type: typeof FETCH_DMA_OPTIONS_LIST_ERROR;
  payload: FetchDMAOptionsListFailedPayloadtype;
};

export interface DeleteRequestBodyPayload {
  option_id: string;
  comment: string;
}

export type DeleteMyAccountActions =
  | FetchDMAIntroductionType
  | FetchDMAIntroductionSuccessType
  | FetchDMAIntroductionFailedType
  | FetchDMAOptionsListType
  | FetchDMAOptionsListSuccessType
  | FetchDMAOptionsListFailedType
