import {storeInfo} from 'src/constants/Constants';
import {getThemeState, getIsFirstSession, getServerEnvironment, getArticleFontSize, getBaseUrlConfig} from '../selectors';
import {ServerEnvironment, Theme} from '../types';

describe('App Common Selector', () => {
  const storeData = storeInfo[0];

  test('Get app common data', () => {
    const appCommonData: Theme = getThemeState(storeData);
    expect(appCommonData).toEqual(Theme.LIGHT);
  });
  
  test('Get isAppFirstSession state', () => {
    const isAppFirstSession: boolean = getIsFirstSession(storeData);
    expect(isAppFirstSession).toEqual(true);
  });

  test('Get getSelectedAllWritersDetailsData data', () => {
    const allWriterData: ServerEnvironment =
    getServerEnvironment(storeData);
    expect(allWriterData).toEqual("Production");
  });

  test('Get isAppFirstSession state', () => {
    const articleFontSize: number = getArticleFontSize(storeData);
    expect(articleFontSize).toEqual(18);
  });

  test('Get getBaseUrlConfig state', () => {
    const baseUrlConfig = getBaseUrlConfig(storeData);
    expect(baseUrlConfig).toEqual(storeData.appCommon.baseUrlConfig);
  });

});
