import {
  FETCH_ALL_WRITERS,
  FETCH_ALL_WRITERS_SUCCESS,
  FETCH_ALL_WRITERS_ERROR,
  SEND_SELECTED_AUTHOR_ERROR,
  SEND_SELECTED_AUTHOR_SUCCESS,
  SEND_SELECTED_AUTHOR,
  GET_SELECTED_AUTHOR,
  GET_SELECTED_AUTHOR_SUCCESS,
  GET_SELECTED_AUTHOR_ERROR,
  EMPTY_SELECTED_AUTHORS_INFO,
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

export interface SendSelectedAuthorSuccessPayloadType {
  saveData: ResponseMessage;
}

export interface SendSelectedAuthorFailedPayloadtype {
  error: string;
}

export interface SendSelectedAuthorBody {
  tid: string
}

export interface ResponseMessage {
  code?: number,
  message?: string
}

export interface GetDataType{
  tid:number,
  created_date:string,
}
export interface SelectedAuthorDataType{
  code?: number,
  message?: string,
  data?:any,
}

export interface GetSelectedAuthorSuccessPayloadType {
  selectedAuthorsData: any;
}

export interface GetSelectedAuthorFailedPayloadtype {
  error: string;
}

export type AllWritersState = {
  allWritersData: AllWritersItemType[];
  error: string;
  isLoading: boolean;
  sendAuthorInfo: ResponseMessage;
  selectedAuthorsData: SelectedAuthorDataType;
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


export type SendSelectedAuthorType = {
  type: typeof SEND_SELECTED_AUTHOR;
  payload: SendSelectedAuthorBody;
};

export type SendSelectedAuthorSuccessType = {
  type: typeof SEND_SELECTED_AUTHOR_SUCCESS;
  payload: SendSelectedAuthorSuccessPayloadType;
};

export type SendSelectedAuthorFailedType = {
  type: typeof SEND_SELECTED_AUTHOR_ERROR;
  payload: SendSelectedAuthorFailedPayloadtype;
};

export type GetSelectedAuthorType = {
  type: typeof GET_SELECTED_AUTHOR;
};

export type GetSelectedAuthorSuccessType = {
  type: typeof GET_SELECTED_AUTHOR_SUCCESS;
  payload: GetSelectedAuthorSuccessPayloadType;
};

export type GetSelectedAuthorFailedType = {
  type: typeof GET_SELECTED_AUTHOR_ERROR;
  payload: GetSelectedAuthorFailedPayloadtype;
};

export type EmptySelectedAuthorsInfo = {
  type: typeof EMPTY_SELECTED_AUTHORS_INFO;
};

export type AllWritersActions =
  | FetchAllWritersType
  | FetchAllWritersSuccessType
  | FetchAllWritersFailedType
  | SendSelectedAuthorType
  | SendSelectedAuthorSuccessType
  | SendSelectedAuthorFailedType
  | GetSelectedAuthorType
  | GetSelectedAuthorSuccessType
  | GetSelectedAuthorFailedType
  | EmptySelectedAuthorsInfo;