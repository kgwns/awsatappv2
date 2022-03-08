import {storeInfo} from 'src/constants/SampleData';
import {
  getIsLoading,
  getNewsLettersError,
  getSelectedNewsLettersDataList} from '../selectors';

describe('News Letters Selector', () => {
  const storeData = storeInfo[0];
  test('Get loading state', () => {
    const isLoading: boolean = getIsLoading(storeData);
    expect(isLoading).toEqual(false);
  });

  test('Get selected News Letters Data state', () => {
    const error = getSelectedNewsLettersDataList(storeData);
    expect(error).toEqual({});
  });

  test('Get sent News Letters Info Data state', () => {
    const error = getSelectedNewsLettersDataList(storeData);
    expect(error).toEqual({});
  });

  test('Get error state', () => {
    const data = getNewsLettersError(storeData);
    expect(data).toEqual('');
  });
});
