import {storeInfo} from 'src/constants/SampleData';
import {getIsLoading, getWeatherDetailInfo, getWeatherDetailError} from '../selectors';
import {WeatherDetailSuccessPayloadType} from '../types';

describe('Most Read Selector', () => {
  const storeData = storeInfo[0];
  test('Get loading state', () => {
    const isLoading: boolean = getIsLoading(storeData);
    expect(isLoading).toEqual(false);
  });

  test('Get Opinion state', () => {
    const opinionData: WeatherDetailSuccessPayloadType | null = getWeatherDetailInfo(storeData);
    expect(opinionData).toEqual({"city": {"country": "", "id": 0, "name": "", "timezone": 0}, "cnt": 0, "cod": "", "list": []});
  });

  test('Get error state', () => {
    const error = getWeatherDetailError(storeData);
    expect(error).toEqual("");
  });
});
