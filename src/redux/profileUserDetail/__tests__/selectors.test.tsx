import { storeInfo } from 'src/constants/Constants';
import {
    getIsLoading,
    getProfileUserDetails, getProfileUserDetailsError, getUserData, getUserInfo

} from '../selectors';

describe('profile user detail Selector', () => {
    const storeData = storeInfo[0];
    test('Get loading state', () => {
        const isLoading: boolean = getIsLoading(storeData);
        expect(isLoading).toEqual(false);
    });

    test('Get profileUserDetails data', () => {
        const data: any = getProfileUserDetails(storeData);
        expect(data).toEqual({});
    });

    test('Get error state', () => {
        const data = getProfileUserDetailsError(storeData);
        expect(data).toEqual('');
    });

    test('Get userdata data', () => {
        const data: any = getUserData(storeData);
        expect(data).toEqual({});
    });

    test('Get userinfo state', () => {
        const data = getUserInfo(storeData);
        expect(data).toEqual(null);
    });
});
