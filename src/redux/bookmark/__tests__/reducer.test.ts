import { GET_BOOK_MARKED, GET_BOOK_MARKED_DETAIL_INFO, GET_BOOK_MARKED_FAILED, GET_BOOK_MARKED_FAILED_DETAIL_INFO, GET_BOOK_MARKED_SUCCESS, GET_BOOK_MARKED_SUCCESS_DETAIL_INFO, SEND_BOOK_MARK_ID, SEND_BOOK_MARK_ID_FAILED, SEND_BOOK_MARK_ID_SUCCESS } from '../actionType';
import bookmark from '../reducer';
import { BookMarkState } from '../types';

describe('bookmark reducer', () => {
    let initialState: BookMarkState;

    beforeEach(() => {
        initialState = {
            isLoading: true,
            error: '',
            sendBookMarkSuccessInfo: {},
            bookmarkedSuccessInfo: [],
            bookmarkDetailSuccessInfo: {},
            removeBookmarkInfo: {},
            removeBookmarkError: '',
            getBookmarkDetailError: ''
        };
    });

    test('Check loading state when SEND_BOOK_MARK_ID request API', () => {
        const nextState = bookmark(initialState, {
            type: SEND_BOOK_MARK_ID,
            payload: { nid: '123', bundle: 'opinion' }
        });
        expect(nextState.isLoading).toBe(true);
    });

    test('Check loading state when SEND_BOOK_MARK_ID_SUCCESS request API', () => {
        const nextState = bookmark(initialState, {
            type: SEND_BOOK_MARK_ID_SUCCESS,
            payload: { sendBookMarkSuccessInfo: { message: { code: 123, message: '', data: [] } } }
        });
        expect(nextState.isLoading).toBe(false);
    });

    test('Check loading state when SEND_BOOK_MARK_ID_FAILED request API', () => {
        const nextState = bookmark(initialState, {
            type: SEND_BOOK_MARK_ID_FAILED,
            payload: { error: '' }
        });
        expect(nextState.isLoading).toBe(false);
    });

    test('Check loading state when GET_BOOK_MARKED request API', () => {
        const nextState = bookmark(initialState, {
            type: GET_BOOK_MARKED,
        });
        expect(nextState.isLoading).toBe(true);
    });

    test('Check loading state when GET_BOOK_MARKED_SUCCESS request API', () => {
        const nextState = bookmark(initialState, {
            type: GET_BOOK_MARKED_SUCCESS,
            payload: { bookmarkedInfo: [] }
        });
        expect(nextState.isLoading).toBe(false);
    });

    test('Check loading state when GET_BOOK_MARKED_FAILED request API', () => {
        const nextState = bookmark(initialState, {
            type: GET_BOOK_MARKED_FAILED,
            payload: { error: '' }
        });
        expect(nextState.isLoading).toBe(false);
    });

    test('Check loading state when GET_BOOK_MARKED_DETAIL_INFO request API', () => {
        const nextState = bookmark(initialState, {
            type: GET_BOOK_MARKED_DETAIL_INFO,
            payload: { nid: '123' }
        });
        expect(nextState.isLoading).toBe(true);
    });

    test('Check loading state when GET_BOOK_MARKED_SUCCESS_DETAIL_INFO request API', () => {
        const nextState = bookmark(initialState, {
            type: GET_BOOK_MARKED_SUCCESS_DETAIL_INFO,
            payload: { bookmarkedDetailInfo:[] }
        });
        expect(nextState.isLoading).toBe(false);
    });

    test('Check loading state when GET_BOOK_MARKED_FAILED_DETAIL_INFO request API', () => {
        const nextState = bookmark(initialState, {
            type: GET_BOOK_MARKED_FAILED_DETAIL_INFO,
            payload: { getBookmarkDetailError:'' }
        });
        expect(nextState.isLoading).toBe(false);
    });

});
