import axios, { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { SendSelectedNotificationBody } from 'src/redux/keepNotified/types';
import { getSelectedNotificationService, sendSelectedNotificationService, getListOfNotificationService } from '../keepNotificationService';

describe('Test Keep Notification Services', () => {
    const mock = new MockAdapter(axios);

    const body: SendSelectedNotificationBody = {
        nid: '123'
    }

    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
    });

    afterEach(() => {
        mock.reset();
    });

    it('test when sendSelectedNotificationService response code is 200', () => {
        mock.onPost().reply(200, {
            result: true,
        });

        return sendSelectedNotificationService(body).then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });
    it('test when sendSelectedNotificationService response code is 500', () => {
        mock.onPost().reply(500, {
            error: 'Something Went Wrong',
        });

        return sendSelectedNotificationService(body).catch((error: unknown) => {
            const errorResponse = error as AxiosError;
            expect(errorResponse.response?.status).toEqual(500);
        });
    });
    it('test when getSelectedNotificationService response code is 200', () => {
        mock.onPost().reply(200, {
            result: true,
        });

        return getSelectedNotificationService().then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });
    it('test when sendSelectedNotificationService response code is 500', () => {
        mock.onPost().reply(500, {
            error: 'Something Went Wrong',
        });

        return getSelectedNotificationService().catch((error: unknown) => {
            const errorResponse = error as AxiosError;
            expect(errorResponse.response?.status).toEqual(500);
        });
    });
    it('test when getListOfNotificationService response code is 200', () => {
        mock.onGet().reply(200, {
            result: true,
        });

        return getListOfNotificationService().then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });

    it('test when getListOfNotificationService response code is 500', () => {
        mock.onGet().reply(500, {
            error: 'Something Went Wrong',
        });

        return getListOfNotificationService().catch((error: unknown) => {
            const errorResponse = error as AxiosError;
            expect(errorResponse.response?.status).toEqual(500);
        });
    });
});