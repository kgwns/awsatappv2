import {
  REQUEST_OPINION_ARTICLE_DETAIL,
  REQUEST_OPINION_ARTICLE_DETAIL_FAILED,
  REQUEST_OPINION_ARTICLE_DETAIL_SUCCESS,
  REQUEST_RELATED_OPINION,
  REQUEST_RELATED_OPINION_SUCCESS,
  REQUEST_RELATED_OPINION_FAILED,
  EMPTY_RELATED_OPINION_DATA,
  EMPTY_OPINION_ARTICLE_DETAIL,
  REQUEST_NARRATED_OPINION_ARTICLE,
  REQUEST_NARRATED_OPINION_ARTICLE_SUCCESS,
  REQUEST_NARRATED_OPINION_ARTICLE_FAILED,
} from './actionTypes';
import {OpinionArticleDetailAction, OpinionArticleDetailState} from './types';

const initialData: OpinionArticleDetailState = {
  isLoading: true,
  error: '',
  opinionArticleDetailData: [],
  isLoadingRelatedOpinion:true,
  relatedOpinionError: '',
  relatedOpinionListData: {rows: [], pager: {current_page: 0, items_per_page: ''}},
  mediaData:{}
};

export default (state = initialData, action: OpinionArticleDetailAction) => {
  const concatData = (data: any) => {
    state.relatedOpinionListData.rows = state.relatedOpinionListData.rows.concat(data.rows);
    state.relatedOpinionListData.pager.current_page = data.pager.current_page;
    state.relatedOpinionListData.pager.items_per_page = data.pager.items_per_page;
    return state.relatedOpinionListData;
  };
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
    case REQUEST_RELATED_OPINION:
      return {
        ...state,
        isLoadingRelatedOpinion: true
      }
    case REQUEST_RELATED_OPINION_SUCCESS:
      return {
        ...state,
        isLoadingRelatedOpinion: false,
        relatedOpinionListData: concatData(action.payload.relatedOpinionListData),
      }
    case REQUEST_RELATED_OPINION_FAILED:
      return {
        ...state,
        isLoadingRelatedOpinion: false,
        relatedOpinionError: action.payload.error
      }
    case EMPTY_RELATED_OPINION_DATA:
      return {
        ...state,
        isLoadingRelatedOpinion: false,
        relatedOpinionListData:  {rows: [], pager: {current_page: 0, items_per_page: ''}},
      }
    case EMPTY_OPINION_ARTICLE_DETAIL:
      return {
        ...state,
        sLoading: true,
        error: '',
        opinionArticleDetailData: [],
        mediaData:{}
      }
    case REQUEST_NARRATED_OPINION_ARTICLE:
      return {
        ...state,
        isLoading: false
      }
    case REQUEST_NARRATED_OPINION_ARTICLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        mediaData: action.payload.mediaData,
      }
    case REQUEST_NARRATED_OPINION_ARTICLE_FAILED:
      return {
        ...state,
        isLoading: false,
        mediaData: action.payload.error
      }
    default:
      return {...state};
  }
};
