import axios, { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchAllWritersApi, getSelectedAuthorsApi, sendSelectedWritersApi, removeWritersApi, fetchAllSelectedWritersDataApi } from 'src/services/allWritersService';
import { AllSelectedWritersDetailsBodyGet, AllWritersBodyGet, RemoveAuthorBody, SendSelectedAuthorBody } from 'src/redux/allWriters/types';

describe('Test All Writers Services', () => {
    const mock = new MockAdapter(axios);
    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
    })
    afterEach(() => {
        mock.reset();
    });
    const requestObject: AllWritersBodyGet = {
        items_per_page: 50
    };
    const requesSendSelectedAuthortObject: SendSelectedAuthorBody = {
        tid: '123',
        isList: true,
    };
    const requestremoveWritersObject: RemoveAuthorBody = {
        tid: '12345'
    }
    const requestAllSelectedWritersDataObject: AllSelectedWritersDetailsBodyGet = {
        tid: '12345',
        items_per_page: 100,
    }
    it('test when fetchAllWritersApi response code is 200', () => {
        mock.onGet().reply(200, {
            result: true,
        });

        return fetchAllWritersApi(requestObject).then(response => {
            console.log(`response: ${JSON.stringify(response)}`);
            expect(response).toBeInstanceOf(Object);
        });
    });
    it('test when fetchAllWritersApi response code is 500', () => {
        mock.onGet().reply(500, {
            error: 'Something Went Wrong',
        });

        return fetchAllWritersApi(requestObject).catch((error: unknown) => {
            const errorResponse = error as AxiosError;
            expect(errorResponse.response?.status).toEqual(500);
        });
    });
    it('test when sendSelectedWritersApi response code is 200', () => {
        mock.onPost().reply(200, {
            result: true,
        });

        return sendSelectedWritersApi(requesSendSelectedAuthortObject).then(response => {
            console.log(`response: ${JSON.stringify(response)}`);
            expect(response).toBeInstanceOf(Object);
        });
    });
    it('test when sendSelectedWritersApi response code is 500', () => {
        mock.onPost().reply(500, {
            error: 'Something Went Wrong',
        });

        return sendSelectedWritersApi(requesSendSelectedAuthortObject).catch((error: unknown) => {
            const errorResponse = error as AxiosError;
            expect(errorResponse.response?.status).toEqual(500);
        });
    });
    it('test when getSelectedAuthorsApi response code is 200', () => {
        mock.onPost().reply(200, {
            result: true,
        });

        return getSelectedAuthorsApi().then(response => {
            console.log(`response: ${JSON.stringify(response)}`);
            expect(response).toBeInstanceOf(Object);
        });
    });
    it('test when getSelectedAuthorsApi response code is 500', () => {
        mock.onPost().reply(500, {
            error: 'Something Went Wrong',
        });

        return getSelectedAuthorsApi().catch((error: unknown) => {
            const errorResponse = error as AxiosError;
            expect(errorResponse.response?.status).toEqual(500);
        });
    });
    it('test when removeWritersApi response code is 200', () => {
        mock.onPost().reply(200, {
            result: true,
        });

        return removeWritersApi(requestremoveWritersObject).then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });

    it('test when removeWritersApi response code is 500', () => {
        mock.onPost().reply(500, {
            error: 'Something Went Wrong',
        });

        return removeWritersApi(requestremoveWritersObject).catch((error: unknown) => {
            const errorResponse = error as AxiosError;
            expect(errorResponse.response?.status).toEqual(500);
        });
    });
    it('test when fetchAllSelectedWritersDataApi response code is 200', () => {
        mock.onGet().reply(200, {
            result: true,
        });

        return fetchAllSelectedWritersDataApi(requestAllSelectedWritersDataObject).then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });

    it('test when fetchAllSelectedWritersDataApi response code is 500', () => {
        mock.onGet().reply(500, {
            error: 'Something Went Wrong',
        });

        return fetchAllSelectedWritersDataApi(requestAllSelectedWritersDataObject).catch((error: unknown) => {
            const errorResponse = error as AxiosError;
            expect(errorResponse.response?.status).toEqual(500);
        });
    });
});