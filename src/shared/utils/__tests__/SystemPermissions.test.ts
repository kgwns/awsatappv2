import { SystemPermissions } from "../SystemPermissions";

jest.mock('react-native//Libraries/PermissionsAndroid/PermissionsAndroid', () => {
  return {
   ...jest.requireActual('react- native//Libraries/PermissionsAndroid/PermissionsAndroid'),
   request: jest.fn(() => new Promise(resolve => resolve('granted')))
 }
})

describe('<Utilities>', () => {
    beforeEach(() => {
        jest.useFakeTimers()
    })

    afterEach(() => {
        jest.clearAllMocks();
        jest.clearAllTimers();
    });

    it('Check SystemPermissions', () => {
        expect(SystemPermissions.hasCameraPermission).toBeTruthy()
    })

    it('Check SystemPermissions', () => {
        expect(SystemPermissions.requestCameraPermission).toBeTruthy()
    })

})