import {storeInfo} from 'src/constants/Constants';
import {
  getIsLoading,
  getOpinionWriterData,
  getOpinionWriterError,
} from '../selectors';
import {OpinionWriterItemType} from '../types';

describe('Opinion Writer Selector', () => {
  const storeData = storeInfo[0];
  test('Get loading state', () => {
    const isLoading: boolean = getIsLoading(storeData);
    expect(isLoading).toEqual(false);
  });

  test('Get Opinion Writer data', () => {
    const opinionWriterData: OpinionWriterItemType[] = getOpinionWriterData(storeData);
    expect(opinionWriterData).toEqual([]);
  });

  test('Get error state', () => {
    const error = getOpinionWriterError(storeData);
    expect(error).toEqual('');
  });
});
