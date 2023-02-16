import React, {useEffect} from 'react';
import messaging, {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {useNotificationSaveToken} from 'src/hooks';
import {SaveTokenBodyType} from 'src/redux/notificationSaveToken/types';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {isIOS} from 'src/shared/utils';
import {notification, ScreensConstants} from 'src/constants/Constants';
import {navigate} from 'src/navigation/NavigationUtils';
import notifee, {AndroidImportance, EventDetail, EventType} from '@notifee/react-native';
import { firebase } from '@react-native-firebase/remote-config'

async function onDisplayNotification(
  remoteMessage: FirebaseMessagingTypes.RemoteMessage,
) {
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
    },
  });
}

export const GetFCMToken = () => {
  const {saveTokenRequest} = useNotificationSaveToken();
  var deviceOS = Platform.OS;
  var deviceName = DeviceInfo.getDeviceId();

  const getToken = () => {
    messaging()
      .getToken()
      .then(x => {
        var requestObject: SaveTokenBodyType = {
          fcm_token: x,
          platform: deviceOS,
          device_name: deviceName,
        };
        saveTokenRequest(requestObject);
      })
      .catch(e => console.log(e));
  };

  const dynamicSection = (
    remoteMessage: FirebaseMessagingTypes.RemoteMessage,
  ) => {
    const result = firebase.remoteConfig().getValue('arabic')._value;
    const arabic = JSON.parse(result || '');
    const displayId = arabic.notification;
    const found = displayId.find(
      (obj: any) => obj.id.toString() === remoteMessage?.data?.id,
    );
    return found.title;
  };

  const onOpenNotification = (
    remoteMessage: FirebaseMessagingTypes.RemoteMessage,
  ) => {
    if ((!remoteMessage) || (!remoteMessage?.data)) {
      return
    }
    switch (remoteMessage.data?.type) {
      case notification.ARTICLE:
        navigate(ScreensConstants.ARTICLE_DETAIL_SCREEN, {
          nid: remoteMessage.data.id,
        });
        break
      case notification.OPINION:
        navigate(ScreensConstants.OPINION_ARTICLE_DETAIL_SCREEN, {
          nid: remoteMessage.data.id,
        });
        break
      case notification.DYNAMIC_SECTION:
        dynamicSection(remoteMessage);
        navigate(ScreensConstants.SectionArticlesParentScreen, {
          title: dynamicSection(remoteMessage),
          keyName: notification.KEYNAME,
          sectionId: remoteMessage.data.id,
        });
        break
      default:
        return
    }
  }

  const notifeeEvents = (type: EventType, detail: EventDetail) => {
    const { notification, pressAction } = detail;
    switch (type) {
      case EventType.DISMISSED:
        break;
      case EventType.PRESS:
        onOpenNotification(notification);
        break;
    }
  }
  
  useEffect(() => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      onOpenNotification(remoteMessage);
    });

    getToken();

    messaging()
      //When Application open from quit state
      .getInitialNotification()
      .then(remoteMessage => {
        onOpenNotification(remoteMessage!);
      });

    notifee.onForegroundEvent(async ({ type, detail }) => {
      notifeeEvents(type, detail)
    });

    notifee.onBackgroundEvent(async ({ type, detail }) => {
      notifeeEvents(type, detail)
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('onNotificationOpenedApp***',remoteMessage)
    });

    return messaging().onMessage(async remoteMessage => {
      onDisplayNotification(remoteMessage);
    });
  }, []);

  useEffect(() => {
    if (!isIOS) {
      return;
    }
    messaging().onMessage(response => {
      PushNotificationIOS.requestPermissions().then(
        () => showNotification(response.notification!),
      );
    });
    PushNotificationIOS.addEventListener('register', token => {
      getToken();
    });

    PushNotificationIOS.addEventListener('localNotification', notification => {
      onOpenNotification(notification);
    });

    PushNotificationIOS.addEventListener(
      'notification',
      function (notification) {
        onOpenNotification(notification);
      },
    );

    return () => {
      PushNotificationIOS.removeEventListener('register');
      PushNotificationIOS.removeEventListener('registrationError');
      PushNotificationIOS.removeEventListener('notification');
    };
  }, []);

  const showNotification = (
    notification: FirebaseMessagingTypes.Notification,
  ) => {
    PushNotification.localNotification({
      title: notification.title,
      message: notification.body!,
      channelId: notification.android?.channelId,
    });
  };
  
  return <></>;
};

export const registerBackgroundPushNotification = () => {
  // Register background handler
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    onDisplayNotification(remoteMessage);
  });
};
