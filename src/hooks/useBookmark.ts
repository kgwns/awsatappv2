import { useDispatch, useSelector } from 'react-redux';
import {
  getIsLoading,
  getArticleError,
} from 'src/redux/articleDetail/selectors';
import { BookmarkDetailDataType, BookmarkIdSuccessDataFieldType, GetBookmarkDetailBodyGet, RemoveBookmarkDetailDataBody, SendBookMarkBodyGet, SendBookMarkSuccessInfoType } from 'src/redux/bookmark/types';
import { getAllBookmark, getBookmarkedDetailSuccessInfo, getBookMarkSuccessInfo } from 'src/redux/bookmark/selectors';
import { getBookmarked, getBookmarkedDetailInfo, getBookMarkedSuccess, getBookMarkedSuccessDetailInfo, removeBookmarked, sendBookMarkId } from 'src/redux/bookmark/action';

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
  updateBookDetailInfo(payload: BookmarkDetailDataType[]): void
  removeBookmark(): void
}

export const useBookmark = (): UseBookMarkReturn => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const bookMarkSuccessInfo = useSelector(getBookMarkSuccessInfo);
  const bookmarkIdInfo = useSelector(getAllBookmark)
  const bookmarkDetail = useSelector(getBookmarkedDetailSuccessInfo)
  const error = useSelector(getArticleError);

  const sendBookmarkInfo = (payload: SendBookMarkBodyGet) => {
    dispatch(sendBookMarkId(payload));
  };

  const getBookmarkedId = () => {
    dispatch(getBookmarked());
  };

  const getBookmarkDetailData = (payload: GetBookmarkDetailBodyGet) => {
    dispatch(getBookmarkedDetailInfo(payload))
  }

  const removeBookmarkedInfo = (payload: RemoveBookmarkDetailDataBody) => {
    dispatch(removeBookmarked(payload))
  }

  const updateBookDetailInfo = (payload: BookmarkDetailDataType[]) => {
    dispatch(getBookMarkedSuccessDetailInfo({bookmarkedDetailInfo: payload}))
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