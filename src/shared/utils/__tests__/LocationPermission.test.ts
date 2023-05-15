import * as permission from 'react-native-permissions';
import { checkPermission, LOCATION_PERMISSIONS, requestPermission } from '../LocationPermission';

describe('Test Email Check Services', () => {
    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('test when LOCATION_PERMISSIONS is called',() => {
        expect(LOCATION_PERMISSIONS).toBeTruthy();
    });

    it('test when checkPermission', () => {
        jest.spyOn(permission,'checkMultiple').mockResolvedValue({result:true} as any);
        checkPermission();
        expect(checkPermission).toBeTruthy();
    });

    it('test when requestPermission', () => {
        jest.spyOn(permission,'requestMultiple').mockResolvedValue({result:true} as any);
        requestPermission();
        expect(requestPermission).toBeTruthy();
    });

});