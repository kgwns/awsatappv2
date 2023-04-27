import { AppState, Selector } from 'src/redux/rootReducer';
import { payloadType } from './types';

export const getIsLoading: Selector<boolean> = (state: AppState) =>
  state.sectionArticles.isLoading;

export const getSectionArticlesData: Selector<payloadType> = (state: AppState) =>
  state.sectionArticles.sectionArticlesData;

export const getSectionArticlesError: Selector<string> = (state: AppState) =>
  state.sectionArticles.error;
