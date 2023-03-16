import {
  FETCH_ALBUM_LIST,
  FETCH_ALBUM_LIST_SUCCESS,
  FETCH_ALBUM_LIST_ERROR,
  EMPTY_ALL_DATA,
  FETCH_ALBUM_DETAIL,
  FETCH_ALBUM_DETAIL_SUCCESS,
  FETCH_ALBUM_DETAIL_FAILED,
} from './actionTypes';

export interface Pager {
  current_page: number;
  total_pages: number;
  items_per_page: string;
}

export interface AlbumListItemType {
  nid: string;
  title: string;
  published_at_export: Date | null;
  created: Date | null;
  field_publication_date_export: Date | null;
  type: string;
  field_album_img_export: string | null;
  field_album_source_export: string | null;
  isBookmarked: boolean;
}

export interface AlbumDetailType {
  nid: string;
  title: string;
  body_export: string;
  created: Date | null;
  created_export: Date | null;
  type: string;
  view_node: string;
  field_album_img_export: string | null;
  field_photo_album_export: string[] | null;
  field_album_source_export: string[] | null;
  isBookmarked: boolean;
  field_photo_album_export_1: string[] | null;
  field_shorturl: string;
  link_node: string;
}

export type payloadType = {rows: AlbumListItemType[]; pager: Pager};

export type detailPayloadType = {rows: AlbumDetailType[]; pager: Pager};

export interface AlbumListBodyGet {
  page: number;
  items_per_page?: number;
}
export interface AlbumDetailBodyGet {
  nid: number;
}

export interface FetchAlbumListSuccessPayloadType {
  rows: AlbumListItemType[];
  pager: Pager;
}

export interface FetchAlbumDetailSuccessPayloadType {
  rows: AlbumDetailType[];
  pager: Pager;
}

export interface FetchAlbumListFailedPayloadtype {
  error: string;
}
export interface FetchAlbumDetailFailedPayloadtype {
  error: string;
}

export type FetchAlbumListType = {
  type: typeof FETCH_ALBUM_LIST;
  payload: AlbumListBodyGet;
};

export type FetchAlbumDetailType = {
  type: typeof FETCH_ALBUM_DETAIL;
  payload: AlbumDetailBodyGet;
};

export type FetchAlbumListSuccessType = {
  type: typeof FETCH_ALBUM_LIST_SUCCESS;
  payload: FetchAlbumListSuccessPayloadType;
};

export type FetchAlbumDetailSuccessType = {
  type: typeof FETCH_ALBUM_DETAIL_SUCCESS;
  payload: FetchAlbumDetailSuccessPayloadType;
};

export type FetchAlbumListFailedType = {
  type: typeof FETCH_ALBUM_LIST_ERROR;
  payload: FetchAlbumListFailedPayloadtype;
};

export type FetchAlbumDetailFailedType = {
  type: typeof FETCH_ALBUM_DETAIL_FAILED;
  payload: FetchAlbumDetailFailedPayloadtype;
};

export type AlbumListState = {
  albumData: payloadType;
  error: string;
  isLoading: boolean;
  albumDetailData: detailPayloadType;
  albumDetailError: string;
  albumDetailLoading: boolean;
};

export type emptyAllData = {
  type: typeof EMPTY_ALL_DATA;
};

export type AlbumListActions =
  | FetchAlbumListType
  | FetchAlbumListSuccessType
  | FetchAlbumListFailedType
  | FetchAlbumDetailType
  | FetchAlbumDetailSuccessType
  | FetchAlbumDetailFailedType
  | emptyAllData;
