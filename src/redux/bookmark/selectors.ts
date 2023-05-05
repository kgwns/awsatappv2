import { AppState, Selector } from 'src/redux/rootReducer';
import { BookmarkIdSuccessDataFieldType, BookmarkDetailDataType, RemoveBookMarkSuccessInfoType, SendBookMarkSuccessInfoType } from './types';

export const getIsLoading: Selector<boolean> = (state: AppState) =>
  state.bookmark.isLoading;

export const getBookMarkSuccessInfo: Selector<SendBookMarkSuccessInfoType> = (state: AppState) =>
  state.bookmark.sendBookMarkSuccessInfo;

export const getBookmarkError: Selector<string> = (state: AppState) =>
  state.bookmark.error;

export const getAllBookmark: Selector<BookmarkIdSuccessDataFieldType[]> = (state: AppState) =>
  state.bookmark.bookmarkedSuccessInfo;

export const getRemoveBookmarkSuccessInfo: Selector<RemoveBookMarkSuccessInfoType> = (state: AppState) =>
  state.bookmark.removeBookmarkInfo;

export const getBookmarkedDetailSuccessInfo: Selector<BookmarkDetailDataType[]> = (state: AppState) =>
state.bookmark.bookmarkDetailSuccessInfo;

export const getRemoveBookmarkError: Selector<string> = (state: AppState) =>
  state.bookmark.removeBookmarkError;

export const getBookmarkLoading: Selector<boolean> =
  (state: AppState) => state.bookmark.bookmarkDetailLoading;

export const getFilteredBookmarkDetailInfo: Selector<BookmarkDetailDataType[]> =
  (state: AppState) => state.bookmark.filteredBookmarkDetailInfo;

export const getRefreshBookmarkDetail: Selector<boolean> =
  (state: AppState) => state.bookmark.refreshBookmarkDetail;
