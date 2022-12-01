import {storeInfo} from 'src/constants/Constants';
import {
  getIsLoading,
  getHomeError,
  getHomeData
} from '../selectors';

describe('All home data', () => {
  const storeData = storeInfo[0];
  
  test('Get loading state', () => {
    const isLoading: boolean = getIsLoading(storeData);
    expect(isLoading).toEqual(false);
  });

  test('Get getHomeError state', () => {
    const error = getHomeError(storeData);
    expect(error).toEqual('');
  });

  test('Get getHomeData state', () => {
    const error = getHomeData(storeData);
    expect(error).toEqual('');
  });

});
