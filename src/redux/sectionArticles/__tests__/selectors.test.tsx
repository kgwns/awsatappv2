import {storeInfo} from 'src/constants/Constants';
import {getIsLoading, getSectionArticlesData, getSectionArticlesError} from '../selectors';
import {payloadType} from '../types';

describe('Search Selector', () => {
  const storeData = storeInfo[0];
  test('Get loading state', () => {
    const isLoading: boolean = getIsLoading(storeData);
    expect(isLoading).toEqual(false);
  });

  test('getSectionArticlesData', () => {
    const sectionArticlesData: payloadType = getSectionArticlesData(storeData);
    expect(sectionArticlesData).toEqual({ 
      pager: {
        current_page: 0,
        items_per_page: "",
      },
      rows: [],
    });
  });

  test('Get error state', () => {
    const error = getSectionArticlesError(storeData);
    expect(error).toEqual('');
  });

});
