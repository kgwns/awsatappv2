import axios, { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { appleSignin } from '../appleSignin';

describe('Test Email Check Services', () => {
    const mock = new MockAdapter(axios);

    beforeEach(() => {
        jest.useFakeTimers('legacy');
    });

    afterEach(() => {
        mock.reset();
    });

    it('test when appleSignin response code is undefined', () => {
        mock.onPost().reply(undefined, {
            error: 'Something Went Wrong',
        });

        return appleSignin().catch((error: unknown) => {
            const errorResponse = error as AxiosError;
            expect(errorResponse.response?.status).toEqual(undefined);
            expect(console.log).toBeTruthy();
        });
    });
});