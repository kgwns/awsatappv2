import {
  GET_SELECTED_NOTIFICATION,
  GET_SELECTED_NOTIFICATION_FAILED,
  GET_SELECTED_NOTIFICATION_SUCCESS,
  SEND_SELECTED_NOTIFICATION,
  SEND_SELECTED_NOTIFICATION_FAILED,
  SEND_SELECTED_NOTIFICATION_SUCCESS,
  REMOVE_NOTIFICATION_INFO,
  REMOVE_SELECTED_NOTIFICATION,
  GET_LIST_OF_NOTIFICATION,
  GET_LIST_OF_NOTIFICATION_SUCCESS,
  GET_LIST_OF_NOTIFICATION_FAILED
} from "./actionType";
import {
  GetListOfNotificationFailedPayload,
  GetListOfNotificationFailedType,
  GetListOfNotificationSuccessPayload,
  GetListOfNotificationSuccessType,
  GetListOfNotificationType,
  GetSelectedNotificationFailedPayload,
  GetSelectedNotificationFailedType,
  GetSelectedNotificationSuccessPayload,
  GetSelectedNotificationSuccessType,
  GetSelectedNotificationType,
  RemoveSelectedNotificationInfoType,
  SendSelectedNotificationBody,
  SendSelectedNotificationFailedPayload,
  SendSelectedNotificationFailedType,
  SendSelectedNotificationSuccessPayload,
  SendSelectedNotificationSuccessType,
  SendSelectedNotificationType
} from "./types"

export const sendSelectedNotification = (
  payload: SendSelectedNotificationBody
): SendSelectedNotificationType => {
  return {
    type: SEND_SELECTED_NOTIFICATION,
    payload
  }
}

export const sendSelectedNotificationSuccess = (
  payload: SendSelectedNotificationSuccessPayload,
): SendSelectedNotificationSuccessType => {
  return {
    type: SEND_SELECTED_NOTIFICATION_SUCCESS,
    payload,
  };
};

export const sendSelectedNotificationFailed = (
  payload: SendSelectedNotificationFailedPayload,
): SendSelectedNotificationFailedType => {
  return {
    type: SEND_SELECTED_NOTIFICATION_FAILED,
    payload,
  };
};


export const getSelectedNotification = (): GetSelectedNotificationType => {
  return {
    type: GET_SELECTED_NOTIFICATION
  }
}

export const getSelectedNotificationSuccess = (
  payload: GetSelectedNotificationSuccessPayload,
): GetSelectedNotificationSuccessType => {
  return {
    type: GET_SELECTED_NOTIFICATION_SUCCESS,
    payload,
  };
};

export const getSelectedNotificationFailed = (
  payload: GetSelectedNotificationFailedPayload,
): GetSelectedNotificationFailedType => {
  return {
    type: GET_SELECTED_NOTIFICATION_FAILED,
    payload,
  };
};

export const removeNotificationInfo = () => {
  return {
    type: REMOVE_NOTIFICATION_INFO
  }
}

export const removeSelectedNotification = (): RemoveSelectedNotificationInfoType => {
  return {
    type: REMOVE_SELECTED_NOTIFICATION
  }
}


export const getListOfNotification = (): GetListOfNotificationType => {
  return {
    type: GET_LIST_OF_NOTIFICATION
  }
}

export const getListOfNotificationSuccess = (
  payload: GetListOfNotificationSuccessPayload
): GetListOfNotificationSuccessType => {
  return {
    type: GET_LIST_OF_NOTIFICATION_SUCCESS,
    payload
  };
};

export const getListOfNotificationFailed = (
  payload: GetListOfNotificationFailedPayload,
): GetListOfNotificationFailedType => {
  return {
    type: GET_LIST_OF_NOTIFICATION_FAILED,
    payload,
  };
};


export const homeActions = {
  sendSelectedNotification,
  sendSelectedNotificationSuccess,
  sendSelectedNotificationFailed,
  getSelectedNotification,
  getSelectedNotificationSuccess,
  getSelectedNotificationFailed,
  removeSelectedNotification,
  getListOfNotification,
  getListOfNotificationSuccess,
  getListOfNotificationFailed
};
