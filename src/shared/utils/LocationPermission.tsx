import {Platform} from 'react-native';
import {
  checkMultiple,
  requestMultiple,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';

export const LOCATION_PERMISSIONS = Platform.select({
  ios: [PERMISSIONS.IOS.LOCATION_WHEN_IN_USE],
  android: [
    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  ],
});


export const requestPermission = () => {
    if (LOCATION_PERMISSIONS) {
      requestMultiple(LOCATION_PERMISSIONS).then(result => {
        const location = result[LOCATION_PERMISSIONS[0]];
        if (location === RESULTS.GRANTED) {
          return true
        }
      });
    }
  };


export const checkPermission = () =>
    LOCATION_PERMISSIONS &&
    checkMultiple(LOCATION_PERMISSIONS).then(result => {
      const location = result[LOCATION_PERMISSIONS[0]];

      if (location === RESULTS.DENIED) {
        requestPermission();
      } else if (location === RESULTS.GRANTED) {
        return true
      } else {
        return false
      }
});
