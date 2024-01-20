import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import { ArticleContentType, ArticleDetailDataType, 
  ArticleDetailSuccessPayload, ArticleOpinionType, 
  ArticleReadAlsoType, ArticleSectionSuccessPayload, 
  FetchRichOpinionsBundleSuccessPayloadType, 
  FetchRichOpinionsBundleType, 
  HTMLElementParseStore, RelatedArticleBodyGet, 
  RelatedArticleDataType, RelatedArticleSuccessPayload, 
  RequestArticleDetailType, RequestArticleSectionType, 
  RequestRelatedArticleType, RequestRichArticleContentBundleType,
  RichHTMLOpinionDataType, RichHTMLType } from './types';
import { requestArticleDetail, requestArticleSection, requestRelatedArticle } from 'src/services/articleDetailService';
import { REQUEST_ARTICLE_DETAIL, 
  REQUEST_RELATED_ARTICLE, 
  REQUEST_ARTICLE_SECTION, REQUEST_RICH_ARTICLE_READ_ALSO, 
  REQUEST_RICH_ARTICLE_CONTENT, REQUEST_RICH_ARTICLE_OPINION } from './actionType';
import { requestArticleDetailFailed, 
  requestArticleDetailSuccess, 
  requestArticleSectionFailed, 
  requestArticleSectionSuccess, 
  requestRelatedArticleSuccess, 
  requestRichArticleReadAlsoSuccessType, 
  requestRichArticleReadAlsoFailedType, 
  requestRichArticleContentBundleFailedType, 
  requestRichArticleContentBundleSuccessType, 
  fetchRichOpinionsBundleSuccess, 
  fetchRichOpinionsBundleFailed } from './action';
import { isNonEmptyArray } from 'src/shared/utils';
import { decodeHTMLTags, getImageUrl, isNotEmpty, isObjectNonEmpty, isNumberNonEmpty, joinArray, getArticleImage } from 'src/shared/utils/utilities';
import { decode } from 'html-entities';
import { getBookMarkDetailInfoService } from 'src/services/bookmarkService';
import { requestOpinionArticleDetailAPI } from 'src/services/opinionArticleDetailService';

export const updatedReadAlsoContent = (articleInfo: ArticleDetailDataType, readAlsoInfo: any) => {
  let richHTML: HTMLElementParseStore[] = []
  if (isNonEmptyArray(readAlsoInfo)) {
    richHTML = articleInfo.richHTML ?? []
    const readAlsoIndex: number = richHTML.findIndex((item: HTMLElementParseStore) => {
      const isReadAlso = item.type === RichHTMLType.READ_ALSO
      if (isReadAlso) {
        const index = readAlsoInfo.findIndex((itemDetail: any) => item.data.related_content.includes(itemDetail.nid))
        return index > -1;
      } else {
        return false;
      }
    });
    if (readAlsoIndex > -1) {
      const filteredReadAlso = richHTML[readAlsoIndex] as ArticleReadAlsoType
      filteredReadAlso.data.readAlsoData = readAlsoInfo
      richHTML[readAlsoIndex] = filteredReadAlso
    }
  }

  return richHTML
}

export const updatedContentBundleContent = (articleInfo: ArticleDetailDataType, contentBundleData: any) => {
  let richHTML: HTMLElementParseStore[] = []
  if (isNonEmptyArray(contentBundleData)) {
    richHTML = articleInfo.richHTML ?? []
    const contentIndex: number = richHTML.findIndex((item: HTMLElementParseStore) => item.type === RichHTMLType.CONTENT)
    if (contentIndex > -1) {
      const filteredContent = richHTML[contentIndex] as ArticleContentType
      filteredContent.data.contentData = contentBundleData[0]
      richHTML[contentIndex] = filteredContent
    }
  }

  return richHTML
}

export const updatedOpinionBundle = (articleInfo: ArticleDetailDataType, opinionInfo: RichHTMLOpinionDataType[]): any[] => {
  let richHTML: HTMLElementParseStore[] = []
  if (isNonEmptyArray(opinionInfo)) {
    richHTML = articleInfo.richHTML ?? []
    const opinionIndex: number = richHTML.findIndex((item: HTMLElementParseStore) => item.type === RichHTMLType.OPINION &&
      ((isNonEmptyArray(item.data.opinion) ? item.data.opinion[0] : item.data.opinion) === opinionInfo[0].nid))
    if (opinionIndex > -1) {
      const filteredOpinion = richHTML[opinionIndex] as ArticleOpinionType
      filteredOpinion.data.opinionData = opinionInfo[0]
      richHTML[opinionIndex] = filteredOpinion
    }
  }

  return richHTML
}

export const parseRichArticleReadAlso = (response: any) => {
  let readAlsoData = []

  if (isNonEmptyArray(response)) {
    readAlsoData = response.map(
      ({ title, nid, field_image_export, field_new_photo,
      }: any) => ({
        title,
        nid,
        image: getArticleImage(field_image_export, field_new_photo),
      })
    )
  }

  return readAlsoData
}

export const parseRichArticleContentBundleSuccess = (response: any) => {
  let richArticleContentBundleData = []

  if (response && isNonEmptyArray(response.rows)) {
      const rows = response.rows
      richArticleContentBundleData = rows.map(
        ({ title, body_export, nid_export, field_image_export,
          field_new_photo_export, field_new_photo_titles,
         }: any) => ({
            body: body_export,
            title: isNotEmpty(title) ? decode(decodeHTMLTags(title)): '',
            nid: nid_export,
            image: getArticleImageAndType(field_image_export, field_new_photo_export, field_new_photo_titles).image,
          })
      );
    }
  return richArticleContentBundleData
}

export const parseOpinionBundleSuccess = (response: any) => {
  let richOpinionData: RichHTMLOpinionDataType[] = []

  if (response && isNonEmptyArray(response.rows)) {
    const rows = response.rows
    richOpinionData = rows.map(
      ({ title, nid_export, writer
      }: any) => ({
        title: isNotEmpty(title) ? decode(decodeHTMLTags(title)) : '',
        nid: nid_export,
        image: isNonEmptyArray(writer) ? writer[0].opinion_writer_photo : '',
        name: isNonEmptyArray(writer) ? writer[0].name : '',
        writerId: isNonEmptyArray(writer) ? writer[0].id : '',
      })
    );
  }


  return richOpinionData
}

const parseRichHTML = (htmlContent: []): any[] => {
  let element: any[] = []
   
  if(!isNonEmptyArray(htmlContent)) {    
    return element
  }
 
  element = htmlContent.map((item: any) => {
    switch (item.bundle || '') {
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

const parseImageData = (fieldImage: string, newPhoto: string) => {
  const image = isNonEmptyArray(fieldImage) ? fieldImage[0] : isNotEmpty(fieldImage) ? fieldImage : ''
  return getArticleImage(image, newPhoto)
}

const formatRelatedArticleData = (response: any): RelatedArticleDataType[] => {
  let formattedData: RelatedArticleDataType[] = []
    if (response && isNonEmptyArray(response.rows)) {
      const rows = response.rows
      formattedData = rows.map(
        ({ title, body, nid, field_image, field_new_photo, field_news_categories_export, author_resource, changed }: any) => ({
          body,
          title: isNotEmpty(title) ? decode(title) : '',
          nid,
          image: parseImageData(field_image, field_new_photo),
          news_categories: isNonEmptyArray(field_news_categories_export) ? field_news_categories_export[0] : field_news_categories_export,
          author: isNotEmpty(author_resource) ? decode(author_resource) : '',
          created: changed
        })
      );
  }
  return formattedData
}

const getTagTopicsList = (tagTopics: any) => {
  let tagNames = '';
  if(isNonEmptyArray(tagTopics)){
    const tag = tagTopics.map((tag:any) => tag.name);
    tagNames = tag.toString();
  } else if(isObjectNonEmpty(tagTopics)){
    tagNames = tagTopics?.name;
  } 
  return tagNames;
}

export const parseArticleDetailSuccess = (response: any): ArticleDetailSuccessPayload => {
  const responseData: ArticleDetailSuccessPayload = {
    articleDetailData: [],
    pager: {}
  }

  if (response) {
    if (isNonEmptyArray(response.rows)) {
      const rows = response.rows
      responseData.articleDetailData = rows.map(
        ({ title, body_export, nid_export, field_image_export, view_node,
          field_news_categories_export, author_resource, field_tags_topics_export, field_new_sub_title_export,
          field_new_photo_export, field_new_photo_titles, field_jwplayer_id_export,
          field_paragraph_export, jor_city, jor_id, jor_name, field_shorturl, field_scribblelive_id, field_display_export,changed, link_node,
          field_publication_date_export, field_advrts_export,
         }: any) => ({
            body: body_export,
            title: isNotEmpty(title) ? decode(title) : '',
            nid: nid_export,
            image: getArticleImageAndType(field_image_export, field_new_photo_export, field_new_photo_titles).image,
            caption: getArticleImageAndType(field_image_export, field_new_photo_export, field_new_photo_titles).caption,
            view_node,
            news_categories: isNonEmptyArray(field_news_categories_export) ? field_news_categories_export[0] : field_news_categories_export,
            tag_topics: isNonEmptyArray(field_tags_topics_export) ? field_tags_topics_export[0] : field_tags_topics_export,
            author: isNotEmpty(author_resource) ? decode(author_resource) : '',
            created: changed,
            subtitle: isNotEmpty(field_new_sub_title_export) ? decode(field_new_sub_title_export) : '',
            jwplayerId: field_jwplayer_id_export,
            richHTML: parseRichHTML(field_paragraph_export),
            journalistId: jor_id,
            journalistCity: jor_city,
            journalistName: jor_name,
            shortUrl: field_shorturl,
            scribbleLiveId: field_scribblelive_id,
            displayType: isNotEmpty(field_display_export) ? field_display_export.toLowerCase() : '',
            link_node,
            publishedDate: field_publication_date_export,
            tagTopicsList: getTagTopicsList(field_tags_topics_export),
            isAd: isNumberNonEmpty(field_advrts_export)
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

export const getArticleImageAndType = (fieldImage: any, detailPhotoList: any, detailPhotoTitle: any) : ImageAndCaptionType => {
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


export const parseArticleSectionSuccess = (response: any, currentNid: number): ArticleSectionSuccessPayload => {
  const responseData: ArticleSectionSuccessPayload = {
    articleSectionData: [],
    pager: {}
  }

  if (response) {
    if (isNonEmptyArray(response.rows)) {
      const rows = response.rows
          responseData.articleSectionData = rows.map(
            ({ title, body, nid, field_image, view_node,
              field_news_categories_export, author_resource, field_tags_topics_export, created_export,
              field_new_photo_export, field_new_photo_titles,
              jor_city, jor_id, jor_name, field_display_export,
              field_publication_date_export, }: any) => ({
                body,
                title: isNotEmpty(title) ? decode(title) : '',
                nid,
                image: getArticleImageAndType(field_image, field_new_photo_export, field_new_photo_titles).image,
                caption: getArticleImageAndType(field_image, field_new_photo_export, field_new_photo_titles).caption,
                view_node,
                news_categories: isNonEmptyArray(field_news_categories_export) ? field_news_categories_export[0] : field_news_categories_export,
                tag_topics: isNonEmptyArray(field_tags_topics_export) ? field_tags_topics_export[0] : field_tags_topics_export,
                author: author_resource,
                created: created_export,
                journalistId: jor_id,
                journalistCity: jor_city,
                journalistName: jor_name,
                displayType: isNotEmpty(field_display_export) ? field_display_export.toLowerCase() : '',
                publishedDate: field_publication_date_export,
                tagTopicsList: getTagTopicsList(field_tags_topics_export)
              })
          );
       responseData.articleSectionData=responseData.articleSectionData.filter((item)=> parseInt(item.nid) !== currentNid)
       responseData.articleSectionData = responseData.articleSectionData.splice(0,4)
    }

    if (response.pager) {
      responseData.pager = response.pager
    }
  }
  return responseData
}

export const parseRelatedArticleSuccess = (response: any): RelatedArticleSuccessPayload => {
  const formattedData = formatRelatedArticleData(response)
  const responseData: RelatedArticleSuccessPayload = {
    relatedArticleData: []
  }
  responseData.relatedArticleData = formattedData.splice(0, 30)
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

    if (isNonEmptyArray(response.articleDetailData) && isNonEmptyArray(response.articleDetailData[0].richHTML)) {
      //Read Also Bundle
      const readAlsoElement: any = response.articleDetailData[0].richHTML?.filter((item) => item.type === RichHTMLType.READ_ALSO)
      if (isNonEmptyArray(readAlsoElement) && isNonEmptyArray(readAlsoElement[0].data.related_content)) {
        const nidList = joinArray(readAlsoElement[0].data.related_content, '+')
        yield call(
          getRichReadAlsoInfo,
          {nid: nidList}
        )
      }


      //Content Also Bundle
      const contentElement: any = response.articleDetailData[0].richHTML?.filter((item) => item.type === RichHTMLType.CONTENT)
      if (isNonEmptyArray(contentElement) && contentElement[0].data.content) {
        yield call(
          fetchRichHTMLContentBundle, {
          type: REQUEST_RICH_ARTICLE_CONTENT,
          payload: { nid: contentElement[0].data.content }
        }
        )
      }

      //Opinion Bundle
      const opinionElement: any = response.articleDetailData[0].richHTML?.filter((item) => item.type === RichHTMLType.OPINION)
      if (isNonEmptyArray(opinionElement)) {
        yield all(opinionElement.map((_: any, index: number) =>
          call(fetchRichHTMLOpinionsBundle, {
            type: REQUEST_RICH_ARTICLE_OPINION,
            payload: { nid: parseInt(opinionElement[index].data.opinion) }
          }
          )
        ));
      }
    }

    if (isNonEmptyArray(response.articleDetailData)) {
      const tid = isObjectNonEmpty(response.articleDetailData[0].tag_topics) ? response.articleDetailData[0].tag_topics.id : ''
      const nid = isObjectNonEmpty(response.articleDetailData[0].news_categories) ? response.articleDetailData[0].news_categories.id : ''

      const payload: RelatedArticleBodyGet = {}
      if (isNotEmpty(tid)) {
        payload.tid = parseInt(tid)
      }

      if (isNotEmpty(nid)) {
        payload.nid = parseInt(nid)
      }

      if (!isObjectNonEmpty(payload)) {
        return
      }

      yield call(
        fetchRelatedArticle, {
        type: REQUEST_RELATED_ARTICLE,
        payload
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


export function* getRichReadAlsoInfo(action: any) {
  try {
    const payload: { rows: any[], pager: object } = yield call(
      getBookMarkDetailInfoService,
      action
    );

    const response = parseRichArticleReadAlso(payload)
    yield put(requestRichArticleReadAlsoSuccessType(response));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(requestRichArticleReadAlsoFailedType({ error: errorMessage.message }));
    }
  }
}

export function* fetchRichHTMLContentBundle(action: RequestRichArticleContentBundleType) {
  try {
    const payload: { rows: any[], pager: object } = yield call(
      requestArticleDetail,
      action.payload
    );
    const response = parseRichArticleContentBundleSuccess(payload)
    yield put(requestRichArticleContentBundleSuccessType({ contentBundleData: response }));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(requestRichArticleContentBundleFailedType({ error: errorMessage.message }));
    }
  }
}

export function* fetchRichHTMLOpinionsBundle(action: FetchRichOpinionsBundleType) {
  try {
    const payload: FetchRichOpinionsBundleSuccessPayloadType = yield call(
      requestOpinionArticleDetailAPI,
      action.payload,
    );
    const response = parseOpinionBundleSuccess(payload)
    yield put(fetchRichOpinionsBundleSuccess({ opinionData: response }));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(fetchRichOpinionsBundleFailed({ error: errorMessage.message }));
    }
  }
}

export function* articleDetailSaga() {
  yield all([
    takeLatest(REQUEST_ARTICLE_DETAIL, fetchArticleDetail),
    takeLatest(REQUEST_RELATED_ARTICLE, fetchRelatedArticle),
    takeLatest(REQUEST_ARTICLE_SECTION,fetchArticleSection),
    takeLatest(REQUEST_RICH_ARTICLE_READ_ALSO, getRichReadAlsoInfo),
  ]);
}

export default articleDetailSaga;
