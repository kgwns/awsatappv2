import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import { GET_BOOK_MARKED, GET_BOOK_MARKED_DETAIL_INFO, REMOVE_BOOK_MARKED, SEND_BOOK_MARK_ID } from './actionType';
import {
  BookmarkIdSuccessDataFieldType, GetBookmarkDetailInfoType,
  GetBookmarkDetailSuccessPayload,
  GetBookMarkIdSuccessMessageType, RemoveBookmarkDetailSuccessPayload, RemoveBookMarkDetailType,
  SendBookMarkDetailType, SendBookMarkSuccessInfoType
} from './types';
import { getBookMarkDetailInfoService, getBookMarkInfo, removeBookMarkInfo, sendBookMarkInfo } from 'src/services/bookmarkService';
import {
  getBookmarkedFailed, getBookmarkedFailedDetailInfo,
  getBookMarkedSuccess, getBookMarkedSuccessDetailInfo,
  removeBookmarkedFailed, removeBookMarkedSuccess,
  sendBookMarkIdFailed, sendBookMarkIdSuccess
} from './action';
import { isNonEmptyArray, joinArray } from 'src/shared/utils';
import { PopulateWidgetType } from 'src/components/molecules/populateWidget/PopulateWidget';
import { decodeHTMLTags, getImageUrl } from 'src/shared/utils/utilities';

const filterNidInfo = (data: BookmarkIdSuccessDataFieldType[]) => {
  return data.reduce((prevValue: string[], item: BookmarkIdSuccessDataFieldType) => {
    if (item.nid) {
      return prevValue.concat(item.nid)
    }
    return prevValue
  }, [])
}

const getOpinionImage = (item: any) => {
  return isNonEmptyArray(item.field_opinion_writer_node_export)
    ? getImageUrl(
      item.field_opinion_writer_node_export[0].opinion_writer_photo,
    )
    : getImageUrl(
      item.field_opinion_writer_node_export.opinion_writer_photo,
    )
}

const populateBookmarkDetail = (response: any): any => {
  let responseData: GetBookmarkDetailSuccessPayload = {
    bookmarkedDetailInfo: []
  }

  //Need to remove those sample value when the API is available
  if (isNonEmptyArray(response)) {
    responseData.bookmarkedDetailInfo = response.reduce((prevValue: any[], item: any) => {
      if (item.type == PopulateWidgetType.ARTICLE) {
        const data = {
          type: item.type,
          body: item.body_export,
          title: item.title,
          nid: item.nid,
          image: isNonEmptyArray(item.field_image_export) ? getImageUrl(item.field_image_export[0]) : '',
          view_node: item.view_node,
          news_categories: item.field_news_categories_export,
          tag_topics: isNonEmptyArray(item.field_tags_topics_export) ? item.field_tags_topics_export[0] : item.field_tags_topics_export,
          author: item.author_resource,
          created: item.created_export,
          isBookmarked: true
        }
        return prevValue.concat(data)
      } else if (item.type == PopulateWidgetType.OPINION) {
        const opinionData = {
          type: item.type,
          imageUrl: getOpinionImage(item),
          writerTitle: item.field_opinion_writer_node_export.name,
          headLine: item.title,
          subHeadLine: decodeHTMLTags(item.body_export),
          audioLabel: 'استمع الي المقالة ',
          duration: '3:22',
          nid: item.nid,
          isBookmarked: true
        }
        return prevValue.concat(opinionData)
      }
      else if (item.type == PopulateWidgetType.VIDEO) {
        const videoData = {
          ...item,
          imageUrl:item.field_thumbnil_multimedia_export ?? 'sites/default/files/styles/1200x600/public/shiekh-jarah-social-media-19052021.jpg?itok=E1_lVUeb',
          des:item.body_export,
          date: item.created_export,
          video:item.field_mp4_link_export,
          isBookmarked: true
        }
        return prevValue.concat(videoData)
      }
      return prevValue
    }, [])
  }

  return responseData
}

export function* sendBookMarkId(action: SendBookMarkDetailType) {
  try {
    const payload: SendBookMarkSuccessInfoType = yield call(
      sendBookMarkInfo,
      action.payload
    );
    yield call(getBookmarked)
    yield put(sendBookMarkIdSuccess({ sendBookMarkSuccessInfo: payload }));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(sendBookMarkIdFailed({ error: errorMessage.message }));
    }
  }
}

export function* getBookmarked() {
  try {
    const payload: GetBookMarkIdSuccessMessageType = yield call(
      getBookMarkInfo
    );
    if (payload && isNonEmptyArray(payload.data)) {
      const id = filterNidInfo(payload.data)
      yield call(getDetailedBookmarkInfo, {
        type: GET_BOOK_MARKED_DETAIL_INFO,
        payload: { nid: joinArray(id, '+') }
      })
    }
    yield put(getBookMarkedSuccess({ bookmarkedInfo: payload.data }));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(getBookmarkedFailed({ error: errorMessage.message }));
    }
  }
}

export function* removeBookmarked(action: RemoveBookMarkDetailType) {
  try {
    const payload: RemoveBookmarkDetailSuccessPayload = yield call(
      removeBookMarkInfo,
      action.payload
    );
    yield call(getBookmarked)
    yield put(removeBookMarkedSuccess(payload));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(removeBookmarkedFailed({ removeBookmarkError: errorMessage.message }));
    }
  }
}

export function* getDetailedBookmarkInfo(action: GetBookmarkDetailInfoType) {
  try {
    const payload: BookmarkIdSuccessDataFieldType[] = yield call(
      getBookMarkDetailInfoService,
      action.payload
    );
    const response = populateBookmarkDetail(payload)
    console.log("🚀 ~ file: sagas.ts ~ line 123 ~ function*getDetailedBookmarkInfo ~ response", response)
    yield put(getBookMarkedSuccessDetailInfo(response));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(getBookmarkedFailedDetailInfo({ getBookmarkDetailError: errorMessage.message }));
    }
  }
}

export function* bookmarkSaga() {
  yield all([
    takeEvery(SEND_BOOK_MARK_ID, sendBookMarkId),
    takeLatest(GET_BOOK_MARKED, getBookmarked),
    takeEvery(REMOVE_BOOK_MARKED, removeBookmarked),
    takeEvery(GET_BOOK_MARKED_DETAIL_INFO, getDetailedBookmarkInfo)
  ]);
}

export default bookmarkSaga;