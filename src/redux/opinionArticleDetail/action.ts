import {
  REQUEST_OPINION_ARTICLE_DETAIL,
  REQUEST_OPINION_ARTICLE_DETAIL_SUCCESS,
  REQUEST_OPINION_ARTICLE_DETAIL_FAILED,
} from './actionTypes';
import {
  OpinionArticleDetailBodyGet,
  OpinionArticleDetailFailedPayload,
  OpinionArticleDetailFailedType,
  OpinionArticleDetailSuccessPayload,
  OpinionArticleDetailSuccessType,
  RequestOpinionArticleDetailType,
} from './types';

export const requestOpinionArticleDetail = (
  payload: OpinionArticleDetailBodyGet,
): RequestOpinionArticleDetailType => {
  return {
    type: REQUEST_OPINION_ARTICLE_DETAIL,
    payload,
  };
};

export const requestOpinionArticleDetailSuccess = (
  payload: OpinionArticleDetailSuccessPayload,
): OpinionArticleDetailSuccessType => {
  return {
    type: REQUEST_OPINION_ARTICLE_DETAIL_SUCCESS,
    payload,
  };
};

export const requestOpinionArticleDetailFailed = (
  payload: OpinionArticleDetailFailedPayload,
): OpinionArticleDetailFailedType => {
  return {
    type: REQUEST_OPINION_ARTICLE_DETAIL_FAILED,
    payload,
  };
};

export const opinionArticleDetailAction = {
  requestOpinionArticleDetail,
  requestOpinionArticleDetailSuccess,
  requestOpinionArticleDetailFailed,
};
