import axios, { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { ArticleDetailBodyGet, RelatedArticleBodyGet } from 'src/redux/articleDetail/types';
import { requestArticleDetail, requestRelatedArticle } from '../articleDetailService';

describe('Test LatestNews Tab Services', () => {
    const mock = new MockAdapter(axios);
    beforeEach(() => {
        jest.useFakeTimers('legacy');
    })
    afterEach(() => {
        mock.reset();
    });
    describe('Check requestArticleDetail method', () => {
        const requestObject: ArticleDetailBodyGet = {
            nid: 123
        };

        it('test when response code is 200', () => {
            mock.onGet().reply(200, {
                result: true,
            });

            return requestArticleDetail(requestObject).then(response => {
                expect(response).toBeInstanceOf(Object);
            });
        });
        it('test when response code is 500', () => {
            mock.onGet().reply(500, {
                error: 'Something Went Wrong',
            });

            return requestArticleDetail(requestObject).catch((error: unknown) => {
                const errorResponse = error as AxiosError;
                expect(errorResponse.response?.status).toEqual(500);
            });
        });
    })

    describe('Check requestLatestArticle method', () => {
        const requestObject: RelatedArticleBodyGet = {
            tid: 11
        };

        it('test when response code is 200', () => {
            mock.onGet().reply(200, {
                result: true,
            });

            return requestRelatedArticle(requestObject).then(response => {
                expect(response).toBeInstanceOf(Object);
            });
        });
        it('test when response code is 500', () => {
            mock.onGet().reply(500, {
                error: 'Something Went Wrong',
            });

            return requestRelatedArticle(requestObject).catch((error: unknown) => {
                const errorResponse = error as AxiosError;
                expect(errorResponse.response?.status).toEqual(500);
            });
        });
    })
});