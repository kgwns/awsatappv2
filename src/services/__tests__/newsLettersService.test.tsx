import axios, { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { SendSelectedNewsLettersBody } from 'src/redux/newsLetter/types';
import { getSelectedNewsLettersApi, sendSelectedNewsLettersApi } from '../newsLettersService';

describe('Test News Letters Services', () => {
    const mock = new MockAdapter(axios);

    const body: SendSelectedNewsLettersBody = {
        tid: '123'
    }

    beforeEach(() => {
        jest.useFakeTimers('legacy');
    });

    afterEach(() => {
        mock.reset();
    });

    it('test when sendSelectedNewsLettersApi response code is 200', () => {
        mock.onPost().reply(200, {
            result: true,
        });

        return sendSelectedNewsLettersApi(body).then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });
    it('test when sendSelectedNewsLettersApi response code is 500', () => {
        mock.onPost().reply(500, {
            error: 'Something Went Wrong',
        });

        return sendSelectedNewsLettersApi(body).catch((error: unknown) => {
            const errorResponse = error as AxiosError;
            expect(errorResponse.response?.status).toEqual(500);
        });
    });
    it('test when getSelectedNewsLettersApi response code is 200', () => {
        mock.onPost().reply(200, {
            result: true,
        });

        return getSelectedNewsLettersApi().then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });
    it('test when getSelectedNewsLettersApi response code is 500', () => {
        mock.onPost().reply(500, {
            error: 'Something Went Wrong',
        });

        return getSelectedNewsLettersApi().catch((error: unknown) => {
            const errorResponse = error as AxiosError;
            expect(errorResponse.response?.status).toEqual(500);
        });
    });
});