import axios, { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchAllWritersApi } from 'src/services/allWritersService';
import { AllWritersBodyGet } from 'src/redux/allWriters/types';

describe('Test All Writers Services', () => {
    const mock = new MockAdapter(axios);
    beforeEach(() => {
        jest.useFakeTimers('legacy');
    })
    afterEach(() => {
        mock.reset();
    });
    const requestObject: AllWritersBodyGet = {
        items_per_page: 50
    };
    it('test when response code is 200', () => {
        mock.onGet().reply(200, {
            result: true,
        });

        return fetchAllWritersApi(requestObject).then(response => {
            console.log(`response: ${JSON.stringify(response)}`);
            expect(response).toBeInstanceOf(Object);
        });
    });
    it('test when response code is 500', () => {
        mock.onGet().reply(500, {
            error: 'Something Went Wrong',
        });

        return fetchAllWritersApi(requestObject).catch((error: unknown) => {
            const errorResponse = error as AxiosError;
            expect(errorResponse.response?.status).toEqual(500);
        });
    });
});