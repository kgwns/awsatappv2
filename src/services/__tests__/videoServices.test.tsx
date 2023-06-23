import axios, { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { RequestVideoUrlPayload } from 'src/redux/videoList/types';
import { fetchVideoDetailInfo } from '../VideoServices';

describe('Test Video Services', () => {
    const mock = new MockAdapter(axios);

    const body: RequestVideoUrlPayload = {
        mediaID: '12345'
    }

    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
    });

    afterEach(() => {
        mock.reset();
    });

    it('test when response code is 200', () => {
        mock.onGet().reply(200, {
            result: true,
        });

        return fetchVideoDetailInfo(body).then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });

    it('test when response code is 500', () => {
        mock.onGet().reply(500, {
            error: 'Something Went Wrong',
        });

        return fetchVideoDetailInfo(body).catch((error: unknown) => {
            const errorResponse = error as AxiosError;
            expect(errorResponse.response?.status).toEqual(500);
        });
    });
});