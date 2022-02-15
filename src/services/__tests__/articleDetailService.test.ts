import axios, { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { LatestArticleBodyGet, RequestSectionComboBodyGet } from 'src/redux/latestNews/types';
import { requestLatestArticle, requestSectionCombo } from '../latestTabService';

describe('Test Search Services', () => {
    const mock = new MockAdapter(axios);
    beforeEach(() => {
        jest.useFakeTimers('legacy');
    })
    afterEach(() => {
        mock.reset();
    });
    describe('Check requestLatestArticle method', () => {
        const requestObject: LatestArticleBodyGet = {
            items_per_page: 10,
            page: 0,
            offset: 0
        };

        it('test when response code is 200', () => {
            mock.onGet().reply(200, {
                result: true,
            });

            return requestLatestArticle(requestObject).then(response => {
                expect(response).toBeInstanceOf(Object);
            });
        });
        it('test when response code is 500', () => {
            mock.onGet().reply(500, {
                error: 'Something Went Wrong',
            });

            return requestLatestArticle(requestObject).catch((error: unknown) => {
                const errorResponse = error as AxiosError;
                expect(errorResponse.response?.status).toEqual(500);
            });
        });
    })

    describe('Check requestLatestArticle method', () => {
        const requestObject: RequestSectionComboBodyGet = {
            id: 11
        };

        it('test when response code is 200', () => {
            mock.onGet().reply(200, {
                result: true,
            });

            return requestSectionCombo(requestObject).then(response => {
                expect(response).toBeInstanceOf(Object);
            });
        });
        it('test when response code is 500', () => {
            mock.onGet().reply(500, {
                error: 'Something Went Wrong',
            });

            return requestSectionCombo(requestObject).catch((error: unknown) => {
                const errorResponse = error as AxiosError;
                expect(errorResponse.response?.status).toEqual(500);
            });
        });
    })
});