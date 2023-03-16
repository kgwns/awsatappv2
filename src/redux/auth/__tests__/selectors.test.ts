import { storeInfo } from 'src/constants/Constants';
import {
    getIsLoading,
    getEmailCheckData,
    getEmailCheckError
} from '../selectors';

describe('All Writer Selector', () => {
    const storeData = storeInfo[0];
    test('Get loading state', () => {
        const isLoading: boolean = getIsLoading(storeData);
        expect(isLoading).toEqual(false);
    });

    test('Get email check data', () => {
        const allWriterData: any = getEmailCheckData(storeData);
        expect(allWriterData).toEqual(null);
    });

    test('Get error state', () => {
        const data = getEmailCheckError(storeData);
        expect(data).toEqual('');
    });
});
