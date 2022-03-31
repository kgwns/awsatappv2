import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';



import {
  HeroListTopListSuccessPayload, LatestArticleDataType, payloadType, RequestHeroListTopList,
  RequestSectionComboFourSuccessPayload,
  RequestSectionComboOneSuccessPayload,
  RequestSectionComboThreeSuccessPayload,
  RequestSectionComboTwoSuccessPayload,
  RequestSectionComboType,
  RequestTickerAndHeroType, TickerHeroSuccessPayload,
  OpinionSuccessPayload, RequestOpinionListType, LatestOpinionDataType
} from './types';
import {
  REQUEST_HERO_AND_TOP_LIST_DATA,
  REQUEST_SECTION_COMBO_FOUR,
  REQUEST_SECTION_COMBO_ONE,
  REQUEST_SECTION_COMBO_THREE,
  REQUEST_SECTION_COMBO_TWO,
  REQUEST_TICKER_HERO_DATA,
  REQUEST_OPINION_LIST_DATA
} from './actionType';
import {
  requestHeroListTopListFailed, requestHeroListTopListSuccess,
  requestSectionComboFourFailed, requestSectionComboFourSuccess,
  requestSectionComboOneFailed, requestSectionComboOneSuccess,
  requestSectionComboThreeFailed, requestSectionComboThreeSuccess,
  requestSectionComboTwoFailed, requestSectionComboTwoSuccess,
  requestTickerAndHeroFailed, requestTickerAndHeroSuccess,
  requestOpinionSuccess
} from './action';
import { isNonEmptyArray, isTab } from 'src/shared/utils';
import { getImageUrl } from 'src/shared/utils/utilities';
import { requestLatestArticle, requestSectionCombo, writerOpinionApi } from 'src/services/latestTabService';


const formatLatestArticle = (response: any): LatestArticleDataType[] => {
  let formattedData: LatestArticleDataType[] = []
  if (response) {
    if (isNonEmptyArray(response.rows)) {
      const rows = response.rows
      formattedData = rows.map(
        ({ title, body, nid, field_image, field_news_categories_export,author_resource,created_export }: any) => ({
          body,
          title,
          nid,
          image: getImageUrl(field_image),
          news_categories: isNonEmptyArray(field_news_categories_export) ? field_news_categories_export[0] : field_news_categories_export,
          author: author_resource,
          created: created_export,
          isBookmarked: false
        })
      );
    }
  }
  return formattedData
}

const formatOpinion = (response: any): LatestOpinionDataType[] => {
  let formattedOpinionData: LatestOpinionDataType[] = []
  if (response) {
    if (isNonEmptyArray(response.rows)) {
      const rows = response.rows
      formattedOpinionData = rows.map(
        ({ title, body, nid, field_opinion_writer_node_export  }: any) => ({
          body,
          title,
          nid,
          field_opinion_writer_node_export,
        })
      );
    }
  }
  return formattedOpinionData
}

const parseHeroListTopListSuccess = (response: any): HeroListTopListSuccessPayload => {
  const formattedData = formatLatestArticle(response)
  let responseData: HeroListTopListSuccessPayload = {
    heroList: [],
    topList: []
  }
  responseData.heroList =  isNonEmptyArray(formattedData) ? [...formattedData].splice(0, 2) : []
  responseData.topList =  isNonEmptyArray(formattedData) ? [...formattedData].splice(2, 4) : []
  return responseData
}

const parseTickerHeroDataSuccess = (response: any): TickerHeroSuccessPayload => {
  const formattedData = formatLatestArticle(response)
  let responseData: TickerHeroSuccessPayload = {
    ticker: [],
    hero: []
  }
  responseData.ticker = isNonEmptyArray(formattedData) ? [...formattedData].splice(0, 5) : []
  responseData.hero = isNonEmptyArray(formattedData) ? [...formattedData].splice(5, 1) : []
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
  responseData.sectionComboTwo = isTab ? formattedData.splice(0, 6) : formattedData.splice(0, 4)
  return responseData
}

const parseSectionComboThree = (response: payloadType) => {
  const formattedData = formatLatestArticle(response)
  let responseData: RequestSectionComboThreeSuccessPayload = {
    sectionComboThree: []
  }
  responseData.sectionComboThree = isTab ? formattedData.splice(0, 6) : formattedData.splice(0, 4)
  return responseData
}

const parseSectionComboFour = (response: payloadType) => {
  const formattedData = formatLatestArticle(response)
  let responseData: RequestSectionComboFourSuccessPayload = {
    sectionComboFour: []
  }
  responseData.sectionComboFour = isTab ? formattedData.splice(0, 6) : formattedData.splice(0, 4)
  return responseData
}
const parseOpinionDataSuccess = (response: any): OpinionSuccessPayload => {
  const formattedData = formatOpinion(response)
  let responseData: OpinionSuccessPayload = {
    opinionList: []
  }
  responseData.opinionList = formattedData.splice(0, 4)
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
export function* fetchOpinionWidgetData(action: RequestOpinionListType) {
  try {
    const payload: payloadType = yield call(
      writerOpinionApi,
      action.payload
    );
    const response = parseOpinionDataSuccess(payload)
    yield put(requestOpinionSuccess(response));
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

export function* fetchSectionCombo(action: RequestSectionComboType) {
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
  yield all([takeLatest(REQUEST_OPINION_LIST_DATA, fetchOpinionWidgetData)]);
  yield all([takeLatest(REQUEST_SECTION_COMBO_ONE, fetchSectionCombo)]);
  yield all([takeLatest(REQUEST_SECTION_COMBO_TWO, fetchSectionCombo)]);
  yield all([takeLatest(REQUEST_SECTION_COMBO_THREE, fetchSectionCombo)]);
  yield all([takeLatest(REQUEST_SECTION_COMBO_FOUR, fetchSectionCombo)]);
}

export default articleDetailSaga;