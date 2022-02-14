import { REQUEST_TICKER_HERO_DATA, REQUEST_TICKER_HERO_DATA_SUCCESS, REQUEST_TICKER_HERO_DATA_FAILED, REQUEST_HERO_AND_TOP_LIST_DATA, REQUEST_HERO_AND_TOP_LIST_SUCCESS, REQUEST_HERO_AND_TOP_LIST_FAILED, REQUEST_SECTION_COMBO_ONE, REQUEST_SECTION_COMBO_ONE_FAILED, REQUEST_SECTION_COMBO_ONE_SUCCESS, REQUEST_SECTION_COMBO_FOUR_FAILED, REQUEST_SECTION_COMBO_FOUR, REQUEST_SECTION_COMBO_THREE_FAILED, REQUEST_SECTION_COMBO_THREE_SUCCESS, REQUEST_SECTION_COMBO_THREE, REQUEST_SECTION_COMBO_TWO_FAILED, REQUEST_SECTION_COMBO_TWO_SUCCESS, REQUEST_SECTION_COMBO_TWO, REQUEST_SECTION_COMBO_FOUR_SUCCESS } from "./actionType"
import { HeroListTopListFailedPayload, HeroListTopListFailedType, HeroListTopListSuccessPayload, HeroListTopListSuccessType, LatestArticleBodyGet, RequestHeroListTopList, RequestSectionComboBodyGet, RequestSectionComboFour, RequestSectionComboFourFailedPayload, RequestSectionComboFourFailedType, RequestSectionComboFourSuccessPayload, RequestSectionComboFourSuccessType, RequestSectionComboOne, RequestSectionComboOneFailedPayload, RequestSectionComboOneFailedType, RequestSectionComboOneSuccessPayload, RequestSectionComboOneSuccessType, RequestSectionComboThree, RequestSectionComboThreeFailedPayload, RequestSectionComboThreeFailedType, RequestSectionComboThreeSuccessPayload, RequestSectionComboThreeSuccessType, RequestSectionComboTwo, RequestSectionComboTwoFailedPayload, RequestSectionComboTwoFailedType, RequestSectionComboTwoSuccessPayload, RequestSectionComboTwoSuccessType, RequestTickerAndHeroType, TickerHeroFailedPayload, TickerHeroFailedType, TickerHeroSuccessPayload, TickerHeroSuccessType } from "./types"

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

export const requestSectionComboOne = (
  payload: RequestSectionComboBodyGet
): RequestSectionComboOne => {
  return {
    type: REQUEST_SECTION_COMBO_ONE,
    payload
  }
}

export const requestSectionComboOneSuccess = (
  payload: RequestSectionComboOneSuccessPayload
): RequestSectionComboOneSuccessType => {
  return {
    type: REQUEST_SECTION_COMBO_ONE_SUCCESS,
    payload
  }
}

export const requestSectionComboOneFailed = (
  payload: RequestSectionComboOneFailedPayload
): RequestSectionComboOneFailedType => {
  return {
    type: REQUEST_SECTION_COMBO_ONE_FAILED,
    payload
  }
}




export const requestSectionComboTwo = (
  payload: RequestSectionComboBodyGet
): RequestSectionComboTwo => {
  return {
    type: REQUEST_SECTION_COMBO_TWO,
    payload
  }
}

export const requestSectionComboTwoSuccess = (
  payload: RequestSectionComboTwoSuccessPayload
): RequestSectionComboTwoSuccessType => {
  return {
    type: REQUEST_SECTION_COMBO_TWO_SUCCESS,
    payload
  }
}

export const requestSectionComboTwoFailed = (
  payload: RequestSectionComboTwoFailedPayload
): RequestSectionComboTwoFailedType => {
  return {
    type: REQUEST_SECTION_COMBO_TWO_FAILED,
    payload
  }
}




export const requestSectionComboThree = (
  payload: RequestSectionComboBodyGet
): RequestSectionComboThree => {
  return {
    type: REQUEST_SECTION_COMBO_THREE,
    payload
  }
}

export const requestSectionComboThreeSuccess = (
  payload: RequestSectionComboThreeSuccessPayload
): RequestSectionComboThreeSuccessType => {
  return {
    type: REQUEST_SECTION_COMBO_THREE_SUCCESS,
    payload
  }
}

export const requestSectionComboThreeFailed = (
  payload: RequestSectionComboThreeFailedPayload
): RequestSectionComboThreeFailedType => {
  return {
    type: REQUEST_SECTION_COMBO_THREE_FAILED,
    payload
  }
}




export const requestSectionComboFour = (
  payload: RequestSectionComboBodyGet
): RequestSectionComboFour => {
  return {
    type: REQUEST_SECTION_COMBO_FOUR,
    payload
  }
}

export const requestSectionComboFourSuccess = (
  payload: RequestSectionComboFourSuccessPayload
): RequestSectionComboFourSuccessType => {
  return {
    type: REQUEST_SECTION_COMBO_FOUR_SUCCESS,
    payload
  }
}

export const requestSectionComboFourFailed = (
  payload: RequestSectionComboFourFailedPayload
): RequestSectionComboFourFailedType => {
  return {
    type: REQUEST_SECTION_COMBO_FOUR_FAILED,
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
  requestSectionComboOne,
  requestSectionComboOneSuccess,
  requestSectionComboOneFailed,
  requestSectionComboTwo,
  requestSectionComboTwoSuccess,
  requestSectionComboTwoFailed,
  requestSectionComboThree,
  requestSectionComboThreeSuccess,
  requestSectionComboThreeFailed,
  requestSectionComboFour,
  requestSectionComboFourSuccess,
  requestSectionComboFourFailed
};