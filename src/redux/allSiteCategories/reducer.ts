import {
  FETCH_ALL_SITE_CATEGORIES,
  FETCH_ALL_SITE_CATEGORIES_SUCCESS,
  FETCH_ALL_SITE_CATEGORIES_ERROR,
} from './actionTypes';
import { AllSiteCategoriesActions, AllSiteCategoriesState } from './types';

const initialState: AllSiteCategoriesState = {
  allSiteCategoriesData: [],
  error: '',
  isLoading: false,
};

export default (state = initialState, action: AllSiteCategoriesActions) => {
  switch (action.type) {
    case FETCH_ALL_SITE_CATEGORIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allSiteCategoriesData: action.payload.allSiteCategoriesListData,
        error: '',
      };
    case FETCH_ALL_SITE_CATEGORIES_ERROR:
      return { ...state, error: action.payload.error, isLoading: false };
    case FETCH_ALL_SITE_CATEGORIES:
      return { ...state, isLoading: true, error: '' };
    default:
      return { ...state };
  }
};