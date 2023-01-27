import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import '@react-native-firebase/messaging';
import {Alert, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { useNotificationSaveToken } from 'src/hooks';
import { SaveTokenBodyType } from 'src/redux/notificationSaveToken/types';
import firebase from '@react-native-firebase/app';
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { isAndroid, isIOS } from 'src/shared/utils';
import { ScreensConstants } from 'src/constants/Constants';
import { navigate, navigationRefernce } from 'src/navigation/NavigationUtils';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import { CustomAlert } from 'src/shared/utils/utilities';

async function onDisplayNotification(remoteMessage: FirebaseMessagingTypes.RemoteMessage) {
    const channelId = await notifee.createChannel({
        id: `${remoteMessage?.data?.locKey}`,
        name: 'Awsatapp',
        importance: AndroidImportance.HIGH,
    });


    await notifee.displayNotification({
        data: remoteMessage?.data,  
        title: remoteMessage.notification?.title,
        body: remoteMessage.notification?.body, 
        android: {
            channelId,
            pressAction: {
                id: 'default',
            },
        },

        ios: {
            critical: true,
        }
    });
}

export const GetFCMToken = () => {
    const { saveTokenRequest } = useNotificationSaveToken();
    var deviceOS = Platform.OS;
    var deviceName = DeviceInfo.getDeviceId();

    const getToken = () => {
        messaging()
        .getToken()
        .then((x) => {
            CustomAlert({
                message: 'x'
              })  
             console.log('token',x)       
             var requestObject: SaveTokenBodyType = {
                fcm_token: x,
                platform: deviceOS,
                device_name: deviceName
            }
            saveTokenRequest(requestObject);
        })
        .catch(e => console.log(e));
    };

    const onOpenNotification =  (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {        
        console.log('notify', remoteMessage);
        if (remoteMessage && remoteMessage.data && remoteMessage.data?.type == "article") {
            navigate(ScreensConstants.ARTICLE_DETAIL_SCREEN, {nid: remoteMessage.data.id});
        } else if (remoteMessage && remoteMessage.data && remoteMessage.data?.type == "opinion") {
            navigate(ScreensConstants.OPINION_ARTICLE_DETAIL_SCREEN, { nid: remoteMessage.data.id })
        }
        else if (remoteMessage && remoteMessage.data && remoteMessage.data?.type == "dynamic-section") {
            navigate(ScreensConstants.SectionArticlesParentScreen, { title: remoteMessage.data.title, 
                keyName: remoteMessage.data.keyname,
                sectionId:remoteMessage.data.sectionid
            })
        }
    }
    
    useEffect(() => {
        messaging().setBackgroundMessageHandler(async remoteMessage => {
            onOpenNotification(remoteMessage)
        });
       
        getToken();
      
        messaging()
            //When Application open from quit state
            .getInitialNotification()
            .then(remoteMessage => {
                onOpenNotification(remoteMessage!)
            });
        notifee.onForegroundEvent(async({ type, detail }) => {
            const { notification, pressAction } = detail;
            switch (type) {
                case EventType.DISMISSED:
                  console.log('User dismissed notification', notification?.data!);
                  break;
                case EventType.PRESS:
                  console.log('User pressed notification', notification?.data!);
                    onOpenNotification(notification)
                  break;
              }
          })

          notifee.onBackgroundEvent(async({ type, detail }) => {
            const { notification, pressAction } = detail;
            switch (type) {
                case EventType.DISMISSED:
                  console.log('User dismissed notification', notification?.data!);
                  break;
                case EventType.PRESS:
                  console.log('User pressed notification', notification?.data!);
                    onOpenNotification(notification)
                  break;
              }
          })
        messaging().onNotificationOpenedApp(remoteMessage => {
            console.log('notifeeeeee', "onNotificationOpenedApp")
        });

        const unsubscribe = messaging().onMessage(async remoteMessage => {
            onDisplayNotification(remoteMessage)
        });

        return unsubscribe;
    }, []);


    useEffect(() => {
        if (!isIOS) {
            return
        }
    messaging().onMessage(response => {
        PushNotificationIOS.requestPermissions().then(() =>
        showNotification(response.notification!),
        // onDisplayNotification(response.data!)
    );
});
        PushNotificationIOS.addEventListener('register', token => {
            console.log("Token>>>>>>>>>>>>>>>>>>>>>>>>>>>>", token)
            getToken();
        })

        PushNotificationIOS.addEventListener('localNotification', (notification) => {
            console.log("localNotification>>>>>>>>>>>>>>>>>>>>>>>>>>>>", notification)
            onOpenNotification(notification)
        })

        PushNotificationIOS.addEventListener('notification', function (notification) {
            console.log("notification>>>>>>>>>>>>>>>>>>>>>>>>>>>>", notification)
            onOpenNotification(notification)
        })
        
        return () => {
            PushNotificationIOS.removeEventListener('register')
            PushNotificationIOS.removeEventListener('registrationError')
            PushNotificationIOS.removeEventListener('notification')
        }
    }, [])

    const showNotification = (notification: FirebaseMessagingTypes.Notification) => {
        PushNotification.localNotification({ title: notification.title, message: notification.body!,channelId: notification.android?.channelId });
        console.log('DataNotification',notification);
    }; 
  return <></>;
};

export const registerBackgroundPushNotification = () => {
    // Register background handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
        onDisplayNotification(remoteMessage)
    });
}