import {storeInfo} from 'src/constants/Constants';
import {
  getIsLoading,
  getAllWritersData,
  getAllWritersError,
  getSentAuthorInfoData,
  getSelectedAuthorsDataList,
  getSelectedAllWritersDetailsData,
  getSelectedAuthorLoading,
} from '../selectors';
import {AllWritersItemType, SelectedAuthorDataType} from '../types';

describe('All Writer Selector', () => {
  const storeData = storeInfo[0];
  test('Get loading state', () => {
    const isLoading: boolean = getIsLoading(storeData);
    expect(isLoading).toEqual(false);
  });

  test('Get all Writer data', () => {
    const allWriterData: AllWritersItemType[] = getAllWritersData(storeData);
    expect(allWriterData).toEqual([]);
  });

  test('Get error state', () => {
    const data = getSentAuthorInfoData(storeData);
    expect(data).toEqual({});
  });

  test('Get error state', () => {
    const error = getAllWritersError(storeData);
    expect(error).toEqual('');
  });

  test('Get getSelectedAuthorsDataList data', () => {
    const allWriterData: SelectedAuthorDataType =
    getSelectedAuthorsDataList(storeData);
    expect(allWriterData).toEqual({});
  });

  test('Get getSelectedAllWritersDetailsData data', () => {
    const allWriterData: AllWritersItemType[] =
    getSelectedAllWritersDetailsData(storeData);
    expect(allWriterData).toEqual(undefined);
  });

  test('Get loading state', () => {
    const selectedAuthorLoading: boolean = getSelectedAuthorLoading(storeData);
    expect(selectedAuthorLoading).toEqual(false);
  });

});
