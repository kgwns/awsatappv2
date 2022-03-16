import {
  FETCH_OPINIONS,
  FETCH_OPINIONS_SUCCESS,
  FETCH_OPINIONS_ERROR,
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
  page: number;
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
  error: string;
  isLoading: boolean;
};

export type FetchOpinionsType = {
  type: typeof FETCH_OPINIONS;
  payload: OpinionsBodyGet;
};

export type FetchOpinionsSuccessType = {
  type: typeof FETCH_OPINIONS_SUCCESS;
  payload: FetchOpinionsSuccessPayloadType;
};

export type FetchOpinionsFailedType = {
  type: typeof FETCH_OPINIONS_ERROR;
  payload: FetchOpinionsFailedPayloadtype;
};

export type OpinionsActions =
  | FetchOpinionsType
  | FetchOpinionsSuccessType
  | FetchOpinionsFailedType;
