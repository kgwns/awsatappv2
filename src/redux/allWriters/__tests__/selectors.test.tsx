import {storeInfo} from 'src/constants/SampleData';
import {
  getIsLoading,
  getAllWritersData,
  getAllWritersError,
} from '../selectors';
import {AllWritersItemType} from '../types';

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
    const error = getAllWritersError(storeData);
    expect(error).toEqual('');
  });
});
