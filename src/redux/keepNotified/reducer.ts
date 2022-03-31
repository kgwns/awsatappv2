import { GET_SELECTED_NOTIFICATION, GET_SELECTED_NOTIFICATION_FAILED, GET_SELECTED_NOTIFICATION_SUCCESS, REMOVE_NOTIFICATION_INFO, REMOVE_SELECTED_NOTIFICATION, SEND_SELECTED_NOTIFICATION, SEND_SELECTED_NOTIFICATION_FAILED, SEND_SELECTED_NOTIFICATION_SUCCESS } from './actionType';
import { KeepNotifiedState, KeepNotifiedAction } from './types';

const initialData: KeepNotifiedState = {
  isLoading: true,
  sendSelectedError: '',
  sendSelectedNotificationInfo: {},
  getSelectedNotificationInfo: {},
  getSelectedError: ''
};

export default (state = initialData, action: KeepNotifiedAction) => {
  switch (action.type) {
    case SEND_SELECTED_NOTIFICATION:
      return {
        ...state,
        isLoading: true,
        sendSelectedNotificationInfo: {}
      }
    case SEND_SELECTED_NOTIFICATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sendSelectedNotificationInfo: action.payload
      }
    case SEND_SELECTED_NOTIFICATION_FAILED:
      return {
        ...state,
        isLoading: false,
        sendSelectedError: action.payload.error
      }
    case GET_SELECTED_NOTIFICATION:
      return {
        ...state,
        isLoading: true,
        sendSelectedNotificationInfo: {}
      }
    case GET_SELECTED_NOTIFICATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        getSelectedNotificationInfo: action.payload
      }
    case GET_SELECTED_NOTIFICATION_FAILED:
      return {
        ...state,
        isLoading: false,
        getSelectedError: action.payload.error
      }
    case REMOVE_NOTIFICATION_INFO:
      return {
        ...initialData
      }
    case REMOVE_SELECTED_NOTIFICATION:
      return {
        ...state,
        sendSelectedNotificationInfo: {},
        getSelectedNotificationInfo: {}
      }
    default:
      return { ...state }
  }
}
