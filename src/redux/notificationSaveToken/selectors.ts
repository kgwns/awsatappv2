import {AppState, Selector} from '../rootReducer';
import {SaveTokenAfterRegistraionSuccessPayloadType, SaveTokenSuccessPayloadType} from './types';

export const getIsLoading: Selector<boolean> = (state: AppState) =>
  state.notificationSaveToken.isLoading;

export const getSaveTokenInfo: Selector<SaveTokenSuccessPayloadType | null> = (
  state: AppState,
) => state.notificationSaveToken.SaveTokenInfo;

export const getSaveTokenAfterRegistrationInfo: Selector<SaveTokenAfterRegistraionSuccessPayloadType | null> = (
  state: AppState,
) => state.notificationSaveToken.SaveTokenAfterRegistraionInfo;

export const getSaveTokenError: Selector<string> = (state: AppState) =>
  state.notificationSaveToken.error;
