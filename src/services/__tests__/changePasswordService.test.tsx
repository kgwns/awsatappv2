import axios, { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { SendNewPassword } from 'src/redux/changePassword/types';
import { changePasswordApi } from '../changePasswordService';

describe('Test Change Password Services', () => {
    const mock = new MockAdapter(axios);

    const body: SendNewPassword = {
        password: '#Awsat01',
        old_password: '#Awsat01'
    }

    beforeEach(() => {
        jest.useFakeTimers({
        legacyFakeTimers: true
});
    });

    afterEach(() => {
        mock.reset();
    });

    it('test when changePasswordApi response code is 200', () => {
        mock.onPost().reply(200, {
            result: true,
        });

        return changePasswordApi(body).then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });

    it('test when changePasswordApi response code is 500', () => {
        mock.onPost().reply(500, {
            error: 'Something Went Wrong',
        });

        return changePasswordApi(body).catch((error: unknown) => {
            const errorResponse = error as AxiosError;
            expect(errorResponse.response?.status).toEqual(500);
        });
    });
});