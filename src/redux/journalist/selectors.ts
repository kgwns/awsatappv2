import { AppState, Selector } from 'src/redux/rootReducer';
import { JournalistArticleData, JournalistDetailDataType } from './types';

export const getIsLoading: Selector<boolean> = (state: AppState) =>
  state.journalist.isLoading;

export const getJournalistArticleSuccessInfo: Selector<JournalistArticleData[]> = (state: AppState) =>
  state.journalist.journalistArticle;

export const getJournalistArticleError: Selector<string> = (state: AppState) =>
  state.journalist.journalistArticleError;

export const getIsDetailLoading: Selector<boolean> = (state: AppState) =>
  state.journalist.isDetailLoading;

export const getJournalistDetailSuccessInfo: Selector<JournalistDetailDataType[]> = (state: AppState) =>
  state.journalist.journalistDetail;

export const getJournalistDetailError: Selector<string> = (state: AppState) =>
  state.journalist.error;
