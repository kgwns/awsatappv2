import { useDispatch, useSelector } from 'react-redux';
import {
  getIsLoading,
  getArticleError,
} from 'src/redux/articleDetail/selectors';
import { BookmarkDetailDataType, BookmarkIdSuccessDataFieldType, GetBookmarkDetailBodyGet, RemoveBookmarkDetailDataBody, SendBookMarkBodyGet, SendBookMarkSuccessInfoType } from 'src/redux/bookmark/types';
import { getAllBookmark, getBookmarkedDetailSuccessInfo, getBookMarkSuccessInfo } from 'src/redux/bookmark/selectors';
import { getBookmarked, getBookmarkedDetailInfo, getBookMarkedSuccess, getBookMarkedSuccessDetailInfo, removeBookmarked, sendBookMarkId } from 'src/redux/bookmark/action';
import AdjustAnalyticsManager, { AdjustEventID } from 'src/shared/utils/AdjustAnalyticsManager';
import { recordLogEvent } from 'src/shared/utils';
import {getProfileUserDetails} from 'src/redux/profileUserDetail/selectors';
import { sendUserEventTracking } from 'src/services';
import { TrackingEventType } from 'src/services/eventTrackService';

export interface UseBookMarkReturn {
  isLoading: boolean;
  bookMarkSuccessInfo: SendBookMarkSuccessInfoType;
  bookmarkDetail: any
  error: string;
  bookmarkIdInfo: BookmarkIdSuccessDataFieldType[]
  sendBookmarkInfo(payload: SendBookMarkBodyGet): void;
  getBookmarkedId(): void
  removeBookmarkedInfo(payload: RemoveBookmarkDetailDataBody): void
  getBookmarkDetailData(payload: GetBookmarkDetailBodyGet): void
  updateBookDetailInfo(payload: BookmarkDetailDataType[], bookmarkIDDetail: BookmarkIdSuccessDataFieldType[]): void
  removeBookmark(): void
}

export const useBookmark = (): UseBookMarkReturn => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const bookMarkSuccessInfo = useSelector(getBookMarkSuccessInfo);
  const bookmarkIdInfo = useSelector(getAllBookmark)
  const bookmarkDetail = useSelector(getBookmarkedDetailSuccessInfo)
  const error = useSelector(getArticleError);
  const userProfileData = useSelector(getProfileUserDetails);

  const sendBookmarkInfo = (payload: SendBookMarkBodyGet) => {    
    AdjustAnalyticsManager.trackEvent(AdjustEventID.BOOK_MARK_ARTICLE)
    recordLogEvent('Add_Bookmark_to_Article', {userId: userProfileData.user?.id,articleId: payload.nid});
    const lastBookmarkInfo = [...bookmarkIdInfo]
    const updatedBookmarkIdDetail = lastBookmarkInfo.concat({nid: payload.nid})
    dispatch(getBookMarkedSuccess({ bookmarkedInfo: updatedBookmarkIdDetail }))
    dispatch(sendBookMarkId(payload));
  };

  const getBookmarkedId = () => {
    dispatch(getBookmarked());
  };

  const getBookmarkDetailData = (payload: GetBookmarkDetailBodyGet) => {
    dispatch(getBookmarkedDetailInfo(payload))
  }

  const removeBookmarkedInfo = (payload: RemoveBookmarkDetailDataBody) => {
    const nid = payload.nid
    recordLogEvent('Remove_Bookmark', {id: nid});
    const bookmarkInfo = [...bookmarkDetail]
    const bookmarkIdDetail = [...bookmarkIdInfo]
    const updatedBookmarkInfo = bookmarkInfo.filter((item) => item.nid != nid)
    const updatedBookmarkIdDetail = bookmarkIdDetail.filter((item) => item.nid != nid)
    updateBookDetailInfo(updatedBookmarkInfo,updatedBookmarkIdDetail)
    dispatch(removeBookmarked(payload))
  }

  const updateBookDetailInfo = (bookmarkDetail: BookmarkDetailDataType[], bookmarkIDDetail: BookmarkIdSuccessDataFieldType[]) => {
    dispatch(getBookMarkedSuccess({ bookmarkedInfo: bookmarkIDDetail }))
    dispatch(getBookMarkedSuccessDetailInfo({ bookmarkedDetailInfo: bookmarkDetail }))
  }

  const removeBookmark = () => {
    dispatch(getBookMarkedSuccess({bookmarkedInfo: []}))
    dispatch(getBookMarkedSuccessDetailInfo({bookmarkedDetailInfo: []}))
  }

  return {
    isLoading,
    bookMarkSuccessInfo,
    error,
    bookmarkDetail,
    bookmarkIdInfo,
    sendBookmarkInfo,
    getBookmarkedId,
    removeBookmarkedInfo,
    getBookmarkDetailData,
    updateBookDetailInfo,
    removeBookmark,
  };
};