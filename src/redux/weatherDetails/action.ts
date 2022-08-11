import {
  GET_WEATHER_DETAILS_REQUEST,
  GET_WEATHER_DETAILS_SUCCESS,
  GET_WEATHER_DETAILS_FAILED,
} from './actionType';
import {
  WeatherDetailBodyType,
  WeatherDetailType,
  WeatherDetailSuccessType,
  WeatherDetailFailedType,
  WeatherDetailSuccessPayloadType,
  WeatherDetailFailedPayloadType,
} from './types';

export const WeatherDetail = (payload: WeatherDetailBodyType): WeatherDetailType => {
  return {
    type: GET_WEATHER_DETAILS_REQUEST,
    payload,
  };
};

export const WeatherDetailSuccess = (
  payload: WeatherDetailSuccessPayloadType,
): WeatherDetailSuccessType => {
  return {
    type: GET_WEATHER_DETAILS_SUCCESS,
    payload,
  };
};

export const WeatherDetailFailed = (
  payload: WeatherDetailFailedPayloadType,
): WeatherDetailFailedType => {
  return {
    type: GET_WEATHER_DETAILS_FAILED,
    payload,
  };
};
