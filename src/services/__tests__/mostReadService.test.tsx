import axios, { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchMostReadApi } from 'src/services/mostReadService';

describe('Test Most Read Services', () => {
    const mock = new MockAdapter(axios);
    beforeEach(() => {
        jest.useFakeTimers('legacy');
    })
    afterEach(() => {
        mock.reset();
    });
    it('test when response code is 200', () => {
        mock.onGet().reply(200, {
            result: true,
        });

        return fetchMostReadApi().then(response => {
            console.log(`response: ${JSON.stringify(response)}`);
            expect(response).toBeInstanceOf(Object);
        });
    });
    it('test when response code is 500', () => {
        mock.onGet().reply(500, {
            error: 'Something Went Wrong',
        });

        return fetchMostReadApi().catch((error: unknown) => {
            const errorResponse = error as AxiosError;
            expect(errorResponse.response?.status).toEqual(500);
        });
    });
});