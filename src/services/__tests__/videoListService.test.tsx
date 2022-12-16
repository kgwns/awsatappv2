import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchVideoListApi } from 'src/services/videoListService';
import * as serviceApi from 'src/services/api';
describe('Test VideoList Services', () => {
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

        return fetchVideoListApi().then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });
    it('test fetchVideoListApi throws error', () => {
        const getCacheApiRequest = jest.spyOn(serviceApi, 'getCacheApiRequest');
        getCacheApiRequest.mockImplementationOnce(() => { throw new Error('Not able to fetch api') });

        return fetchVideoListApi().catch((error) => {
            expect(error.message).toEqual('Not able to fetch api');
        });
    });
});