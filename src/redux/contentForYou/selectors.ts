import {AppState, Selector} from 'src/redux/rootReducer';
import {OpinionsListItemType, ArticlesListItemType} from './types';

export const getIsLoading: Selector<boolean> = (state: AppState) =>
  state.contentForYou.isLoading;

export const getFavouriteOpinionsData: Selector<OpinionsListItemType[]> = (
  state: AppState,
) => state.contentForYou.favouriteOpinionData.rows;

export const getFavouriteOpinionsError: Selector<string> = (state: AppState) =>
  state.contentForYou.error;

export const getArticleLoading: Selector<boolean> = (state: AppState) =>
  state.contentForYou.isArticleLoading;

export const getFavouriteArticlesData: Selector<ArticlesListItemType[]> = (
  state: AppState,
) => state.contentForYou.favouriteArticlesData.rows;

export const getFavouriteArticlesError: Selector<string> = (state: AppState) =>
  state.contentForYou.articleError;
