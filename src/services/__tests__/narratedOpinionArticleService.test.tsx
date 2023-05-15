import axios, { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { NarratedOpinionBodyGet } from 'src/redux/opinionArticleDetail/types';
import { fetchNarratedOpinionArticleApi } from '../narratedOpinionArticleService';

describe('Test Narrated Opinion Article Services', () => {
    const mock = new MockAdapter(axios);
    const payload: NarratedOpinionBodyGet = {
        jwPlayerID: '12345'
    }

    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
    });

    afterEach(() => {
        mock.reset();
    });

    it('test when response code is 200', () => {
        mock.onGet().reply(200, {
            result: true,
        });

        return fetchNarratedOpinionArticleApi(payload).then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });

    it('test when response code is 500', () => {
        mock.onGet().reply(500, {
            error: 'Something Went Wrong',
        });

        return fetchNarratedOpinionArticleApi(payload).catch((error: unknown) => {
            const errorResponse = error as AxiosError;
            expect(errorResponse.response?.status).toEqual(500);
        });
    });
});