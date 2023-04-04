import { AppState, Selector } from 'src/redux/rootReducer';
import { ResponseMessage } from '../allWriters/types';
import { AllSiteCategoriesItemType,SelectedTopicsDataType } from './types';

export const getIsLoading: Selector<boolean> = (state: AppState) =>
  state.allSiteCategories.isLoading;

export const getAllSiteCategoriesData: Selector<AllSiteCategoriesItemType[]> = (
  state: AppState,
) => state.allSiteCategories.allSiteCategoriesData.rows;

export const getTopicsData: Selector<ResponseMessage> = (
  state: AppState,
) => state.allSiteCategories.sendTopicInfo;

export const getSelectedTopicsDataList: Selector<SelectedTopicsDataType> = (
  state: AppState,
) => state.allSiteCategories.selectedTopicsData;

export const getAllSiteCategoriesError: Selector<string> = (state: AppState) =>
  state.allSiteCategories.error;
