import { AppState, Selector } from 'src/redux/rootReducer';
import { LoginItemType } from './types';

export const getIsLoading: Selector<boolean> = (state: AppState) =>
  state.login.isLoading;

export const getLoginData: Selector<LoginItemType[]> = (state: AppState) =>
  state.login.loginData;

export const getLoginError: Selector<string> = (state: AppState) =>
  state.login.error;