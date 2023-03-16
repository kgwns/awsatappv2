import {
  GET_JOURNALIST_ARTICLE_INFO,
  GET_JOURNALIST_ARTICLE_SUCCESS,
  GET_JOURNALIST_ARTICLE_FAILED,
  EMPTY_JOURNALIST_ARTICLE,
  FETCH_JOURNALIST_DETAIL,
  FETCH_JOURNALIST_DETAIL_SUCCESS,
  FETCH_JOURNALIST_DETAIL_ERROR,
  EMPTY_JOURNALIST_DETAIL,
} from "./actionType"
import {
  GetJournalistInfoPayload,
  GetJournalistInfoType,
  JournalistInfoSuccessPayload,
  GetJournalistInfoSuccessType,
  JournalistInfoFailedPayload,
  GetJournalistInfoFailedType,
  EmptyJournalistArticleType,
  JournalistDetailBodyGet,
  FetchJournalistDetailSuccessPayloadType,
  FetchJournalistDetailSuccessType,
  FetchJournalistDetailFailedPayloadType,
  FetchJournalistDetailFailedType,
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

export const fetchJournalistDetail = (payload: JournalistDetailBodyGet) => {
  return {
    type: FETCH_JOURNALIST_DETAIL,
    payload,
  };
};

export const fetchJournalistDetailSuccess = (
  payload: FetchJournalistDetailSuccessPayloadType,
): FetchJournalistDetailSuccessType => {
  return {
    type: FETCH_JOURNALIST_DETAIL_SUCCESS,
    payload,
  };
};

export const fetchJournalistDetailFailed = (
  payload: FetchJournalistDetailFailedPayloadType,
): FetchJournalistDetailFailedType => {
  return {
    type: FETCH_JOURNALIST_DETAIL_ERROR,
    payload,
  };
};

export const emptyJournalistDetail = () => {
  return {
    type: EMPTY_JOURNALIST_DETAIL
  }
}

export const journalistActions = {
  getJournalistInfoDetail,
  getJournalistInfoDetailSuccess,
  getJournalistInfoDetailFailed,
  emptyJournalistArticle,
  fetchJournalistDetail,
  fetchJournalistDetailSuccess,
  fetchJournalistDetailFailed,
  emptyJournalistDetail,
};
