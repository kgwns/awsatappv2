import axios, { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { FetchEmailCheckPayloadType } from 'src/redux/auth/types';
import { fetchEmailCheckApi } from '../emailCheckService';

describe('Test Email Check Services', () => {
    const mock = new MockAdapter(axios);

    const body: FetchEmailCheckPayloadType = {
        email: 'awsat@awsat.com'
    }

    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
    });

    afterEach(() => {
        mock.reset();
    });

    it('test when fetchEmailCheckApi response code is 200', () => {
        mock.onPost().reply(200, {
            result: true,
        });

        return fetchEmailCheckApi(body).then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });

    it('test when fetchEmailCheckApi response code is 500', () => {
        mock.onPost().reply(500, {
            error: 'Something Went Wrong',
        });

        return fetchEmailCheckApi(body).catch((error: unknown) => {
            const errorResponse = error as AxiosError;
            expect(errorResponse.response?.status).toEqual(500);
        });
    });
});