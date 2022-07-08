import { storeInfo } from 'src/constants/SampleData';
import {
    getIsLoading,
    getAllBookmark,
    getBookmarkError,
    getBookMarkSuccessInfo,
    getBookmarkedDetailSuccessInfo,
    getRemoveBookmarkError,
    getRemoveBookmarkSuccessInfo,
} from '../selectors';
import { BookmarkIdSuccessDataFieldType, RemoveBookMarkSuccessInfoType, SendBookMarkSuccessInfoType } from '../types';

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
});
