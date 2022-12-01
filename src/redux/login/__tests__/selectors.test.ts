import { storeInfo } from 'src/constants/Constants';
import {
    getIsLoading,
    getLoginData,
    getLoginError,
    getIsSkipped,
    getForgotPasswordResponse
} from '../selectors';

describe('login Selector', () => {
    const storeData = storeInfo[0];
    test('Get loading state', () => {
        const isLoading: boolean = getIsLoading(storeData);
        expect(isLoading).toEqual(false);
    });

    test('Get login data', () => {
        const data: any = getLoginData(storeData);
        expect(data).toEqual(null);
    });

    test('Get error state', () => {
        const data = getLoginError(storeData);
        expect(data).toEqual('');
    });

    test('Get isSkipped state', () => {
        const error = getIsSkipped(storeData);
        expect(error).toEqual(false);
    });

    test('Get forgot password response data', () => {
        const data: any = getForgotPasswordResponse(storeData);
        expect(data).toEqual({});
    });
});
