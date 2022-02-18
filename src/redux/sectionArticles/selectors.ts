import { AppState, Selector } from 'src/redux/rootReducer';
import { SectionArticlesItemType } from './types';

export const getIsLoading: Selector<boolean> = (state: AppState) =>
  state.sectionArticles.isLoading;

export const getSectionArticlesData: Selector<SectionArticlesItemType[]> = (state: AppState) =>
  state.sectionArticles.sectionArticlesData;

export const getSectionArticlesError: Selector<string> = (state: AppState) =>
  state.sectionArticles.error;