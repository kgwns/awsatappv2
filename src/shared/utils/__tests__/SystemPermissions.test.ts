import { PermissionsAndroid } from "react-native";
import { SystemPermissions } from "../SystemPermissions";

jest.mock('react-native//Libraries/PermissionsAndroid/PermissionsAndroid', () => {
  const PermissionsAndroid = jest.requireActual(
    'react-native//Libraries/PermissionsAndroid/PermissionsAndroid',
  );
  console.log(PermissionsAndroid);
  return {
    ...PermissionsAndroid,
    check: jest.fn(() => new Promise(resolve => resolve(true))),
    request: jest.fn(() => new Promise(resolve => resolve(true))),
  };
});

describe('<Utilities>', () => {
    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        })
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

    it('Check SystemPermissions', () => {
        expect(PermissionsAndroid.check).toBeTruthy()
    })

    it('Check SystemPermissions', () => {
        expect(PermissionsAndroid.request).toBeTruthy()
    })

})