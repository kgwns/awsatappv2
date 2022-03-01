import {
  FETCH_ALL_SITE_CATEGORIES,
  FETCH_ALL_SITE_CATEGORIES_SUCCESS,
  FETCH_ALL_SITE_CATEGORIES_ERROR,
  SEND_SELECTED_TOPIC,
  SEND_SELECTED_TOPIC_ERROR,
  SEND_SELECTED_TOPIC_SUCCESS
} from './actionTypes';

export type payloadType = { rows: any[]; pager: object };

export interface AllSiteCategoriesItemType {
  name: string;
  description__value_export?: any;
  field_opinion_writer_path_export?: any;
  view_taxonomy_term: string;
  tid: string;
  vid_export?: any;
  field_description_export?: any;
  field_opinion_writer_path_export_1?: any;
  field_opinion_writer_photo_export: string;
  parent_target_id_export: any;
  isSelected?: boolean;
}

export interface AllSiteCategoriesBodyGet {
  items_per_page: number;
}

export interface AllTopicsType {
  name: string;
  tid: string;
  isSelected?: boolean;
}

export interface FetchAllSiteCategoriesListSuccessPayloadType {
  allSiteCategoriesListData: any;
}

export interface FetchAllSiteCategoriesListFailedPayloadtype {
  error: string;
}

export interface ResponseMessage {
  code?: number,
  message?: string
}
export interface SendSelectedTopicSuccessPayloadType {
  saveData: ResponseMessage;
}

export interface SendSelectedTopicFailedPayloadtype {
  error: string;
}

export interface SendSelectedTopicBody {
  tid: string
}

export type AllSiteCategoriesState = {
  allSiteCategoriesData: AllSiteCategoriesItemType[];
  error: string;
  isLoading: boolean;
  sendTopicInfo: ResponseMessage
};

export type FetchAllSiteCategoriesType = {
  type: typeof FETCH_ALL_SITE_CATEGORIES;
  payload: AllSiteCategoriesBodyGet;
};

export type FetchAllSiteCategoriesSuccessType = {
  type: typeof FETCH_ALL_SITE_CATEGORIES_SUCCESS;
  payload: FetchAllSiteCategoriesListSuccessPayloadType;
};

export type FetchAllSiteCategoriesFailedType = {
  type: typeof FETCH_ALL_SITE_CATEGORIES_ERROR;
  payload: FetchAllSiteCategoriesListFailedPayloadtype;
};
export type SendSelectedTopicType = {
  type: typeof SEND_SELECTED_TOPIC;
  payload: SendSelectedTopicBody;
};

export type SendSelectedTopicSuccessType = {
  type: typeof SEND_SELECTED_TOPIC_SUCCESS;
  payload: SendSelectedTopicSuccessPayloadType;
};

export type SendSelectedTopicFailedType = {
  type: typeof SEND_SELECTED_TOPIC_ERROR;
  payload: SendSelectedTopicFailedPayloadtype;
};

export type AllSiteCategoriesActions =
  | FetchAllSiteCategoriesType
  | FetchAllSiteCategoriesSuccessType
  | FetchAllSiteCategoriesFailedType
  | SendSelectedTopicType
  | SendSelectedTopicSuccessType
  | SendSelectedTopicFailedType