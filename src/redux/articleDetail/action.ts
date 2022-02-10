import { REQUEST_ARTICLE_DETAIL, REQUEST_ARTICLE_DETAIL_FAILED, REQUEST_ARTICLE_DETAIL_SUCCESS } from "./actionType"
import {
  ArticleDetailBodyGet,
  ArticleDetailFailedPayload,
  ArticleDetailFailedType,
  ArticleDetailSuccessPayload,
  ArticleDetailSuccessType,
  RequestArticleDetailType
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

export const homeActions = {
  requestArticleDetailSuccess,
  requestArticleDetailFailed,
};