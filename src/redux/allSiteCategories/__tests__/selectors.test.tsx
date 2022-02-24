import {storeInfo} from 'src/constants/SampleData';
import {
  getIsLoading,
  getAllSiteCategoriesData,
  getAllSiteCategoriesError,
} from '../selectors';
import {AllSiteCategoriesItemType} from '../types';

describe('AllSiteCategories Selector', () => {
  const storeData = storeInfo[0];
  test('Get loading state', () => {
    const isLoading: boolean = getIsLoading(storeData);
    expect(isLoading).toEqual(false);
  });

  test('Get AllSiteCategories data', () => {
    const allWriterData: AllSiteCategoriesItemType[] =
      getAllSiteCategoriesData(storeData);
    expect(allWriterData).toEqual([]);
  });

  test('Get error state', () => {
    const error = getAllSiteCategoriesError(storeData);
    expect(error).toEqual('');
  });
});
