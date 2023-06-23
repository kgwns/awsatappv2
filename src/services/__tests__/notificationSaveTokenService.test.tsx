import axios, { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { notificationSaveTokenAfterRegistrationRequest, notificationSaveTokenRequest } from 'src/services/notificationSaveTokenService';
import { SaveTokenAfterRegistraionBodyType, SaveTokenBodyType } from 'src/redux/notificationSaveToken/types';

describe('Test notificationSaveTokenRequest Services', () => {

    const mock = new MockAdapter(axios);

    const bodyPayload1: SaveTokenBodyType = {
        fcm_token: 'sdfds456789gvbszsdfv',
        platform: 'android',
        device_name: 'iPhone 12'
    }

    const bodyPayload2: SaveTokenAfterRegistraionBodyType = {
        id: '21', 
        uid: 2
    }

    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
    })

    afterEach(() => {
        mock.reset();
    });

    it('test when response code is 200',() => {
        mock.onPost().reply(200,{
            result: true,
        });

        return notificationSaveTokenRequest(bodyPayload1).then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });

    it('test when response code is 404', () => {
        mock.onGet().reply(404, {
            error: 'Something Went Wrong',
        });

        return notificationSaveTokenRequest(bodyPayload1).catch((error: unknown) => {
            const errorResponse = error as AxiosError;
            expect(errorResponse.response?.status).toEqual(404);
        });
    });
    
    it('test when response code is 200',() => {
        mock.onPost().reply(200,{
            result: true,
        });

        return notificationSaveTokenAfterRegistrationRequest(bodyPayload2).then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });

    it('test when response code is 404', () => {
        mock.onGet().reply(404, {
            error: 'Something Went Wrong',
        });

        return notificationSaveTokenAfterRegistrationRequest(bodyPayload2).catch((error: unknown) => {
            const errorResponse = error as AxiosError;
            expect(errorResponse.response?.status).toEqual(404);
        });
    });


});