import axios, { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { registerUser } from 'src/services/registerService';
import { RegisterBodyType } from 'src/redux/register/types';


describe('Test register Services', () => {
    const mock = new MockAdapter(axios);
    const mockString = 'mockString';
    const requestBodyObject: RegisterBodyType = {
      name: '',
      email: mockString,
      password: mockString,
      device_name: mockString,
    };
    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
    })
    afterEach(() => {
        mock.reset();
    });
    it('test when response code is 200', () => {
        mock.onPost().reply(200, {
            result: true,
        });

        return registerUser(requestBodyObject).then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });
    it('test when response code is 500', () => {
        mock.onPost().reply(500, {
            error: 'Something Went Wrong',
        });

        return registerUser(requestBodyObject).catch((error: unknown) => {
            const errorResponse = error as AxiosError;
            expect(errorResponse.response?.status).toEqual(500);
        });
    });
});