import { AppState, Selector } from 'src/redux/rootReducer';
import { AllWritersItemType, ResponseMessage } from './types';

export const getIsLoading: Selector<boolean> = (state: AppState) =>
  state.allWriters.isLoading;

export const getAllWritersData: Selector<AllWritersItemType[]> = (
  state: AppState,
) => state.allWriters.allWritersData.rows;

export const getSentAuthorInfoData: Selector<ResponseMessage> = (
  state: AppState,
) => state.allWriters.sendAuthorInfo;

export const getAllWritersError: Selector<string> = (state: AppState) =>
  state.allWriters.error;