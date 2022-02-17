import { AppState, Selector } from 'src/redux/rootReducer';
import { AllWritersItemType } from './types';

export const getIsLoading: Selector<boolean> = (state: AppState) =>
  state.allWriters.isLoading;

export const getAllWritersData: Selector<AllWritersItemType[]> = (
  state: AppState,
) => state.allWriters.allWritersData.rows;

export const getAllWritersError: Selector<string> = (state: AppState) =>
  state.allWriters.error;