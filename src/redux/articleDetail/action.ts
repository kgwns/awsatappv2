import { REQUEST_ARTICLE_DETAIL, REQUEST_ARTICLE_DETAIL_FAILED, REQUEST_ARTICLE_DETAIL_SUCCESS, REQUEST_RELATED_ARTICLE, REQUEST_RELATED_ARTICLE_FAILED, REQUEST_RELATED_ARTICLE_SUCCESS, EMPTY_DATA, REQUEST_ARTICLE_SECTION, REQUEST_ARTICLE_SECTION_SUCCESS, REQUEST_ARTICLE_SECTION_FAILED } from "./actionType"
import {
  ArticleDetailBodyGet,
  ArticleDetailFailedPayload,
  ArticleDetailFailedType,
  ArticleDetailSuccessPayload,
  ArticleDetailSuccessType,
  ArticleSectionBodyGet,
  ArticleSectionFailedPayload,
  ArticleSectionFailedType,
  ArticleSectionSuccessPayload,
  ArticleSectionSuccessType,
  RelatedArticleBodyGet,
  RelatedArticleFailedPayload,
  RelatedArticleFailedType,
  RelatedArticleSuccessPayload,
  RelatedArticleSuccessType,
  RequestArticleDetailType,
  RequestArticleSectionType,
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

export const emptyData = () => {
  return {
    type: EMPTY_DATA,
  };
};


export const requestArticleSection = (
  payload: ArticleSectionBodyGet
): RequestArticleSectionType => {
  return {
    type: REQUEST_ARTICLE_SECTION,
    payload
  }
}

export const requestArticleSectionSuccess = (
  payload: ArticleSectionSuccessPayload,
): ArticleSectionSuccessType => {
  return {
    type: REQUEST_ARTICLE_SECTION_SUCCESS,
    payload,
  };
};

export const requestArticleSectionFailed = (
  payload: ArticleSectionFailedPayload,
): ArticleSectionFailedType => {
  return {
    type: REQUEST_ARTICLE_SECTION_FAILED,
    payload,
  };
};


export const homeActions = {
  requestArticleDetail,
  requestArticleDetailSuccess,
  requestArticleDetailFailed,
  requestRelatedArticle,
  requestRelatedArticleSuccess,
  requestRelatedArticleFailed,
  emptyData,
  requestArticleSection,
  requestArticleSectionSuccess,
  requestArticleSectionFailed
};