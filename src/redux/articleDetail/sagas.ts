import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import { ArticleDetailSuccessPayload, RequestArticleDetailType } from './types';
import { requestArticleDetail } from 'src/services/articleDetailService';
import { REQUEST_ARTICLE_DETAIL } from './actionType';
import { requestArticleDetailFailed, requestArticleDetailSuccess } from './action';
import { isNonEmptyArray } from 'src/shared/utils';
import { getImageUrl } from 'src/shared/utils/utilities';


const parseArticleDetailSuccess = (response: any): ArticleDetailSuccessPayload => {
  let responseData: ArticleDetailSuccessPayload = {
    articleDetailData: [],
    pager: {}
  }

  if (response) {
    if (isNonEmptyArray(response.rows)) {
      const rows = response.rows
      responseData.articleDetailData = rows.map(
        ({ title, body_export, nid_export, field_image_export, view_node, field_news_categories_export }: any) => ({
          body: body_export,
          title,
          nid: nid_export,
          image: isNonEmptyArray(field_image_export) && getImageUrl(field_image_export[0]),
          view_node: view_node,
          news_categories: field_news_categories_export
        })
      );
    }

    if (response.pager) {
      responseData.pager = response.pager
    }
  }
  return responseData
}

export function* fetchArticleDetail(action: RequestArticleDetailType) {
  try {
    const payload: { rows: any[], pager: object } = yield call(
      requestArticleDetail,
      action.payload
    );
    const response = parseArticleDetailSuccess(payload)
    yield put(requestArticleDetailSuccess(response));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(requestArticleDetailFailed({ error: errorMessage.message }));
    }
  }
}

function* articleDetailSaga() {
  yield all([takeLatest(REQUEST_ARTICLE_DETAIL, fetchArticleDetail)]);
}

export default articleDetailSaga;