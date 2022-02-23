import {storeInfo} from 'src/constants/SampleData';
import {
  getIsLoading,
  getTopListData,
  getHeroListData,
  getBottomListData,
  getNewsViewError,
} from '../selectors';
import {NewsViewListItemType} from '../types';

describe('NewsView Selector', () => {
  const storeData = storeInfo[0];
  test('Get loading state', () => {
    const isLoading: boolean = getIsLoading(storeData);
    expect(isLoading).toEqual(false);
  });

  test('Get Hero List data', () => {
    const opinionData: NewsViewListItemType[] = getHeroListData(storeData);
    expect(opinionData).toEqual([]);
  });
  test('Get Bottom List data', () => {
    const opinionData: NewsViewListItemType[] = getBottomListData(storeData);
    expect(opinionData).toEqual([]);
  });
  test('Get Top List data', () => {
    const opinionData: NewsViewListItemType[] = getTopListData(storeData);
    expect(opinionData).toEqual([]);
  });

  test('Get error state', () => {
    const error = getNewsViewError(storeData);
    expect(error).toEqual('');
  });
});
