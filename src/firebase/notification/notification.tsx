import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import '@react-native-firebase/messaging';
import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { useNotificationSaveToken } from 'src/hooks';
import { SaveTokenBodyType } from 'src/redux/notificationSaveToken/types';
import firebase from '@react-native-firebase/app';
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { isAndroid } from 'src/shared/utils';

export const GetFCMToken = () => {

    const { saveTokenRequest } = useNotificationSaveToken();
    var deviceOS = Platform.OS;
    var deviceName = DeviceInfo.getDeviceId();

    const getToken = () => {
        messaging()
        .getToken()
        .then((x) => {
            var requestObject: SaveTokenBodyType = {
                fcm_token: x,
                platform: deviceOS,
                device_name: deviceName
            }
            saveTokenRequest(requestObject);
        })
        .catch(e => console.log(e));
    };

    const onMessage = () => {
        firebase.messaging().onMessage(response => {
            if (isAndroid) {
                showNotification(response.notification!);
                return;
            }
            PushNotificationIOS.requestPermissions().then(() =>
                showNotification(response.notification!),
            );
        });
    }

    useEffect(() => {
        getToken();
        onMessage();
    }, []);

    const showNotification = (notification: FirebaseMessagingTypes.Notification) => {
        PushNotification.localNotification({ title: notification.title, message: notification.body!, });
    }; 

  return <></>;
};