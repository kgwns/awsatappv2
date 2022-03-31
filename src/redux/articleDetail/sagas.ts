import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import { ArticleDetailSuccessPayload, RelatedArticleDataType, RelatedArticleSuccessPayload, RequestArticleDetailType, RequestRelatedArticleType } from './types';
import { requestArticleDetail, requestRelatedArticle } from 'src/services/articleDetailService';
import { REQUEST_ARTICLE_DETAIL, REQUEST_RELATED_ARTICLE, EMPTY_DATA } from './actionType';
import { requestArticleDetailFailed, requestArticleDetailSuccess, requestRelatedArticleSuccess } from './action';
import { isNonEmptyArray } from 'src/shared/utils';
import { getImageUrl } from 'src/shared/utils/utilities';


const parseImageData = (field_image: string, field_image_export: string) => {
  const image = field_image ?? field_image_export
  return isNonEmptyArray(image) ? getImageUrl(image[0]) : getImageUrl(image)
}

const formatRelatedArticleData = (response: any): RelatedArticleDataType[] => {
  let formattedData: RelatedArticleDataType[] = []
  if (response) {
    if (isNonEmptyArray(response.rows)) {
      const rows = response.rows
      formattedData = rows.map(
        ({ title, body, nid, field_image, field_image_export, field_news_categories_export, author_resource,created_export }: any) => ({
          body,
          title,
          nid,
          image: parseImageData(field_image, field_image_export),
          news_categories: isNonEmptyArray(field_news_categories_export) ? field_news_categories_export[0] : field_news_categories_export,
          author: author_resource,
          created: created_export
        })
      );
    }
  }
  return formattedData
}



const parseArticleDetailSuccess = (response: any): ArticleDetailSuccessPayload => {
  let responseData: ArticleDetailSuccessPayload = {
    articleDetailData: [],
    pager: {}
  }

  if (response) {
    if (isNonEmptyArray(response.rows)) {
      const rows = response.rows
      responseData.articleDetailData = rows.map(
        ({ title, body_export, nid_export, field_image_export, view_node,
          field_news_categories_export, author_resource, field_tags_topics_export,created_export }: any) => ({
            body: body_export,
            title,
            nid: nid_export,
            image: isNonEmptyArray(field_image_export) ? getImageUrl(field_image_export[0]) : '',
            view_node: view_node,
          news_categories: isNonEmptyArray(field_news_categories_export) ? field_news_categories_export[0] : field_news_categories_export,
            tag_topics: isNonEmptyArray(field_tags_topics_export) ? field_tags_topics_export[0] : field_tags_topics_export,
            author: author_resource,
            created: created_export
          })
      );
    }

    if (response.pager) {
      responseData.pager = response.pager
    }
  }
  return responseData
}

const parseRelatedArticleSuccess = (response: any): RelatedArticleSuccessPayload => {
  const formattedData = formatRelatedArticleData(response)
  let responseData: RelatedArticleSuccessPayload = {
    relatedArticleData: []
  }
  responseData.relatedArticleData = formattedData.splice(0, 6)
  return responseData
}


export function* fetchArticleDetail(action: RequestArticleDetailType) {
  try {
    const payload: { rows: any[], pager: object } = yield call(
      requestArticleDetail,
      action.payload
    );
    const response = parseArticleDetailSuccess(payload)

    if (isNonEmptyArray(response.articleDetailData)) {
      yield call(
        fetchRelatedArticle, {
        type: REQUEST_RELATED_ARTICLE,
        payload: { tid: parseInt(response.articleDetailData[0].tag_topics.id) }
      }
      )
    }
    yield put(requestArticleDetailSuccess(response));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(requestArticleDetailFailed({ error: errorMessage.message }));
    }
  }
}

export function* fetchRelatedArticle(action: RequestRelatedArticleType) {
  try {
    const payload: { rows: any[], pager: object } = yield call(
      requestRelatedArticle,
      action.payload
    );
    const response = parseRelatedArticleSuccess(payload)
    yield put(requestRelatedArticleSuccess(response));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(requestArticleDetailFailed({ error: errorMessage.message }));
    }
  }
}

export function* emptyData() {
  emptyData();
}

export function* articleDetailSaga() {
  yield all([
    takeLatest(REQUEST_ARTICLE_DETAIL, fetchArticleDetail),
    takeLatest(REQUEST_RELATED_ARTICLE, fetchRelatedArticle),
    takeLatest(EMPTY_DATA, emptyData)
  ]);
}

export default articleDetailSaga;