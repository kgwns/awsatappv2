import MockAdapter from 'axios-mock-adapter';
import { WritersDetailBodyGet } from 'src/redux/writersDetail/types';
import { fetchWriterDetailInfo } from '../writerDetailService';
import * as serviceApi from 'src/services/api';
describe('Test Writer Detail Services', () => {
    const cachedAxiosMock = new MockAdapter(serviceApi.apiWithCache);

    const payload: WritersDetailBodyGet = {
        tid: '12345'
    }

    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
    });

    afterEach(() => {
        cachedAxiosMock.reset();
    });

    it('test when response code is 200', () => {
        cachedAxiosMock.onGet().reply(200, {
            result: true,
        });

        return fetchWriterDetailInfo(payload).then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });

    it('test when fetchWriterDetailInfo throws error', () => {
        const getCacheApiRequest = jest.spyOn(serviceApi, 'getCacheApiRequest');
        getCacheApiRequest.mockImplementationOnce(() => { throw new Error('Not able to fetch api') });

        return fetchWriterDetailInfo(payload).catch((error) => {
            expect(error.message).toEqual('Not able to fetch api');
        });
    });
});