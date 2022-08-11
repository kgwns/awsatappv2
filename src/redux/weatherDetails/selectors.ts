import {AppState, Selector} from '../rootReducer';
import { WeatherDetailSuccessPayloadType } from './types';

export const getIsLoading: Selector<boolean> = (state: AppState) =>
  state.weatherDetails.isLoading;

export const getWeatherDetailInfo: Selector<WeatherDetailSuccessPayloadType | null> = (
  state: AppState,
) => state.weatherDetails.WeatherDetailInfo;

export const getWeatherDetailError: Selector<string> = (state: AppState) =>
  state.weatherDetails.error;
