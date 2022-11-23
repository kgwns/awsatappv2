import { storeInfo } from 'src/constants/Constants';
import {
  getIsLoading,
  getJournalistArticleSuccessInfo,
  getJournalistArticleError,
  getIsDetailLoading,
  getJournalistDetailSuccessInfo,
  getJournalistDetailError
} from '../selectors';

describe('All Journalist data', () => {
  const storeData = storeInfo[0];

  test('Get loading state', () => {
    const isLoading: boolean = getIsLoading(storeData);
    expect(isLoading).toEqual(false);
  });

  test('Get getJournalistArticleError state', () => {
    const error = getJournalistArticleError(storeData);
    expect(error).toEqual('');
  });

  test('Get getJournalistArticleSuccessInfo state', () => {
    const error = getJournalistArticleSuccessInfo(storeData);
    expect(error).toEqual([]);
  });

  test('Get getIsDetailLoading state', () => {
    const isLoading: boolean = getIsDetailLoading(storeData);
    expect(isLoading).toEqual(false);
  });

  test('Get getJournalistDetailError state', () => {
    const error = getJournalistDetailError(storeData);
    expect(error).toEqual('');
  });

  test('Get getJournalistDetailSuccessInfo state', () => {
    const error = getJournalistDetailSuccessInfo(storeData);
    expect(error).toEqual([]);
  });

});
