import {storeInfo} from 'src/constants/Constants';
import {getIsLoading, getSearchData, getSearchError, getSearchHistory} from '../selectors';
import {SearchItemType} from '../types';

describe('Search Selector', () => {
  const storeData = storeInfo[0];
  test('Get loading state', () => {
    const isLoading: boolean = getIsLoading(storeData);
    expect(isLoading).toEqual(false);
  });

  test('Get Opinion state', () => {
    const searchData: SearchItemType[] = getSearchData(storeData);
    expect(searchData).toEqual([]);
  });

  test('Get error state', () => {
    const error = getSearchError(storeData);
    expect(error).toEqual('');
  });

  test('getSearchHistory', () => {
    const searchHistory: string[] = getSearchHistory(storeData);
    expect(searchHistory).toEqual([]);
  });

});
