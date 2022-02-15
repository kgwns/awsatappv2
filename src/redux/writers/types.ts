import {
  FETCH_OPINION_WRITER,
  FETCH_OPINION_WRITER_SUCCESS,
  FETCH_OPINION_WRITER_ERROR,
} from './actionTypes';

export type payloadType = {rows: any[]; pager: object};

export interface OpinionWriterItemType {
  name: string;
  description__value_export?: any;
  field_opinion_writer_path_export?: any;
  view_taxonomy_term: string;
  tid: string;
  vid_export?: any;
  field_description_export?: any;
  field_opinion_writer_path_export_1?: any;
  field_opinion_writer_photo_export: string;
}

export interface WritersBodyGet {
  items_per_page: number;
}

export interface FetchOpinionWriterListSuccessPayloadType {
  opinionWriterListData: any;
}

export interface FetchOpinionWriterListFailedPayloadtype {
  error: string;
}

export type OpinionWriterListState = {
  opinionWriterData: OpinionWriterItemType[];
  error: string;
  isLoading: boolean;
};

export type FetchOpinionWrtiterType = {
  type: typeof FETCH_OPINION_WRITER;
  payload: WritersBodyGet;
};

export type FetchOpinionWriterSuccessType = {
  type: typeof FETCH_OPINION_WRITER_SUCCESS;
  payload: FetchOpinionWriterListSuccessPayloadType;
};

export type FetchOpinionWriterFailedType = {
  type: typeof FETCH_OPINION_WRITER_ERROR;
  payload: FetchOpinionWriterListFailedPayloadtype;
};

export type OpinionWriterActions =
  | FetchOpinionWrtiterType
  | FetchOpinionWriterSuccessType
  | FetchOpinionWriterFailedType;
