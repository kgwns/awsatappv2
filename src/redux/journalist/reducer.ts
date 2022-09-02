import {
  GET_JOURNALIST_ARTICLE_INFO,
  GET_JOURNALIST_ARTICLE_SUCCESS,
  GET_JOURNALIST_ARTICLE_FAILED,
  EMPTY_JOURNALIST_ARTICLE,
} from './actionType';
import {
  JournalistInfoAction,
  JournalistArticleState,
} from './types';

const initialData: JournalistArticleState = {
  isLoading: false,
  journalistArticle: [],
  journalistArticleError: '',
};

export default (state = initialData, action: JournalistInfoAction) => {
  const combineJournalistArticleData = (data: any) => {
    const journalist = [...state.journalistArticle]
    const updatedData = journalist.concat(data)
    return updatedData
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
        ...state,
        journalistArticle: [],
        journalistArticleError: '',
      }
    default:
      return { ...state }
  }
}
