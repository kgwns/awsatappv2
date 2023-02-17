import { PermissionsAndroid } from 'react-native'
import { PERMISSION_REQUEST_CAMERA_ACCESS_MESSAGE, PERMISSION_REQUIRE_ACCESS } from 'src/constants/Constants';


export const SystemPermissions = {
    hasCameraPermission: async () => {
        return await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA)
    },
    requestCameraPermission: async () => {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: PERMISSION_REQUIRE_ACCESS,
                    message: PERMISSION_REQUEST_CAMERA_ACCESS_MESSAGE,
                    buttonPositive: 'Grant'
                });
            return granted === PermissionsAndroid.RESULTS.GRANTED ? true : false
        } catch (error) {
            return false
        }
    }
}
