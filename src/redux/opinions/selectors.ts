import {AppState, Selector} from 'src/redux/rootReducer';
import {OpinionsListItemType} from './types';

export const getIsLoading: Selector<boolean> = (state: AppState) =>
  state.opinionsReducer.isLoading;

export const getOpinionsData: Selector<OpinionsListItemType[]> = (
  state: AppState,
) => state.opinionsReducer.opinionData.rows;

export const getOpinionsError: Selector<string> = (state: AppState) =>
  state.opinionsReducer.error;
