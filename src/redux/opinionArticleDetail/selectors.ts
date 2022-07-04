import {AppState, Selector} from 'src/redux/rootReducer';
import {OpinionArticleDetailItemType, OpinionsListItemType} from './types';

export const getIsLoading: Selector<boolean> = (state: AppState) =>
  state.opinionArticleDetail.isLoading;

export const getOpinionArticleData: Selector<OpinionArticleDetailItemType[]> = (
  state: AppState,
) => state.opinionArticleDetail.opinionArticleDetailData.rows;

export const getOpinionArticleError: Selector<string> = (state: AppState) =>
  state.opinionArticleDetail.error;

export const getIsLoadingRelatedOpinion: Selector<boolean> = (state: AppState) =>
  state.opinionArticleDetail.isLoadingRelatedOpinion;

export const getRelatedOpinionData: Selector<OpinionsListItemType[]> = (
  state: AppState,
) => state.opinionArticleDetail.relatedOpinionListData.rows;

export const getRelatedOpinionError: Selector<string> = (state: AppState) =>
  state.opinionArticleDetail.relatedOpinionError;

  export const getNarratedOpinionData: Selector<any> = (
    state: AppState,
  ) => state.opinionArticleDetail.mediaData;
