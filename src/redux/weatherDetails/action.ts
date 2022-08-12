import {
  GET_WEATHER_DETAILS_REQUEST,
  GET_WEATHER_DETAILS_SUCCESS,
  GET_WEATHER_DETAILS_FAILED,
  GET_WEATHER_DETAILS_VISIBILITY_REQUEST,
  GET_WEATHER_DETAILS_VISIBILITY_SUCCESS,
  GET_WEATHER_DETAILS_VISIBILITY_FAILED,
} from './actionType';
import {
  WeatherDetailBodyType,
  WeatherDetailType,
  WeatherDetailSuccessType,
  WeatherDetailFailedType,
  WeatherDetailSuccessPayloadType,
  WeatherDetailFailedPayloadType,
  WeatherDetailVisibilityType,
  WeatherDetailVisibilitySuccessPayloadType,
  WeatherDetailVisibilitySuccessType,
  WeatherDetailVisibilityFailedType,
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

export const WeatherDetailVisibility = (payload: WeatherDetailBodyType): WeatherDetailVisibilityType => {
  return {
    type: GET_WEATHER_DETAILS_VISIBILITY_REQUEST,
    payload,
  };
};

export const WeatherDetailVisibilitySuccess = (
  payload: WeatherDetailVisibilitySuccessPayloadType,
): WeatherDetailVisibilitySuccessType => {
  return {
    type: GET_WEATHER_DETAILS_VISIBILITY_SUCCESS,
    payload,
  };
};

export const WeatherDetailVisibilityFailed = (
  payload: WeatherDetailFailedPayloadType,
): WeatherDetailVisibilityFailedType => {
  return {
    type: GET_WEATHER_DETAILS_VISIBILITY_FAILED,
    payload,
  };
};
