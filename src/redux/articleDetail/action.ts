import { REQUEST_ARTICLE_DETAIL, REQUEST_ARTICLE_DETAIL_FAILED, REQUEST_ARTICLE_DETAIL_SUCCESS, REQUEST_RELATED_ARTICLE, REQUEST_RELATED_ARTICLE_FAILED, REQUEST_RELATED_ARTICLE_SUCCESS } from "./actionType"
import {
  ArticleDetailBodyGet,
  ArticleDetailFailedPayload,
  ArticleDetailFailedType,
  ArticleDetailSuccessPayload,
  ArticleDetailSuccessType,
  RelatedArticleBodyGet,
  RelatedArticleFailedPayload,
  RelatedArticleFailedType,
  RelatedArticleSuccessPayload,
  RelatedArticleSuccessType,
  RequestArticleDetailType,
  RequestRelatedArticleType
} from "./types"

export const requestArticleDetail = (
  payload: ArticleDetailBodyGet
): RequestArticleDetailType => {
  return {
    type: REQUEST_ARTICLE_DETAIL,
    payload
  }
}

export const requestArticleDetailSuccess = (
  payload: ArticleDetailSuccessPayload,
): ArticleDetailSuccessType => {
  return {
    type: REQUEST_ARTICLE_DETAIL_SUCCESS,
    payload,
  };
};

export const requestArticleDetailFailed = (
  payload: ArticleDetailFailedPayload,
): ArticleDetailFailedType => {
  return {
    type: REQUEST_ARTICLE_DETAIL_FAILED,
    payload,
  };
};


export const requestRelatedArticle = (
  payload: RelatedArticleBodyGet
): RequestRelatedArticleType => {
  return {
    type: REQUEST_RELATED_ARTICLE,
    payload
  }
}

export const requestRelatedArticleSuccess = (
  payload: RelatedArticleSuccessPayload,
): RelatedArticleSuccessType => {
  return {
    type: REQUEST_RELATED_ARTICLE_SUCCESS,
    payload,
  };
};

export const requestRelatedArticleFailed = (
  payload: RelatedArticleFailedPayload,
): RelatedArticleFailedType => {
  return {
    type: REQUEST_RELATED_ARTICLE_FAILED,
    payload,
  };
};


export const homeActions = {
  requestArticleDetail,
  requestArticleDetailSuccess,
  requestArticleDetailFailed,
  requestRelatedArticle,
  requestRelatedArticleSuccess,
  requestRelatedArticleFailed
};