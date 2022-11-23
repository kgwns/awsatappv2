import {storeInfo} from 'src/constants/Constants';
import {
  getIsLoading,
  getWriterDetail,
  getWriterDetailError
} from '../selectors';
import { WriterDetailDataType } from '../types';

describe('Opinion Writer Selector', () => {
  const storeData = storeInfo[0];
  test('Get loading state', () => {
    const isLoading: boolean = getIsLoading(storeData);
    expect(isLoading).toEqual(true);
  });

  test('Get Opinion Writer data', () => {
    const writerDetailData: WriterDetailDataType[] = getWriterDetail(storeData);
    expect(writerDetailData).toEqual([]);
  });

  test('Get error state', () => {
    const error = getWriterDetailError(storeData);
    expect(error).toEqual('error');
  });
  
});
