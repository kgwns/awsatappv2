import {
  REQUEST_ARTICLE_DETAIL, REQUEST_ARTICLE_DETAIL_FAILED, REQUEST_ARTICLE_DETAIL_SUCCESS,
  REQUEST_RELATED_ARTICLE, REQUEST_RELATED_ARTICLE_FAILED, REQUEST_RELATED_ARTICLE_SUCCESS
} from "./actionType"

export interface ArticleDetailBodyGet {
  nid: number
}

export interface RequestArticleDetailType {
  type: typeof REQUEST_ARTICLE_DETAIL,
  payload: ArticleDetailBodyGet
}

type fieldExportType = {
  id: string
  title: string
  url: string
  bundle: string
  name: string
}

interface GeneralArticleFields {
  title: string,
  body: string,
  nid: string,
  image: string,
  view_node: string,
  news_categories: fieldExportType,
  author: string,
  created: string
}

export interface ArticleDetailDataType extends GeneralArticleFields {
  title: string,
  body: string,
  nid: string,
  image: string,
  view_node: string,
  news_categories: fieldExportType,
  tag_topics: fieldExportType,
  author: string,
  isBookmarked: boolean
}

export interface RelatedArticleDataType extends GeneralArticleFields { }

interface PagerType {
  current_page?: number | null | undefined,
  items_per_page?: number
}

export type ArticleDetailSuccessPayload = {
  articleDetailData: ArticleDetailDataType[]
  pager: PagerType
}

export type ArticleDetailState = {
  error: string,
  isLoading: boolean,
  articleDetailData: ArticleDetailDataType[],
  pager: PagerType,
  relatedArticleData: RelatedArticleDataType[]
}

export interface ArticleDetailSuccessType {
  type: typeof REQUEST_ARTICLE_DETAIL_SUCCESS,
  payload: ArticleDetailSuccessPayload
}

export interface ArticleDetailFailedPayload {
  error: string
}

export interface ArticleDetailFailedType {
  type: typeof REQUEST_ARTICLE_DETAIL_FAILED,
  payload: ArticleDetailFailedPayload
}


export interface RelatedArticleBodyGet {
  tid: number
}

export interface RequestRelatedArticleType {
  type: typeof REQUEST_RELATED_ARTICLE,
  payload: RelatedArticleBodyGet
}

export type RelatedArticleSuccessPayload = {
  relatedArticleData: RelatedArticleDataType[]
}

export interface RelatedArticleSuccessType {
  type: typeof REQUEST_RELATED_ARTICLE_SUCCESS,
  payload: RelatedArticleSuccessPayload
}

export interface RelatedArticleFailedPayload {
  error: string
}

export interface RelatedArticleFailedType {
  type: typeof REQUEST_RELATED_ARTICLE_FAILED,
  payload: RelatedArticleFailedPayload
}


export type ArticleDetailAction =
  RequestArticleDetailType
  | ArticleDetailSuccessType
  | ArticleDetailFailedType
  | RequestRelatedArticleType
  | RelatedArticleSuccessType
  | RelatedArticleFailedType