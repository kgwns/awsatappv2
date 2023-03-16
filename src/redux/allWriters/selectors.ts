import { AppState, Selector } from 'src/redux/rootReducer';
import { AllWritersItemType, ResponseMessage,SelectedAuthorDataType } from './types';

export const getIsLoading: Selector<boolean> = (state: AppState) =>
  state.allWriters.isLoading;

export const getAllWritersData: Selector<AllWritersItemType[]> = (
  state: AppState,
) => state.allWriters.allWritersData.rows;

export const getSentAuthorInfoData: Selector<ResponseMessage> = (
  state: AppState,
) => state.allWriters.sendAuthorInfo;

export const getSelectedAuthorsDataList: Selector<SelectedAuthorDataType> = (
  state: AppState,
) => state.allWriters.selectedAuthorsData;

export const getAllWritersError: Selector<string> = (state: AppState) =>
  state.allWriters.error;

export const getSelectedAllWritersDetailsData: Selector<AllWritersItemType[]> = (
  state: AppState,
) => state.allWriters.allSelectedWritersDetailsList.rows;

export const getSelectedAuthorLoading: Selector<boolean> = (
  state: AppState
) => state.allWriters.selectedAuthorLoading
