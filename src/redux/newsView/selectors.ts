import {AppState, Selector} from 'src/redux/rootReducer';
import {NewsViewListItemType} from './types';

export const getIsLoading: Selector<boolean> = (state: AppState) =>
  state.newsViewReducer.isLoading;

export const getNewsViewError: Selector<string> = (state: AppState) =>
  state.newsViewReducer.error;

export const getHeroListData: Selector<NewsViewListItemType[]> = (
  state: AppState,
) => state.newsViewReducer.heroListData.rows;

export const getTopListData: Selector<NewsViewListItemType[]> = (
  state: AppState,
) => state.newsViewReducer.topListData.rows;

export const getBottomListData: Selector<NewsViewListItemType[]> = (
  state: AppState,
) => state.newsViewReducer.bottomListData.rows;
