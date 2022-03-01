import {
  REQUEST_OPINION_ARTICLE_DETAIL,
  REQUEST_OPINION_ARTICLE_DETAIL_FAILED,
  REQUEST_OPINION_ARTICLE_DETAIL_SUCCESS,
} from './actionTypes';
import {OpinionArticleDetailAction, OpinionArticleDetailState} from './types';

const initialData: OpinionArticleDetailState = {
  isLoading: true,
  error: '',
  opinionArticleDetailData: [],
};

export default (state = initialData, action: OpinionArticleDetailAction) => {
  switch (action.type) {
    case REQUEST_OPINION_ARTICLE_DETAIL:
      return {
        ...state,
        isLoading: true,
        opinionArticleDetailData: [],
      };
    case REQUEST_OPINION_ARTICLE_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        opinionArticleDetailData: action.payload.opinionArticleDetailData,
      };
    case REQUEST_OPINION_ARTICLE_DETAIL_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    default:
      return {...state};
  }
};
