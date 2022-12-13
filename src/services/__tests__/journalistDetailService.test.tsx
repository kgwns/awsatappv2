import axios, { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchJournalistDetailInfo } from '../journalistDetailService';
import * as serviceApi from 'src/services/api'; 
describe('Test Side Menu Services', () => {
    const mock = new MockAdapter(axios);
    const journalistPayload = { tid: '1' };
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

        return fetchJournalistDetailInfo(journalistPayload).then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });

    it('test fetchJournalistDetailInfo throws error', () => {
        const getCacheApiRequest = jest.spyOn(serviceApi,'getCacheApiRequest');
        getCacheApiRequest.mockImplementationOnce(()=>{throw new Error('Not able to fetch api')});

        return fetchJournalistDetailInfo(journalistPayload).catch((error) => {
            expect(error.message).toEqual('Not able to fetch api')
        });
    });
});
