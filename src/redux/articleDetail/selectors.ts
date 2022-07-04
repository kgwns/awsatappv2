import { AppState, Selector } from 'src/redux/rootReducer';
import { ArticleDetailDataType, RelatedArticleDataType } from './types';

export const getIsLoading: Selector<boolean> = (state: AppState) =>
  state.articleDetail.isLoading;

export const getArticleData: Selector<ArticleDetailDataType[]> = (state: AppState) =>
  state.articleDetail.articleDetailData;

export const getRelatedArticleData: Selector<RelatedArticleDataType[]> = (state: AppState) =>
  state.articleDetail.relatedArticleData;

export const getArticleError: Selector<string> = (state: AppState) =>
  state.articleDetail.error;

export const getArticleSectionLoaded: Selector<boolean> = (state: AppState) =>
  state.articleDetail.articleSectionLoaded;
