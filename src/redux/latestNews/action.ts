import { REQUEST_TICKER_HERO_DATA, REQUEST_TICKER_HERO_DATA_SUCCESS, REQUEST_TICKER_HERO_DATA_FAILED, REQUEST_HERO_AND_TOP_LIST_DATA, REQUEST_HERO_AND_TOP_LIST_SUCCESS, REQUEST_HERO_AND_TOP_LIST_FAILED, REQUEST_OPINION_DATA_SUCCESS, REQUEST_OPINION_LIST_DATA, REQUEST_OPINION_DATA_LIST_FAILED } from "./actionType"
import { HeroListTopListFailedPayload, HeroListTopListFailedType, HeroListTopListSuccessPayload, HeroListTopListSuccessType, LatestArticleBodyGet, RequestHeroListTopList, RequestTickerAndHeroType, TickerHeroFailedPayload, TickerHeroFailedType, TickerHeroSuccessPayload, TickerHeroSuccessType, OpinionSuccessPayload, OpinionSuccessType, RequestOpinionListType, OpinionFailedType } from "./types"

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

export const requestOpinionSuccess = (
  payload: OpinionSuccessPayload
): OpinionSuccessType => {
  return {
    type: REQUEST_OPINION_DATA_SUCCESS,
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

export const requestOpinionFailed = (
  payload: TickerHeroFailedPayload
): OpinionFailedType => {
  return {
    type: REQUEST_OPINION_DATA_LIST_FAILED,
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

export const requestOpinionList = (
  payload: LatestArticleBodyGet
): RequestOpinionListType => {
  return {
    type: REQUEST_OPINION_LIST_DATA,
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
  requestHeroListTopListFailed,
  requestOpinionFailed,
  requestOpinionList,
  requestOpinionSuccess
};