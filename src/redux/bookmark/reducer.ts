import {
  GET_BOOK_MARKED, GET_BOOK_MARKED_DETAIL_INFO, GET_BOOK_MARKED_FAILED, GET_BOOK_MARKED_FAILED_DETAIL_INFO, GET_BOOK_MARKED_SUCCESS,
  GET_BOOK_MARKED_SUCCESS_DETAIL_INFO,
  REMOVE_BOOK_MARKED,
  REMOVE_BOOK_MARKED_FAILED,
  REMOVE_BOOK_MARKED_SUCCESS,
  SEND_BOOK_MARK_ID, SEND_BOOK_MARK_ID_FAILED, SEND_BOOK_MARK_ID_SUCCESS, UPDATED_FILTERED_DATA_SUCCESS, UPDATE_ADD_REMOVE_BOOK_MARK
} from './actionType';
import { BookmarkAction, BookMarkState, GetBookmarkDetailSuccessPayload } from './types';
import { isNonEmptyArray, isNonNegativeNumber, isNotEmpty } from 'src/shared/utils';

const initialData: BookMarkState = {
  isLoading: true,
  error: '',
  sendBookMarkSuccessInfo: {},
  bookmarkedSuccessInfo: [],
  bookmarkDetailSuccessInfo: [],
  removeBookmarkInfo: {},
  removeBookmarkError: '',
  getBookmarkDetailError: '',
  bookmarkDetailLoading: false,
  filteredBookmarkDetailInfo: [],
  refreshBookmarkDetail: true,
};

export default (state = initialData, action: BookmarkAction) => {
  
  const updateBookmarkDetailInfo = ({ bookmarkedDetailInfo, page, bundle }: GetBookmarkDetailSuccessPayload) => {
    const isPageZero = isNonNegativeNumber(page) && page === 0
    if (isNotEmpty(bundle)) {
      let filteredBookmarkDetail = Array.isArray(state.filteredBookmarkDetailInfo) ? [...state.filteredBookmarkDetailInfo] : []
      if (isNonEmptyArray(bookmarkedDetailInfo)) {
        filteredBookmarkDetail = isPageZero ? bookmarkedDetailInfo : filteredBookmarkDetail.concat(bookmarkedDetailInfo)
      }

      return { filteredBookmarkDetailInfo: filteredBookmarkDetail }
    } else {
      let bookmarkDetail = Array.isArray(state.bookmarkDetailSuccessInfo) ? [...state.bookmarkDetailSuccessInfo] : []
      if (isNonEmptyArray(bookmarkedDetailInfo)) {
        bookmarkDetail = isPageZero ? bookmarkedDetailInfo : bookmarkDetail.concat(bookmarkedDetailInfo)
      }

      return { bookmarkDetailSuccessInfo: bookmarkDetail }
    }
  }

  const updatedFilterBookmarkDetail = (page: number) => {
    const isPageZero = isNonNegativeNumber(page) && page === 0

    return isPageZero ? [] : state.filteredBookmarkDetailInfo
  }

  switch (action.type) {
    case SEND_BOOK_MARK_ID:
      return {
        ...state,
        isLoading: true,
        refreshBookmarkDetail: true,
      }
    case SEND_BOOK_MARK_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sendBookMarkSuccessInfo: action.payload.sendBookMarkSuccessInfo,
      }
    case SEND_BOOK_MARK_ID_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      }
    case GET_BOOK_MARKED:
      return {
        ...state,
        isLoading: true,
        bookmarkDetailLoading: true,
      }
    case GET_BOOK_MARKED_SUCCESS:
      return {
        ...state,
        isLoading: false,
        bookmarkedSuccessInfo: action.payload.bookmarkedInfo,
      }
    case GET_BOOK_MARKED_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
        bookmarkDetailLoading: false,
      }
    case GET_BOOK_MARKED_DETAIL_INFO:
      return {
        ...state,
        isLoading: true,
        bookmarkDetailLoading: true,
        filteredBookmarkDetailInfo: updatedFilterBookmarkDetail(action.payload.page),
      }
    case GET_BOOK_MARKED_SUCCESS_DETAIL_INFO:
      return {
        ...state,
        isLoading: false,
        bookmarkDetailLoading: false,
        refreshBookmarkDetail: false,
        ...updateBookmarkDetailInfo(action.payload)
      }
    case UPDATE_ADD_REMOVE_BOOK_MARK: {
      return {
        ...state,
        bookmarkDetailSuccessInfo: action.payload.bookmarkedDetailInfo,
      }
    }
    case GET_BOOK_MARKED_FAILED_DETAIL_INFO:
      return {
        ...state,
        isLoading: false,
        getBookmarkDetailError: action.payload.getBookmarkDetailError,
        bookmarkDetailLoading: false,
      }
    case REMOVE_BOOK_MARKED:
      return {
        ...state,
        isLoading: true
      }
    case REMOVE_BOOK_MARKED_SUCCESS:
      return {
        ...state,
        isLoading: false,
        removeBookmarkInfo: action.payload.removeBookmarkInfo,
      }
    case REMOVE_BOOK_MARKED_FAILED:
      return {
        ...state,
        isLoading: false,
        removeBookmarkError: action.payload.removeBookmarkError
      }
    case UPDATED_FILTERED_DATA_SUCCESS:
      return {
        ...state,
        filteredBookmarkDetailInfo: action.payload.filteredData
      }
    default:
      return { ...state }
  }
}
