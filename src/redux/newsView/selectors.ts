import {AppState, Selector} from 'src/redux/rootReducer';
import { LatestArticleDataType } from '../latestNews/types';
import {NewsViewListItemType} from './types';

export const getIsLoading: Selector<boolean> = (state: AppState) =>
  state.newsViewReducer.isLoading;

export const getNewsViewError: Selector<string> = (state: AppState) =>
  state.newsViewReducer.error;

export const getHeroListData: Selector<NewsViewListItemType[]> = (
  state: AppState,
) => state.newsViewReducer.heroListData.rows;

export const getTopListData: Selector<LatestArticleDataType[]> = (
  state: AppState,
) => state.newsViewReducer.topListData;

export const getBottomListData: Selector<NewsViewListItemType[]> = (
  state: AppState,
) => state.newsViewReducer.bottomListData.rows;
