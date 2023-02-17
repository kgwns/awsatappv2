import {
  GET_WEATHER_DETAILS_REQUEST,
  GET_WEATHER_DETAILS_SUCCESS,
  GET_WEATHER_DETAILS_FAILED,
  GET_WEATHER_DETAILS_VISIBILITY_REQUEST,
  GET_WEATHER_DETAILS_VISIBILITY_SUCCESS,
  GET_WEATHER_DETAILS_VISIBILITY_FAILED,
} from './actionType';

export interface WeatherDetailBodyType {
  lat: number;
  lon: number;
}

export interface WeatherDetailSuccessPayloadType {
  city: City;
  cod: string,
  cnt: number,
  list: WeatherDetailList[];
}

export interface WeatherDetailVisibilitySuccessPayloadType {
  visibility: number,
}

export interface City {
  id: number,
  name: string,
  country: string,
  timezone: number,
}

export interface Weather {
  id: number,
  main: string,
  description: string,
  icon: string
}

export interface WeatherDetailList {
    dt: number,
    sunrise: number,
    sunset: number,
    temp: {
        day: number,
        min: number,
        max: number,
        night: number,
        eve: number,
        morn: number
    },
    feels_like: {
        day: number,
        night: number,
        eve: number,
        morn: number
    },
    pressure: number,
    humidity: number,
    weather: Weather[],
    speed: number,
    deg: number,
    gust: number,
    clouds: number,
    pop: number,
    rain: number
}

export interface WeatherDetailState {
  WeatherDetailInfo: WeatherDetailSuccessPayloadType | null;
  WeatherDetailVisibilityInfo: WeatherDetailVisibilitySuccessPayloadType | null;
  error: string;
  isLoading: boolean;
}

export type WeatherDetailType = {
  type: typeof GET_WEATHER_DETAILS_REQUEST;
  payload: WeatherDetailBodyType;
};

export type WeatherDetailSuccessType = {
  type: typeof GET_WEATHER_DETAILS_SUCCESS;
  payload: WeatherDetailSuccessPayloadType;
};

export interface WeatherDetailFailedPayloadType {
  error: string;
}

export type WeatherDetailFailedType = {
  type: typeof GET_WEATHER_DETAILS_FAILED;
  payload: WeatherDetailFailedPayloadType;
};

export type WeatherDetailVisibilityType = {
  type: typeof GET_WEATHER_DETAILS_VISIBILITY_REQUEST;
  payload: WeatherDetailBodyType;
};

export type WeatherDetailVisibilitySuccessType = {
  type: typeof GET_WEATHER_DETAILS_VISIBILITY_SUCCESS;
  payload: WeatherDetailVisibilitySuccessPayloadType;
};

export type WeatherDetailVisibilityFailedType = {
  type: typeof GET_WEATHER_DETAILS_VISIBILITY_FAILED;
  payload: WeatherDetailFailedPayloadType;
};

export type WeatherDetailAction =
  | WeatherDetailType
  | WeatherDetailSuccessType
  | WeatherDetailFailedType
  | WeatherDetailVisibilityType
  | WeatherDetailVisibilitySuccessType
  | WeatherDetailVisibilityFailedType;
