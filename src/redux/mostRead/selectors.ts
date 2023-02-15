import { AppState, Selector } from 'src/redux/rootReducer';
import { MostReadItemType } from './types';

export const getIsLoading: Selector<boolean> = (state: AppState) =>
  state.mostRead.isLoading;

export const getMostReadData: Selector<MostReadItemType[]> = (state: AppState) =>
  state.mostRead.mostReadData;

export const getMostReadError: Selector<string> = (state: AppState) =>
  state.mostRead.error;
