import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import { FetchJournalistDetailSuccessPayloadType, FetchJournalistDetailType, GetJournalistInfoType, JournalistInfoSuccessPayload } from './types';
import { FETCH_JOURNALIST_DETAIL, GET_JOURNALIST_ARTICLE_INFO } from './actionType';
import {
  getJournalistInfoDetailSuccess,
  getJournalistInfoDetailFailed,
  fetchJournalistDetailSuccess,
  fetchJournalistDetailFailed
} from './action';
import { decodeHTMLTags, getArticleImage, isNonEmptyArray, isNotEmpty } from 'src/shared/utils';
import { getJournalistArticleService } from 'src/services/journalistService';
import { fetchJournalistDetailInfo } from 'src/services/journalistDetailService';
import { decode } from 'html-entities';
import { getImageUrl } from 'src/shared/utils/utilities';
import { payloadType } from '../journalist/types';

export const parseJournalistArticle = (response: any): JournalistInfoSuccessPayload => {
  const responseData: JournalistInfoSuccessPayload = {
    journalistData: []
  }

  if (response && isNonEmptyArray(response.rows)) {
    const data = response.rows
    responseData.journalistData = data.map(
      ({ title, nid, field_image_export,
        field_news_categories_export, created_export, field_new_photo }: any) => ({
          title: isNotEmpty(title) ? decode(title) : '',
          nid,
          image: getArticleImage(field_image_export, field_new_photo),
          news_categories: isNonEmptyArray(field_news_categories_export) ? field_news_categories_export[0] : field_news_categories_export,
          created: created_export,
          isBookmarked: false,
        })
    );
  }
  return responseData
}

const parseJournalistDetailSuccess = (response: any): FetchJournalistDetailSuccessPayloadType => {
  const responseData: FetchJournalistDetailSuccessPayloadType = {
    journalistDetail: []
  }

  if (response && isNonEmptyArray(response.rows)) {
    responseData.journalistDetail = response.rows.map(
      ({ name, field_jor_image,
        description__value, field_opinion_facebook, field_instagram_url, field_opinion_twitter, field_opinion_youtube, field_clickable }: any) => ({
          authorName: isNotEmpty(name) ? name : '',
          authorImage: getImageUrl(field_jor_image),
          authorDescription: isNotEmpty(description__value) ? decodeHTMLTags(description__value) : '',
          facebook_url: isNotEmpty(field_opinion_facebook) ? field_opinion_facebook : null,
          instagram_url: isNotEmpty(field_instagram_url) ? field_instagram_url : null,
          twitter_url: isNotEmpty(field_opinion_twitter) ? field_opinion_twitter : null,
          youtube_url: isNotEmpty(field_opinion_youtube) ? field_opinion_youtube : null,
          field_clickable: field_clickable
        })
    );
  }
  return responseData
}


export function* getJournalistArticleInfo(action: GetJournalistInfoType) {
  try {
    const payload: payloadType = yield call(
      getJournalistArticleService,
      action.payload
    );
    const response = parseJournalistArticle(payload)
    yield put(getJournalistInfoDetailSuccess(response));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(getJournalistInfoDetailFailed({ error: errorMessage.message }));
    }
  }
}

export function* fetchJournalistDetails(action: FetchJournalistDetailType) {
  try {
    const payload: FetchJournalistDetailSuccessPayloadType = yield call(
      fetchJournalistDetailInfo,
      action.payload,
    );
    const response = parseJournalistDetailSuccess(payload)
    yield put(fetchJournalistDetailSuccess(response));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(fetchJournalistDetailFailed({ error: errorMessage.message }));
    }
  }
}

export function* journalistSaga() {
  yield all([
    takeLatest(GET_JOURNALIST_ARTICLE_INFO, getJournalistArticleInfo),
    takeLatest(FETCH_JOURNALIST_DETAIL, fetchJournalistDetails),
  ]);
}

export default journalistSaga;
