import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchMostReadApi } from 'src/services/mostReadService';
import * as serviceApi from 'src/services/api';
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
    it('test fetchMostReadApi throws error', () => {
        const getCacheApiRequest = jest.spyOn(serviceApi, 'getCacheApiRequest');
        getCacheApiRequest.mockImplementationOnce(() => { throw new Error('Not able to fetch api') });

        return fetchMostReadApi().catch((error) => {
            expect(error.message).toEqual('Not able to fetch api')
        });
    });
});