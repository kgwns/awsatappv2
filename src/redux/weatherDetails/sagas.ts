import {all, call, put, takeLatest} from 'redux-saga/effects';
import {GET_WEATHER_DETAILS_REQUEST,GET_WEATHER_DETAILS_VISIBILITY_REQUEST} from './actionType';
import {WeatherDetailSuccess, WeatherDetailFailed, WeatherDetailVisibilitySuccess, WeatherDetailVisibilityFailed} from './action';
import {
  WeatherDetailSuccessPayloadType,
  WeatherDetailType,
  WeatherDetailVisibilitySuccessPayloadType,
  WeatherDetailVisibilityType,
} from './types';
import { AxiosError } from 'axios';
import { fetchWeatherDetailsService, fetchWeatherDetailVisibilityService } from 'src/services/weatherDetailsService';

export function* getWeatherDetail(action: WeatherDetailType) {
  try {
    const response: WeatherDetailSuccessPayloadType = yield call(
      fetchWeatherDetailsService,
      action.payload
    );
    yield put(WeatherDetailSuccess(response));
  } catch (error) {
    console.log(error)
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: {message: string} = errorResponse.response.data;
      yield put(
        WeatherDetailFailed({error: errorMessage.message}),
      );
    }
  }
}

export function* getWeatherDetailVisibility(action: WeatherDetailVisibilityType) {
  try {
    const response: WeatherDetailVisibilitySuccessPayloadType = yield call(
      fetchWeatherDetailVisibilityService,
      action.payload
    );
    yield put(WeatherDetailVisibilitySuccess(response));
  } catch (error) {
    console.log(error)
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: {message: string} = errorResponse.response.data;
      yield put(
        WeatherDetailVisibilityFailed({error: errorMessage.message}),
      );
    }
  }
}

function* WeatherDetailSaga() {
  yield all([
    takeLatest(GET_WEATHER_DETAILS_REQUEST, getWeatherDetail),
    takeLatest(GET_WEATHER_DETAILS_VISIBILITY_REQUEST, getWeatherDetailVisibility)
  ]);
}

export default WeatherDetailSaga;
