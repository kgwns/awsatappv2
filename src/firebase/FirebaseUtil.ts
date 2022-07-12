import messaging, { firebase, FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import '@react-native-firebase/messaging';

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
  if (enabled) { 
    messaging()
      .getToken()
      .then(token => {
        console.log('Notification token:');
        console.log(token);
      });
    messaging().onTokenRefresh(token => {
      console.log('refreshtoken', token);
    });
  }

  firebase
  .messaging()
  .requestPermission()
  .then((status: FirebaseMessagingTypes.AuthorizationStatus) => {
    if (status === 1) {
      console.log('Authorized');
    } else {
      console.log('Not authorized');
    }
  })
  .catch(e => console.log(e));

};


