import axios, { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { FetchLoginPayloadType, ForgotPasswordRequestPayloadType } from 'src/redux/login/types';
import { fetchLoginApi, fetchLogoutApi, forgotPasswordApi } from '../loginService';

describe('Test login Services', () => {
    const mock = new MockAdapter(axios);

    const bodyFetchLoginPayload: FetchLoginPayloadType = {
        email: 'awsat@awsat.com',
        password: '#Awsat01',
        device_name: 'Iphone',
    }

    const bodyForgotPassword: ForgotPasswordRequestPayloadType = {
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

    it('test when fetchLoginApi response code is 200', () => {
        mock.onPost().reply(200, {
            result: true,
        });

        return fetchLoginApi(bodyFetchLoginPayload).then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });

    it('test when fetchLoginApi response code is 500', () => {
        mock.onPost().reply(500, {
            error: 'Something Went Wrong',
        });

        return fetchLoginApi(bodyFetchLoginPayload).catch((error: unknown) => {
            const errorResponse = error as AxiosError;
            expect(errorResponse.response?.status).toEqual(500);
        });
    });
    it('test when fetchLogoutApi response code is 200', () => {
        mock.onPost().reply(200, {
            result: true,
        });

        return fetchLogoutApi().then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });
    it('test when fetchLogoutApi response code is 500', () => {
        mock.onPost().reply(500, {
            error: 'Something Went Wrong',
        });

        return fetchLogoutApi().catch((error: unknown) => {
            const errorResponse = error as AxiosError;
            expect(errorResponse.response?.status).toEqual(500);
        });
    });
    it('test when forgotPasswordApi response code is 200', () => {
        mock.onPost().reply(200, {
            result: true,
        });

        return forgotPasswordApi(bodyForgotPassword).then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });
    it('test when forgotPasswordApi response code is 500', () => {
        mock.onPost().reply(500, {
            error: 'Something Went Wrong',
        });

        return forgotPasswordApi(bodyForgotPassword).catch((error: unknown) => {
            const errorResponse = error as AxiosError;
            expect(errorResponse.response?.status).toEqual(500);
        });
    });
});