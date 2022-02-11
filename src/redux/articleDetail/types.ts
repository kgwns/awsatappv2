import { REQUEST_ARTICLE_DETAIL, REQUEST_ARTICLE_DETAIL_FAILED, REQUEST_ARTICLE_DETAIL_SUCCESS } from "./actionType"

export interface ArticleDetailBodyGet {
  nid: number
}

export interface RequestArticleDetailType {
  type: typeof REQUEST_ARTICLE_DETAIL,
  payload: ArticleDetailBodyGet
}

export interface NewsCategoriesType {
  id?: string
  title?: string
  url?: string
  bundle?: string
  name?: string
}

export interface ArticleDetailDataType {
  title: string,
  body: string,
  nid: string,
  image: string,
  view_node: string,
  news_categories: NewsCategoriesType
}

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
  pager: PagerType
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


export type ArticleDetailAction = RequestArticleDetailType | ArticleDetailSuccessType | ArticleDetailFailedType