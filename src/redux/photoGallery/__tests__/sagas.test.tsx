import { takeLatest } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import {
    FETCH_ALBUM_LIST,
    FETCH_ALBUM_DETAIL,
} from '../actionTypes';
import albumListSaga, {
    fetchAlbumList,
    fetchAlbumDetail,
} from '../sagas';
import { fetchAlbumListSuccess, fetchAlbumDetailuccess } from '../action';
import {
    fetchAlbumListApi,
    fetchAlbumDetailApi,
} from 'src/services/photoGalleryService';

import {
    FetchAlbumListType,
    FetchAlbumListSuccessPayloadType,
    AlbumListBodyGet,
    FetchAlbumDetailType,
    FetchAlbumDetailSuccessPayloadType,
    AlbumDetailBodyGet,
} from '../types';

const mockPage = 0;

const requestObject: AlbumListBodyGet = {
    page: mockPage,
};

const requestDetailObject: AlbumDetailBodyGet = {
    nid: 123,
};

const requestAction: FetchAlbumListType = {
    type: FETCH_ALBUM_LIST,
    payload: requestObject,
};

const requestArticleAction: FetchAlbumDetailType = {
    type: FETCH_ALBUM_DETAIL,
    payload: requestDetailObject,
};

const reposnseObject = {
    rows: [],
    pager: {
        current_page: 0,
        items_per_page: '',
        total_pages: 0,
    },
};

const errorResponse = {
    response: { data: 'Error', status: 500, statusText: 'Error' },
};

const sucessResponseObject: FetchAlbumListSuccessPayloadType = reposnseObject;

const sucessArticlesObject: FetchAlbumDetailSuccessPayloadType = reposnseObject;

describe('Test AlbumList  saga', () => {
    it('fire on AlbumList', () => {
        testSaga(albumListSaga)
            .next()
            .all([takeLatest(FETCH_ALBUM_LIST, fetchAlbumList)])
            .next()
            .all([takeLatest(FETCH_ALBUM_DETAIL, fetchAlbumDetail)])
            .finish()
            .isDone();
    });
});

describe('Test Album List success', () => {
    it('fire on FETCH_ALBUM_LIST', () => {
        testSaga(fetchAlbumList, requestAction)
            .next()
            .call(fetchAlbumListApi, requestObject)
            .next(reposnseObject)
            .put(fetchAlbumListSuccess(sucessResponseObject))
            .finish()
            .isDone();
    });
});

describe('Test Album List  error', () => {
    it('check Album List failed', () => {
        const genObject = fetchAlbumList({
            type: FETCH_ALBUM_LIST,
            payload: { page: mockPage },
        });
        genObject.next();
        genObject.throw(errorResponse);
    });
    it('check Album List failed', () => {
        const genObject = fetchAlbumList({
            type: FETCH_ALBUM_LIST,
            payload: { page: mockPage },
        });
        genObject.next();
        genObject.throw({});
    });
});

describe('Test Album Detail success', () => {
    it('fire on Album Detail', () => {
        testSaga(fetchAlbumDetail, requestArticleAction)
            .next()
            .call(fetchAlbumDetailApi, requestDetailObject)
            .next(reposnseObject)
            .put(fetchAlbumDetailuccess(sucessArticlesObject))
            .finish()
            .isDone();
    });
});

describe('Test Album Detail  error', () => {
    it('check Album Detail failed', () => {
        const genObject = fetchAlbumDetail({
            type: FETCH_ALBUM_DETAIL,
            payload: { nid: mockPage },
        });
        genObject.next();
        genObject.throw(errorResponse);
    });
    it('check  Album Detail failed', () => {
        const genObject = fetchAlbumDetail({
            type: FETCH_ALBUM_DETAIL,
            payload: { nid: mockPage },
        });
        genObject.next();
        genObject.throw({});
    });
});
