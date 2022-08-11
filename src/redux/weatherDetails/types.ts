import {
  GET_WEATHER_DETAILS_REQUEST,
  GET_WEATHER_DETAILS_SUCCESS,
  GET_WEATHER_DETAILS_FAILED,
} from './actionType';

export interface WeatherDetailBodyType {
  lat: number;
  lon: number;
}

export interface WeatherDetailSuccessPayloadType {
  city: city;
  cod: string,
  cnt: number,
  list: list[];
}

export interface city {
  id: number,
  name: string,
  country: string,
}

export interface weather {
  id: number,
  main: string,
  description: string,
  icon: string
}

export interface list {
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
    weather: weather[],
    speed: number,
    deg: number,
    gust: number,
    clouds: number,
    pop: number,
    rain: number
}

export interface WeatherDetailAfterRegistraionSuccessPayloadType {
    message: string;
    action?: string;
}

export interface WeatherDetailState {
  WeatherDetailInfo: WeatherDetailSuccessPayloadType | null;
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

export type WeatherDetailAction =
  | WeatherDetailType
  | WeatherDetailSuccessType
  | WeatherDetailFailedType;
