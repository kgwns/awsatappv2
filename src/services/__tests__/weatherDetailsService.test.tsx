import axios, { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchWeatherDetailsService, fetchWeatherDetailVisibilityService } from 'src/services/weatherDetailsService';
import { WeatherDetailBodyType } from 'src/redux/weatherDetails/types';

describe('Test Weather Detail Services', () => {
    const mock = new MockAdapter(axios);

    const requestObject: WeatherDetailBodyType = {
      lat: 20,
      lon: 20
    };

    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
    });

    afterEach(() => {
        mock.reset();
    });

    it('test when response code is 200', () => {
        mock.onGet().reply(200, {
            result: true,
        });

        return fetchWeatherDetailsService(requestObject).then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });

    it('test when response code is 500', () => {
        mock.onGet().reply(500, {
            error: 'Something Went Wrong',
        });

        return fetchWeatherDetailsService(requestObject).catch((error: unknown) => {
            const errorResponse = error as AxiosError;
            expect(errorResponse.response?.status).toEqual(500);
        });
    });

    it('test when response code is 200', () => {
        mock.onGet().reply(200, {
            result: true,
        });

        return fetchWeatherDetailVisibilityService(requestObject).then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });
    
    it('test when response code is 500', () => {
        mock.onGet().reply(500, {
            error: 'Something Went Wrong',
        });

        return fetchWeatherDetailVisibilityService(requestObject).catch((error: unknown) => {
            const errorResponse = error as AxiosError;
            expect(errorResponse.response?.status).toEqual(500);
        });
    });
});