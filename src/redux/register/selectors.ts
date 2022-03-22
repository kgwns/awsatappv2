import {AppState, Selector} from '../rootReducer';
import {RegisterSuccessPayloadType} from './types';

export const getIsLoading: Selector<boolean> = (state: AppState) =>
  state.register.isLoading;

export const getRegisterUserInfo: Selector<RegisterSuccessPayloadType | null> =
  (state: AppState) => state.register.userInfo;

export const getRegisterError: Selector<string> = (state: AppState) =>
  state.register.error;

export const getSocialLoginInProgress: Selector<boolean> = (state: AppState) =>
  state.register.socialLoginInProgress;
