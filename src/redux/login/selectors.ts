import { AppState, Selector } from 'src/redux/rootReducer';

export const getIsLoading: Selector<boolean> = (state: AppState) =>
  state.login.isLoading;

export const getLoginData: Selector<any> = (state: AppState) =>
  state.login.loginData;

export const getLoginError: Selector<string> = (state: AppState) =>
  state.login.error;

export const getIsSkipped: Selector<boolean> = (state: AppState) =>
  state.login.isSkipped;

export const getForgotPasswordResponse: Selector<any> = (state: AppState) =>
  state.login.forgotPasswordResponse;
