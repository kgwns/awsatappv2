import { WEATHER_URL, WEATHER_URL_VISIBILITY } from 'src/services/apiUrls';
import { getApiRequestWithoutAuth } from 'src/services/api';
import { WeatherDetailBodyType, WeatherDetailSuccessPayloadType, WeatherDetailVisibilitySuccessPayloadType } from 'src/redux/weatherDetails/types';
import { APPID, CNT, LANG, UNITS } from 'src/constants/Constants';

export const fetchWeatherDetailsService = async (body: WeatherDetailBodyType) => {
  try {
    const response: WeatherDetailSuccessPayloadType = await getApiRequestWithoutAuth(
      `${WEATHER_URL}?lat=${body.lat}&lon=${body.lon}&cnt=${CNT}&appid=${APPID}&lang=${LANG}&units=${UNITS}`,
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
      `${WEATHER_URL_VISIBILITY}?lat=${body.lat}&lon=${body.lon}&appid=${APPID}&lang=${LANG}&units=${UNITS}`,
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};