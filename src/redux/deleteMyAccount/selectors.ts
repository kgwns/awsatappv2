import { AppState, Selector } from 'src/redux/rootReducer';
import { DMAIntroductionItemType } from './types';

export const getIsLoading: Selector<boolean> = (state: AppState) =>
  state.deleteMyAccount.isLoading;

export const getDMAIntroductionData: Selector<DMAIntroductionItemType[]> = (state: AppState) =>
  state.deleteMyAccount.dmaIntroductionData.rows;

export const getDMAIntroductionError: Selector<string> = (state: AppState) =>
  state.deleteMyAccount.error;
