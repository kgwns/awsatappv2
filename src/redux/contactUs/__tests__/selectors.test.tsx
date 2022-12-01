import {storeInfo} from 'src/constants/Constants';
import {
  getIsLoading,
  getSendSuccessInfo,
  getSendInfoError
} from '../selectors';
import { ContactUsInfoSuccessPayload } from '../types';

describe('Contact Us Selector', () => {
  const storeData = storeInfo[0];
  test('Get loading state', () => {
    const isLoading: boolean = getIsLoading(storeData);
    expect(isLoading).toEqual(false);
  });

  test('getSendSuccessInfo', () => {
    const data: ContactUsInfoSuccessPayload = getSendSuccessInfo(storeData);
    expect(data).toEqual({ code: 1, message: '' });
  });

  test('getSendInfoError', () => {
    const error: string = getSendInfoError(storeData);
    expect(error).toEqual('');
  });

});
