import { storeInfo } from 'src/constants/Constants';
import {
    getIsLoading,
    getNewPassword, getNewPasswordError,

} from '../selectors';

describe('change password Selector', () => {
    const storeData = storeInfo[0];
    test('Get loading state', () => {
        const isLoading: boolean = getIsLoading(storeData);
        expect(isLoading).toEqual(true);
    });

    test('Get changepassword data', () => {
        const data: any = getNewPassword(storeData);
        expect(data).toEqual({});
    });

    test('Get error state', () => {
        const data = getNewPasswordError(storeData);
        expect(data).toEqual('');
    });
});
