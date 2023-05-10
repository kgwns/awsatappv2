import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import { FetchMostReadSuccessPayloadType } from './types';
import { fetchMostReadFailed, fetchMostReadSuccess } from './action';
import { FETCH_MOST_READ } from './actionTypes';
import { fetchMostReadApi } from 'src/services/mostReadService';
import { isNonEmptyArray, isNotEmpty } from 'src/shared/utils';
import { getArticleImageAndType } from '../articleDetail/sagas';

const parseMostReadData = (payload: any) => {
  const responseData: any = [];

  if (isNonEmptyArray(payload)) {
    for (const [_, item] of payload.entries()) {
      const mostReadItem: any = {
        image: item.image ? item.image : getArticleImageAndType(item.field_image_export, item.field_new_photo_export, item.field_new_photo_titles).image,
        flag: isNonEmptyArray(item.field_news_categories_export) ? item.field_news_categories_export[0]?.title : '',
        author_resource: item.author_resource,
        author: item.author_resource,
        changed: item.changed,
        isBookmarked: false,
        nid: item.nid_export,
        field_image: item.field_image_export,
        field_new_photo_export: item.field_new_photo_export,
        field_new_photo_titles: item.field_new_sub_title_export,
        title: item.title,
        field_publication_date_export: item.field_publication_date_export,
        body: isNotEmpty(item.body_export) ? item.body_export : '',
        field_news_categories_export: item.field_news_categories_export,
        type: item.bundle ? item.bundle : 'article',
        tagTopicsList: isNonEmptyArray(item.field_tags_topics_export) ? item.field_tags_topics_export : []
      };
      responseData.push(mostReadItem);
    }
  }
  return responseData;
}

export function* fetchMostRead() {

  try {
    const payload: FetchMostReadSuccessPayloadType = yield call(
      fetchMostReadApi,
    );
    const response = parseMostReadData(payload)
    yield put(fetchMostReadSuccess({ mostReadData: {rows: response} }));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(fetchMostReadFailed({ error: errorMessage.message }));
    }
  }
}

function* mostReadSaga() {
  yield all([takeLatest(FETCH_MOST_READ, fetchMostRead)]);
}

export default mostReadSaga;
