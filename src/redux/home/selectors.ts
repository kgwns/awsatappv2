import {AppState, Selector} from 'src/redux/rootReducer';

export const getIsLoading: Selector<boolean> = (state: AppState) =>
  state.home.isLoading;

export const getHomeData: Selector<string> = (state: AppState) =>
  state.home.homeData.homeData;

export const getHomeError: Selector<string> = (state: AppState) =>
  state.home.error;
