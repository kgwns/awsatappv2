import { WEATHER_URL } from 'src/services/apiUrls';
import { getApiRequestWithoutAuth } from 'src/services/api';
import { WeatherDetailBodyType, WeatherDetailSuccessPayloadType } from 'src/redux/weatherDetails/types';

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