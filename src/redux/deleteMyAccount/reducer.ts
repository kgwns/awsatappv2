import {
  FETCH_DMA_INTRODUCTION,
  FETCH_DMA_INTRODUCTION_SUCCESS,
  FETCH_DMA_INTRODUCTION_ERROR
} from './actionTypes';
import { DeleteMyAccountActions, DeleteMyAccountState } from './types';

const initialState: DeleteMyAccountState = {
  dmaIntroductionData: [],
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
    default:
      return { ...state };
  }
};
