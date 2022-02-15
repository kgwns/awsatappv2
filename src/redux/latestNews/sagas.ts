import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import { HeroListTopListSuccessPayload, LatestArticleDataType, payloadType, RequestHeroListTopList, RequestTickerAndHeroType, TickerHeroSuccessPayload, OpinionSuccessPayload, RequestOpinionListType, LatestOpinionDataType } from './types';
import { REQUEST_HERO_AND_TOP_LIST_DATA, REQUEST_TICKER_HERO_DATA, REQUEST_OPINION_LIST_DATA } from './actionType';
import { requestHeroListTopListFailed, requestHeroListTopListSuccess, requestTickerAndHeroFailed, requestTickerAndHeroSuccess, requestOpinionSuccess } from './action';
import { isNonEmptyArray } from 'src/shared/utils';
import { getImageUrl } from 'src/shared/utils/utilities';
import { requestLatestArticle } from 'src/services/latestTabService';
import { writerOpinionApi } from 'src/services/latestTabService';

const formatLatestArticle = (response: any): LatestArticleDataType[] => {
  let formattedData: LatestArticleDataType[] = []
  if (response) {
    if (isNonEmptyArray(response.rows)) {
      const rows = response.rows
      formattedData = rows.map(
        ({ title, body, nid, field_image,field_news_categories_export }: any) => ({
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
  responseData.heroList = formattedData.splice(0, 2)
  responseData.topList = formattedData.splice(2, 5)
  return responseData
}

const parseTickerHeroDataSuccess = (response: any): TickerHeroSuccessPayload => {
  const formattedData = formatLatestArticle(response)
  let responseData: TickerHeroSuccessPayload = {
    ticker: [],
    hero: []
  }
  responseData.ticker = formattedData.splice(0, 2)
  responseData.hero = formattedData.splice(2, 4)
  return responseData
}
const parseOpinionDataSuccess = (response: any): OpinionSuccessPayload => {
  const formattedData = formatOpinion(response)
  let responseData: OpinionSuccessPayload = {
    opinionList: []
  }
  responseData.opinionList = formattedData.splice(0, 3)
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

function* articleDetailSaga() {
  yield all([takeLatest(REQUEST_TICKER_HERO_DATA, fetchTickerAndHeroWidgetData)]);
  yield all([takeLatest(REQUEST_HERO_AND_TOP_LIST_DATA, fetchHeroListTopListWidgetData)]);
  yield all([takeLatest(REQUEST_OPINION_LIST_DATA, fetchOpinionWidgetData)]);
}

export default articleDetailSaga;