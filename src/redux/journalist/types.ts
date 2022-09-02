import {
  GET_JOURNALIST_ARTICLE_INFO,
  GET_JOURNALIST_ARTICLE_SUCCESS,
  GET_JOURNALIST_ARTICLE_FAILED,
} from "./actionType"

export type JournalistArticleState = {
  isLoading: boolean,
  journalistArticle: JournalistArticleData[]
  journalistArticleError: string
}

type fieldExportType = {
  id: string
  title: string
  url: string
  bundle: string
  name: string
}

export interface JournalistArticleData {
  title: string;
  nid: string;
  image: string;
  news_categories: fieldExportType,
  created: string;
  isBookmarked: boolean;
}

export interface GetJournalistInfoPayload {
  nid: string;
}

export interface GetJournalistInfoType {
  type: typeof GET_JOURNALIST_ARTICLE_INFO,
  payload: GetJournalistInfoPayload
}

export interface JournalistInfoSuccessPayload {
  journalistData: JournalistArticleData[];
}

export interface GetJournalistInfoSuccessType {
  type: typeof GET_JOURNALIST_ARTICLE_SUCCESS,
  payload: JournalistInfoSuccessPayload
}

export interface JournalistInfoFailedPayload {
  error: string
}

export interface GetJournalistInfoFailedType {
  type: typeof GET_JOURNALIST_ARTICLE_FAILED,
  payload: JournalistInfoFailedPayload
}

export type JournalistInfoAction =
  GetJournalistInfoType
  | GetJournalistInfoSuccessType
  | GetJournalistInfoFailedType
