import { FetchWriterDetailFailedPayloadType } from '../writersDetail/types';
import {
  FETCH_OPINIONS,
  FETCH_OPINIONS_SUCCESS,
  FETCH_OPINIONS_ERROR,
  FETCH_WRITER_OPINIONS,
  FETCH_WRITER_OPINIONS_SUCCESS,
  FETCH_WRITER_OPINIONS_ERROR,
  EMPTY_WRITER_OPINION_DATA,
  EMPTY_OPINION_DATA,
  STORE_HOME_OPINION_NID,
} from './actionTypes';

export interface Pager {
  current_page: number;
  items_per_page: string;
}

export type payloadType = {rows: any[]; pager: Pager};

export interface OpinionsListItemType {
  title: string;
  created_export: Date;
  field_opinion_writer_node_export: FieldOpinionWriterNodeExport[] | FieldOpinionWriterNodeExport;
  nid: string;
  field_opinion_sport_blog_export: FieldOpinionSportBlogExport[];
  field_new_issueno_export: string;
  published_at_export: Date;
  body: string;
  field_edit_letter_writer_export?: any;
  field_jwplayer_id_opinion_export?: any;
  type?: string;
  isBookmarked: boolean;
  jwplayer?: any;
}

export interface FieldOpinionWriterNodeExport {
  id: string;
  title: string;
  url: string;
  bundle: string;
  opinion_writer_photo: string;
  langcode: string;
  name: string;
}

export interface FieldOpinionSportBlogExport {
  id: string;
  title: string;
  bundle: string;
  name: string;
}

export interface OpinionsBodyGet {
  nid?: string;
  page: number;
  itemsPerPage?: number;
  byIdOpinions?: boolean
}

export interface FetchOpinionsSuccessPayloadType {
  opinionListData: any;
}

export interface FetchOpinionsFailedPayloadtype {
  error: string;
}
//opinionData: OpinionsListItemType[];
export type OpinionsListState = {
  opinionData: payloadType;
  opinionByIdData: payloadType;
  error: string;
  isLoading: boolean;
  writerOpinionLoading: boolean;
  writerOpinionData: payloadType;
  writerOpinionError: string;
  homeOpinionNid: string;
};

export type FetchOpinionsType = {
  type: typeof FETCH_OPINIONS;
  payload: OpinionsBodyGet;
};

export type FetchOpinionsSuccessType = {
  type: typeof FETCH_OPINIONS_SUCCESS;
  byIdOpinions?: boolean;
  payload: FetchOpinionsSuccessPayloadType;
};

export type FetchOpinionsFailedType = {
  type: typeof FETCH_OPINIONS_ERROR;
  payload: FetchOpinionsFailedPayloadtype;
};



export interface WriterOpinionsBodyGet {
  tid: string;
  page: number
}

export interface FetchWriterOpinionsSuccessPayloadType {
  writerOpinionListData: any;
}

export interface FetchWriterOpinionsFailedPayloadtype {
  error: string;
}


export type FetchWriterOpinionsType = {
  type: typeof FETCH_WRITER_OPINIONS;
  payload: WriterOpinionsBodyGet;
};

export type FetchWriterOpinionsSuccessType = {
  type: typeof FETCH_WRITER_OPINIONS_SUCCESS;
  payload: FetchWriterOpinionsSuccessPayloadType;
};

export type FetchWriterOpinionsFailedType = {
  type: typeof FETCH_WRITER_OPINIONS_ERROR;
  payload: FetchWriterDetailFailedPayloadType;
};

export type EmptyWriterOpinionDataType = {
  type: typeof EMPTY_WRITER_OPINION_DATA
}

export type EmptyOpinionsDataType = {
  type: typeof EMPTY_OPINION_DATA
}

export type StoreHomeOpinionNidPayload = {
  nid: string
}


export type StoreHomeOpinionNid = {
  type: typeof STORE_HOME_OPINION_NID,
  payload: StoreHomeOpinionNidPayload
}

export type OpinionsActions =
  | FetchOpinionsType
  | FetchOpinionsSuccessType
  | FetchOpinionsFailedType
  | FetchWriterOpinionsType
  | FetchWriterOpinionsSuccessType
  | FetchWriterOpinionsFailedType
  | EmptyWriterOpinionDataType
  | EmptyOpinionsDataType
  | StoreHomeOpinionNid
