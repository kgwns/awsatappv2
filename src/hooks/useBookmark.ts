import { useDispatch, useSelector } from 'react-redux';
import {
  getIsLoading,
  getArticleError,
} from 'src/redux/articleDetail/selectors';
import { GetBookmarkDetailBodyGet, RemoveBookmarkDetailDataBody, SendBookMarkBodyGet, SendBookMarkSuccessInfoType } from 'src/redux/bookmark/types';
import { getBookMarkSuccessInfo } from 'src/redux/bookmark/selectors';
import { getBookmarked, getBookmarkedDetailInfo, removeBookmarked, sendBookMarkId } from 'src/redux/bookmark/action';

export interface UseBookMarkReturn {
  isLoading: boolean;
  bookMarkSuccessInfo: SendBookMarkSuccessInfoType;
  error: string;
  sendBookmarkInfo(payload: SendBookMarkBodyGet): void;
  getBookmarkedId(): void
  removeBookmarkedInfo(payload: RemoveBookmarkDetailDataBody): void
  getBookmarkDetailData(payload: GetBookmarkDetailBodyGet): void
}

export const useBookmark = (): UseBookMarkReturn => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const bookMarkSuccessInfo = useSelector(getBookMarkSuccessInfo);
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

  return {
    isLoading,
    bookMarkSuccessInfo,
    error,
    sendBookmarkInfo,
    getBookmarkedId,
    removeBookmarkedInfo,
    getBookmarkDetailData
  };
};