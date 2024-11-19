import React, {useEffect} from 'react';
import messaging, {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {useNotificationSaveToken} from 'src/hooks';
import {SaveTokenBodyType} from 'src/redux/notificationSaveToken/types';
import {isIOS, recordLogEvent} from 'src/shared/utils';
import {notification, ScreensConstants} from 'src/constants/Constants';
import { navigate, navigationDeferred } from 'src/navigation/NavigationUtils';
import notifee, {AndroidImportance, EventDetail, EventType} from '@notifee/react-native';
import { AnalyticsEvents } from 'src/shared/utils/analytics';
import { store } from 'src/redux/store';
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

export const checkNotificationPermission = () => {
  if (isIOS) {
    async function requestUserPermission() {
      await messaging().requestPermission();
    }
    requestUserPermission();
  }
}


export const GetFCMToken = () => {
  const {saveTokenRequest} = useNotificationSaveToken();
  const deviceOS = Platform.OS;
  const deviceName = DeviceInfo.getDeviceId();

  const getToken = () => {
    messaging()
      .getToken()
      .then(x => {
        const requestObject: SaveTokenBodyType = {
          fcm_token: x,
          platform: deviceOS,
          device_name: deviceName,
        };
        saveTokenRequest(requestObject);
      })
      .catch(e => console.log(e));
  };

  const onOpenNotification = (
    remoteMessage: FirebaseMessagingTypes.RemoteMessage,
  ) => {
    if ((!remoteMessage) || (!remoteMessage?.data)) {
      return
    }
    const { isSkipped, loginData } = store.getState().login;
    const isLoggedIn = loginData?.token?.access_token ? true : false
    if (isLoggedIn || isSkipped) {
      if (remoteMessage.data.data_key) {
        switch (remoteMessage.data?.type) {
          case notification.ARTICLE:
            navigate(ScreensConstants.ARTICLE_DETAIL_SCREEN, {
              nid: remoteMessage.data.data_key,
            });
            break
          case notification.OPINION:
            navigate(ScreensConstants.OPINION_ARTICLE_DETAIL_SCREEN, {
              nid: remoteMessage.data.data_key,
            });
            break
          case notification.ALBUM:
            navigate(ScreensConstants.PHOTO_GALLERY_DETAIL_SCREEN, {
              nid: remoteMessage.data.data_key,
            });
            break
          case notification.PODCAST:
            navigate(ScreensConstants.PODCAST_EPISODE_MODAL, {
              data: {
                nid: remoteMessage.data.data_key,
                isNotification: true
              }
            });
            break
          case notification.DYNAMIC_SECTION:
            navigate(ScreensConstants.SectionArticlesScreen, {
              title: '', // will replace sectionTitle once payload is ready
              keyName: notification.KEYNAME,
              sectionId: remoteMessage.data.data_key,
            });
            break
          case notification.ENTITY_QUEUE:
            navigate(ScreensConstants.EntityQueueListScreen, {
              title: '',  // will replace sectionTitle once payload is ready
              id: remoteMessage.data.data_key,
            });
            break
          default:
            const customData = {
              type: remoteMessage.data.type,
              data_key: remoteMessage.data.data_key,
              notification_id: remoteMessage.data.id
            }
            recordLogEvent(AnalyticsEvents.UNHANDLED_NOTIFICATION, customData);
            return
        }
      }
    }
  }

  const notifeeEvents = (type: EventType, detail: EventDetail) => {
    const { notification } = detail;
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
      .then( async remoteMessage => {
        navigationDeferred.promise.then(() => {
          onOpenNotification(remoteMessage);
        })
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

  return <></>;
};

export const registerBackgroundPushNotification = () => {
  // Register background handler
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    onDisplayNotification(remoteMessage);
  });
};
