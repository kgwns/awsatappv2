import axios, { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { LatestArticleBodyGet, RequestSectionComboBodyGet } from 'src/redux/latestNews/types';
import { ArticleDetailBodyGet, ArticleSectionBodyGet, RelatedArticleBodyGet } from 'src/redux/articleDetail/types';
import { requestArticleDetail, requestArticleSection, requestJournalistDetail, requestRelatedArticle } from '../articleDetailService';
import { requestLatestArticle, requestSectionCombo } from '../latestTabService';
import { JournalistDetailBodyGet } from '../../redux/articleDetail/types';
import * as serviceApi from 'src/services/api';
describe('Test Article Detail Services', () => {
    const mock = new MockAdapter(axios);
    const cachedAxiosMock = new MockAdapter(serviceApi.apiWithCache);

    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
    })
    afterEach(() => {
        mock.reset();
        cachedAxiosMock.reset();
    });
    describe('Check requestLatestArticle method', () => {
        beforeEach(() => {
            jest.useFakeTimers({
                legacyFakeTimers: true
            });
        })
        afterEach(() => {
            mock.reset();
        });
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

    describe('Check requestSectionCombo method', () => {
        beforeEach(() => {
            jest.useFakeTimers({
                legacyFakeTimers: true
            });
        })
        afterEach(() => {
            mock.reset();
        });
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

    describe('Check requestArticleDetail method', () => {
        beforeEach(() => {
            jest.useFakeTimers({
                legacyFakeTimers: true
            });
        })
        afterEach(() => {
            mock.reset();
            cachedAxiosMock.reset();
        });
        const requestObject: ArticleDetailBodyGet = {
            nid: 123
        };

        it('test when response code is 200', () => {
            cachedAxiosMock.onGet().reply(200, {
                result: true,
            });

            return requestArticleDetail(requestObject).then(response => {
                expect(response).toBeInstanceOf(Object);
            });
        });
        it('test requestArticleDetail throws error', () => {
            const getCacheApiRequest = jest.spyOn(serviceApi,'getCacheApiRequest');
            getCacheApiRequest.mockImplementationOnce(()=>{throw new Error('Not able to fetch api')});

            return requestArticleDetail(requestObject).catch((error) => {
                expect(error.message).toEqual('Not able to fetch api')
            });
        });
    })

    describe('Check requestLatestArticle method', () => {
        beforeEach(() => {
            jest.useFakeTimers({
                legacyFakeTimers: true
            });
        })
        afterEach(() => {
            mock.reset();
            cachedAxiosMock.reset();
        });
        const requestObject: RelatedArticleBodyGet = {
            tid: 11
        };
        const requestObject1: RelatedArticleBodyGet = {
            nid: 11
        };

        it('test when response code is 200', () => {
            cachedAxiosMock.onGet().reply(200, {
                result: true,
            });

            return requestRelatedArticle(requestObject).then(response => {
                expect(response).toBeInstanceOf(Object);
            });
        });
        it('test when response code is 200', () => {
            cachedAxiosMock.onGet().reply(200, {
                result: true,
            });

            return requestRelatedArticle(requestObject1).then(response => {
                expect(response).toBeInstanceOf(Object);
            });
        });
        it('test requestRelatedArticle throws error', () => {
            const getCacheApiRequest = jest.spyOn(serviceApi,'getCacheApiRequest');
            getCacheApiRequest.mockImplementationOnce(()=>{throw new Error('Not able to fetch api')});

            return requestRelatedArticle(requestObject).catch((error) => {
                expect(error.message).toEqual('Not able to fetch api')
            });
        });
    })

    describe('Check requestArticleSection method', () => {
        beforeEach(() => {
            jest.useFakeTimers({
                legacyFakeTimers: true
            });
        })
        afterEach(() => {
            mock.reset();
            cachedAxiosMock.reset();
        });
        const requestObject: ArticleSectionBodyGet = {
            id: 11,
            page: 1,
            items_per_page: 10,
            current_nid: 12
        };

        it('test when response code is 200', () => {
            cachedAxiosMock.onGet().reply(200, {
                result: true,
            });

            return requestArticleSection(requestObject).then(response => {
                expect(response).toBeInstanceOf(Object);
            });
        }, 10000);
        it('test requestArticleSection throws error', () => {
            const getCacheApiRequest = jest.spyOn(serviceApi,'getCacheApiRequest');
            getCacheApiRequest.mockImplementationOnce(()=>{throw new Error('Not able to fetch api')});

            return requestArticleSection(requestObject).catch((error) => {
                expect(error.message).toEqual('Not able to fetch api')
            });
        });
    });
    describe('Check requestJournalistDetail method',()=>{
        beforeEach(() => {
            jest.useFakeTimers({
                legacyFakeTimers: true
            });
        })
        afterEach(() => {
            mock.reset();
            cachedAxiosMock.reset();
        });
        const requestObject: JournalistDetailBodyGet = {
            jor_id: 'string',
        }
        it('test requestJournalistDetail when response is 200',()=>{
            cachedAxiosMock.onGet().reply(200,{
                result: true,
            });

            return requestJournalistDetail(requestObject).then(response => {
                expect(response).toBeInstanceOf(Object);
            });
        });
        it('test requestJournalistDetail throws error',()=>{
            const getCacheApiRequest = jest.spyOn(serviceApi,'getCacheApiRequest');
            getCacheApiRequest.mockImplementationOnce(()=>{throw new Error('Not able to fetch api')});

            return requestJournalistDetail(requestObject).catch((error)=>{
                expect(error.message).toEqual('Not able to fetch api')
            });
        });
    });
});