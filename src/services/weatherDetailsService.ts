import { WEATHER_URL, WEATHER_URL_VISIBILITY } from 'src/services/apiUrls';
import { getApiRequestWithoutAuth } from 'src/services/api';
import { WeatherDetailBodyType } from 'src/redux/weatherDetails/types';
import { APPID, CNT, LANG, UNITS } from 'src/constants/Constants';

export const fetchWeatherDetailsService = async (body: WeatherDetailBodyType) => {
  try {
    return await getApiRequestWithoutAuth(
      `${WEATHER_URL}?lat=${body.lat}&lon=${body.lon}&cnt=${CNT}&appid=${APPID}&lang=${LANG}&units=${UNITS}`,
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchWeatherDetailVisibilityService = async (body: WeatherDetailBodyType) => {
  try {
    return await getApiRequestWithoutAuth(
      `${WEATHER_URL_VISIBILITY}?lat=${body.lat}&lon=${body.lon}&appid=${APPID}&lang=${LANG}&units=${UNITS}`,
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};
