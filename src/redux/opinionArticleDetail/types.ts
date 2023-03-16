import {
  REQUEST_OPINION_ARTICLE_DETAIL,
  REQUEST_OPINION_ARTICLE_DETAIL_FAILED,
  REQUEST_OPINION_ARTICLE_DETAIL_SUCCESS,
  REQUEST_RELATED_OPINION,
  REQUEST_RELATED_OPINION_SUCCESS,
  REQUEST_RELATED_OPINION_FAILED,
  EMPTY_RELATED_OPINION_DATA,
  EMPTY_OPINION_ARTICLE_DETAIL,
  REQUEST_NARRATED_OPINION_ARTICLE,
  REQUEST_NARRATED_OPINION_ARTICLE_SUCCESS,
  REQUEST_NARRATED_OPINION_ARTICLE_FAILED
} from './actionTypes';
export interface OpinionArticleDetailBodyGet {
  nid: number;
}
export interface RelatedOpinionBodyGet {
  page: number;
}
export interface NarratedOpinionBodyGet {
  jwPlayerID: string | null;
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
  description: string;
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
  isBookmarked: boolean;
  isFollowed: boolean;
  field_jwplayer_id_opinion_export?: any;
  field_shorturl: string;
  link_node: string;
}
export interface OpinionsListItemType {
  title: string;
  created_export: string;
  field_opinion_writer_node_export: FieldOpinionWriterNodeExport[] | FieldOpinionWriterNodeExport;
  nid: string;
  field_opinion_sport_blog_export: FieldOpinionSportBlogExport[];
  field_new_issueno_export: string;
  published_at_export: string;
  body: string;
  field_edit_letter_writer_export?: any;
  field_jwplayer_id_opinion_export?:any;
  jwplayer?:any;
  type:string;
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

interface PagerType {
  current_page: number;
  items_per_page: string;
}

export type payloadType = {rows: any[]; pager: PagerType};

export type OpinionArticleDetailSuccessPayload = {
  opinionArticleDetailData: any;
};

export type OpinionArticleDetailState = {
  error: string;
  isLoading: boolean;
  opinionArticleDetailData: OpinionArticleDetailItemType[];
  relatedOpinionError: string,
  isLoadingRelatedOpinion:boolean,
  relatedOpinionListData: payloadType,
  mediaData: any;
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
export interface FetchRelatedOpinionSuccessPayloadType {
  relatedOpinionListData: any;
}
export interface FetchRelatedOpinionFailedPayloadtype {
  error: string;
}

export interface FetchNarratedOpinionSuccessPayloadType {
  mediaData: any;
}
export interface FetchNarratedOpinionFailedPayloadtype {
  error: string;
}

export type FetchRelatedOpinionType = {
  type: typeof REQUEST_RELATED_OPINION;
  payload: RelatedOpinionBodyGet;
};

export type FetchRelatedOpinionSuccessType = {
  type: typeof REQUEST_RELATED_OPINION_SUCCESS;
  payload: FetchRelatedOpinionSuccessPayloadType;
};

export type FetchRelatedOpinionFailedType = {
  type: typeof REQUEST_RELATED_OPINION_FAILED;
  payload: FetchRelatedOpinionFailedPayloadtype;
};

export type EmptyRelatedOpinionDataList = {
  type: typeof EMPTY_RELATED_OPINION_DATA;
};

export type EmptyOpinionArticleDetailData = {
  type: typeof EMPTY_OPINION_ARTICLE_DETAIL;
};

export type FetchNarratedOpinionType = {
  type: typeof REQUEST_NARRATED_OPINION_ARTICLE;
  payload: NarratedOpinionBodyGet;
};

export type FetchNarratedOpinionSuccessType = {
  type: typeof REQUEST_NARRATED_OPINION_ARTICLE_SUCCESS;
  payload: FetchNarratedOpinionSuccessPayloadType;
};

export type FetchNarratedOpinionFailedType = {
  type: typeof REQUEST_NARRATED_OPINION_ARTICLE_FAILED;
  payload: FetchNarratedOpinionFailedPayloadtype;
};

export type OpinionArticleDetailAction =
  | RequestOpinionArticleDetailType
  | OpinionArticleDetailSuccessType
  | OpinionArticleDetailFailedType
  | FetchRelatedOpinionType
  | FetchRelatedOpinionSuccessType
  | FetchRelatedOpinionFailedType
  | EmptyRelatedOpinionDataList
  | EmptyOpinionArticleDetailData
  | FetchNarratedOpinionType
  | FetchNarratedOpinionSuccessType
  | FetchNarratedOpinionFailedType;
