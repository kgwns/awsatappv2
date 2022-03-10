import { AppState, Selector } from 'src/redux/rootReducer';
import { GetSelectedNotificationSuccessPayload, SendSelectedNotificationSuccessPayload } from './types';

export const getIsLoading: Selector<boolean> = (state: AppState) =>
  state.keepNotified.isLoading;

export const sendSelectedNotificationSuccessInfo: Selector<SendSelectedNotificationSuccessPayload> = (state: AppState) =>
  state.keepNotified.sendSelectedNotificationInfo;

export const getSelectedNotificationSuccessInfo: Selector<GetSelectedNotificationSuccessPayload> = (state: AppState) =>
  state.keepNotified.getSelectedNotificationInfo;

export const sendSelectedNotificationErrorInfo: Selector<string> = (state: AppState) =>
  state.keepNotified.sendSelectedError;
