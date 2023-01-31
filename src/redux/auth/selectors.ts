import { AppState, Selector } from 'src/redux/rootReducer';

export const getIsLoading: Selector<boolean> = (state: AppState) =>
  state.emailCheck.isLoading;

export const getEmailCheckData: Selector<any> = (state: AppState) =>
  state.emailCheck.emailCheckData;

export const getEmailCheckError: Selector<string> = (state: AppState) =>
  state.emailCheck.error;
