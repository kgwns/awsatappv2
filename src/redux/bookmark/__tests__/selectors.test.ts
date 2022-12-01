import { storeInfo } from 'src/constants/Constants';
import {
    getIsLoading,
    getAllBookmark,
    getBookmarkError,
    getBookMarkSuccessInfo,
    getBookmarkedDetailSuccessInfo,
    getRemoveBookmarkError,
    getRemoveBookmarkSuccessInfo,
    getBookmarkLoading,
    getFilteredBookmarkDetailInfo,
    getRefreshBookmarkDetail,
} from '../selectors';
import { BookmarkDetailDataType, BookmarkIdSuccessDataFieldType, RemoveBookMarkSuccessInfoType, SendBookMarkSuccessInfoType } from '../types';

describe('All Bookmark Selector', () => {
    const storeData = storeInfo[0];
    test('Get loading state', () => {
        const isLoading: boolean = getIsLoading(storeData);
        expect(isLoading).toEqual(true);
    });

    test('Get BookMarkSuccessInfo data', () => {
        const bookMarkSuccessInfo: SendBookMarkSuccessInfoType = getBookMarkSuccessInfo(storeData);
        expect(bookMarkSuccessInfo).toEqual({});
    });

    test('Get articleError data', () => {
        const articleError: string = getBookmarkError(storeData);
        expect(articleError).toEqual('');
    });

    test('Get AllBookmark data', () => {
        const allBookmark: BookmarkIdSuccessDataFieldType[] = getAllBookmark(storeData);
        expect(allBookmark).toEqual([]);
    });

    test('Get RemoveBookmarkSuccessInfo data', () => {
        const removeBookmarkSuccessInfo: RemoveBookMarkSuccessInfoType = getRemoveBookmarkSuccessInfo(storeData);
        expect(removeBookmarkSuccessInfo).toEqual({});
    });

    test('Get bookmarkedDetailSuccessInfo data', () => {
        const bookmarkedDetailSuccessInfo: any[] = getBookmarkedDetailSuccessInfo(storeData);
        expect(bookmarkedDetailSuccessInfo).toEqual([]);
    });

    test('Get removeBookmarkError data', () => {
        const removeBookmarkError: string = getRemoveBookmarkError(storeData);
        expect(removeBookmarkError).toEqual('');
    });

    test('Get getBookmarkLoading state', () => {
        const bookmarkDetailLoading: boolean = getBookmarkLoading(storeData);
        expect(bookmarkDetailLoading).toEqual(false);
    });

    test('Get getFilteredBookmarkDetailInfo data', () => {
        const filteredBookmarkDetailInfo: BookmarkDetailDataType[] = getFilteredBookmarkDetailInfo(storeData);
        expect(filteredBookmarkDetailInfo).toEqual([]);
    });

    test('Get getRefreshBookmarkDetail data', () => {
        const filteredBookmarkDetailInfo: boolean = getRefreshBookmarkDetail(storeData);
        expect(filteredBookmarkDetailInfo).toEqual(undefined);
    });
});
