import { AppState, Selector } from 'src/redux/rootReducer';
import { DMAIntroductionItemType, DMAOptionsListItemType } from './types';

export const getIsLoading: Selector<boolean> = (state: AppState) =>
  state.deleteMyAccount.isLoading;

export const getDMAIntroductionData: Selector<DMAIntroductionItemType[]> = (state: AppState) =>
  state.deleteMyAccount.dmaIntroductionData.rows;

export const getDMAIntroductionError: Selector<string> = (state: AppState) =>
  state.deleteMyAccount.error;

export const getDMAOptionsListData: Selector<DMAOptionsListItemType[]> = (state: AppState) =>
  state.deleteMyAccount.dmaOptionsListData.data;

export const getDMAOptionsListError: Selector<string> = (state: AppState) =>
  state.deleteMyAccount.error;
