import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import { GET_BOOK_MARKED, GET_BOOK_MARKED_DETAIL_INFO, REMOVE_BOOK_MARKED, SEND_BOOK_MARK_ID } from './actionType';
import {
  BookmarkIdSuccessDataFieldType, GetBookmarkDetailBodyGet, GetBookmarkDetailInfoType,
  GetBookmarkDetailSuccessPayload,
  GetBookMarkIdSuccessMessageType, RemoveBookmarkDetailSuccessPayload, RemoveBookMarkDetailType,
  SendBookMarkBodyGet,
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
import { decodeHTMLTags, getArticleImage, getImageUrl, spliceArray } from 'src/shared/utils/utilities';
import { sendUserEventTracking } from 'src/services';
import { TrackingEventType } from 'src/services/eventTrackService';

export const filterNidInfoFromNodeList = (data: BookmarkIdSuccessDataFieldType[]) => {
  return data.reduce((prevValue: string[], item: BookmarkIdSuccessDataFieldType) => {
    if (item && item.nid) {
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

const populateBookmarkDetail = (response: any, payload: GetBookmarkDetailBodyGet): any => {
  const responseData: GetBookmarkDetailSuccessPayload = {
    bookmarkedDetailInfo: [],
    page: payload.page,
    bundle: payload.bundle,
  }

  // TODO: Need to remove those sample value when the API is available
  if (isNonEmptyArray(response)) {
    responseData.bookmarkedDetailInfo = response.reduce((prevValue: any[], item: any) => {
      if (item.type === PopulateWidgetType.ARTICLE) {
        const data = {
          type: item.type,
          body: item.body_export,
          title: item.title,
          nid: item.nid,
          image: getArticleImage(isNonEmptyArray(item.field_image_export) ? item.field_image_export[0] : '', item.field_new_photo),
          view_node: item.view_node,
          news_categories: isNonEmptyArray(item.field_news_categories_export) ? item.field_news_categories_export[0] : item.field_news_categories_export,
          tag_topics: isNonEmptyArray(item.field_tags_topics_export) ? item.field_tags_topics_export[0] : item.field_tags_topics_export,
          author: item.field_new_resource_export,
          created: item.changed,
          isBookmarked: true,
          displayType: item.field_display_export,
        }
        return prevValue.concat(data)
      } else if (item.type === PopulateWidgetType.OPINION) {
        const opinionData = {
          type: item.type,
          imageUrl: getOpinionImage(item),
          writerTitle: isNonEmptyArray(item.field_opinion_writer_node_export) ? item.field_opinion_writer_node_export[0].name : '',
          authorId: isNonEmptyArray(item.field_opinion_writer_node_export) ? item.field_opinion_writer_node_export[0].id : '',
          headLine: item.title,
          subHeadLine: decodeHTMLTags(item.body_export),
          audioLabel: 'إستمع إلى المقالة ',
          duration: '',
          nid: item.nid,
          isBookmarked: true,
          field_jwplayer_id_opinion_export: item.field_jwplayer_id_opinion_export ? item.field_jwplayer_id_opinion_export : item.jwplayer,
        }
        return prevValue.concat(opinionData)
      } else if (item.type === PopulateWidgetType.VIDEO) {
        const videoData = {
          ...item,
          imageUrl:item.field_thumbnil_multimedia_export,
          des:item.body_export,
          date: item.created_export,
          video:item.field_mp4_link_export,
          isBookmarked: true
        }
        return prevValue.concat(videoData)
      } else if (item.type === PopulateWidgetType.PODCAST) {
        const podcastData = {
          ...item,
          author: item?.field_announcer_name_export,
          imageUrl: item?.field_podcast_sect_export?.img_podcast_mobile,
          title: item?.title,
          body: item?.body_export,
          timeDuration: item?.field_total_duration_export,
          isBookmarked: true,
          spreakerEpisode: item?.field_spreaker_episode_export
        }
        return prevValue.concat(podcastData)
      } else if (item.type === PopulateWidgetType.ALBUM) {
        const albumData = {
          ...item,
          imageUrl: item.field_album_img_export,
          title: item?.title,
          nid: item?.nid,
          created: item.created_export,
          isBookmarked: true,
        }
        return prevValue.concat(albumData)
      }
      return prevValue
    }, [])
  }

  return responseData
}

const parseBookmarkId = (bookmarkData: SendBookMarkBodyGet[]): SendBookMarkBodyGet[] => {
  return bookmarkData.reduce((prevValue: SendBookMarkBodyGet[], item: SendBookMarkBodyGet) => {
    const isDuplicateId = prevValue.some((prevItem) => prevItem.nid == item.nid)
    return isDuplicateId ? prevValue : prevValue.concat(item);
  }, []);
};

export function* sendBookMarkId(action: SendBookMarkDetailType) {
  sendUserEventTracking({
    events: [{
      contentId: action.payload.nid,
      eventType: TrackingEventType.BOOKMARK
    }]
  })

  try {
    const payload: SendBookMarkSuccessInfoType = yield call(
      sendBookMarkInfo,
      action.payload
    );
    // yield call(getBookmarked)
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
    const info = parseBookmarkId(payload.data);
    yield put(getBookMarkedSuccess({ bookmarkedInfo: info }));
    if (payload && isNonEmptyArray(payload.data)) {
      const data = [...payload.data]
      const firstPageId = spliceArray(data, 0, 25)
      const id = filterNidInfoFromNodeList(firstPageId)
      yield call(getDetailedBookmarkInfo, {
        type: GET_BOOK_MARKED_DETAIL_INFO,
        payload: { nid: joinArray(id, '+'), page: 0 }
      })
    } else {
      yield put(getBookMarkedSuccessDetailInfo({ bookmarkedDetailInfo: [] }));
    }
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
    // yield call(getBookmarked)
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
    const response = populateBookmarkDetail(payload, action.payload)
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
