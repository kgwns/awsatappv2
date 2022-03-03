import {
  GET_BOOK_MARKED, GET_BOOK_MARKED_DETAIL_INFO, GET_BOOK_MARKED_FAILED, GET_BOOK_MARKED_FAILED_DETAIL_INFO, GET_BOOK_MARKED_SUCCESS,
  GET_BOOK_MARKED_SUCCESS_DETAIL_INFO,
  REMOVE_BOOK_MARKED,
  REMOVE_BOOK_MARKED_FAILED,
  REMOVE_BOOK_MARKED_SUCCESS,
  SEND_BOOK_MARK_ID, SEND_BOOK_MARK_ID_FAILED, SEND_BOOK_MARK_ID_SUCCESS
} from './actionType';
import { BookmarkAction, BookMarkState } from './types';

const initialData: BookMarkState = {
  isLoading: true,
  error: '',
  sendBookMarkSuccessInfo: {},
  bookmarkedSuccessInfo: [],
  bookmarkDetailSuccessInfo: {},
  removeBookmarkInfo: {},
  removeBookmarkError: '',
  getBookmarkDetailError: ''
};

export default (state = initialData, action: BookmarkAction) => {
  switch (action.type) {
    case SEND_BOOK_MARK_ID:
      return {
        ...state,
        isLoading: true
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
        isLoading: true
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
        error: action.payload.error
      }
    case GET_BOOK_MARKED_DETAIL_INFO:
      return {
        ...state,
        isLoading: true
      }
    case GET_BOOK_MARKED_SUCCESS_DETAIL_INFO:
      return {
        ...state,
        isLoading: false,
        bookmarkDetailSuccessInfo: action.payload.bookmarkedDetailInfo,
      }
    case GET_BOOK_MARKED_FAILED_DETAIL_INFO:
      return {
        ...state,
        isLoading: false,
        getBookmarkDetailError: action.payload.getBookmarkDetailError
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
    default:
      return { ...state }
  }
}
