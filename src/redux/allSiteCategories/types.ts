import {
  FETCH_ALL_SITE_CATEGORIES,
  FETCH_ALL_SITE_CATEGORIES_SUCCESS,
  FETCH_ALL_SITE_CATEGORIES_ERROR,
} from './actionTypes';

export type payloadType = { rows: any[]; pager: object };

export interface AllSiteCategoriesItemType {
  name: string;
  description__value_export?: any;
  field_opinion_writer_path_export?: any;
  view_taxonomy_term: string;
  tid: string;
  vid_export?: any;
  field_description_export?: any;
  field_opinion_writer_path_export_1?: any;
  field_opinion_writer_photo_export: string;
  parent_target_id_export: any;
  isSelected?: boolean;
}

export interface AllSiteCategoriesBodyGet {
  items_per_page: number;
}

export interface FetchAllSiteCategoriesListSuccessPayloadType {
  allSiteCategoriesListData: any;
}

export interface FetchAllSiteCategoriesListFailedPayloadtype {
  error: string;
}

export type AllSiteCategoriesState = {
  allSiteCategoriesData: AllSiteCategoriesItemType[];
  error: string;
  isLoading: boolean;
};

export type FetchAllSiteCategoriesType = {
  type: typeof FETCH_ALL_SITE_CATEGORIES;
  payload: AllSiteCategoriesBodyGet;
};

export type FetchAllSiteCategoriesSuccessType = {
  type: typeof FETCH_ALL_SITE_CATEGORIES_SUCCESS;
  payload: FetchAllSiteCategoriesListSuccessPayloadType;
};

export type FetchAllSiteCategoriesFailedType = {
  type: typeof FETCH_ALL_SITE_CATEGORIES_ERROR;
  payload: FetchAllSiteCategoriesListFailedPayloadtype;
};

export type AllSiteCategoriesActions =
  | FetchAllSiteCategoriesType
  | FetchAllSiteCategoriesSuccessType
  | FetchAllSiteCategoriesFailedType;