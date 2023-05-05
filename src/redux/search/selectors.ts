import { AppState, Selector } from 'src/redux/rootReducer';
import { SearchItemType } from './types';

export const getIsLoading: Selector<boolean> = (state: AppState) =>
  state.search.isLoading;

export const getSearchData: Selector<SearchItemType[]> = (state: AppState) =>
  state.search.searchData;

export const getSearchError: Selector<string> = (state: AppState) =>
  state.search.error;

export const getSearchHistory: Selector<string[]> = (state: AppState) =>
  state.search.searchHistory;
