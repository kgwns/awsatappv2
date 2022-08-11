import {all, call, put, takeLatest} from 'redux-saga/effects';
import {GET_WEATHER_DETAILS_REQUEST} from './actionType';
import {WeatherDetailSuccess, WeatherDetailFailed} from './action';
import {
  WeatherDetailSuccessPayloadType,
  WeatherDetailType,
} from './types';
import { AxiosError } from 'axios';
import { fetchWeatherDetailsService } from 'src/services/weatherDetailsService';

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

function* WeatherDetailSaga() {
  yield all([
    takeLatest(GET_WEATHER_DETAILS_REQUEST, getWeatherDetail)
  ]);
}

export default WeatherDetailSaga;
