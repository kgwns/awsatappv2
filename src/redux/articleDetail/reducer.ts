import { REQUEST_ARTICLE_DETAIL, REQUEST_ARTICLE_DETAIL_FAILED, REQUEST_ARTICLE_DETAIL_SUCCESS, REQUEST_RELATED_ARTICLE, REQUEST_RELATED_ARTICLE_FAILED, REQUEST_RELATED_ARTICLE_SUCCESS, EMPTY_DATA } from './actionType';
import { ArticleDetailAction, ArticleDetailState } from './types';

const initialData: ArticleDetailState = {
  isLoading: true,
  error: '',
  articleDetailData: [],
  pager: {},
  relatedArticleData: []
};

export default (state = initialData, action: ArticleDetailAction) => {
  switch (action.type) {
    case REQUEST_ARTICLE_DETAIL:
      return {
        ...state,
        isLoading: true,
        articleDetailData: []
      }
    case REQUEST_ARTICLE_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        articleDetailData: action.payload.articleDetailData,
        pager: action.payload.pager
      }
    case REQUEST_ARTICLE_DETAIL_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      }
    case REQUEST_RELATED_ARTICLE:
      return {
        ...state,
        isLoading: true
      }
    case REQUEST_RELATED_ARTICLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        relatedArticleData: action.payload.relatedArticleData,
      }
    case REQUEST_RELATED_ARTICLE_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      }
    case EMPTY_DATA:
      return {
        ...state,
        isLoading: false,
        error: '',
        articleDetailData: [],
        pager: {},
        relatedArticleData: []
      };
    default:
      return { ...state }
  }
}
