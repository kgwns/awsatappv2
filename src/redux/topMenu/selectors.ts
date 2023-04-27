import { AppState, Selector } from 'src/redux/rootReducer';
import { TopMenuItemType } from './types';

export const getIsLoading: Selector<boolean> = (state: AppState) =>
  state.topMenu.isLoading;

export const getTopMenuData: Selector<TopMenuItemType[]> = (state: AppState) =>
  state.topMenu.topMenuData;

export const getTopMenuError: Selector<string> = (state: AppState) =>
  state.topMenu.error;
