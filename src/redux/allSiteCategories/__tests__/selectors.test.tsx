import {storeInfo} from 'src/constants/Constants';
import {
  getIsLoading,
  getAllSiteCategoriesData,
  getAllSiteCategoriesError,
  getTopicsData,
  getSelectedTopicsDataList
} from '../selectors';
import {AllSiteCategoriesItemType, ResponseMessage, SelectedTopicsDataType} from '../types';

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

  test('Get all topics data', () => {
    const allTopicsData: ResponseMessage =
    getTopicsData(storeData);
    expect(allTopicsData).toEqual({});
  });

  test('Get getSelectedTopicsDataList data', () => {
    const allWriterData: SelectedTopicsDataType =
    getSelectedTopicsDataList(storeData);
    expect(allWriterData).toEqual({});
  });
});
