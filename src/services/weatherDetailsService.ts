import { WEATHER_URL, WEATHER_URL_VISIBILITY } from 'src/services/apiUrls';
import { getApiRequestWithoutAuth } from 'src/services/api';
import { WeatherDetailBodyType, WeatherDetailSuccessPayloadType, WeatherDetailVisibilitySuccessPayloadType } from 'src/redux/weatherDetails/types';

export const fetchWeatherDetailsService = async (body: WeatherDetailBodyType) => {
  try {
    const response: WeatherDetailSuccessPayloadType = await getApiRequestWithoutAuth(
      `${WEATHER_URL}?lat=${body.lat}&lon=${body.lon}&cnt=${7}&appid=${'2a8029b11a6c3cc7a196e8d7dd03ce67'}&lang=${'ar'}&units=${'metric'}`,
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchWeatherDetailVisibilityService = async (body: WeatherDetailBodyType) => {
  try {
    const response: WeatherDetailVisibilitySuccessPayloadType = await getApiRequestWithoutAuth(
      `${WEATHER_URL_VISIBILITY}?lat=${body.lat}&lon=${body.lon}&appid=${'2a8029b11a6c3cc7a196e8d7dd03ce67'}&lang=${'ar'}&units=${'metric'}`,
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};