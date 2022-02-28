import {storeInfo,storeSampleData} from 'src/constants/SampleData';
import {
  getIsLoading,
  getOpinionArticleData,
  getOpinionArticleError,
} from '../selectors';
import {OpinionArticleDetailItemType} from '../types';

describe('OpinionArticleDetail Selector', () => {
  const storeData = storeInfo[0];
  test('Get loading state', () => {
    const isLoading: boolean = getIsLoading(storeData);
    expect(isLoading).toEqual(true);
  });

  test('Get OpinionArticleDetail state', () => {
    const opinionArticleDetailData: OpinionArticleDetailItemType[] =
      getOpinionArticleData(storeData);
    expect(opinionArticleDetailData).toEqual([]);
  });

  test('Get error state', () => {
    const error = getOpinionArticleError(storeData);
    expect(error).toEqual('');
  });
});
