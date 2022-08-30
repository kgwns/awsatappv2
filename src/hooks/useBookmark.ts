import { useDispatch, useSelector } from 'react-redux';
import { BookmarkDetailDataType, BookmarkIdSuccessDataFieldType, RemoveBookmarkDetailDataBody, SendBookMarkBodyGet, SendBookMarkSuccessInfoType } from 'src/redux/bookmark/types';
import { getAllBookmark, getBookmarkedDetailSuccessInfo, getBookmarkError, getBookmarkLoading, getBookMarkSuccessInfo, getFilteredBookmarkDetailInfo, getIsLoading, getRefreshBookmarkDetail } from 'src/redux/bookmark/selectors';
import { getBookmarked, getBookmarkedDetailInfo, getBookMarkedSuccess, removeBookmarked, sendBookMarkId, updateBookMarkedDetailInfo, updateFilteredBookMarkedInfo } from 'src/redux/bookmark/action';
import AdjustAnalyticsManager, { AdjustEventID } from 'src/shared/utils/AdjustAnalyticsManager';
import { isArray, isNonEmptyArray, joinArray, recordLogEvent } from 'src/shared/utils';
import { getProfileUserDetails } from 'src/redux/profileUserDetail/selectors';
import { PopulateWidgetType } from 'src/components/molecules';
// import { filterNidInfoFromNodeList } from 'src/redux/bookmark/sagas';
import { isNotEmpty, spliceArray } from 'src/shared/utils';

const filterNidInfoFromNodeList = (data: BookmarkIdSuccessDataFieldType[]) => {
  return data.reduce((prevValue: string[], item: BookmarkIdSuccessDataFieldType) => {
    if (item && item.nid) {
      return prevValue.concat(item.nid)
    }
    return prevValue
  }, [])
}

export interface UseBookMarkReturn {
  isLoading: boolean;
  bookMarkSuccessInfo: SendBookMarkSuccessInfoType;
  bookmarkDetail: any
  error: string;
  bookmarkIdInfo: BookmarkIdSuccessDataFieldType[]
  bookmarkLoading: boolean;
  isAllBookmarkFetched: boolean;
  filterBookmarkDetailInfo: any[];
  sendBookmarkInfo(payload: SendBookMarkBodyGet): void;
  getBookmarkedId(): void
  removeBookmarkedInfo(payload: RemoveBookmarkDetailDataBody): void
  getBookmarkDetailData(): void
  removeBookmark(): void
  getSpecificBundleFavoriteDetail: (bundle: PopulateWidgetType, startIndex?: number) => void;
  canRefreshBookmarkDetail: boolean;
}

export const useBookmark = (): UseBookMarkReturn => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const bookMarkSuccessInfo = useSelector(getBookMarkSuccessInfo);
  const bookmarkIdInfo = useSelector(getAllBookmark)
  const bookmarkDetail = useSelector(getBookmarkedDetailSuccessInfo)
  const error = useSelector(getBookmarkError);
  const userProfileData = useSelector(getProfileUserDetails);
  const bookmarkLoading = useSelector(getBookmarkLoading)
  const filterBookmarkDetailInfo = useSelector(getFilteredBookmarkDetailInfo)
  const canRefreshBookmarkDetail = useSelector(getRefreshBookmarkDetail)

  const sendBookmarkInfo = (payload: SendBookMarkBodyGet) => {
    AdjustAnalyticsManager.trackEvent(AdjustEventID.BOOK_MARK_ARTICLE)
    recordLogEvent('Add_Bookmark_to_Article', { userId: userProfileData.user?.id, articleId: payload.nid });
    const lastBookmarkInfo = [...bookmarkIdInfo]
    const newNidInfo = [{ nid: payload.nid }]
    const updatedBookmarkIdDetail = newNidInfo.concat(lastBookmarkInfo)
    dispatch(getBookMarkedSuccess({ bookmarkedInfo: updatedBookmarkIdDetail }))
    dispatch(sendBookMarkId(payload));
  };

  const getBookmarkedId = () => {
    dispatch(getBookmarked());
  };

  const getBookmarkDetailData = () => {
    const bookmarkId = [...bookmarkIdInfo]
    const bookmarkDetailInfo = [...bookmarkDetail]
    const nid = getCurrentBatchNid(bookmarkId, bookmarkDetailInfo.length)
    const page = Math.round(bookmarkDetailInfo.length / 25)
    dispatch(getBookmarkedDetailInfo({ nid, page }))
  }

  const removeBookmarkedInfo = (payload: RemoveBookmarkDetailDataBody) => {
    const nid = payload.nid

    if (!isNonEmptyArray(bookmarkIdInfo)) {
      return null
    }

    const bookmarkInfo = isArray(bookmarkDetail) ? [...bookmarkDetail] : []
    const bookmarkIdDetail = [...bookmarkIdInfo]
    const filteredBookmarkDetail = isArray(filterBookmarkDetailInfo) ? [...filterBookmarkDetailInfo] : []

    const updatedBookmarkInfo = bookmarkInfo.filter((item) => item.nid != nid)
    const updatedBookmarkIdDetail = bookmarkIdDetail.filter((item) => item.nid != nid)
    const updatedFilterBookmarkDetail = filteredBookmarkDetail.filter((item) => item.nid != nid)

    updateBookDetailInfo(updatedBookmarkInfo, updatedBookmarkIdDetail, updatedFilterBookmarkDetail)
    dispatch(removeBookmarked(payload))
    recordLogEvent('Remove_Bookmark', { id: nid });
  }

  const updateBookDetailInfo = (bookmarkDetail: BookmarkDetailDataType[], bookmarkIDDetail: BookmarkIdSuccessDataFieldType[], filteredBookmarkDetail: any[]) => {
    dispatch(getBookMarkedSuccess({ bookmarkedInfo: bookmarkIDDetail }))
    dispatch(updateBookMarkedDetailInfo({ bookmarkedDetailInfo: bookmarkDetail, page: 0 }))
    dispatch(updateFilteredBookMarkedInfo({ filteredData: filteredBookmarkDetail }))
  }

  const removeBookmark = () => {
    dispatch(getBookMarkedSuccess({ bookmarkedInfo: [] }))
    dispatch(updateBookMarkedDetailInfo({ bookmarkedDetailInfo: [], page: 0 }))
    dispatch(updateFilteredBookMarkedInfo({ filteredData: [] }))
  }

  const getSpecificBundleFavoriteDetail = (payload: PopulateWidgetType, startIndex?: number) => {
    const bookmarkId = [...bookmarkIdInfo]
    const bundleBookmarkList = bookmarkId.filter((item) => item.bundle === payload)
    const startingIndex = startIndex ?? filterBookmarkDetailInfo.length
    const page = startIndex ?? Math.round(filterBookmarkDetailInfo.length / 25)
    const nid = getCurrentBatchNid(bundleBookmarkList, startingIndex)
    if (isNotEmpty(nid)) {
      dispatch(getBookmarkedDetailInfo({ nid, page, bundle: payload }))
    } else {
      dispatch(updateFilteredBookMarkedInfo({ filteredData: [] }))
    }
  }

  const getCurrentBatchNid = (selectedData: any[], startIndex: number) => {
    const selectedDataInfo = isArray(selectedData) ? [...selectedData] : []
    const nextPageIdInfo = spliceArray(selectedDataInfo, startIndex, 25)
    const nidList = filterNidInfoFromNodeList(nextPageIdInfo)
    const nid = joinArray(nidList, '+')
    return nid
  }

  const isAllBookmarkFetched = bookmarkIdInfo.length === bookmarkDetail.length

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
    removeBookmark,
    bookmarkLoading,
    isAllBookmarkFetched,
    getSpecificBundleFavoriteDetail,
    filterBookmarkDetailInfo,
    canRefreshBookmarkDetail,
  };
};