import { REQUEST_TICKER_HERO_DATA, REQUEST_TICKER_HERO_DATA_SUCCESS, REQUEST_TICKER_HERO_DATA_FAILED, REQUEST_HERO_AND_TOP_LIST_DATA, REQUEST_HERO_AND_TOP_LIST_SUCCESS, REQUEST_HERO_AND_TOP_LIST_FAILED, REQUEST_OPINION_DATA_SUCCESS, REQUEST_OPINION_DATA_LIST_FAILED, REQUEST_OPINION_LIST_DATA } from "./actionType"

export type payloadType = { rows: any[], pager: object }

export interface NewsCategoriesType {
  id?: string
  title?: string
  url?: string
  bundle?: string
  name?: string
}

export interface LatestArticleDataType {
  title: string,
  body: string,
  nid: string,
  image: string,
  news_categories: NewsCategoriesType
}

export interface OpinionWriterType {
  id: string
  title: string
  url: string
  bundle: string
  name: string
  opinion_writer_photo: string
}
export interface LatestOpinionDataType {
  title: string,
  body: string,
  nid: string,
  field_opinion_writer_node_export: OpinionWriterType
}

export interface LatestArticleBodyGet {
  items_per_page: number,
  page: number,
  offset: number
}

export interface RequestTickerAndHeroType {
  type: typeof REQUEST_TICKER_HERO_DATA,
  payload: LatestArticleBodyGet
}

export type LatestNewsTabState = {
  error: string,
  isLoading: boolean,
  ticker: LatestArticleDataType[],
  hero: LatestArticleDataType[],
  heroList: LatestArticleDataType[],
  topList: LatestArticleDataType[],
  opinionList: LatestOpinionDataType[]
}

export type TickerHeroSuccessPayload = {
  ticker: LatestArticleDataType[],
  hero: LatestArticleDataType[]
}

export interface TickerHeroSuccessType {
  type: typeof REQUEST_TICKER_HERO_DATA_SUCCESS,
  payload: TickerHeroSuccessPayload
}

export interface TickerHeroFailedPayload {
  error: string
}

export interface TickerHeroFailedType {
  type: typeof REQUEST_TICKER_HERO_DATA_FAILED,
  payload: TickerHeroFailedPayload
}

export interface RequestHeroListTopList {
  type: typeof REQUEST_HERO_AND_TOP_LIST_DATA,
  payload: LatestArticleBodyGet
}

export interface RequestOpinionListType {
  type: typeof REQUEST_OPINION_LIST_DATA,
  payload: LatestArticleBodyGet
}

export type HeroListTopListSuccessPayload = {
  heroList: LatestArticleDataType[],
  topList: LatestArticleDataType[]
}

export type OpinionSuccessPayload = {
  opinionList: LatestOpinionDataType[]
}

export interface OpinionSuccessType {
  type: typeof REQUEST_OPINION_DATA_SUCCESS,
  payload: OpinionSuccessPayload
}

export interface HeroListTopListSuccessType {
  type: typeof REQUEST_HERO_AND_TOP_LIST_SUCCESS,
  payload: HeroListTopListSuccessPayload
}

export interface HeroListTopListFailedPayload {
  error: string
}

export interface HeroListTopListFailedType {
  type: typeof REQUEST_HERO_AND_TOP_LIST_FAILED,
  payload: HeroListTopListFailedPayload
}

export interface OpinionFailedPayload {
  error: string
}

export interface OpinionFailedType {
  type: typeof REQUEST_OPINION_DATA_LIST_FAILED,
  payload: OpinionFailedPayload
}


export type LatestTabAction =
  RequestTickerAndHeroType
  | TickerHeroSuccessType
  | TickerHeroFailedType
  | RequestHeroListTopList
  | HeroListTopListSuccessType
  | HeroListTopListFailedType
  | OpinionSuccessType
  | OpinionFailedType
  | RequestOpinionListType
