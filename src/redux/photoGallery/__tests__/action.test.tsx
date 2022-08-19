import {
    fetchAlbumList,
    fetchAlbumListSuccess,
    fetchAlbumListFailed,
    fetchAlbumDetail,
    fetchAlbumDetailuccess,
    fetchAlbumDetailFailed,
    emptyData,
} from '../action';
import {
    FETCH_ALBUM_LIST,
    FETCH_ALBUM_LIST_SUCCESS,
    FETCH_ALBUM_LIST_ERROR,
    EMPTY_ALL_DATA,
    FETCH_ALBUM_DETAIL,
    FETCH_ALBUM_DETAIL_SUCCESS,
    FETCH_ALBUM_DETAIL_FAILED,
} from '../actionTypes';
import { AlbumDetailBodyGet, AlbumListBodyGet } from '../types';

describe('<PhotoGallery actions', () => {
    const listPayload: AlbumListBodyGet = {
        items_per_page: 10,
        page: 0,
    };
    const detailPayload: AlbumDetailBodyGet = {
        nid: 123,
    };
    const errorMessage = 'This is sample error';
    const resultData = {
        rows: [],
        pager: { current_page: 0, total_pages: 1, items_per_page: '5' },
    };

    it('Fetch Album List', () => {
        const result = fetchAlbumList(listPayload);
        expect(result.type).toEqual(FETCH_ALBUM_LIST);
    });

    it('Fetch Album List success', () => {
        const result = fetchAlbumListSuccess(resultData);
        expect(result.type).toEqual(FETCH_ALBUM_LIST_SUCCESS);
        expect(result.payload).toEqual(resultData);
    });

    it('Fetch Album List failed', () => {
        const result = fetchAlbumListFailed({ error: errorMessage });
        expect(result.type).toEqual(FETCH_ALBUM_LIST_ERROR);
        expect(result.payload.error).toEqual(errorMessage);
    });

    it('Fetch Album Detail Data', () => {
        const result = fetchAlbumDetail(detailPayload);
        expect(result.type).toEqual(FETCH_ALBUM_DETAIL);
    });

    it('Fetch Album Detail Data success', () => {
        const result = fetchAlbumDetailuccess(resultData);
        expect(result.type).toEqual(FETCH_ALBUM_DETAIL_SUCCESS);
        expect(result.payload).toEqual(resultData);
    });

    it('Fetch Album Detail Data failed', () => {
        const result = fetchAlbumDetailFailed({ error: errorMessage });
        expect(result.type).toEqual(FETCH_ALBUM_DETAIL_FAILED);
        expect(result.payload.error).toEqual(errorMessage);
    });

    it('Empty All Data', () => {
        const result = emptyData();
        expect(result.type).toEqual(EMPTY_ALL_DATA);
        expect([]).toEqual([]);
    });
});
