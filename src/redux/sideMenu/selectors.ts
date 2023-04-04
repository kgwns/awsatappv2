import { AppState, Selector } from 'src/redux/rootReducer';
import { SideMenuItemType } from './types';

export const getIsLoading: Selector<boolean> = (state: AppState) =>
  state.sideMenu.isLoading;

export const getSideMenuData: Selector<SideMenuItemType[]> = (state: AppState) =>
  state.sideMenu.sideMenuData;

export const getSideMenuError: Selector<string> = (state: AppState) =>
  state.sideMenu.error;
