import {
  FETCH_DMA_INTRODUCTION,
  FETCH_DMA_INTRODUCTION_SUCCESS,
  FETCH_DMA_INTRODUCTION_ERROR,
  FETCH_DMA_OPTIONS_LIST,
  FETCH_DMA_OPTIONS_LIST_SUCCESS,
  FETCH_DMA_OPTIONS_LIST_ERROR,
} from './actionTypes';
import { DeleteMyAccountActions, DeleteMyAccountState } from './types';

const initialState: DeleteMyAccountState = {
  dmaIntroductionData: [],
  dmaOptionsListData: [],
  error: '',
  isLoading: false,
};

export default (state = initialState, action: DeleteMyAccountActions) => {
  switch (action.type) {
    case FETCH_DMA_INTRODUCTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dmaIntroductionData: action.payload.dmaIntroductionData,
        error: '',
      };
    case FETCH_DMA_INTRODUCTION_ERROR:
      return { ...state, error: action.payload.error, isLoading: false };
    case FETCH_DMA_INTRODUCTION:
      return { ...state, isLoading: true, error: '' };
    case FETCH_DMA_OPTIONS_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dmaOptionsListData: action.payload.dmaOptionsListData,
        error: '',
      };
    case FETCH_DMA_OPTIONS_LIST_ERROR:
      return { ...state, error: action.payload.error, isLoading: false };
    case FETCH_DMA_OPTIONS_LIST:
      return { ...state, isLoading: true, error: '' };
    default:
      return { ...state };
  }
};
