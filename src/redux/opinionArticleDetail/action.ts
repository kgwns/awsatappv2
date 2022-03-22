import {
  REQUEST_OPINION_ARTICLE_DETAIL,
  REQUEST_OPINION_ARTICLE_DETAIL_SUCCESS,
  REQUEST_OPINION_ARTICLE_DETAIL_FAILED,
  REQUEST_RELATED_OPINION,
  REQUEST_RELATED_OPINION_SUCCESS,
  REQUEST_RELATED_OPINION_FAILED,
  EMPTY_RELATED_OPINION_DATA,
  EMPTY_OPINION_ARTICLE_DETAIL,
} from './actionTypes';
import {
  OpinionArticleDetailBodyGet,
  OpinionArticleDetailFailedPayload,
  OpinionArticleDetailFailedType,
  OpinionArticleDetailSuccessPayload,
  OpinionArticleDetailSuccessType,
  RelatedOpinionBodyGet,
  RequestOpinionArticleDetailType,
  FetchRelatedOpinionSuccessType,
  FetchRelatedOpinionFailedType,
  FetchRelatedOpinionFailedPayloadtype,
  FetchRelatedOpinionSuccessPayloadType
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

export const fetchRelatedOpinion = (payload: RelatedOpinionBodyGet) => {
  return {
    type: REQUEST_RELATED_OPINION,
    payload,
  };
};

export const fetchRelatedOpinionSuccess = (
  payload: FetchRelatedOpinionSuccessPayloadType,
): FetchRelatedOpinionSuccessType => {
  return {
    type: REQUEST_RELATED_OPINION_SUCCESS,
    payload,
  };
};

export const fetchRelatedOpinionFailed = (
  payload: FetchRelatedOpinionFailedPayloadtype,
): FetchRelatedOpinionFailedType => {
  return {
    type: REQUEST_RELATED_OPINION_FAILED,
    payload,
  };
};

export const emptyRelatedOpinionDataList = () => {
  return {
    type: EMPTY_RELATED_OPINION_DATA,
  };
};

export const emptyOpinionArticleDetailData = () => {
  return {
    type: EMPTY_OPINION_ARTICLE_DETAIL,
  };
};

export const opinionArticleDetailAction = {
  requestOpinionArticleDetail,
  requestOpinionArticleDetailSuccess,
  requestOpinionArticleDetailFailed,
  fetchRelatedOpinion,
  fetchRelatedOpinionSuccess,
  fetchRelatedOpinionFailed,
  emptyRelatedOpinionDataList,
  emptyOpinionArticleDetailData,
};
