import {
  FetchAllSiteCategoriesListSuccessPayloadType,
  FetchAllSiteCategoriesListFailedPayloadtype,
  FetchAllSiteCategoriesSuccessType,
  FetchAllSiteCategoriesFailedType,
  AllSiteCategoriesBodyGet,
} from 'src/redux/allSiteCategories/types';
import {
  FETCH_ALL_SITE_CATEGORIES,
  FETCH_ALL_SITE_CATEGORIES_SUCCESS,
  FETCH_ALL_SITE_CATEGORIES_ERROR,
} from 'src/redux/allSiteCategories/actionTypes';

export const fetchAllSiteCategories = (payload: AllSiteCategoriesBodyGet) => {
  return {
    type: FETCH_ALL_SITE_CATEGORIES,
    payload,
  };
};

export const fetchAllSiteCategoriesSuccess = (
  payload: FetchAllSiteCategoriesListSuccessPayloadType,
): FetchAllSiteCategoriesSuccessType => {
  return {
    type: FETCH_ALL_SITE_CATEGORIES_SUCCESS,
    payload,
  };
};

export const fetchAllSiteCategoriesFailed = (
  payload: FetchAllSiteCategoriesListFailedPayloadtype,
): FetchAllSiteCategoriesFailedType => {
  return {
    type: FETCH_ALL_SITE_CATEGORIES_ERROR,
    payload,
  };
};

export const allSiteCategoriesActions = {
  fetchAllSiteCategories,
  fetchAllSiteCategoriesSuccess,
  fetchAllSiteCategoriesFailed,
};