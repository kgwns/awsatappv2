import MockAdapter from 'axios-mock-adapter';
import { fetchVideoListApi } from 'src/services/videoListService';
import * as serviceApi from 'src/services/api';
describe('Test VideoList Services', () => {
    const cachedAxiosMock = new MockAdapter(serviceApi.apiWithCache);

    const requestBody = {items_per_page: 10, page: 0}
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

        return fetchVideoListApi(requestBody).then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });
    it('test fetchVideoListApi throws error', () => {
        const getCacheApiRequest = jest.spyOn(serviceApi, 'getCacheApiRequest');
        getCacheApiRequest.mockImplementationOnce(() => { throw new Error('Not able to fetch api') });

        return fetchVideoListApi(requestBody).catch((error) => {
            expect(error.message).toEqual('Not able to fetch api');
        });
    });
});