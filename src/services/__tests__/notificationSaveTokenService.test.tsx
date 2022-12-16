import axios, { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { notificationSaveTokenAfterRegistraionReuqest, notificationSaveTokenReuqest } from 'src/services/notificationSaveTokenService';
import { SaveTokenAfterRegistraionBodyType, SaveTokenBodyType } from 'src/redux/notificationSaveToken/types';

describe('Test notificationSaveTokenReuqest Services', () => {

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
        jest.useFakeTimers('legacy');
    })

    afterEach(() => {
        mock.reset();
    });

    it('test when response code is 200',() => {
        mock.onPost().reply(200,{
            result: true,
        });

        return notificationSaveTokenReuqest(bodyPayload1).then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });

    it('test when response code is 404', () => {
        mock.onGet().reply(404, {
            error: 'Something Went Wrong',
        });

        return notificationSaveTokenReuqest(bodyPayload1).catch((error: unknown) => {
            const errorResponse = error as AxiosError;
            expect(errorResponse.response?.status).toEqual(404);
        });
    });
    
    it('test when response code is 200',() => {
        mock.onPost().reply(200,{
            result: true,
        });

        return notificationSaveTokenAfterRegistraionReuqest(bodyPayload2).then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });

    it('test when response code is 404', () => {
        mock.onGet().reply(404, {
            error: 'Something Went Wrong',
        });

        return notificationSaveTokenAfterRegistraionReuqest(bodyPayload2).catch((error: unknown) => {
            const errorResponse = error as AxiosError;
            expect(errorResponse.response?.status).toEqual(404);
        });
    });


});