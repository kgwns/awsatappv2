import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import { GetJournalistInfoType, JournalistInfoSuccessPayload } from './types';
import { GET_JOURNALIST_ARTICLE_INFO } from './actionType';
import {
  getJournalistInfoDetailSuccess,
  getJournalistInfoDetailFailed
} from './action';
import { getArticleImage, isNonEmptyArray, isNotEmpty } from 'src/shared/utils';
import { getJournalistArticleService } from 'src/services/journalistService';
import { decode } from 'html-entities';

export const parseJournalistArticle = (response: any): JournalistInfoSuccessPayload => {
  const responseData: JournalistInfoSuccessPayload = {
    journalistData: []
  }

  if (response && isNonEmptyArray(response)) {
    responseData.journalistData = response.map(
      ({ title, nid_export, field_image_export,
        field_news_categories_export, created_export, field_new_photo_export }: any) => ({
          title: isNotEmpty(title) ? decode(title) : '',
          nid: nid_export,
          image: getArticleImage(field_image_export, field_new_photo_export),
          news_categories: isNonEmptyArray(field_news_categories_export) ? field_news_categories_export[0] : field_news_categories_export,
          created: created_export,
          isBookmarked: false,
        })
    );
  }
  return responseData
}


export function* getJournalistArticleInfo(action: GetJournalistInfoType) {
  try {
    const payload: { message: any } = yield call(
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

export function* journalistSaga() {
  yield all([
    takeLatest(GET_JOURNALIST_ARTICLE_INFO, getJournalistArticleInfo),
  ]);
}

export default journalistSaga;