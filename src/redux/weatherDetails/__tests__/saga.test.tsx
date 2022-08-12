import {takeLatest} from 'redux-saga/effects';
import {testSaga} from 'redux-saga-test-plan';
import {GET_WEATHER_DETAILS_REQUEST,GET_WEATHER_DETAILS_VISIBILITY_REQUEST} from '../actionType';
import WeatherDetailSaga, {getWeatherDetail,getWeatherDetailVisibility} from '../sagas';
import {WeatherDetailSuccess} from '../action';
import { fetchWeatherDetailsService } from 'src/services/weatherDetailsService';
import { WeatherDetailSuccessPayloadType, WeatherDetailType} from '../types';

const errorResponse = {
  response: {data: 'Error', status: 500, statusText: 'Error'},
};

const sucessResponseObject: WeatherDetailSuccessPayloadType = {
  city: {
    id: 12,
    name: 'string',
    country: 'string',
    timezone: 12,
  },
  cod: 'string',
  cnt: 7,
  list: [],
};

const weatherType: WeatherDetailType = {
  type: GET_WEATHER_DETAILS_REQUEST,
  payload: {
    lat: 12.00, lon:17.00
  }
};

describe('Test most Read  saga', () => {
  it('fire on WeatherDetailSaga', () => {
    testSaga(WeatherDetailSaga)
      .next()
      .all([
        takeLatest(GET_WEATHER_DETAILS_REQUEST, getWeatherDetail),
        takeLatest(GET_WEATHER_DETAILS_VISIBILITY_REQUEST, getWeatherDetailVisibility)
      ])
      .finish()
      .isDone();
  });
});

describe('Test most read success', () => {
  it('fire on FETCH_MOST_READ', () => {
    testSaga(getWeatherDetail, weatherType)
      .next()
      .call(fetchWeatherDetailsService, weatherType.payload)
      .next(sucessResponseObject)
      .put(WeatherDetailSuccess(sucessResponseObject))
      .finish()
      .isDone();
  });
});

describe('Test fetchWeatherDetailsService  error', () => {
  it('check fetchWeatherDetailsService failed', () => {
    const genObject = getWeatherDetail(weatherType);
    genObject.next();
    genObject.throw(errorResponse);
  });
});
