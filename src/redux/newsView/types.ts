import { LatestArticleDataType } from '../latestNews/types';
import {
  REQUEST_BOTTOM_LIST_DATA,
  REQUEST_BOTTOM_LIST_FAILED,
  REQUEST_BOTTOM_LIST_SUCCESS,
  REQUEST_HERO_LIST_DATA,
  REQUEST_HERO_LIST_FAILED,
  REQUEST_HERO_LIST_SUCCESS,
  REQUEST_TOP_LIST_DATA,
  REQUEST_TOP_LIST_FAILED,
  REQUEST_TOP_LIST_SUCCESS,
  EMPTY_ALL_LIST,
} from './actionTypes';

export interface FieldNewsCategoriesExport {
  id: string;
  title: string;
  url: string;
  bundle: string;
  name: string;
}

export interface NewsViewListItemType {
  nid: string;
  title: string;
  body: string;
  field_image: string;
  view_node: string;
  field_news_categories_export: FieldNewsCategoriesExport;
  field_publication_date_export: Date;
  created_export: Date;
  changed: Date;
  author_resource: string;
  isBookmarked: boolean;
  field_new_photo: string;
  field_display_export?: string;
}

export interface Pager {
  current_page: number;
  items_per_page: string;
}

export interface PayloadType {
  rows: NewsViewListItemType[];
  pager: Pager;
}

export interface NewsViewBodyGet {
  items_per_page: number;
  page: number;
  offset: number;
  sectionId: number|null;
}

export interface FetchNewsViewSuccessPayloadType {
  newsViewData: any;
}

export interface FetchNewsViewFailedPayloadtype {
  error: string;
}

export interface FetchHeroListSuccessPayloadType {
  heroListData: any;
}

export interface FetchHeroListFailedPayloadtype {
  error: string;
}

export interface FetchTopListSuccessPayloadType {
  topListData: any;
}

export interface FetchTopListFailedPayloadtype {
  error: string;
}

export interface FetchBottomListSuccessPayloadType {
  bottomListData: any;
}

export interface FetchBottomListFailedPayloadtype {
  error: string;
}

export type NewsViewtState = {
  heroListData: PayloadType;
  topListData: LatestArticleDataType[];
  bottomListData: PayloadType;
  error: string;
  isLoading: boolean;
};

export type FetchHeroListType = {
  type: typeof REQUEST_HERO_LIST_DATA;
  payload: NewsViewBodyGet;
};

export type FetchHeroListSuccessType = {
  type: typeof REQUEST_HERO_LIST_SUCCESS;
  payload: FetchHeroListSuccessPayloadType;
};

export type FetchHeroListFailedType = {
  type: typeof REQUEST_HERO_LIST_FAILED;
  payload: FetchHeroListFailedPayloadtype;
};

export type FetchTopListType = {
  type: typeof REQUEST_TOP_LIST_DATA;
  payload: NewsViewBodyGet;
};

export type FetchTopListSuccessType = {
  type: typeof REQUEST_TOP_LIST_SUCCESS;
  payload: FetchTopListSuccessPayloadType;
};

export type FetchTopListFailedType = {
  type: typeof REQUEST_TOP_LIST_FAILED;
  payload: FetchTopListFailedPayloadtype;
};

export type FetchBottomListType = {
  type: typeof REQUEST_BOTTOM_LIST_DATA;
  payload: NewsViewBodyGet;
};

export type FetchBottomListSuccessType = {
  type: typeof REQUEST_BOTTOM_LIST_SUCCESS;
  payload: FetchBottomListSuccessPayloadType;
};

export type FetchBottomListFailedType = {
  type: typeof REQUEST_BOTTOM_LIST_FAILED;
  payload: FetchBottomListFailedPayloadtype;
};

export type EmptyAllList = {
  type: typeof EMPTY_ALL_LIST;
};

export type NewsViewActions =
  | FetchHeroListType
  | FetchHeroListSuccessType
  | FetchHeroListFailedType
  | FetchTopListType
  | FetchTopListSuccessType
  | FetchTopListFailedType
  | FetchBottomListType
  | FetchBottomListSuccessType
  | FetchBottomListFailedType
  | EmptyAllList;
