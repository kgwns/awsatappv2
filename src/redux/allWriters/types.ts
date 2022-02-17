import {
  FETCH_ALL_WRITERS,
  FETCH_ALL_WRITERS_SUCCESS,
  FETCH_ALL_WRITERS_ERROR,
} from './actionTypes';

export type payloadType = { rows: any[]; pager: object };

export interface AllWritersItemType {
  name: string;
  description__value_export?: any;
  field_opinion_writer_path_export?: any;
  view_taxonomy_term: string;
  tid: string;
  vid_export?: any;
  field_description_export?: any;
  field_opinion_writer_path_export_1?: any;
  field_opinion_writer_photo_export: string;
  isSelected?: boolean;
}

export interface AllWritersBodyGet {
  items_per_page: number;
}

export interface FetchAllWritersListSuccessPayloadType {
  allWritersListData: any;
}

export interface FetchAllWritersListFailedPayloadtype {
  error: string;
}

export type AllWritersState = {
  allWritersData: AllWritersItemType[];
  error: string;
  isLoading: boolean;
};

export type FetchAllWritersType = {
  type: typeof FETCH_ALL_WRITERS;
  payload: AllWritersBodyGet;
};

export type FetchAllWritersSuccessType = {
  type: typeof FETCH_ALL_WRITERS_SUCCESS;
  payload: FetchAllWritersListSuccessPayloadType;
};

export type FetchAllWritersFailedType = {
  type: typeof FETCH_ALL_WRITERS_ERROR;
  payload: FetchAllWritersListFailedPayloadtype;
};

export type AllWritersActions =
  | FetchAllWritersType
  | FetchAllWritersSuccessType
  | FetchAllWritersFailedType;