import { checkPermission, LOCATION_PERMISSIONS, requestPermission } from '../LocationPermission';

describe('Test Email Check Services', () => {
    beforeEach(() => {
        jest.useFakeTimers('legacy');
    });

    it('test when LOCATION_PERMISSIONS is called', () => {
        expect(LOCATION_PERMISSIONS).toBeTruthy();
    });

    it('test when checkPermission', () => {
        expect(checkPermission).toBeTruthy();
    });

    it('test when requestPermission', () => {
        expect(requestPermission).toBeTruthy();
    });
});