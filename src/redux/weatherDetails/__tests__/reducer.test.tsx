import { WeatherDetailFailed, WeatherDetailSuccess, WeatherDetailVisibilityFailed, WeatherDetailVisibilitySuccess} from '../action';
import {GET_WEATHER_DETAILS_REQUEST, GET_WEATHER_DETAILS_VISIBILITY_REQUEST} from '../actionType';
import weatherDetails from '../reducer';
import {WeatherDetailState} from '../types';

describe('WeatherDetail reducer', () => {
  let initialState: WeatherDetailState;
  const mockString = 'example';
  const mockNumber = 20;

  beforeEach(() => {
    initialState = {
      WeatherDetailInfo: null,
      WeatherDetailVisibilityInfo: null,
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
            id: mockNumber,
            name: mockString,
            country: mockString,
            timezone: mockNumber,
        },
        cod: mockString,
        cnt: mockNumber,
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
        lat: mockNumber,
        lon: mockNumber
      }
    });
    expect(nextState.isLoading).toBe(true);
  });


  test('WeatherDetailVisibilitySuccess', () => {
    initialState.isLoading = true;
    const nextState = weatherDetails(
      initialState,
      WeatherDetailVisibilitySuccess({
        visibility: mockNumber
      }),
    );

    expect(nextState.isLoading).toBeFalsy();
  });

  test('WeatherDetailVisibilityFailed', () => {
    const testError = 'some-error';
    initialState.isLoading = true;
    const nextState = weatherDetails(
      initialState,
      WeatherDetailVisibilityFailed({
        error: testError,
      }),
    );

    expect(nextState.isLoading).toBeFalsy();
    expect(nextState.error).toEqual(testError);
  });

  test('Check loading state when weatherDetails GET_WEATHER_DETAILS_VISIBILITY_REQUEST request API', () => {
    const nextState = weatherDetails(initialState, {
      type: GET_WEATHER_DETAILS_VISIBILITY_REQUEST,
      payload: {
        lat: mockNumber,
        lon: mockNumber
      }
    });
    expect(nextState.isLoading).toBe(true);
  });
  
  test('Default State', () => {
    const nextState = weatherDetails(
      initialState, { type:'' }
    )
    expect(nextState.isLoading).toBe(false)
  })
});
