import { AppState, Selector } from 'src/redux/rootReducer';
import { GetListOfNotificationSuccessPayload, GetSelectedNotificationSuccessPayload, SendSelectedNotificationSuccessPayload } from './types';

export const getIsLoading: Selector<boolean> = (state: AppState) =>
  state.keepNotified.isLoading;

export const sendSelectedNotificationSuccessInfo: Selector<SendSelectedNotificationSuccessPayload> = (state: AppState) =>
  state.keepNotified.sendSelectedNotificationInfo;

export const getSelectedNotificationSuccessInfo: Selector<GetSelectedNotificationSuccessPayload> = (state: AppState) =>
  state.keepNotified.getSelectedNotificationInfo;

export const sendSelectedNotificationErrorInfo: Selector<string> = (state: AppState) =>
  state.keepNotified.sendSelectedError;

export const getAllNotificationSuccessInfo: Selector<GetListOfNotificationSuccessPayload> = (state: AppState) =>
  state.keepNotified.allNotificationList;

export const getAllNotificationError: Selector<string> = (state: AppState) =>
  state.keepNotified.allNotificationListError;

export const getIsMyNotificationLoading: Selector<boolean> = (state: AppState) =>
  state.keepNotified.isMyNotificationLoading;
