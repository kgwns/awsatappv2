import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import { ArticleDetailSuccessPayload, ArticleSectionSuccessPayload, RelatedArticleBodyGet, RelatedArticleDataType, RelatedArticleSuccessPayload, RequestArticleDetailType, RequestArticleSectionType, RequestRelatedArticleType, RichHTMLType } from './types';
import { requestArticleDetail, requestArticleSection, requestRelatedArticle } from 'src/services/articleDetailService';
import { REQUEST_ARTICLE_DETAIL, REQUEST_RELATED_ARTICLE, EMPTY_DATA, REQUEST_ARTICLE_SECTION } from './actionType';
import { requestArticleDetailFailed, requestArticleDetailSuccess, requestArticleSectionFailed, requestArticleSectionSuccess, requestRelatedArticleSuccess } from './action';
import { isNonEmptyArray } from 'src/shared/utils';
import { getArticleImage, getImageUrl, isNotEmpty, isObjectNonEmpty } from 'src/shared/utils/utilities';
import { decode } from 'html-entities';

const parseRichHTML = (htmlContent: []): any[] => {
  let element: any[] = []
   
  if(!isNonEmptyArray(htmlContent)) {    
    return element
  }
 
  element = htmlContent.map((item: any) => {
    switch (item.bundle) {
      case RichHTMLType.QUOTE:
        return { type: RichHTMLType.QUOTE, data: item }
      case RichHTMLType.CONTENT:
        return { type: RichHTMLType.CONTENT, data: item }
      case RichHTMLType.DESCRIPTION:
        return { type: RichHTMLType.DESCRIPTION, data: item }
      case RichHTMLType.OPINION:
        return { type: RichHTMLType.OPINION, data: item }
      case RichHTMLType.READ_ALSO:
        return { type: RichHTMLType.READ_ALSO, data: item }
      case RichHTMLType.NUMBERS:
        return { type: RichHTMLType.NUMBERS, data: item }
      default:
        return null
    }
  })
  return element
}

const parseImageData = (field_image: string, newPhoto: string) => {
  const image = isNonEmptyArray(field_image) ? field_image[0] : isNotEmpty(field_image) ? field_image : ''
  return getArticleImage(image, newPhoto)
}

const formatRelatedArticleData = (response: any): RelatedArticleDataType[] => {
  let formattedData: RelatedArticleDataType[] = []
  if (response) {
    if (isNonEmptyArray(response.rows)) {
      const rows = response.rows
      formattedData = rows.map(
        ({ title, body, nid, field_image, field_new_photo, field_news_categories_export, author_resource,created_export }: any) => ({
          body,
          title: isNotEmpty(title) ? decode(title) : '',
          nid,
          image: parseImageData(field_image, field_new_photo),
          news_categories: isNonEmptyArray(field_news_categories_export) ? field_news_categories_export[0] : field_news_categories_export,
          author: isNotEmpty(author_resource) ? decode(author_resource) : '',
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
          field_news_categories_export, author_resource, field_tags_topics_export,created_export, field_new_sub_title_export,
          field_new_photo_export, field_new_photo_titles, field_jwplayer_id_export,
          field_paragraph_export
         }: any) => ({
            body: body_export,
            title: isNotEmpty(title) ? decode(title) : '',
            nid: nid_export,
            image: getArticleImageAndType(field_image_export, field_new_photo_export, field_new_photo_titles).image,
            caption: getArticleImageAndType(field_image_export, field_new_photo_export, field_new_photo_titles).caption,
            view_node: view_node,
            news_categories: isNonEmptyArray(field_news_categories_export) ? field_news_categories_export[0] : field_news_categories_export,
            tag_topics: isNonEmptyArray(field_tags_topics_export) ? field_tags_topics_export[0] : field_tags_topics_export,
            author: isNotEmpty(author_resource) ? decode(author_resource) : '',
            created: created_export,
            subtitle: isNotEmpty(field_new_sub_title_export) ? decode(field_new_sub_title_export) : '',
            jwplayerId: field_jwplayer_id_export,
            richHTML: parseRichHTML(field_paragraph_export)
          })
      );
    }

    if (response.pager) {
      responseData.pager = response.pager
    }
  }
  return responseData
}

type ImageAndCaptionType = { image: string, caption: string}

const getArticleImageAndType = (fieldImage: any, detailPhotoList: any, detailPhotoTitle: any) : ImageAndCaptionType => {
  let image = ''
  let caption = ''

  if(isNonEmptyArray(detailPhotoList) && isNotEmpty(detailPhotoList[0])) {
    image = detailPhotoList[0]
    if(isNonEmptyArray(detailPhotoTitle)) {
      caption = detailPhotoTitle[0]
    }
  } else {
    image = isNonEmptyArray(fieldImage) ? getImageUrl(fieldImage[0].url) : isNotEmpty(fieldImage) ? getImageUrl(fieldImage) : ''
    caption = isNonEmptyArray(fieldImage) ? fieldImage[0].alt || '' : ''
  }

  return { image, caption }
}


const parseArticleSectionSuccess = (response: any, current_nid: number): ArticleSectionSuccessPayload => {
  let responseData: ArticleSectionSuccessPayload = {
    articleSectionData: [],
    pager: {}
  }

  if (response) {
    if (isNonEmptyArray(response.rows)) {
      const rows = response.rows
          responseData.articleSectionData = rows.map(
            ({ title, body, nid, field_image, view_node,
              field_news_categories_export, author_resource, field_tags_topics_export, created_export,
              field_new_photo_export, field_new_photo_titles }: any) => ({
                body: body,
                title: isNotEmpty(title) ? decode(title) : '',
                nid: nid,
                image: getArticleImageAndType(field_image, field_new_photo_export, field_new_photo_titles).image,
                caption: getArticleImageAndType(field_image, field_new_photo_export, field_new_photo_titles).caption,
                view_node: view_node,
                news_categories: isNonEmptyArray(field_news_categories_export) ? field_news_categories_export[0] : field_news_categories_export,
                tag_topics: isNonEmptyArray(field_tags_topics_export) ? field_tags_topics_export[0] : field_tags_topics_export,
                author: author_resource,
                created: created_export
              })
          );
       responseData.articleSectionData=responseData.articleSectionData.filter((item)=> parseInt(item.nid) !== current_nid)
       responseData.articleSectionData = responseData.articleSectionData.splice(0,4)
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
  responseData.relatedArticleData = formattedData
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
    if (isNonEmptyArray(response.articleDetailData)) {
      const tid = isObjectNonEmpty(response.articleDetailData[0].tag_topics) ? response.articleDetailData[0].tag_topics.id : ''
      const nid = isObjectNonEmpty(response.articleDetailData[0].news_categories) ? response.articleDetailData[0].news_categories.id : ''

      let payload: RelatedArticleBodyGet = {}
      if (isNotEmpty(tid)) {
        payload.tid = parseInt(tid)
      }

      if (isNotEmpty(nid)) {
        payload.nid = parseInt(nid)
      }

      if (!isObjectNonEmpty(payload)) return

      yield call(
        fetchRelatedArticle, {
        type: REQUEST_RELATED_ARTICLE,
        payload: payload
      })
    }

    if (isNonEmptyArray(response.articleDetailData) 
    && isObjectNonEmpty(response.articleDetailData[0].news_categories) 
    && isNotEmpty(response.articleDetailData[0].news_categories.id)) {
      yield call(
        fetchArticleSection, {
        type: REQUEST_ARTICLE_SECTION,
        payload: { id: parseInt(response.articleDetailData[0].news_categories.id), page: 0, items_per_page: 10, current_nid: action.payload.nid }
      }
      )
    } else {
      const sectionResponse = parseArticleSectionSuccess([], action.payload.nid)
      yield put(requestArticleSectionSuccess(sectionResponse));
    }
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

export function* fetchArticleSection(action: RequestArticleSectionType) {
  try {
    const payload: { rows: any[], pager: object } = yield call(
      requestArticleSection,
      action.payload
    );
    const response = parseArticleSectionSuccess(payload, action.payload.current_nid)
    yield put(requestArticleSectionSuccess(response));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(requestArticleSectionFailed({ error: errorMessage.message }));
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
    takeLatest(REQUEST_ARTICLE_SECTION,fetchArticleSection),
    takeLatest(EMPTY_DATA, emptyData)
  ]);
}

export default articleDetailSaga;