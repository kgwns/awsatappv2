import axios, { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchSearchApi } from 'src/services/searchService';
import { FetchSearchRequestPayloadType } from 'src/redux/search/types'

describe('Test Search Services', () => {
    const mock = new MockAdapter(axios);
    const requestObject: FetchSearchRequestPayloadType = {
      searchText: 'search-text',
    };
    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
    })
    afterEach(() => {
        mock.reset();
    });
    it('test when response code is 200', () => {
        mock.onGet().reply(200, {
            result: true,
        });

        return fetchSearchApi(requestObject).then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });
    it('test when response code is 500', () => {
        mock.onGet().reply(500, {
            error: 'Something Went Wrong',
        });

        return fetchSearchApi(requestObject).catch((error: unknown) => {
            const errorResponse = error as AxiosError;
            expect(errorResponse.response?.status).toEqual(500);
        });
    });
});