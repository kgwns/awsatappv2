import { REQUEST_ARTICLE_DETAIL, REQUEST_ARTICLE_DETAIL_FAILED, REQUEST_ARTICLE_DETAIL_SUCCESS } from './actionType';
import { ArticleDetailAction, ArticleDetailState } from './types';

const initialData: ArticleDetailState = {
  isLoading: true,
  error: '',
  articleDetailData: [],
  pager: {}
};

export default (state = initialData, action: ArticleDetailAction) => {
  switch (action.type) {
    case REQUEST_ARTICLE_DETAIL:
      return {
        ...state,
        isLoading: true
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
    default:
      return { ...state }
  }
}
