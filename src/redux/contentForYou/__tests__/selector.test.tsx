import {storeInfo} from 'src/constants/Constants';
import {getIsLoading,
  getFavouriteOpinionsData,
  getFavouriteOpinionsError,
  getArticleLoading,
  getFavouriteArticlesData,
  getFavouriteArticlesError,
} from '../selectors';
import {OpinionsListItemType, ArticlesListItemType} from '../types';

describe('ContentForYou Selector', () => {
  const storeData = storeInfo[0];
  test('Get loading state', () => {
    const isLoading: boolean = getIsLoading(storeData);
    expect(isLoading).toEqual(false);
  });

  test('Get Opinion state', () => {
    const opinionData: OpinionsListItemType[] = getFavouriteOpinionsData(storeData);
    expect(opinionData).toEqual([]);
  });

  test('Get error state', () => {
    const error = getFavouriteOpinionsError(storeData);
    expect(error).toEqual('');
  });

  test('Get Article loading state', () => {
    const isArticleLoading: boolean = getArticleLoading(storeData);
    expect(isArticleLoading).toEqual(false);
  });

  test('Get Article state', () => {
    const articleData: ArticlesListItemType[] = getFavouriteArticlesData(storeData);
    expect(articleData).toEqual([]);
  });

  test('Get error state', () => {
    const error = getFavouriteArticlesError(storeData);
    expect(error).toEqual('');
  });
});
