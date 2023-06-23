import axios, { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { GetBookmarkDetailBodyGet, RemoveBookmarkDetailDataBody, SendBookMarkBodyGet } from 'src/redux/bookmark/types';
import { getBookMarkDetailInfoService, getBookMarkInfo, removeBookMarkInfo, sendBookMarkInfo } from '../bookmarkService';

describe('Test BookMark Services', () => {
    const mock = new MockAdapter(axios);

    const bodySendBookMark: SendBookMarkBodyGet = {
        nid: '12345'
    }
    const bodyRemoveBookMark: RemoveBookmarkDetailDataBody = {
        nid: '12345'
    }
    const bodyGetBookmarkDetail: GetBookmarkDetailBodyGet = {
        nid: '12345',
        page: 1
    }

    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
    });

    afterEach(() => {
        mock.reset();
    });
    it('test when sendBookMarkInfo response code is 200', () => {
        mock.onPost().reply(200, {
            result: true,
        });

        return sendBookMarkInfo(bodySendBookMark).then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });
    it('test when sendBookMarkInfo response code is 500', () => {
        mock.onPost().reply(500, {
            error: 'Something Went Wrong',
        });

        return sendBookMarkInfo(bodySendBookMark).catch((error: unknown) => {
            const errorResponse = error as AxiosError;
            expect(errorResponse.response?.status).toEqual(500);
        });
    });
    it('test when getBookMarkInfo response code is 200', () => {
        mock.onPost().reply(200, {
            result: true,
        });

        return getBookMarkInfo().then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });
    it('test when getBookMarkInfo response code is 500', () => {
        mock.onPost().reply(500, {
            error: 'Something Went Wrong',
        });

        return getBookMarkInfo().catch((error: unknown) => {
            const errorResponse = error as AxiosError;
            expect(errorResponse.response?.status).toEqual(500);
        });
    });
    it('test when removeBookMarkInfo response code is 200', () => {
        mock.onPost().reply(200, {
            result: true,
        });

        return removeBookMarkInfo(bodyRemoveBookMark).then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });
    it('test when removeBookMarkInfo response code is 500', () => {
        mock.onPost().reply(500, {
            error: 'Something Went Wrong',
        });

        return removeBookMarkInfo(bodyRemoveBookMark).catch((error: unknown) => {
            const errorResponse = error as AxiosError;
            expect(errorResponse.response?.status).toEqual(500);
        });
    });
    it('test when getBookMarkDetailInfoService response code is 200', () => {
        mock.onGet().reply(200, {
            result: true,
        });

        return getBookMarkDetailInfoService(bodyGetBookmarkDetail).then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });
    it('test when getBookMarkDetailInfoService response code is 500', () => {
        mock.onGet().reply(500, {
            error: 'Something Went Wrong',
        });

        return getBookMarkDetailInfoService(bodyGetBookmarkDetail).catch((error: unknown) => {
            const errorResponse = error as AxiosError;
            expect(errorResponse.response?.status).toEqual(500);
        });
    });
});