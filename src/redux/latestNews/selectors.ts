import { AppState, Selector } from 'src/redux/rootReducer';
import { LatestArticleDataType } from './types';

export const getIsLoading: Selector<boolean> = (state: AppState) =>
  state.latestNewsTab.isLoading;

export const getTickerData: Selector<LatestArticleDataType[]> = (state: AppState) =>
  state.latestNewsTab.ticker;

export const getHeroData: Selector<LatestArticleDataType[]> = (state: AppState) =>
  state.latestNewsTab.hero;

export const getHeroListData: Selector<LatestArticleDataType[]> = (state: AppState) =>
  state.latestNewsTab.heroList;

export const getTopListData: Selector<LatestArticleDataType[]> = (state: AppState) =>
  state.latestNewsTab.topList;

export const getError: Selector<string> = (state: AppState) =>
  state.latestNewsTab.error;
