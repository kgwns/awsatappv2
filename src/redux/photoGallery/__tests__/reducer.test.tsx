import { albumListActions } from '../action';
import {
    FETCH_ALBUM_LIST,
    FETCH_ALBUM_DETAIL,
    EMPTY_ALL_DATA,
} from '../actionTypes';
import albumReducer from '../reducer';
import { AlbumListState } from '../types';

describe('Albumlist reducer', () => {
    let initialState: AlbumListState;

    beforeEach(() => {
        initialState = {
            albumData: {
                rows: [],
                pager: { current_page: 0, items_per_page: '', total_pages: 0 },
            },
            error: '',
            isLoading: false,
            albumDetailData: {
                rows: [],
                pager: { current_page: 0, items_per_page: '', total_pages: 0 },
            },
            albumDetailError: '',
            albumDetailLoading: false,
        };
    });

    test('fetchAlbumListSuccess', () => {
        const testData = {
            rows: [],
            pager: { current_page: 0, items_per_page: '', total_pages: 0 },
        };
        initialState.isLoading = true;
        const nextState = albumReducer(
            initialState,
            albumListActions.fetchAlbumListSuccess(testData),
        );

        expect(nextState.isLoading).toBeFalsy();
    });

    test('fetchAlbumListFailure', () => {
        const testError = 'some-error';
        initialState.isLoading = true;
        const nextState = albumReducer(
            initialState,
            albumListActions.fetchAlbumListFailed({
                error: testError,
            }),
        );

        expect(nextState.isLoading).toBeFalsy();
        expect(nextState.error).toEqual(testError);
    });

    test('Check loading state when albumReducer request API', () => {
        const nextState = albumReducer(initialState, {
            type: FETCH_ALBUM_LIST,
            payload: { page: 1 },
        });
        expect(nextState.isLoading).toBe(true);
    });

    test('fetchAlbumDetailSuccess', () => {
        const testData = {
            rows: [],
            pager: { current_page: 0, items_per_page: '', total_pages: 0 },
        };
        initialState.albumDetailLoading = true;
        const nextState = albumReducer(
            initialState,
            albumListActions.fetchAlbumDetailuccess(testData),
        );

        expect(nextState.albumDetailLoading).toBeFalsy();
    });

    test('fetchAlbumDetailFailure', () => {
        const testError = 'some-error';
        initialState.albumDetailLoading = true;
        const nextState = albumReducer(
            initialState,
            albumListActions.fetchAlbumDetailFailed({
                error: testError,
            }),
        );

        expect(nextState.albumDetailLoading).toBeFalsy();
        expect(nextState.albumDetailError).toEqual(testError);
    });

    test('Check loading state when albumReducer request API', () => {
        const nextState = albumReducer(initialState, {
            type: FETCH_ALBUM_DETAIL,
            payload: { nid: 1 },
        });
        expect(nextState.albumDetailLoading).toBe(true);
    });

    test('empty state', () => {
        const nextState = albumReducer(initialState, {
            type: EMPTY_ALL_DATA,
        });
        expect(nextState.albumDetailLoading).toBe(false);
    });
});
