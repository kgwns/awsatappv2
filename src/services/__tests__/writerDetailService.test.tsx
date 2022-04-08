import axios, { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { WritersDetailBodyGet } from 'src/redux/writersDetail/types';
import { fetchWriterDetailInfo } from '../writerDetailService';

describe('Test Writer Detail Services', () => {
    const mock = new MockAdapter(axios);
    const payload: WritersDetailBodyGet = {
        tid: '12345'
    }

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

        return fetchWriterDetailInfo(payload).then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });

    it('test when response code is 500', () => {
        mock.onGet().reply(500, {
            error: 'Something Went Wrong',
        });

        return fetchWriterDetailInfo(payload).catch((error: unknown) => {
            const errorResponse = error as AxiosError;
            expect(errorResponse.response?.status).toEqual(500);
        });
    });
});