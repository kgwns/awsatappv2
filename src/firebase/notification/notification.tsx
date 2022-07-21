import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import '@react-native-firebase/messaging';
import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { useNotificationSaveToken } from 'src/hooks';
import { SaveTokenBodyType } from 'src/redux/notificationSaveToken/types';

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

    useEffect(() => {
        getToken();
    }, []);

  return <></>;
};