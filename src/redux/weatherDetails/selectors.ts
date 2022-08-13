import { AppState, Selector } from '../rootReducer';
import { WeatherDetailSuccessPayloadType, WeatherDetailVisibilitySuccessPayloadType } from './types';

export const getIsLoading: Selector<boolean> = (state: AppState) =>
  state.weatherDetails.isLoading;

export const getWeatherDetailInfo: Selector<WeatherDetailSuccessPayloadType | null> = (
  state: AppState,
) => state.weatherDetails.WeatherDetailInfo;

export const getWeatherDetailVisibilityInfo: Selector<WeatherDetailVisibilitySuccessPayloadType | null> = (
  state: AppState,
) => state.weatherDetails.WeatherDetailVisibilityInfo;

export const getWeatherDetailError: Selector<string> = (state: AppState) =>
  state.weatherDetails.error;
