import { storeInfo, storeSampleData } from 'src/constants/Constants';
import {
  getIsLoading,
  getOpinionArticleData,
  getOpinionArticleError,
  getIsLoadingRelatedOpinion,
  getRelatedOpinionData,
  getRelatedOpinionError,
  getNarratedOpinionData
} from '../selectors';
import { OpinionArticleDetailItemType, OpinionsListItemType } from '../types';

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

  test('Get related article loading state', () => {
    const isLoading: boolean = getIsLoadingRelatedOpinion(storeData);
    expect(isLoading).toEqual(true);
  });

  test('Get OpinionArticleDetail state', () => {
    const relatedOpinionData: OpinionsListItemType[] =
      getRelatedOpinionData(storeData);
    expect(relatedOpinionData).toEqual([]);
  });

  test('Get error state', () => {
    const error = getRelatedOpinionError(storeData);
    expect(error).toEqual('');
  });

  test('Get getNarratedOpinionData state', () => {
    const mediaData: any =
    getNarratedOpinionData(storeData);
    expect(mediaData).toEqual({});
  });

});
