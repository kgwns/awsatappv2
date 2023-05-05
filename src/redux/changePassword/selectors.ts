import { AppState, Selector } from 'src/redux/rootReducer';
import { SendNewPasswordSuccessPayloadType } from './types';

export const getIsLoading: Selector<boolean> = (state: AppState) =>
  state.changePassword.isLoading;

export const getNewPassword: Selector<SendNewPasswordSuccessPayloadType | null> =
  (state: AppState) => state.changePassword.response

export const getNewPasswordError: Selector<string> = (state: AppState) =>
  state.changePassword.error;
