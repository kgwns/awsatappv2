import axios, { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getJournalistArticleService } from '../journalistService';

describe('Test Side Menu Services', () => {
    const mock = new MockAdapter(axios);
    const journalistPayload = { nid: '1', page: 1 };
    beforeEach(() => {
        jest.useFakeTimers('legacy');
    });

    afterEach(() => {
        mock.reset();
    });

    it('test when response code is 200', () => {
        mock.onGet().reply(200, {
            result: true,
        });

        return getJournalistArticleService(journalistPayload).then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });

    it('test when response code is 500', () => {
        mock.onGet().reply(500, {
            error: 'Something Went Wrong',
        });

        return getJournalistArticleService(journalistPayload).catch((error: unknown) => {
            const errorResponse = error as AxiosError;
            expect(errorResponse.response?.status).toEqual(500);
        });
    });
});
