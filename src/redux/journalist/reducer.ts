import {
  GET_JOURNALIST_ARTICLE_INFO,
  GET_JOURNALIST_ARTICLE_SUCCESS,
  GET_JOURNALIST_ARTICLE_FAILED,
  EMPTY_JOURNALIST_ARTICLE,
  FETCH_JOURNALIST_DETAIL,
  FETCH_JOURNALIST_DETAIL_SUCCESS,
  FETCH_JOURNALIST_DETAIL_ERROR,
  EMPTY_JOURNALIST_DETAIL,
} from './actionType';
import {
  JournalistInfoAction,
  JournalistArticleState
} from './types';

const initialData: JournalistArticleState = {
  isLoading: false,
  journalistArticle: [],
  journalistArticleError: '',
  journalistDetail: [],
  error: '',
  isDetailLoading: false,
};

export default (state = initialData, action: JournalistInfoAction) => {
  const combineJournalistArticleData = (data: any) => {
    const journalist = [...state.journalistArticle]
    return journalist.concat(data);
  }

  switch (action.type) {
    case GET_JOURNALIST_ARTICLE_INFO:
      return {
        ...state,
        isLoading: true,
        journalistArticleError: '',
      }
    case GET_JOURNALIST_ARTICLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        journalistArticle: combineJournalistArticleData(action.payload.journalistData)
      }
    case GET_JOURNALIST_ARTICLE_FAILED:
      return {
        ...state,
        isLoading: false,
        journalistArticleError: action.payload.error
      }
    case EMPTY_JOURNALIST_ARTICLE:
      return {
        ...initialData,
      }
    case FETCH_JOURNALIST_DETAIL:
      return {
        ...state,
        isDetailLoading: true,
        error: '',
      };
    case FETCH_JOURNALIST_DETAIL_SUCCESS:
      return {
        ...state,
        journalistDetail: action.payload.journalistDetail,
        isDetailLoading: false
      };
    case FETCH_JOURNALIST_DETAIL_ERROR:
      return {
        ...state,
        isDetailLoading: false,
        error: action.payload.error
      };
    case EMPTY_JOURNALIST_DETAIL:
      return {
        ...initialData
      }
    default:
      return { ...state }
  }
}
