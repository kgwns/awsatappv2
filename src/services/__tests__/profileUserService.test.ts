import axios, { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { SendUserData } from 'src/redux/profileUserDetail/types';
import { fetchUserProfileApi, sendUserProfileApi } from '../profileUserService';

describe('Test Profile User Services', () => {
    const mock = new MockAdapter(axios);

    const bodyUserData: SendUserData = {
        email: 'email'
    }

    beforeEach(() => {
        jest.useFakeTimers('legacy');
    });

    afterEach(() => {
        mock.reset();
    });

    it('test when fetchUserProfileApi response code is 200', () => {
        mock.onPost().reply(200, {
            result: true,
        });

        return fetchUserProfileApi().then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });
    it('test when fetchUserProfileApi response code is 500', () => {
        mock.onPost().reply(500, {
            error: 'Something Went Wrong',
        });

        return fetchUserProfileApi().catch((error: unknown) => {
            const errorResponse = error as AxiosError;
            expect(errorResponse.response?.status).toEqual(500);
        });
    });
    it('test when sendUserProfileApi response code is 200', () => {
        mock.onPost().reply(200, {
            result: true,
        });

        return sendUserProfileApi(bodyUserData).then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });
    it('test when sendUserProfileApi response code is 500', () => {
        mock.onPost().reply(500, {
            error: 'Something Went Wrong',
        });

        return sendUserProfileApi(bodyUserData).catch((error: unknown) => {
            const errorResponse = error as AxiosError;
            expect(errorResponse.response?.status).toEqual(500);
        });
    });
});