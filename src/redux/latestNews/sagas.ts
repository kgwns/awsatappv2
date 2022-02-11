import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import { HeroListTopListSuccessPayload, LatestArticleDataType, payloadType, RequestHeroListTopList, RequestTickerAndHeroType, TickerHeroSuccessPayload } from './types';
import { REQUEST_HERO_AND_TOP_LIST_DATA, REQUEST_TICKER_HERO_DATA } from './actionType';
import { requestHeroListTopListFailed, requestHeroListTopListSuccess, requestTickerAndHeroFailed, requestTickerAndHeroSuccess } from './action';
import { isNonEmptyArray } from 'src/shared/utils';
import { getImageUrl } from 'src/shared/utils/utilities';
import { requestLatestArticle } from 'src/services/latestTabService';


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

function* articleDetailSaga() {
  yield all([takeLatest(REQUEST_TICKER_HERO_DATA, fetchTickerAndHeroWidgetData)]);
  yield all([takeLatest(REQUEST_HERO_AND_TOP_LIST_DATA, fetchHeroListTopListWidgetData)]);
}

export default articleDetailSaga;