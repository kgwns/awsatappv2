import { REQUEST_TICKER_HERO_DATA, REQUEST_TICKER_HERO_DATA_SUCCESS, REQUEST_TICKER_HERO_DATA_FAILED, REQUEST_HERO_AND_TOP_LIST_DATA, REQUEST_HERO_AND_TOP_LIST_SUCCESS, REQUEST_HERO_AND_TOP_LIST_FAILED } from "./actionType"
import { HeroListTopListFailedPayload, HeroListTopListFailedType, HeroListTopListSuccessPayload, HeroListTopListSuccessType, LatestArticleBodyGet, RequestHeroListTopList, RequestTickerAndHeroType, TickerHeroFailedPayload, TickerHeroFailedType, TickerHeroSuccessPayload, TickerHeroSuccessType } from "./types"

export const requestTickerAndHero = (
  payload: LatestArticleBodyGet
): RequestTickerAndHeroType => {
  return {
    type: REQUEST_TICKER_HERO_DATA,
    payload
  }
}

export const requestTickerAndHeroSuccess = (
  payload: TickerHeroSuccessPayload
): TickerHeroSuccessType => {
  return {
    type: REQUEST_TICKER_HERO_DATA_SUCCESS,
    payload
  }
}

export const requestTickerAndHeroFailed = (
  payload: TickerHeroFailedPayload
): TickerHeroFailedType => {
  return {
    type: REQUEST_TICKER_HERO_DATA_FAILED,
    payload
  }
}

export const requestHeroListTopList = (
  payload: LatestArticleBodyGet
): RequestHeroListTopList => {
  return {
    type: REQUEST_HERO_AND_TOP_LIST_DATA,
    payload
  }
}

export const requestHeroListTopListSuccess = (
  payload: HeroListTopListSuccessPayload
): HeroListTopListSuccessType => {
  return {
    type: REQUEST_HERO_AND_TOP_LIST_SUCCESS,
    payload
  }
}

export const requestHeroListTopListFailed = (
  payload: HeroListTopListFailedPayload
): HeroListTopListFailedType => {
  return {
    type: REQUEST_HERO_AND_TOP_LIST_FAILED,
    payload
  }
}

export const latestTabActions = {
  requestTickerAndHero,
  requestTickerAndHeroSuccess,
  requestTickerAndHeroFailed,
  requestHeroListTopList,
  requestHeroListTopListSuccess,
  requestHeroListTopListFailed
};