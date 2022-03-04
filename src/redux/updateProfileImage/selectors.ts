import { AppState, Selector } from '../rootReducer';
import { UpdateUserImageSuccessPayloadType } from './types';

export const getIsLoading: Selector<boolean> = (state: AppState) =>
  state.user.isLoading;

export const getUserInfo: Selector<UpdateUserImageSuccessPayloadType | null> =
  (state: AppState) => state.user.userDetail;

export const getUserError: Selector<string> = (state: AppState) =>
  state.user.error;
