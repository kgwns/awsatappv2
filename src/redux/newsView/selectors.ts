import {AppState, Selector} from 'src/redux/rootReducer';
import { LatestArticleDataType } from '../latestNews/types';
import {NewsViewListItemType} from './types';

export const getIsLoading: Selector<boolean> = (state: AppState) =>
  state.newsView.isLoading;

export const getNewsViewError: Selector<string> = (state: AppState) =>
  state.newsView.error;

export const getHeroListData: Selector<NewsViewListItemType[]> = (
  state: AppState,
) => state.newsView.heroListData.rows;

export const getTopListData: Selector<LatestArticleDataType[]> = (
  state: AppState,
) => state.newsView.topListData;

export const getBottomListData: Selector<NewsViewListItemType[]> = (
  state: AppState,
) => state.newsView.bottomListData.rows;
