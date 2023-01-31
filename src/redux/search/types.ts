import {
  FETCH_SEARCH_SUCCESS,
  FETCH_SEARCH_ERROR,
  FETCH_SEARCH_REQUEST,
  UPDATE_SEARCH_HISTORY,
  CLEAR_SEARCH_HISTORY,
} from './actionTypes';

export interface SearchItemNewsCategory {
  id: string;
  title: string;
  url: string;
  bundle: string;
  name: string;
}
export interface SearchItemType {
  nid: string;
  title: string;
  field_image: string;
  view_node: string;
  field_publication_date_export: string;
  created_export: string;
  changed: string;
  field_news_categories_export: SearchItemNewsCategory[];
  type: string;
  body: string;
  field_new_photo: string;
}

export interface FetchSearchSuccessPayloadType {
  searchData: any;
}



export interface FetchSearchRequestPayloadType {
  searchText: string;
}

export interface FetchSearchFailedPayloadtype {
  error: string;
}

export interface SearchState {
  searchData: SearchItemType[];
  error: string;
  isLoading: boolean;
  searchHistory: string[];
}

export interface FetchSearchRequestType {
  type: typeof FETCH_SEARCH_REQUEST;
  payload: FetchSearchRequestPayloadType;
}

export type FetchSearchSuccessType = {
  type: typeof FETCH_SEARCH_SUCCESS;
  payload: FetchSearchSuccessPayloadType;
};

export type FetchSearchFailedType = {
  type: typeof FETCH_SEARCH_ERROR;
  payload: FetchSearchFailedPayloadtype;
};

export type UpdateSearchHistory = {
  type: typeof UPDATE_SEARCH_HISTORY;
  payload: string[]
}
export type ClearSearchHistory = {
  type: typeof CLEAR_SEARCH_HISTORY,
}

export type SearchActions =
  | FetchSearchSuccessType
  | FetchSearchFailedType
  | FetchSearchRequestType
  | UpdateSearchHistory
  | ClearSearchHistory;
