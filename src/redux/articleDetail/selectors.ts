import {AppState, Selector} from 'src/redux/rootReducer';
import { ArticleDetailDataType } from './types';

export const getIsLoading: Selector<boolean> = (state: AppState) =>
  state.articleDetail.isLoading;

export const getArticleData: Selector<ArticleDetailDataType[]> = (state: AppState) =>
  state.articleDetail.articleDetailData;

export const getArticleError: Selector<string> = (state: AppState) =>
  state.articleDetail.error;
