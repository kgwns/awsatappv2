import axios, { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { SendContactUsInfoPayload } from 'src/redux/contactUs/types';
import { sendContactUsService } from '../contactUsService';

describe('Test Email Check Services', () => {
    const mock = new MockAdapter(axios);

    const body: SendContactUsInfoPayload = {
        email: 'awsat@awsat.com',
        name: 'abc',
        msg: 'string',
    }

    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
    });

    afterEach(() => {
        mock.reset();
    });

    it('test when sendContactUsService response code is 200', () => {
        mock.onPost().reply(200, {
            result: true,
        });

        return sendContactUsService(body).then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });

    it('test when sendContactUsService response code is 500', () => {
        mock.onPost().reply(500, {
            error: 'Something Went Wrong',
        });

        return sendContactUsService(body).catch((error: unknown) => {
            const errorResponse = error as AxiosError;
            expect(errorResponse.response?.status).toEqual(500);
        });
    });
});