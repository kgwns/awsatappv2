import axios, { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchAllSiteCategoriesApi, getSelectedTopicsApi, sendSelectedTopicsApi } from 'src/services/allSiteCategoriesService';
import { AllSiteCategoriesBodyGet, SendSelectedTopicBody } from 'src/redux/allSiteCategories/types';

describe('Test AllSiteCategories Services', () => {
    const mock = new MockAdapter(axios);
    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
    })
    afterEach(() => {
        mock.reset();
    });
    const requestObject: AllSiteCategoriesBodyGet = {
        items_per_page: 50
    };

    const requestsendSelectedTopicsObject: SendSelectedTopicBody = {
        tid: '123'
    };
    it('test when fetchAllSiteCategoriesApi response code is 200', () => {
        mock.onGet().reply(200, {
            result: true,
        });

        return fetchAllSiteCategoriesApi(requestObject).then(response => {
            console.log(`response: ${JSON.stringify(response)}`);
            expect(response).toBeInstanceOf(Object);
        });
    });
    it('test when fetchAllSiteCategoriesApi response code is 500', () => {
        mock.onGet().reply(500, {
            error: 'Something Went Wrong',
        });

        return fetchAllSiteCategoriesApi(requestObject).catch((error: unknown) => {
            const errorResponse = error as AxiosError;
            expect(errorResponse.response?.status).toEqual(500);
        });
    });
    it('test when sendSelectedTopicsApi response code is 200', () => {
        mock.onPost().reply(200, {
            result: true,
        });

        return sendSelectedTopicsApi(requestsendSelectedTopicsObject).then(response => {
            console.log(`response: ${JSON.stringify(response)}`);
            expect(response).toBeInstanceOf(Object);
        });
    });
    it('test when sendSelectedTopicsApi response code is 500', () => {
        mock.onPost().reply(500, {
            error: 'Something Went Wrong',
        });

        return sendSelectedTopicsApi(requestsendSelectedTopicsObject).catch((error: unknown) => {
            const errorResponse = error as AxiosError;
            expect(errorResponse.response?.status).toEqual(500);
        });
    });
    it('test when getSelectedTopicsApi response code is 200', () => {
        mock.onPost().reply(200, {
            result: true,
        });

        return getSelectedTopicsApi().then(response => {
            console.log(`response: ${JSON.stringify(response)}`);
            expect(response).toBeInstanceOf(Object);
        });
    });
    it('test when getSelectedTopicsApi response code is 500', () => {
        mock.onPost().reply(500, {
            error: 'Something Went Wrong',
        });

        return getSelectedTopicsApi().catch((error: unknown) => {
            const errorResponse = error as AxiosError;
            expect(errorResponse.response?.status).toEqual(500);
        });
    });
});