import { AppState, Selector } from 'src/redux/rootReducer';
import { AllSiteCategoriesItemType } from './types';

export const getIsLoading: Selector<boolean> = (state: AppState) =>
  state.allSiteCategories.isLoading;

export const getAllSiteCategoriesData: Selector<AllSiteCategoriesItemType[]> = (
  state: AppState,
) => state.allSiteCategories.allSiteCategoriesData.rows;

export const getAllSiteCategoriesError: Selector<string> = (state: AppState) =>
  state.allSiteCategories.error;