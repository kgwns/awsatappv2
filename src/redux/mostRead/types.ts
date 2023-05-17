import {
  FETCH_MOST_READ,
  FETCH_MOST_READ_SUCCESS,
  FETCH_MOST_READ_ERROR,
} from './actionTypes';

export interface FieldNewsCategoriesExportType {
  id: string;
  title: string;
  url: string;
  bundle: string;
  name: string;
}

export interface MostReadItemType {
  nid: string;
  title: string;
  body: string;
  field_image: string;
  view_node: string;
  field_news_categories_export: FieldNewsCategoriesExportType[];
  field_publication_date_export: string;
}

export interface FetchMostReadSuccessPayloadType {
  mostReadData: any;
}
export interface FetchMostReadArticlesSuccessPayloadType {
  articleId: string;
}

export interface FetchMostReadFailedPayloadtype {
  error: string;
}

export type MostReadState = {
  mostReadData: MostReadItemType[];
  error: string;
  isLoading: boolean;
}

export type FetchMostReadType = {
  type: typeof FETCH_MOST_READ;
};

export type FetchMostReadSuccessType = {
  type: typeof FETCH_MOST_READ_SUCCESS;
  payload: FetchMostReadSuccessPayloadType;
};

export type FetchMostReadFailedType = {
  type: typeof FETCH_MOST_READ_ERROR;
  payload: FetchMostReadFailedPayloadtype;
};

export type MostReadActions =
  | FetchMostReadType
  | FetchMostReadSuccessType
  | FetchMostReadFailedType;
