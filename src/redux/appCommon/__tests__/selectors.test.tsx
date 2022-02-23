import {storeInfo} from 'src/constants/SampleData';
import {getThemeState} from '../selectors';
import {Theme} from '../types';

describe('App Common Selector', () => {
  const storeData = storeInfo[0];

  test('Get app common data', () => {
    const appCommonData: Theme = getThemeState(storeData);
    expect(appCommonData).toEqual(Theme.LIGHT);
  });
});
