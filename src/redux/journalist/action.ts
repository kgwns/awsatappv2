import {
  GET_JOURNALIST_ARTICLE_INFO,
  GET_JOURNALIST_ARTICLE_SUCCESS,
  GET_JOURNALIST_ARTICLE_FAILED,
  EMPTY_JOURNALIST_ARTICLE,
} from "./actionType"
import {
  GetJournalistInfoPayload,
  GetJournalistInfoType,
  JournalistInfoSuccessPayload,
  GetJournalistInfoSuccessType,
  JournalistInfoFailedPayload,
  GetJournalistInfoFailedType,
  EmptyJournalistArticleType,
} from "./types"

export const getJournalistInfoDetail = (
  payload: GetJournalistInfoPayload
): GetJournalistInfoType => {
  return {
    type: GET_JOURNALIST_ARTICLE_INFO,
    payload
  }
}

export const getJournalistInfoDetailSuccess = (
  payload: JournalistInfoSuccessPayload,
): GetJournalistInfoSuccessType => {
  return {
    type: GET_JOURNALIST_ARTICLE_SUCCESS,
    payload,
  };
};

export const getJournalistInfoDetailFailed = (
  payload: JournalistInfoFailedPayload,
): GetJournalistInfoFailedType => {
  return {
    type: GET_JOURNALIST_ARTICLE_FAILED,
    payload,
  };
};

export const emptyJournalistArticle = ()
: EmptyJournalistArticleType => {
  return {
    type: EMPTY_JOURNALIST_ARTICLE,
  }
}


export const journalistActions = {
  getJournalistInfoDetail,
  getJournalistInfoDetailSuccess,
  getJournalistInfoDetailFailed,
  emptyJournalistArticle,
};