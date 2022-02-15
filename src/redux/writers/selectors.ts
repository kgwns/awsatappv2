import {AppState, Selector} from 'src/redux/rootReducer';
import {OpinionWriterItemType} from './types';

export const getIsLoading: Selector<boolean> = (state: AppState) =>
  state.opinionWriter.isLoading;

export const getOpinionWriterData: Selector<OpinionWriterItemType[]> = (
  state: AppState,
) => state.opinionWriter.opinionWriterData.rows;

export const getOpinionWriterError: Selector<string> = (state: AppState) =>
  state.opinionWriter.error;
