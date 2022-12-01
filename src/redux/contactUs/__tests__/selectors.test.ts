import { storeInfo } from 'src/constants/Constants';
import {
    getIsLoading,
    getSendSuccessInfo,
    getSendInfoError,
} from '../selectors';
import {
    ContactUsInfoSuccessPayload,
} from '../types';

describe('All Bookmark Selector', () => {
    const storeData = storeInfo[0];
    test('Get loading state', () => {
        const isLoading: boolean = getIsLoading(storeData);
        expect(isLoading).toEqual(false);
    });

    test('Get Response SuccessInfo data', () => {
        const bookMarkSuccessInfo: ContactUsInfoSuccessPayload = getSendSuccessInfo(storeData);
        expect(bookMarkSuccessInfo).toEqual({ code: 1, message: '' });
    });

    test('Get Response Error data', () => {
        const articleError: string = getSendInfoError(storeData);
        expect(articleError).toEqual('');
    });
});
