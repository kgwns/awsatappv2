import {storeInfo} from 'src/constants/Constants';
import {getIsLoading, getSaveTokenInfo, getSaveTokenError, getSaveTokenAfterRegistrationInfo} from '../selectors';

describe('Most Read Selector', () => {
  const storeData = storeInfo[0];

  test('Get loading state', () => {
    const isLoading: boolean = getIsLoading(storeData);
    expect(isLoading).toEqual(false);
  });

  test('Get SaveToken After RegistrationInfo Info', () => {
    const opinionData= getSaveTokenAfterRegistrationInfo(storeData);
    expect(opinionData).toEqual({"message": ''});
  });

  test('Get Save Token Info', () => {
    const opinionData= getSaveTokenInfo(storeData);
    expect(opinionData).toEqual({"id": 2, "message": ''});
  });

  test('Get error state', () => {
    const error = getSaveTokenError(storeData);
    expect(error).toEqual('');
  });
});
