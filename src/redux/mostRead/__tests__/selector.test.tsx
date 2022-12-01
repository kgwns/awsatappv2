import {storeInfo} from 'src/constants/Constants';
import {getIsLoading, getMostReadData, getMostReadError} from '../selectors';
import {MostReadItemType} from '../types';

describe('Most Read Selector', () => {
  const storeData = storeInfo[0];
  test('Get loading state', () => {
    const isLoading: boolean = getIsLoading(storeData);
    expect(isLoading).toEqual(false);
  });

  test('Get Opinion state', () => {
    const opinionData: MostReadItemType[] = getMostReadData(storeData);
    expect(opinionData).toEqual([]);
  });

  test('Get error state', () => {
    const error = getMostReadError(storeData);
    expect(error).toEqual('');
  });
});
