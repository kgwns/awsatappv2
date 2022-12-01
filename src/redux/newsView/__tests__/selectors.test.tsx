import {storeInfo} from 'src/constants/Constants';
import { LatestArticleDataType } from 'src/redux/latestNews/types';
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
    const heroData: NewsViewListItemType[] = getHeroListData(storeData);
    expect(heroData).toEqual([]);
  });
  test('Get Bottom List data', () => {
    const bottomData: NewsViewListItemType[] = getBottomListData(storeData);
    expect(bottomData).toEqual([]);
  });
  test('Get Top List data', () => {
    const topData: LatestArticleDataType[] = getTopListData(storeData);
    expect(topData).toEqual([]);
  });

  test('Get error state', () => {
    const error = getNewsViewError(storeData);
    expect(error).toEqual('');
  });
});
