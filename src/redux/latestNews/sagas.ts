import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import {
  HeroListTopListSuccessPayload, LatestArticleDataType, payloadType, RequestHeroListTopList,
  RequestSectionComboFourSuccessPayload,
  RequestSectionComboOneSuccessPayload,
  RequestSectionComboThreeSuccessPayload,
  RequestSectionComboTwoSuccessPayload,
  RequestSectionComboType,
  RequestTickerAndHeroType, TickerHeroSuccessPayload
} from './types';
import {
  REQUEST_HERO_AND_TOP_LIST_DATA,
  REQUEST_SECTION_COMBO_FOUR,
  REQUEST_SECTION_COMBO_ONE,
  REQUEST_SECTION_COMBO_THREE,
  REQUEST_SECTION_COMBO_TWO,
  REQUEST_TICKER_HERO_DATA
} from './actionType';
import {
  requestHeroListTopListFailed, requestHeroListTopListSuccess,
  requestSectionComboFourFailed, requestSectionComboFourSuccess,
  requestSectionComboOneFailed, requestSectionComboOneSuccess,
  requestSectionComboThreeFailed, requestSectionComboThreeSuccess,
  requestSectionComboTwoFailed, requestSectionComboTwoSuccess,
  requestTickerAndHeroFailed, requestTickerAndHeroSuccess
} from './action';
import { isNonEmptyArray } from 'src/shared/utils';
import { getImageUrl } from 'src/shared/utils/utilities';
import { requestLatestArticle, requestSectionCombo } from 'src/services/latestTabService';


const formatLatestArticle = (response: any): LatestArticleDataType[] => {
  let formattedData: LatestArticleDataType[] = []
  if (response) {
    if (isNonEmptyArray(response.rows)) {
      const rows = response.rows
      formattedData = rows.map(
        ({ title, body, nid, field_image, field_news_categories_export }: any) => ({
          body,
          title,
          nid,
          image: getImageUrl(field_image),
          news_categories: field_news_categories_export
        })
      );
    }
  }
  return formattedData
}

const parseHeroListTopListSuccess = (response: any): HeroListTopListSuccessPayload => {
  const formattedData = formatLatestArticle(response)
  let responseData: HeroListTopListSuccessPayload = {
    heroList: [],
    topList: []
  }
  responseData.heroList = formattedData.splice(0, 2)
  responseData.topList = formattedData.splice(2, 4)
  return responseData
}

const parseTickerHeroDataSuccess = (response: any): TickerHeroSuccessPayload => {
  const formattedData = formatLatestArticle(response)
  let responseData: TickerHeroSuccessPayload = {
    ticker: [],
    hero: []
  }
  responseData.ticker = formattedData.splice(0, 4)
  responseData.hero = formattedData.splice(4, 1)
  return responseData
}

const parseSectionComboOne = (response: payloadType) => {
  const formattedData = formatLatestArticle(response)
  let responseData: RequestSectionComboOneSuccessPayload = {
    sectionComboOne: []
  }
  responseData.sectionComboOne = formattedData.splice(0, 4)
  return responseData
}

const parseSectionComboTwo = (response: payloadType) => {
  const formattedData = formatLatestArticle(response)
  let responseData: RequestSectionComboTwoSuccessPayload = {
    sectionComboTwo: []
  }
  responseData.sectionComboTwo = formattedData.splice(0, 4)
  return responseData
}

const parseSectionComboThree = (response: payloadType) => {
  const formattedData = formatLatestArticle(response)
  let responseData: RequestSectionComboThreeSuccessPayload = {
    sectionComboThree: []
  }
  responseData.sectionComboThree = formattedData.splice(0, 4)
  return responseData
}

const parseSectionComboFour = (response: payloadType) => {
  const formattedData = formatLatestArticle(response)
  let responseData: RequestSectionComboFourSuccessPayload = {
    sectionComboFour: []
  }
  responseData.sectionComboFour = formattedData.splice(0, 4)
  return responseData
}

export function* fetchTickerAndHeroWidgetData(action: RequestTickerAndHeroType) {
  try {
    const payload: payloadType = yield call(
      requestLatestArticle,
      action.payload
    );
    const response = parseTickerHeroDataSuccess(payload)
    yield put(requestTickerAndHeroSuccess(response));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(requestTickerAndHeroFailed({ error: errorMessage.message }));
    }
  }
}

export function* fetchHeroListTopListWidgetData(action: RequestHeroListTopList) {
  try {
    const payload: payloadType = yield call(
      requestLatestArticle,
      action.payload
    );
    const response = parseHeroListTopListSuccess(payload)
    yield put(requestHeroListTopListSuccess(response));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(requestHeroListTopListFailed({ error: errorMessage.message }));
    }
  }
}

function* fetchSectionCombo(action: RequestSectionComboType) {
  try {
    const payload: payloadType = yield call(
      requestSectionCombo,
      action.payload
    );
    if (action.type == REQUEST_SECTION_COMBO_ONE) {
      const response = parseSectionComboOne(payload)
      yield put(requestSectionComboOneSuccess(response));
    } else if (action.type == REQUEST_SECTION_COMBO_TWO) {
      const response = parseSectionComboTwo(payload)
      yield put(requestSectionComboTwoSuccess(response));
    } else if (action.type == REQUEST_SECTION_COMBO_THREE) {
      const response = parseSectionComboThree(payload)
      yield put(requestSectionComboThreeSuccess(response));
    } else if (action.type == REQUEST_SECTION_COMBO_FOUR) {
      const response = parseSectionComboFour(payload)
      yield put(requestSectionComboFourSuccess(response));
    }
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      if (action.type == REQUEST_SECTION_COMBO_ONE) {
        yield put(requestSectionComboOneFailed({ error: errorMessage.message }));
      } else if (action.type == REQUEST_SECTION_COMBO_TWO) {
        yield put(requestSectionComboTwoFailed({ error: errorMessage.message }));
      } else if (action.type == REQUEST_SECTION_COMBO_THREE) {
        yield put(requestSectionComboThreeFailed({ error: errorMessage.message }));
      } else if (action.type == REQUEST_SECTION_COMBO_FOUR) {
        yield put(requestSectionComboFourFailed({ error: errorMessage.message }));
      }
    }
  }
}

function* articleDetailSaga() {
  yield all([takeLatest(REQUEST_TICKER_HERO_DATA, fetchTickerAndHeroWidgetData)]);
  yield all([takeLatest(REQUEST_HERO_AND_TOP_LIST_DATA, fetchHeroListTopListWidgetData)]);
  yield all([takeLatest(REQUEST_SECTION_COMBO_ONE, fetchSectionCombo)]);
  yield all([takeLatest(REQUEST_SECTION_COMBO_TWO, fetchSectionCombo)]);
  yield all([takeLatest(REQUEST_SECTION_COMBO_THREE, fetchSectionCombo)]);
  yield all([takeLatest(REQUEST_SECTION_COMBO_FOUR, fetchSectionCombo)]);
}

export default articleDetailSaga;