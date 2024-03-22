import MockAdapter from 'axios-mock-adapter';
import { fetchMostReadApi } from 'src/services/mostReadService';
import * as serviceApi from 'src/services/api';
describe('Test Most Read Services', () => {
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

        return fetchMostReadApi().then(response => {
            console.log(`response: ${JSON.stringify(response)}`);
            expect(response).toBeInstanceOf(Object);
        });
    });
    it('test fetchMostReadApi throws error', () => {
        const getCacheApiRequest = jest.spyOn(serviceApi, 'getCacheApiRequest');
        getCacheApiRequest.mockImplementationOnce(() => { throw new Error('Not able to fetch api') });

        return fetchMostReadApi().catch((error) => {
            expect(error.message).toEqual('Not able to fetch api')
        });
    });
});