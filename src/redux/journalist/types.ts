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

interface PagerType {
  current_page: number;
  items_per_page: string;
}

export type payloadType = {
  rows: any[];
  pager: PagerType
};

export type JournalistArticleState = {
  isLoading: boolean,
  journalistArticle: JournalistArticleData[]
  journalistArticleError: string
  journalistDetail: JournalistDetailDataType[];
  error: string;
  isDetailLoading: boolean;
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
  page: number;
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

export interface JournalistDetailBodyGet {
  tid: string
}

export interface FetchJournalistDetailSuccessPayloadType {
  journalistDetail: JournalistDetailDataType[];
}

export interface FetchJournalistDetailFailedPayloadType {
  error: string;
}

export type JournalistDetailDataType = {
  authorName: string;
  authorImage: string;
  authorDescription: string;
  facebook_url: string;
  isFollowed?: boolean;
  instagram_url: string;
  twitter_url: string;
  youtube_url: string;
  field_clickable?: string;
}

export type JournalistDetailState = {
  journalistDetail: JournalistDetailDataType[];
  error: string;
  isLoading: boolean;
};

export type FetchJournalistDetailType = {
  type: typeof FETCH_JOURNALIST_DETAIL;
  payload: JournalistDetailBodyGet;
};

export type FetchJournalistDetailSuccessType = {
  type: typeof FETCH_JOURNALIST_DETAIL_SUCCESS;
  payload: FetchJournalistDetailSuccessPayloadType;
};

export type FetchJournalistDetailFailedType = {
  type: typeof FETCH_JOURNALIST_DETAIL_ERROR;
  payload: FetchJournalistDetailFailedPayloadType;
};

export type EmptyJournalistDetailType = {
  type: typeof EMPTY_JOURNALIST_DETAIL
}

export interface EmptyJournalistArticleType {
  type: typeof EMPTY_JOURNALIST_ARTICLE
}

export type JournalistInfoAction =
  GetJournalistInfoType
  | GetJournalistInfoSuccessType
  | GetJournalistInfoFailedType
  | EmptyJournalistArticleType
  | FetchJournalistDetailType
  | FetchJournalistDetailSuccessType
  | FetchJournalistDetailFailedType
  | EmptyJournalistDetailType;
