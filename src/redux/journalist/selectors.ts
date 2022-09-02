import { AppState, Selector } from 'src/redux/rootReducer';
import { JournalistArticleData } from './types';

export const getIsLoading: Selector<boolean> = (state: AppState) =>
  state.journalist.isLoading;

export const getJournalistArticleSuccessInfo: Selector<JournalistArticleData[]> = (state: AppState) =>
  state.journalist.journalistArticle;

export const getJournalistArticleError: Selector<string> = (state: AppState) =>
  state.journalist.journalistArticleError;
