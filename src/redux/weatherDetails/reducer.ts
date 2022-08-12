import {
  GET_WEATHER_DETAILS_REQUEST,
  GET_WEATHER_DETAILS_SUCCESS,
  GET_WEATHER_DETAILS_FAILED,
  GET_WEATHER_DETAILS_VISIBILITY_SUCCESS,
  GET_WEATHER_DETAILS_VISIBILITY_FAILED,
  GET_WEATHER_DETAILS_VISIBILITY_REQUEST,
} from './actionType';
import {WeatherDetailAction, WeatherDetailState} from './types';

const initialState: WeatherDetailState = {
  WeatherDetailInfo: null,
  WeatherDetailVisibilityInfo: null,
  error: '',
  isLoading: false,
};

export default (state = initialState, action: WeatherDetailAction) => {
  switch (action.type) {
    case GET_WEATHER_DETAILS_SUCCESS:
      return {...state, isLoading: false, WeatherDetailInfo: action.payload};
    case GET_WEATHER_DETAILS_FAILED:
      return {...state, error: action.payload.error, isLoading: false};
    case GET_WEATHER_DETAILS_REQUEST:
      return {...state, isLoading: true};
    case GET_WEATHER_DETAILS_VISIBILITY_SUCCESS:
      return {...state, isLoading: false, WeatherDetailVisibilityInfo: action.payload};
    case GET_WEATHER_DETAILS_VISIBILITY_FAILED:
      return {...state, error: action.payload.error, isLoading: false};
    case GET_WEATHER_DETAILS_VISIBILITY_REQUEST:
      return {...state, isLoading: true};
    default:
      return {...state};
  }
};
