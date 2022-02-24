import {storeInfo} from 'src/constants/SampleData';
import {getIsLoading, getOpinionsData, getOpinionsError} from '../selectors';
import {OpinionsListItemType} from '../types';

describe('Opinions Selector', () => {
  const storeData = storeInfo[0];
  test('Get loading state', () => {
    const isLoading: boolean = getIsLoading(storeData);
    expect(isLoading).toEqual(false);
  });

  test('Get Opinion state', () => {
    const opinionData: OpinionsListItemType[] = getOpinionsData(storeData);
    expect(opinionData).toEqual([]);
  });

  test('Get error state', () => {
    const error = getOpinionsError(storeData);
    expect(error).toEqual('');
  });
});
