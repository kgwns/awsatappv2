import { WeatherDetailFailed, WeatherDetailSuccess} from '../action';
import {GET_WEATHER_DETAILS_REQUEST} from '../actionType';
import weatherDetails from '../reducer';
import {WeatherDetailState} from '../types';

describe('WeatherDetail reducer', () => {
  let initialState: WeatherDetailState;

  beforeEach(() => {
    initialState = {
      WeatherDetailInfo: null,
      error: '',
      isLoading: false,
    };
  });

  test('WeatherDetailSuccess', () => {
    initialState.isLoading = true;
    const nextState = weatherDetails(
      initialState,
      WeatherDetailSuccess({
          city: {
            id: 12,
            name: 'string',
            country: 'string',
            timezone: 12,
        },
        cod: 'string',
        cnt: 7,
        list: [],
      }),
    );

    expect(nextState.isLoading).toBeFalsy();
  });

  test('WeatherDetailFailed', () => {
    const testError = 'some-error';
    initialState.isLoading = true;
    const nextState = weatherDetails(
      initialState,
      WeatherDetailFailed({
        error: testError,
      }),
    );

    expect(nextState.isLoading).toBeFalsy();
    expect(nextState.error).toEqual(testError);
  });

  test('Check loading state when weatherDetails GET_WEATHER_DETAILS_REQUEST request API', () => {
    const nextState = weatherDetails(initialState, {
      type: GET_WEATHER_DETAILS_REQUEST,
      payload: {
        lat: 12.00,
        lon: 17.00
      }
    });
    expect(nextState.isLoading).toBe(true);
  });
});
