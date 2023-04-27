import {takeLatest} from 'redux-saga/effects';
import {testSaga} from 'redux-saga-test-plan';
import {GET_WEATHER_DETAILS_REQUEST,GET_WEATHER_DETAILS_VISIBILITY_REQUEST} from '../actionType';
import WeatherDetailSaga, {getWeatherDetail,getWeatherDetailVisibility} from '../sagas';
import {WeatherDetailSuccess, WeatherDetailVisibilitySuccess} from '../action';
import { fetchWeatherDetailsService, fetchWeatherDetailVisibilityService } from 'src/services/weatherDetailsService';
import { WeatherDetailSuccessPayloadType, WeatherDetailType, WeatherDetailVisibilitySuccessPayloadType, WeatherDetailVisibilityType} from '../types';

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

const sucessVisibilityResponseObject: WeatherDetailVisibilitySuccessPayloadType = {
 visibility: 100
};

const weatherType: WeatherDetailType = {
  type: GET_WEATHER_DETAILS_REQUEST,
  payload: {
    lat: 12.00, lon:17.00
  }
};

const weatherVisibilityType: WeatherDetailVisibilityType = {
  type: GET_WEATHER_DETAILS_VISIBILITY_REQUEST,
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
  it('check fetchWeatherDetailsService failed', () => {
    const genObject =  getWeatherDetail(weatherType);
    genObject.next();
    genObject.throw({});
  });
});

describe('Test fetchWeatherDetailVisibilityService success', () => {
  it('fire on GET_WEATHER_DETAILS_VISIBILITY_REQUEST', () => {
    testSaga(getWeatherDetailVisibility, weatherVisibilityType)
      .next()
      .call(fetchWeatherDetailVisibilityService, weatherVisibilityType.payload)
      .next(sucessVisibilityResponseObject)
      .put(WeatherDetailVisibilitySuccess(sucessVisibilityResponseObject))
      .finish()
      .isDone();
  });
});

describe('Test fetchWeatherDetailVisibilityService  error', () => {
  it('check fetchWeatherDetailVisibilityService failed', () => {
    const genObject = getWeatherDetailVisibility(weatherVisibilityType);
    genObject.next();
    genObject.throw(errorResponse);
  });
  it('check fetchWeatherDetailVisibilityService failed', () => {
    const genObject =  getWeatherDetailVisibility(weatherVisibilityType);
    genObject.next();
    genObject.throw({});
  });
});
