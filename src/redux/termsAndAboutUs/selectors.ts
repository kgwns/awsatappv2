import { AppState, Selector } from 'src/redux/rootReducer';
import { StaticDetailDataType } from './types';

export const getIsLoading: Selector<boolean> = (state: AppState) =>
  state.termsAndAboutUs.isLoading;

export const getData: Selector<StaticDetailDataType[]> = (state: AppState) =>
  state.termsAndAboutUs.data;

export const getError: Selector<string> = (state: AppState) =>
  state.termsAndAboutUs.error;
