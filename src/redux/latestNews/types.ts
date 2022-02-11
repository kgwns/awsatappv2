import { REQUEST_TICKER_HERO_DATA, REQUEST_TICKER_HERO_DATA_SUCCESS, REQUEST_TICKER_HERO_DATA_FAILED, REQUEST_HERO_AND_TOP_LIST_DATA, REQUEST_HERO_AND_TOP_LIST_SUCCESS, REQUEST_HERO_AND_TOP_LIST_FAILED } from "./actionType"

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
  topList: LatestArticleDataType[]
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

export type HeroListTopListSuccessPayload = {
  heroList: LatestArticleDataType[],
  topList: LatestArticleDataType[]
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

export type LatestTabAction =
  RequestTickerAndHeroType
  | TickerHeroSuccessType
  | TickerHeroFailedType
  | RequestHeroListTopList
  | HeroListTopListSuccessType
  | HeroListTopListFailedType
