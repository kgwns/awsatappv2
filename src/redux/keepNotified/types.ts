import {
  SEND_SELECTED_NOTIFICATION, 
  SEND_SELECTED_NOTIFICATION_SUCCESS, 
  SEND_SELECTED_NOTIFICATION_FAILED, 
  GET_SELECTED_NOTIFICATION, 
  GET_SELECTED_NOTIFICATION_SUCCESS, 
  GET_SELECTED_NOTIFICATION_FAILED, 
  REMOVE_NOTIFICATION_INFO, 
  REMOVE_SELECTED_NOTIFICATION, 
  GET_LIST_OF_NOTIFICATION, 
  GET_LIST_OF_NOTIFICATION_SUCCESS, 
  GET_LIST_OF_NOTIFICATION_FAILED
} from "./actionType"

export interface KeepNotifiedState {
  isLoading: boolean,
  sendSelectedNotificationInfo: SendSelectedNotificationSuccessPayload
  sendSelectedError: string,
  getSelectedNotificationInfo: GetSelectedNotificationSuccessPayload
  getSelectedError: string;
  allNotificationList: GetListOfNotificationSuccessPayload;
  allNotificationListError: string;
  isMyNotificationLoading: boolean;
}

export interface SendSelectedNotificationBody {
  tid: string
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

export type GetSelectedNotificationDataType = {
  nid: number,
}

export type GetSelectedNotificationSuccessPayload = {
  code?: number,
  message?: string,
  data?: any
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

export interface RemoveSelectedNotificationInfoType {
  type: typeof REMOVE_SELECTED_NOTIFICATION
}


export interface GetListOfNotificationType {
  type: typeof GET_LIST_OF_NOTIFICATION
}


export type NotificationDataType = {
  tid: number,
  name: string,
  selected: boolean
}

export type GetListOfNotificationSuccessPayload = {
  code?: number,
  message?: string,
  data?: any,
  rows?: any
}


export interface GetListOfNotificationSuccessType {
  type: typeof GET_LIST_OF_NOTIFICATION_SUCCESS,
  payload: GetListOfNotificationSuccessPayload
}

export interface GetListOfNotificationFailedPayload {
  error: string
}

export interface GetListOfNotificationFailedType {
  type: typeof GET_LIST_OF_NOTIFICATION_FAILED,
  payload: GetListOfNotificationFailedPayload
}

export type KeepNotifiedAction =
  SendSelectedNotificationType
  | SendSelectedNotificationSuccessType
  | SendSelectedNotificationFailedType
  | GetSelectedNotificationType
  | GetSelectedNotificationSuccessType
  | GetSelectedNotificationFailedType
  | RemoveNotificationInfoType
  | RemoveSelectedNotificationInfoType
  | GetListOfNotificationType
  | GetListOfNotificationSuccessType
  | GetListOfNotificationFailedType
