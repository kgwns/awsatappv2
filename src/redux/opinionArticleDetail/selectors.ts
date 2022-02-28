import {AppState, Selector} from 'src/redux/rootReducer';
import {OpinionArticleDetailItemType} from './types';

export const getIsLoading: Selector<boolean> = (state: AppState) =>
  state.opinionArticleDetail.isLoading;

export const getOpinionArticleData: Selector<OpinionArticleDetailItemType[]> = (
  state: AppState,
) => state.opinionArticleDetail.opinionArticleDetailData.rows;

export const getOpinionArticleError: Selector<string> = (state: AppState) =>
  state.opinionArticleDetail.error;
