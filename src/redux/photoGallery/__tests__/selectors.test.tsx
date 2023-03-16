import { storeInfo } from 'src/constants/Constants';
import {
    getIsLoading,
    getAlbumListData,
    getAlbumListDataError,
    getAlbumDetailLoading,
    getAlbumDetailData,
    getAlbumDetailDataError,
} from '../selectors';
import { AlbumListItemType, AlbumDetailType } from '../types';

describe('Photo Gallery Selector', () => {
    const storeData = storeInfo[0];
    test('Get loading state', () => {
        const isLoading: boolean = getIsLoading(storeData);
        expect(isLoading).toEqual(false);
    });

    test('Get Album List state', () => {
        const albumData: AlbumListItemType[] = getAlbumListData(storeData);
        expect(albumData).toEqual([]);
    });

    test('Get Album List error state', () => {
        const error = getAlbumListDataError(storeData);
        expect(error).toEqual('');
    });

    test('Get Album Detail loading state', () => {
        const isDetailLoading: boolean = getAlbumDetailLoading(storeData);
        expect(isDetailLoading).toEqual(false);
    });

    test('Get Album Detail  state', () => {
        const articleData: AlbumDetailType[] = getAlbumDetailData(storeData);
        expect(articleData).toEqual([]);
    });

    test('Get Album Detail error state', () => {
        const error = getAlbumDetailDataError(storeData);
        expect(error).toEqual('');
    });
});
