import {
  SEND_SELECTED_NOTIFICATION, SEND_SELECTED_NOTIFICATION_SUCCESS, SEND_SELECTED_NOTIFICATION_FAILED, GET_SELECTED_NOTIFICATION, GET_SELECTED_NOTIFICATION_SUCCESS, GET_SELECTED_NOTIFICATION_FAILED, REMOVE_NOTIFICATION_INFO
} from "./actionType"

export interface KeepNotifiedState {
  isLoading: boolean,
  sendSelectedNotificationInfo: SendSelectedNotificationSuccessPayload
  sendSelectedError: string,
  getSelectedNotificationInfo: GetSelectedNotificationSuccessPayload
  getSelectedError: string
}

export interface SendSelectedNotificationBody {
  nid: string
}

export interface SendSelectedNotificationType {
  type: typeof SEND_SELECTED_NOTIFICATION,
  payload: SendSelectedNotificationBody
}

export interface SendSelectedNotificationSuccessMessageType {
  code: number,
  message: string
}

export type SendSelectedNotificationSuccessPayload = {
  message?: SendSelectedNotificationSuccessMessageType
}


export interface SendSelectedNotificationSuccessType {
  type: typeof SEND_SELECTED_NOTIFICATION_SUCCESS,
  payload: SendSelectedNotificationSuccessPayload
}

export interface SendSelectedNotificationFailedPayload {
  error: string
}

export interface SendSelectedNotificationFailedType {
  type: typeof SEND_SELECTED_NOTIFICATION_FAILED,
  payload: SendSelectedNotificationFailedPayload
}


export interface GetSelectedNotificationType {
  type: typeof GET_SELECTED_NOTIFICATION
}

export type GetSelectedNotificationSuccessPayload = {
  code?: number,
  message?: string,
  data?: number[]
}


export interface GetSelectedNotificationSuccessType {
  type: typeof GET_SELECTED_NOTIFICATION_SUCCESS,
  payload: GetSelectedNotificationSuccessPayload
}

export interface GetSelectedNotificationFailedPayload {
  error: string
}

export interface GetSelectedNotificationFailedType {
  type: typeof GET_SELECTED_NOTIFICATION_FAILED,
  payload: GetSelectedNotificationFailedPayload
}

export interface RemoveNotificationInfoType {
  type: typeof REMOVE_NOTIFICATION_INFO
}


export type KeepNotifiedAction =
  SendSelectedNotificationType
  | SendSelectedNotificationSuccessType
  | SendSelectedNotificationFailedType
  | GetSelectedNotificationType
  | GetSelectedNotificationSuccessType
  | GetSelectedNotificationFailedType
  | RemoveNotificationInfoType