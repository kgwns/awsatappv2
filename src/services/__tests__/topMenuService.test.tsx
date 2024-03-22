import MockAdapter from 'axios-mock-adapter';
import { fetchTopMenuApi } from 'src/services/topMenuService';
import * as serviceApi from 'src/services/api';
describe('Test TopMenu Services', () => {
    const cachedAxiosMock = new MockAdapter(serviceApi.apiWithCache);

    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
    })
    afterEach(() => {
        cachedAxiosMock.reset();
    });
    it('test when response code is 200', () => {
        cachedAxiosMock.onGet().reply(200, {
            result: true,
        });

        return fetchTopMenuApi().then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });
    it('test when fetchTopMenuApi throws error', () => {
        const getCacheApiRequest = jest.spyOn(serviceApi, 'getCacheApiRequest');
        getCacheApiRequest.mockImplementationOnce(() => { throw new Error('Not able to fetch api') });

        return fetchTopMenuApi().catch((error) => {
            expect(error.message).toEqual('Not able to fetch api');
        });
    });
});