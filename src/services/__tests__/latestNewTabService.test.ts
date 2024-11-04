import axios, { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { NativeModules } from 'react-native';
import { ArticleDetailBodyGet, RelatedArticleBodyGet } from 'src/redux/articleDetail/types';
import { LatestArticleBodyGet, RequestSectionComboBodyGet, SpotlightArticleSectionBodyGet } from 'src/redux/latestNews/types';
import { requestArticleDetail, requestRelatedArticle } from '../articleDetailService';
import { writerOpinionApi, requestLatestArticle, requestSectionCombo, mainCoverageBlockApi, podcastHomeApi, mainHorizontalArticleApi, editorsChoiceApi, spotlightApi, requestSpotlightArticleSection, mainFeaturedArticleApi, infoGraphicBlockApi, archivedArticleApi } from '../latestTabService';
import * as serviceApi from 'src/services/api';

describe('Test LatestNews Tab Services', () => {
    const mock = new MockAdapter(axios);
    const cachedAxiosMock = new MockAdapter(serviceApi.apiWithCache);
    beforeEach(() => {
        NativeModules.RNTopNewsContentBridge = { syncTopStories: jest.fn() } 
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
    })
    afterEach(() => {
        mock.reset();
        cachedAxiosMock.reset();
    });
    describe('Check requestArticleDetail method', () => {
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
        it('test when response code is 500', () => {
            cachedAxiosMock.onGet().reply(500, {
                error: 'Something Went Wrong',
            });

            return requestArticleDetail(requestObject).catch((error: unknown) => {
                const errorResponse = error as AxiosError;
                expect(errorResponse.response?.status).toEqual(500);
            });
        });
    })

    describe('Check requestRelatedArticle method', () => {
        const requestObject: RelatedArticleBodyGet = {
            tid: 11
        };

        it('test when response code is 200', () => {
            cachedAxiosMock.onGet().reply(200, {
                result: true,
            });

            return requestRelatedArticle(requestObject).then(response => {
                expect(response).toBeInstanceOf(Object);
            });
        });
        it('test when response code is 500', () => {
            cachedAxiosMock.onGet().reply(500, {
                error: 'Something Went Wrong',
            });

            return requestRelatedArticle(requestObject).catch((error: unknown) => {
                const errorResponse = error as AxiosError;
                expect(errorResponse.response?.status).toEqual(500);
            });
        });
    })

    describe('Check writerOpinionApi method', () => {
        const requestObject: LatestArticleBodyGet = {
            page: 0,
            items_per_page: 10,
            offset: 2
        };

        it('test when response code is 200', () => {
            mock.onGet().reply(200, {
                result: true,
            });

            return writerOpinionApi(requestObject).then(response => {
                expect(response).toBeInstanceOf(Object);
            });
        });
        it('test when response code is 500', () => {
            mock.onGet().reply(500, {
                error: 'Something Went Wrong',
            });

            return writerOpinionApi(requestObject).catch((error: unknown) => {
                const errorResponse = error as AxiosError;
                expect(errorResponse.response?.status).toEqual(500);
            });
        });
    })

    describe('Check requestSectionCombo method', () => {
        const requestObject1: RequestSectionComboBodyGet = {
            id: 11,
            items_per_page: 10
        };

        const requestObject: RequestSectionComboBodyGet = {
            id: 11,
        };

        it('test when response code is 200', () => {
            mock.onGet().reply(200, {
                result: true,
            });
            NativeModules.RNTopNewsContentBridge = { syncTopStories: jest.fn() }
            return requestSectionCombo(requestObject).then(response => {
                expect(response).toBeInstanceOf(Object);
            });
        });

        it('test getSectionComboUrl while sending id as string', () => {
            const idInString = {
                id:'11'
            }
            mock.onGet().reply(200, {
                result: true,
            });
            NativeModules.RNTopNewsContentBridge = { syncTopStories: jest.fn() }
            return requestSectionCombo(idInString).then(response => {
                expect(response).toBeInstanceOf(Object);
            });
        });

        it('test getSectionComboUrl while sending id as array', () => {
            const idInArray = {
                id:[11]
            }
            mock.onGet().reply(200, {
                result: true,
            });
            NativeModules.RNTopNewsContentBridge = { syncTopStories: jest.fn() }
            return requestSectionCombo(idInArray).then(response => {
                expect(response).toBeInstanceOf(Object);
            });
        });

        it('test when response code is 200', () => {
            mock.onGet().reply(200, {
                result: true,
            });

            return requestSectionCombo(requestObject1).then(response => {
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

    describe('Check podcastHomeApi method', () => {
        it('test when response code is 200', () => {
            mock.onGet().reply(200, {
                result: true,
            });

            return podcastHomeApi().then((response: any) => {
                expect(response).toBeInstanceOf(Object);
            });
        });
        it('test when response code is 500', () => {
            mock.onGet().reply(500, {
                error: 'Something Went Wrong',
            });

            return podcastHomeApi().catch((error: unknown) => {
                const errorResponse = error as AxiosError;
                expect(errorResponse.response?.status).toEqual(500);
            });
        });
    })

    describe('Check mainCoverageBlockApi method', () => {
        it('test when response code is 200', () => {
            const getApiRequest = jest.spyOn(serviceApi,'getApiRequest');
            getApiRequest.mockResolvedValueOnce({result:true});
            
            return mainCoverageBlockApi().then((response: any) => {
                expect(response).toBeInstanceOf(Object);
            });
        });
        it('test when response code is 500', () => {
            mock.onGet().reply(500, {
                error: 'Something Went Wrong',
            });

            return mainCoverageBlockApi().catch((error: unknown) => {
                const errorResponse = error as AxiosError;
                expect(errorResponse.response?.status).toEqual(500);
            });
        });
    })

    describe('Check mainFeaturedArticleApi method', () => {
        it('test when response code is 200', () => {
            mock.onGet().reply(200, {
                result: true,
            });

            return mainFeaturedArticleApi().then((response: any) => {
                expect(response).toBeInstanceOf(Object);
            });
        });
        it('test when response code is 500', () => {
            mock.onGet().reply(500, {
                error: 'Something Went Wrong',
            });

            return mainFeaturedArticleApi().catch((error: unknown) => {
                const errorResponse = error as AxiosError;
                expect(errorResponse.response?.status).toEqual(500);
            });
        });
    })

    describe('Check mainHorizontalArticleApi method', () => {
        it('test when response code is 200', () => {
            mock.onGet().reply(200, {
                result: true,
            });

            return mainHorizontalArticleApi().then((response: any) => {
                expect(response).toBeInstanceOf(Object);
            });
        });
        it('test when response code is 500', () => {
            mock.onGet().reply(500, {
                error: 'Something Went Wrong',
            });

            return mainHorizontalArticleApi().catch((error: unknown) => {
                const errorResponse = error as AxiosError;
                expect(errorResponse.response?.status).toEqual(500);
            });
        });
    })

    describe('Check editorsChoiceApi method', () => {
        it('test when response code is 200', () => {
            mock.onGet().reply(200, {
                result: true,
            });

            return editorsChoiceApi().then((response: any) => {
                expect(response).toBeInstanceOf(Object);
            });
        });
        it('test when response code is 500', () => {
            mock.onGet().reply(500, {
                error: 'Something Went Wrong',
            });

            return editorsChoiceApi().catch((error: unknown) => {
                const errorResponse = error as AxiosError;
                expect(errorResponse.response?.status).toEqual(500);
            });
        });
    })

    describe('Check spotlightApi method', () => {
        it('test when response code is 200', () => {
            mock.onGet().reply(200, {
                result: true,
            });

            return spotlightApi().then((response: any) => {
                expect(response).toBeInstanceOf(Object);
            });
        });
        it('test when response code is 500', () => {
            mock.onGet().reply(500, {
                error: 'Something Went Wrong',
            });

            return spotlightApi().catch((error: unknown) => {
                const errorResponse = error as AxiosError;
                expect(errorResponse.response?.status).toEqual(500);
            });
        });
    })

    describe('Check requestSpotlightArticleSection method', () => {
        const requestObject: SpotlightArticleSectionBodyGet = {
            id: 11,
            page: 1,
            items_per_page: 10
        };

        it('test when response code is 200', () => {
            cachedAxiosMock.onGet().reply(200, {
                result: true,
            });

            return requestSpotlightArticleSection(requestObject).then(response => {
                expect(response).toBeInstanceOf(Object);
            });
        }, 10000);
        it('test requestSpotlightArticleSection throws error', () => {
            const getCacheApiRequest = jest.spyOn(serviceApi, 'getCacheApiRequest');
            getCacheApiRequest.mockImplementationOnce(() => { throw new Error('Not able to fetch api') });

            return requestSpotlightArticleSection(requestObject).catch((error) => {
                expect(error.message).toEqual('Not able to fetch api')
            });
        });
    });

    describe('Check infoGraphicBlockApi method', () => {
        it('test when response code is 200', () => {
            cachedAxiosMock.onGet().reply(200, {
                result: true,
            });

            return infoGraphicBlockApi().then(response => {
                expect(response).toBeInstanceOf(Object);
            })
        });

        it('test infoGraphicBlockApi throws error', () => {
            const getCacheApiRequest = jest.spyOn(serviceApi, 'getCacheApiRequest');
            getCacheApiRequest.mockImplementationOnce(() => { throw new Error('Not able to fetch api') });

            return infoGraphicBlockApi().catch((error) => {
                expect(error.message).toEqual('Not able to fetch api')
            });
        });
    });

    describe('Check archivedArticleApi method', () => {
        it('test when response code is 200', () => {
            cachedAxiosMock.onGet().reply(200, {
                result: true,
            });

            return archivedArticleApi().then(response => {
                expect(response).toBeInstanceOf(Object);
            })
        });

        it('test archivedArticleApi throws error', () => {
            const getCacheApiRequest = jest.spyOn(serviceApi, 'getCacheApiRequest');
            getCacheApiRequest.mockImplementationOnce(() => { throw new Error('Not able to fetch api') });

            return archivedArticleApi().catch((error) => {
                expect(error.message).toEqual('Not able to fetch api')
            });
        });
    });
});