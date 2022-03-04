import {
  REQUEST_OPINION_ARTICLE_DETAIL,
  REQUEST_OPINION_ARTICLE_DETAIL_FAILED,
  REQUEST_OPINION_ARTICLE_DETAIL_SUCCESS,
} from './actionTypes';

export type payloadType = { rows: any[]; pager: object };

export interface OpinionArticleDetailBodyGet {
  nid: number;
}

export interface RequestOpinionArticleDetailType {
  type: typeof REQUEST_OPINION_ARTICLE_DETAIL;
  payload: OpinionArticleDetailBodyGet;
}

export interface WriterType {
  id: string;
  title: string;
  url: string;
  bundle: string;
  opinion_writer_photo: string;
  langcode: string;
  name: string;
}

export interface OpinionArticleDetailItemType {
  title: string;
  bundle: string;
  body_export: string;
  nid_export: string;
  field_new_issueno_export: string;
  view_node: string;
  field_publication_date_export: string;
  created_export: string;
  jwplayer?: any;
  field_edit_letter_writer_export?: any;
  writer: WriterType[];
  isBookmarked: boolean
}

interface PagerType {
  current_page?: number | null | undefined;
  items_per_page?: number;
}

export type OpinionArticleDetailSuccessPayload = {
  opinionArticleDetailData: any;
};

export type OpinionArticleDetailState = {
  error: string;
  isLoading: boolean;
  opinionArticleDetailData: OpinionArticleDetailItemType[];
};

export interface OpinionArticleDetailSuccessType {
  type: typeof REQUEST_OPINION_ARTICLE_DETAIL_SUCCESS;
  payload: OpinionArticleDetailSuccessPayload;
}

export interface OpinionArticleDetailFailedPayload {
  error: string;
}

export interface OpinionArticleDetailFailedType {
  type: typeof REQUEST_OPINION_ARTICLE_DETAIL_FAILED;
  payload: OpinionArticleDetailFailedPayload;
}

export type OpinionArticleDetailAction =
  | RequestOpinionArticleDetailType
  | OpinionArticleDetailSuccessType
  | OpinionArticleDetailFailedType;
